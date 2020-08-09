create table categories
(
    id uuid not null,
    created_at timestamp,
    updated_at timestamp,
    name varchar(255),
    primary key (id)
);

alter table if exists courses
    add column image varchar(255),
    add column category_id uuid,
    add constraint FK72l5dj585nq7i6xxv1vj51lyn foreign key (category_id) references categories;

alter table if exists paths
    add column if not exists image varchar(255);

insert into categories (id, created_at, updated_at, name)
values ('4d0f6bac-a16f-431a-a813-2da00a6b8744', '2020-08-08 08:32:07.704000', '2020-08-08 08:32:07.704000', 'Java Programming'),
       ('bd65535b-3e63-4469-a735-398b133a2e3b', '2020-08-08 08:33:07.704000', '2020-08-08 08:33:07.704000', 'JS Programming');

update courses
set image = 'https://img-a.udemycdn.com/course/750x422/2669808_fcbe.jpg',
    category_id = '4d0f6bac-a16f-431a-a813-2da00a6b8744'
where id = 'f57dc74d-a8ef-4f49-b266-e6fec420f928';

update courses
set image = 'https://img-a.udemycdn.com/course/750x422/917724_114b_12.jpg',
    category_id = 'bd65535b-3e63-4469-a735-398b133a2e3b'
where id = '50d545a1-8b29-42bf-b447-5c36728f77a8';

update courses
set image = 'https://www.mtaeducation.in/images/courses/details/advancedjava.jpg',
    category_id = '4d0f6bac-a16f-431a-a813-2da00a6b8744'
where id = '0b47cb8e-f458-4390-8d0e-65daef09a780';

update paths
set image = 'https://www.oracle.com/a/ocom/img/hp11-intl-java-logo.jpg'
where id = '7b3208ba-e9bd-4b71-a763-72bf719c7c9b';

update paths
set image = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png'
where id = 'ed214a7a-a07b-4f99-9b5e-300056efaba7';

insert into course_reactions (id, created_at, updated_at, reaction, user_id, course_id)
values ('41011bc8-b9ce-4a6f-9749-e6dbc20922ca', '2020-08-08 08:34:07.704000', '2020-08-08 08:34:07.704000',
  true, '9aaf962a-831e-4b49-8c03-e820cee71b41', '0b47cb8e-f458-4390-8d0e-65daef09a780'),
       ('7529cbe5-12fb-424e-88e3-fb99af0274ea', '2020-08-08 08:35:07.704000', '2020-08-08 08:35:07.704000',
        false, '9aaf962a-831e-4b49-8c03-e820cee71b41', 'f57dc74d-a8ef-4f49-b266-e6fec420f928');

insert into lectures(id, created_at, updated_at, description, duration, source_url, course_id)
values('29783da5-fb77-450b-8383-0ef7577d2da6', '2020-08-08 08:38:07.704000', '2020-08-08 08:38:07.704000',
       'Maecenas mollis enim ac augue faucibus, sit amet efficitur libero accumsan', 43, 'https://www.youtube.com/watch?v=gPUX1oRtxPM',
       '0b47cb8e-f458-4390-8d0e-65daef09a780');

insert into homeworks (id, created_at, updated_at, description, lecture_id)
values ('f33d149c-fa2d-417d-aebd-b8bfc91baad8', '2020-08-08 08:48:07.704000', '2020-08-08 08:48:07.704000',
        'Praesent suscipit sem sapien, a vulputate leo vulputate quis', '29783da5-fb77-450b-8383-0ef7577d2da6');

update lectures set homework_id = 'f33d149c-fa2d-417d-aebd-b8bfc91baad8' where id = '29783da5-fb77-450b-8383-0ef7577d2da6';


