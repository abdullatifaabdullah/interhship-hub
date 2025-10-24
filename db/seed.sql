-- Updated seed.sql with bcrypt hashed passwords and proper email domains
INSERT INTO users (email, password_hash, full_name, role, admin_status) VALUES
('owner@hub.com',   '$2b$12$jqTvPl8OkBbQxKDIYzi9T.BuuiUzSkjdmIemI481tqcta1q3tfk7i',   'Owner One',   'owner',   NULL),
('admin@hub.com',   '$2b$12$W1lw1HiTdP7zJux1No4DlO3t6EHsJrZNwpnW3CoCLqbEl4cGk4Loy',   'Admin One',   'admin',   'active'),
('student@hub.com', '$2b$12$w.dn1U5DoBWi91oh30rEa.HOV/rC6H9uiD/Pc0cjY6mSKAYqQnSrC', 'Student One', 'student', NULL),
('admin2@hub.com', '$2b$12$W1lw1HiTdP7zJux1No4DlO3t6EHsJrZNwpnW3CoCLqbEl4cGk4Loy', 'Admin Two', 'admin', 'pending'),
('student2@hub.com', '$2b$12$w.dn1U5DoBWi91oh30rEa.HOV/rC6H9uiD/Pc0cjY6mSKAYqQnSrC', 'Student Two', 'student', NULL);

-- Add sample internships
INSERT INTO internships (title, description, status, created_by, location, tags) VALUES
('Software Development Intern', 'Join our dynamic team as a software development intern. Work on cutting-edge projects and gain hands-on experience with modern technologies including Python, JavaScript, and cloud platforms.', 'approved', 2, 'San Francisco, CA', ARRAY['Python', 'JavaScript', 'Git', 'Problem Solving']),
('Marketing Intern', 'Help us create compelling marketing campaigns and learn digital marketing strategies. Work with social media, content creation, and analytics tools.', 'approved', 2, 'New York, NY', ARRAY['Social Media', 'Content Creation', 'Analytics', 'Communication']),
('Data Science Intern', 'Work with large datasets and machine learning models to solve real-world problems. Gain experience with Python, R, SQL, and statistical analysis.', 'approved', 2, 'Austin, TX', ARRAY['Python', 'R', 'SQL', 'Machine Learning', 'Statistics']),
('UX Design Intern', 'Design user experiences for our mobile and web applications. Work with design tools, user research, and prototyping.', 'pending_approval', 2, 'Seattle, WA', ARRAY['Figma', 'User Research', 'Prototyping', 'Design Thinking']),
('DevOps Intern', 'Learn infrastructure automation, containerization, and cloud deployment. Work with Docker, Kubernetes, and AWS.', 'approved', 2, 'Remote', ARRAY['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux']);

-- Add sample applications
INSERT INTO applications (user_id, internship_id, status, status_note) VALUES
(3, 1, 'submitted', 'Application submitted successfully'),
(3, 2, 'review', 'Application under review'),
(5, 1, 'interview_required', 'Please schedule an interview'),
(5, 3, 'submitted', 'Application submitted successfully');
