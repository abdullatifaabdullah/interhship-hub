BEGIN;

-- USERS
CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('owner','admin','student')),
  admin_status TEXT CHECK (admin_status IN ('pending','active','suspended','rejected')), -- NULL for non-admins
  created_at TIMESTAMP DEFAULT NOW()
);

-- INTERNSHIPS
CREATE TABLE internships (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending_approval','approved','rejected')),
  owner_note TEXT,
  created_by BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  location TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- APPLICATIONS
CREATE TABLE applications (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  internship_id BIGINT NOT NULL REFERENCES internships(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('submitted','review','interview_required','info_required','rejected')),
  status_note TEXT,
  contact_email TEXT,
  status_updated_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (user_id, internship_id)
);

COMMIT;
