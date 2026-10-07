package com.guilhermef.br.ratelimit;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

@Component
public class InMemoryRequestRateLimiter {

	private final Map<String, Deque<Instant>> requestTimestampsByKey = new ConcurrentHashMap<>();

	public boolean tryAcquire(String key, int maxRequests, Duration window) {
		Instant now = Instant.now();
		Instant threshold = now.minus(window);
		Deque<Instant> timestamps = requestTimestampsByKey.computeIfAbsent(key, ignored -> new ArrayDeque<>());

		synchronized (timestamps) {
			while (!timestamps.isEmpty() && timestamps.peekFirst().isBefore(threshold)) {
				timestamps.pollFirst();
			}
			if (timestamps.size() >= maxRequests) {
				return false;
			}
			timestamps.addLast(now);
			return true;
		}
	}
}