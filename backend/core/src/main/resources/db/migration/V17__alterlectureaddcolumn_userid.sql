ALTER TABLE lectures ADD COLUMN user_id uuid;

ALTER TABLE if EXISTS lectures
    add constraint FK_constraint_lecture_user_id foreign key (user_id) references users;

UPDATE lectures
SET user_id = a.user_id
FROM courses c
JOIN authors a ON a.id = c.author_id
WHERE c.id = course_id;