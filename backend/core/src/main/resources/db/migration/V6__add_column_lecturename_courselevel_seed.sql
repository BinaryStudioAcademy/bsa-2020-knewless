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

INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, name)
values ('01f7d4cb-b2e2-4ea9-aaeb-54c3b4fe6956', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000',
        'est rerum tempore vitae
        sequi sint nihil reprehenderit dolor beatae ea dolores neque
        fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis
        qui aperiam non debitis possimus qui neque nisi nulla',
        51, 'https://www.youtube.com/watch?v=link',
        'f57dc74d-a8ef-4f49-b266-e6fec420f928', 'WHAT IS SQL');

INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, name)
values ('26c77fe1-49dc-4719-b69e-8a48005952b0', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000',
        'est rerum tempore vitae
        sequi sint nihil reprehenderit dolor beatae ea dolores neque
        fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis
        qui aperiam non debitis possimus qui neque nisi nulla',
        125, 'https://www.youtube.com/watch?v=link2',
        'f57dc74d-a8ef-4f49-b266-e6fec420f928', 'REST for beginner');

INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, name)
values ('a2f20f76-87fb-49a8-bb27-178dcb5d863f', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000',
        'est rerum tempore vitae
        sequi sint nihil reprehenderit dolor beatae ea dolores neque
        fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis
        qui aperiam non debitis possimus qui neque nisi nulla',
        35, 'https://www.youtube.com/watch?v=link3',
        'f57dc74d-a8ef-4f49-b266-e6fec420f928', 'JS vs TS');
