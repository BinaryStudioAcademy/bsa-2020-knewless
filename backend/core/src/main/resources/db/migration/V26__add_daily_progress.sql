CREATE TABLE daily_progress
(
    id         UUID
        CONSTRAINT daily_progress_pk PRIMARY KEY,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    seconds    INT,
    user_id    UUID
        CONSTRAINT daily_progress_users_id_fk REFERENCES users,
    date       DATE
);

CREATE UNIQUE INDEX daily_progress_user_id_date_uindex ON daily_progress (user_id, date);

ALTER TABLE students
    ADD date_goal_set DATE;

CREATE TABLE progress_goal
(
    id               UUID
        CONSTRAINT progress_goal_pk PRIMARY KEY,
    created_at       TIMESTAMP,
    updated_at       TIMESTAMP,
    name             TEXT,
    interval_seconds INT,
    duration_seconds INT
);

ALTER TABLE students
    ADD goal_id UUID;

ALTER TABLE students
    ADD CONSTRAINT students_progress_goal_id_fk FOREIGN KEY (goal_id) REFERENCES progress_goal (id);

INSERT INTO progress_goal (id, created_at, updated_at, name, interval_seconds, duration_seconds)
    VALUES ('f1b1f41b-78bd-44d1-8be9-cad85d9ee750', '2020-08-05 08:32:07.704000', '2020-08-05 08:32:07.704000',
            '30 minutes a week', 604800, 1800);
INSERT INTO progress_goal (id, created_at, updated_at, name, interval_seconds, duration_seconds)
    VALUES ('b7c80d5e-4e93-428b-b7ca-4436b34b642c', '2020-08-05 08:32:07.704000', '2020-08-05 08:32:07.704000',
            '1 hour a week', 604800, 3600);
INSERT INTO progress_goal (id, created_at, updated_at, name, interval_seconds, duration_seconds)
    VALUES ('3463a5a8-b2e5-42f5-a2eb-74aa55603a04', '2020-08-05 08:32:07.704000', '2020-08-05 08:32:07.704000',
            '2 hours a week', 604800, 7200);

-- delete clarkkent (he's a teacher)
DELETE FROM students WHERE user_id='eaea544b-8383-49ee-90c6-2a169e5c560a';
-- delete haroldfirst (he's a teacher)
DELETE FROM students WHERE user_id='f5f987b5-eaee-4709-93f4-94ac585cb812';


-- set demo student
UPDATE users SET role_id='76a8e72c-ed25-4b21-8514-a3a09b647c02'
    WHERE id='c4513edc-5901-485a-868d-38f83941c15e';
-- set johndoe student
UPDATE users SET role_id='76a8e72c-ed25-4b21-8514-a3a09b647c02'
    WHERE id='9aaf962a-831e-4b49-8c03-e820cee71b41';
-- andrewcunanan@mail.com student
UPDATE users SET role_id='76a8e72c-ed25-4b21-8514-a3a09b647c02'
    WHERE id='d1d9eb03-f80a-4f9b-9e84-202e7d88a7b9';

-- haroldauthor@mail.com author
UPDATE users SET role_id='9467cfe9-63db-4f56-a553-a8fa000217fe'
    WHERE id='f5f987b5-eaee-4709-93f4-94ac585cb812';
