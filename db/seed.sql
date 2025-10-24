-- Updated seed.sql with bcrypt hashed passwords and proper email domains
INSERT INTO users (email, password_hash, full_name, role, admin_status) VALUES
('owner@hub.com',   '$2b$12$jqTvPl8OkBbQxKDIYzi9T.BuuiUzSkjdmIemI481tqcta1q3tfk7i',   'Owner One',   'owner',   NULL),
('admin@hub.com',   '$2b$12$W1lw1HiTdP7zJux1No4DlO3t6EHsJrZNwpnW3CoCLqbEl4cGk4Loy',   'Admin One',   'admin',   'active'),
('student@hub.com', '$2b$12$w.dn1U5DoBWi91oh30rEa.HOV/rC6H9uiD/Pc0cjY6mSKAYqQnSrC', 'Student One', 'student', NULL);
