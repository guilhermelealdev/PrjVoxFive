package com.guilhermef.br.honeypot;

import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.stereotype.Component;

@Component
public class SuspiciousIpRegistry {

	private static final int MAX_SUSPICIOUS_HITS = 3;
	private static final Duration BLOCK_DURATION = Duration.ofMinutes(30);
	private static final Duration COUNTER_WINDOW = Duration.ofMinutes(30);

	private final Map<String, IpState> stateByIp = new ConcurrentHashMap<>();

	public void registerHit(String ip) {
		IpState state = stateByIp.computeIfAbsent(ip, ignored -> new IpState());
		synchronized (state) {
			Instant now = Instant.now();
			if (state.windowStartedAt == null || state.windowStartedAt.plus(COUNTER_WINDOW).isBefore(now)) {
				state.windowStartedAt = now;
				state.hits.set(0);
			}
			state.hits.incrementAndGet();
			if (state.hits.get() >= MAX_SUSPICIOUS_HITS) {
				state.blockedUntil = now.plus(BLOCK_DURATION);
			}
		}
	}

	public boolean isBlocked(String ip) {
		IpState state = stateByIp.get(ip);
		if (state == null || state.blockedUntil == null) {
			return false;
		}
		return state.blockedUntil.isAfter(Instant.now());
	}

	private static final class IpState {
		private final AtomicInteger hits = new AtomicInteger();
		private volatile Instant windowStartedAt;
		private volatile Instant blockedUntil;
	}
}