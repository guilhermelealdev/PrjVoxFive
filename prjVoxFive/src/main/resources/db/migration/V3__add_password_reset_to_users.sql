ALTER TABLE tb_users ADD COLUMN reset_token VARCHAR(255);
ALTER TABLE tb_users ADD COLUMN reset_token_expiry DATETIME;