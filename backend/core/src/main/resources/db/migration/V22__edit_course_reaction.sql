ALTER TABLE course_reactions
DROP COLUMN reaction;

ALTER TABLE course_reactions
ADD COLUMN reaction integer;

UPDATE course_reactions
SET reaction = 5
WHERE id = '41011bc8-b9ce-4a6f-9749-e6dbc20922ca';

UPDATE course_reactions
SET reaction = 4
WHERE id = '7529cbe5-12fb-424e-88e3-fb99af0274ea';
