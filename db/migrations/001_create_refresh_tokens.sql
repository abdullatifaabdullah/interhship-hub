-- Migration: Create refresh_tokens table for JWT authentication
-- This table stores hashed refresh tokens for secure token rotation

CREATE TABLE IF NOT EXISTS refresh_tokens (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  jti UUID NOT NULL UNIQUE,
  token_hash TEXT NOT NULL,            -- SHA-256 of the raw refresh token
  issued_at TIMESTAMP NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL,
  revoked BOOLEAN NOT NULL DEFAULT FALSE,
  replaced_by UUID,                    -- new jti when rotated (optional)
  user_agent TEXT,
  ip_address INET
);

-- Create index for efficient user-based queries
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);

-- Create index for efficient token hash lookups
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token_hash ON refresh_tokens(token_hash);

-- Create index for cleanup of expired tokens
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_expires_at ON refresh_tokens(expires_at);
