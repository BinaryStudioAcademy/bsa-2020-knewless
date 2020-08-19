ALTER TABLE histories
    ADD seconds_watched INT;

ALTER TABLE histories
    ADD fraction_watched float4;

ALTER TABLE histories
    ADD CONSTRAINT uk__histories__lecture_user UNIQUE (lecture_id, user_id);

ALTER TABLE students
    DROP COLUMN total_content_watched;


