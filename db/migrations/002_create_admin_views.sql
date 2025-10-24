-- Migration: Create admin views for dashboard and management functionality
-- These views provide optimized queries for admin interface

-- Drop existing views if they exist
DROP VIEW IF EXISTS v_admin_dashboard_stats CASCADE;
DROP VIEW IF EXISTS v_admin_recent_applications CASCADE;
DROP VIEW IF EXISTS v_admin_recent_review_applications CASCADE;
DROP VIEW IF EXISTS v_admin_internships_with_counts CASCADE;
DROP VIEW IF EXISTS v_admin_all_applications CASCADE;
DROP VIEW IF EXISTS v_admin_pending_posts CASCADE;

-- View for admin dashboard statistics
CREATE OR REPLACE VIEW v_admin_dashboard_stats AS
SELECT 
    u.id as admin_id,
    COALESCE(COUNT(DISTINCT i.id), 0) as total_internships,
    COALESCE(COUNT(DISTINCT CASE WHEN a.status = 'submitted' THEN a.id END), 0) as pending_applications,
    COALESCE(COUNT(DISTINCT CASE WHEN a.status = 'review' THEN a.id END), 0) as approved_applications,
    COALESCE(COUNT(DISTINCT CASE WHEN a.status = 'rejected' THEN a.id END), 0) as rejected_applications,
    COALESCE(COUNT(DISTINCT CASE WHEN i.status = 'pending_approval' THEN i.id END), 0) as pending_posts
FROM users u
LEFT JOIN internships i ON i.created_by = u.id
LEFT JOIN applications a ON a.internship_id = i.id
WHERE u.role = 'admin' AND u.admin_status = 'active'
GROUP BY u.id;

-- View for recent applications for admin's internships
CREATE OR REPLACE VIEW v_admin_recent_applications AS
SELECT 
    a.id as application_id,
    a.user_id as student_id,
    a.internship_id,
    a.status,
    a.status_note,
    a.contact_email,
    a.created_at,
    a.status_updated_at,
    i.title as internship_title,
    i.location as internship_location,
    u.full_name as applicant_name,
    u.email as applicant_email,
    i.created_by as admin_id
FROM applications a
JOIN internships i ON a.internship_id = i.id
JOIN users u ON a.user_id = u.id
WHERE i.created_by IN (
    SELECT id FROM users WHERE role = 'admin' AND admin_status = 'active'
);

-- View for recent approved applications (admin's review actions)
CREATE OR REPLACE VIEW v_admin_recent_review_applications AS
SELECT 
    a.id as application_id,
    a.user_id as student_id,
    a.internship_id,
    a.status,
    a.status_note,
    a.contact_email,
    a.created_at,
    a.status_updated_at,
    i.title as internship_title,
    i.location as internship_location,
    u.full_name as applicant_name,
    u.email as applicant_email,
    i.created_by as admin_id
FROM applications a
JOIN internships i ON a.internship_id = i.id
JOIN users u ON a.user_id = u.id
WHERE i.created_by IN (
    SELECT id FROM users WHERE role = 'admin' AND admin_status = 'active'
)
AND a.status IN ('review', 'interview_required', 'info_required', 'rejected')
AND a.status_updated_at IS NOT NULL;

-- View for admin's internships with application counts
CREATE OR REPLACE VIEW v_admin_internships_with_counts AS
SELECT 
    i.id,
    i.title,
    i.description,
    i.status,
    i.location,
    i.tags,
    i.created_at,
    i.created_by as admin_id,
    COALESCE(COUNT(a.id), 0) as application_count,
    COALESCE(COUNT(CASE WHEN a.status = 'submitted' THEN 1 END), 0) as pending_count,
    COALESCE(COUNT(CASE WHEN a.status = 'review' THEN 1 END), 0) as approved_count,
    COALESCE(COUNT(CASE WHEN a.status = 'rejected' THEN 1 END), 0) as rejected_count
FROM internships i
LEFT JOIN applications a ON a.internship_id = i.id
WHERE i.created_by IN (
    SELECT id FROM users WHERE role = 'admin' AND admin_status = 'active'
)
GROUP BY i.id, i.title, i.description, i.status, i.location, i.tags, i.created_at, i.created_by;

-- View for all applications for admin's internships
CREATE OR REPLACE VIEW v_admin_all_applications AS
SELECT 
    a.id as application_id,
    a.user_id as student_id,
    a.internship_id,
    a.status,
    a.status_note,
    a.contact_email,
    a.created_at,
    a.status_updated_at,
    i.title as internship_title,
    i.location as internship_location,
    u.full_name as applicant_name,
    u.email as applicant_email,
    i.created_by as admin_id
FROM applications a
JOIN internships i ON a.internship_id = i.id
JOIN users u ON a.user_id = u.id
WHERE i.created_by IN (
    SELECT id FROM users WHERE role = 'admin' AND admin_status = 'active'
);

-- View for admin's pending posts (internships awaiting owner approval)
CREATE OR REPLACE VIEW v_admin_pending_posts AS
SELECT 
    i.id,
    i.title,
    i.description,
    i.status,
    i.location,
    i.tags,
    i.created_at,
    i.created_by as admin_id
FROM internships i
WHERE i.created_by IN (
    SELECT id FROM users WHERE role = 'admin' AND admin_status = 'active'
)
AND i.status = 'pending_approval';

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_internships_created_by ON internships(created_by);
CREATE INDEX IF NOT EXISTS idx_applications_internship_id ON applications(internship_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at);
CREATE INDEX IF NOT EXISTS idx_applications_status_updated_at ON applications(status_updated_at);
