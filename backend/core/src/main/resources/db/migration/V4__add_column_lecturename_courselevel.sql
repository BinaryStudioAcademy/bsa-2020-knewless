ALTER TABLE lectures ADD COLUMN name text;
ALTER TABLE courses ADD COLUMN description text;

ALTER TABLE courses
ALTER COLUMN level TYPE text;

UPDATE lectures
SET name = 'Java Intro'
WHERE id = '31b2d2bc-7fb4-4a45-9fc4-c73279d04dec';

UPDATE lectures
SET name = 'JS sagas'
WHERE id = '5208962f-9ece-4f92-9dad-1cad7bf185bf';

UPDATE courses
SET level = 'BEGINNER'
WHERE id = '50d545a1-8b29-42bf-b447-5c36728f77a8';

UPDATE courses
SET level = 'BEGINNER'
WHERE id = 'f57dc74d-a8ef-4f49-b266-e6fec420f928';

UPDATE courses
SET level = 'ADVANCED'
WHERE id = '0b47cb8e-f458-4390-8d0e-65daef09a780';