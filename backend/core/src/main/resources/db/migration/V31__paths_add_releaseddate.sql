ALTER TABLE paths ADD COLUMN released_date timestamp;

UPDATE paths
SET released_date = NOW();

ALTER TABLE paths ALTER COLUMN image_tag_id DROP NOT NULL;