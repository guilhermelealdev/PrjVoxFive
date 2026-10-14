CREATE TABLE IF NOT EXISTS tb_users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_users_email (email),
    UNIQUE KEY uk_users_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS tb_feedbacks (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    creation DATETIME(6) NOT NULL,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    message VARCHAR(4000) NOT NULL,
    response VARCHAR(4000),
    PRIMARY KEY (id),
    KEY idx_feedbacks_status (status),
    KEY idx_feedbacks_type (type),
    KEY idx_feedbacks_user_id (user_id),
    CONSTRAINT fk_feedbacks_user FOREIGN KEY (user_id) REFERENCES tb_users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;