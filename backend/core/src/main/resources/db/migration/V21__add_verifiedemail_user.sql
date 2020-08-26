ALTER TABLE users ADD COLUMN verified_email boolean;

UPDATE users
SET verified_email = true