ALTER TABLE paths
    DROP COLUMN image;

UPDATE paths SET image_tag_id='ae0e2869-9168-4176-bb30-a2bc52ebadcc'
    WHERE id='ed214a7a-a07b-4f99-9b5e-300056efaba7';
