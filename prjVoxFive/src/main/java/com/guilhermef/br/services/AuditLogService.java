package com.guilhermef.br.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.guilhermef.br.entities.AuditLog;
import com.guilhermef.br.repositories.AuditLogRepository;

@Service
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @Transactional
    public void logAction(String action, String actorUsername, String targetUsername) {
        AuditLog log = new AuditLog();
        log.setAction(action);
        log.setActorUsername(actorUsername);
        log.setTargetUsername(targetUsername);
        auditLogRepository.save(log);
    }

    @Transactional(readOnly = true)
    public List<AuditLog> listAll() {
        return auditLogRepository.findAll();
    }
}