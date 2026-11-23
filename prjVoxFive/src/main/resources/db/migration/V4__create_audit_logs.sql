CREATE TABLE IF NOT EXISTS tb_audit_logs (
    id BIGINT NOT NULL AUTO_INCREMENT,
    action VARCHAR(100) NOT NULL,
    actor_username VARCHAR(100) NOT NULL,
    target_username VARCHAR(100),
    created_at DATETIME(6) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;