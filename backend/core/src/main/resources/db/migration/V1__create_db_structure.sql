create table achievements
(
    id         uuid not null,
    created_at timestamp,
    updated_at timestamp,
    name       varchar(255),
    primary key (id)
);
create table article_comments
(
    id         uuid not null,
    created_at timestamp,
    updated_at timestamp,
    text       TEXT,
    user_id    uuid,
    article_id uuid,
    primary key (id)
);
create table article_reactions
(
    id         uuid not null,
    created_at timestamp,
    updated_at timestamp,
    reaction   boolean,
    user_id    uuid,
    article_id uuid,
    primary key (id)
);
create table article_tag
(
    tag_id     uuid not null,
    article_id uuid not null,
    primary key (tag_id, article_id)
);
create table articles
(
    id         uuid not null,
    created_at timestamp,
    updated_at timestamp,
    name       varchar(255),
    text       TEXT,
    author_id  uuid,
    primary key (id)
);
create table authors
(
    id         uuid not null,
    created_at timestamp,
    updated_at timestamp,
    name       varchar(255),
    school_id  uuid,
    user_id    uuid,
    primary key (id)
);
create table course_comments
(
    id         uuid not null,
    created_at timestamp,
    updated_at timestamp,
    text       TEXT,
    user_id    uuid,
    course_id  uuid,
    primary key (id)
);
create table course_path
(
    course_id uuid not null,
    path_id   uuid not null
);
create table course_reactions
(
    id         uuid not null,
    created_at timestamp,
    updated_at timestamp,
    reaction   boolean,
    user_id    uuid,
    course_id  uuid,
    primary key (id)
);
create table courses
(
    id            uuid not null,
    created_at    timestamp,
    updated_at    timestamp,
    level         int4,
    name          varchar(255),
    released_date timestamp,
    author_id     uuid,
    primary key (id)
);
create table current_user_courses
(
    id         uuid not null,
    created_at timestamp,
    updated_at timestamp,
    course_id  uuid,
    user_id    uuid,
    primary key (id)
);
create table favorites
(
    id          uuid not null,
    created_at  timestamp,
    updated_at  timestamp,
    source_id   uuid,
    source_type varchar(255),
    article_id  uuid,
    primary key (id)
);
create table histories
(
    id         uuid not null,
    created_at timestamp,
    updated_at timestamp,
    lecture_id uuid,
    user_id    uuid,
    primary key (id)
);
create table homeworks
(
    id          uuid not null,
    created_at  timestamp,
    updated_at  timestamp,
    description varchar(255),
    lecture_id  uuid,
    primary key (id)
);
create table lecture_comments
(
    id         uuid not null,
    created_at timestamp,
    updated_at timestamp,
    text       TEXT,
    user_id    uuid,
    lecture_id uuid,
    primary key (id)
);
create table lecture_reactions
(
    id         uuid not null,
    created_at timestamp,
    updated_at timestamp,
    reaction   boolean,
    user_id    uuid,
    lecture_id uuid,
    primary key (id)
);
create table lecture_tag
(
    tag_id     uuid not null,
    lecture_id uuid not null,
    primary key (tag_id, lecture_id)
);
create table lectures
(
    id          uuid not null,
    created_at  timestamp,
    updated_at  timestamp,
    description varchar(255),
    duration    int4,
    source_url  varchar(255),
    course_id   uuid,
    homework_id uuid,
    primary key (id)
);
create table notifications
(
    id          uuid not null,
    created_at  timestamp,
    updated_at  timestamp,
    link        varchar(255),
    source_id   uuid,
    source_type varchar(255),
    text        varchar(255),
    user_id  uuid,
    primary key (id)
);
create table paths
(
    id         uuid not null,
    created_at timestamp,
    updated_at timestamp,
    name       varchar(255),
    primary key (id)
);
create table students
(
    id                    uuid not null,
    created_at            timestamp,
    updated_at            timestamp,
    first_name            varchar(255),
    last_name             varchar(255),
    total_content_watched int4,
    user_id               uuid,
    primary key (id)
);
create table roles
(
    id         uuid not null,
    created_at timestamp,
    updated_at timestamp,
    name       varchar(255),
    primary key (id)
);
create table schools
(
    id          uuid not null,
    created_at  timestamp,
    updated_at  timestamp,
    description varchar(255),
    logo        varchar(255),
    name        varchar(255),
    primary key (id)
);
create table subscriptions
(
    id          uuid not null,
    created_at  timestamp,
    updated_at  timestamp,
    source_id   uuid,
    source_type varchar(255),
    user_id     uuid,
    primary key (id)
);
create table tags
(
    id         uuid not null,
    created_at timestamp,
    updated_at timestamp,
    name       varchar(255),
    primary key (id)
);
create table user_achievement
(
    achievement_id uuid not null,
    user_id        uuid not null,
    primary key (achievement_id, user_id)
);
create table user_tag
(
    tag_id  uuid not null,
    user_id uuid not null,
    primary key (tag_id, user_id)
);
create table users
(
    id         uuid not null,
    created_at timestamp,
    updated_at timestamp,
    email      varchar(255),
    nickname   varchar(255),
    password   varchar(255),
    role_id    uuid,
    primary key (id)
);
alter table if exists users
    add constraint UK_6dotkott2kjsp8vw4d0m25fb7 unique (email);
alter table if exists article_comments
    add constraint FKn40omsbuitpr309fymoqidcry foreign key (user_id) references users;
alter table if exists article_comments
    add constraint FK8gyngt3dpovo1ypp3psb7mbs5 foreign key (article_id) references articles;
alter table if exists article_reactions
    add constraint FKlqvt3q3ciaikqtdst7ieypr5v foreign key (user_id) references users;
alter table if exists article_reactions
    add constraint FKsg9vlu2i6nrxyjd2to3oyqiss foreign key (article_id) references articles;
alter table if exists article_tag
    add constraint FKkfkj25ialwd9il3fajd6vkmv5 foreign key (article_id) references articles;
alter table if exists article_tag
    add constraint FK3nvn435qf5rn1e9ph51e3r55h foreign key (tag_id) references tags;
alter table if exists articles
    add constraint FKglvhv5e43dmjhmiovwhcax7aq foreign key (author_id) references authors;
alter table if exists authors
    add constraint FKe5ksm61aosfsbcco30ysuhh3c foreign key (school_id) references schools;
alter table if exists authors
    add constraint FK6g6ireq6qd4nxohq9ldidxfin foreign key (user_id) references users;
alter table if exists course_comments
    add constraint FKsga1204uxye4tjjn2bn1marn9 foreign key (user_id) references users;
alter table if exists course_comments
    add constraint FKci2448eb50cohwai93f8a7sos foreign key (course_id) references courses;
alter table if exists course_path
    add constraint FKkbknacer60irnd2m9d5dxdc19 foreign key (path_id) references paths;
alter table if exists course_path
    add constraint FKlnhrplmfn94led1ioflrwjkgj foreign key (course_id) references courses;
alter table if exists course_reactions
    add constraint FKen8c6uoy5tpx3j3rwo7ou8ymo foreign key (user_id) references users;
alter table if exists course_reactions
    add constraint FKo2b8lp8c2lsdijx7br5thb4cq foreign key (course_id) references courses;
alter table if exists courses
    add constraint FK8vtofx6w51is16ihtsqgsr9f6 foreign key (author_id) references authors;
alter table if exists current_user_courses
    add constraint FK84ird7r1wuhijlvhbffhwkrw3 foreign key (course_id) references courses;
alter table if exists current_user_courses
    add constraint FKosqqgrup8iop4d3xtbacdr87r foreign key (user_id) references users;
alter table if exists favorites
    add constraint FK3dumejmn8lkhnlrcvky8x5qq2 foreign key (article_id) references users;
alter table if exists histories
    add constraint FKac33aupjexx06h4vgtphb989o foreign key (lecture_id) references lectures;
alter table if exists histories
    add constraint FK8w9eva74w7t7xtf2opb33f8bq foreign key (user_id) references users;
alter table if exists homeworks
    add constraint FKsu2t9ij660j01y1atx16d1okx foreign key (lecture_id) references lectures;
alter table if exists lecture_comments
    add constraint FKaasdgbqa6njaw47o2x6xohiho foreign key (user_id) references users;
alter table if exists lecture_comments
    add constraint FKiekvglp3glcxt5xsbip7julm9 foreign key (lecture_id) references lectures;
alter table if exists lecture_reactions
    add constraint FK3q4ijg32js4y557yhl7aoitw9 foreign key (user_id) references users;
alter table if exists lecture_reactions
    add constraint FKvlipk3spr1c14n6mwubaon5k foreign key (lecture_id) references lectures;
alter table if exists lecture_tag
    add constraint FKaprglh5r49a4gt36iv2c66kfd foreign key (lecture_id) references lectures;
alter table if exists lecture_tag
    add constraint FKtfple3s8uj8rjdd330tl2c5tk foreign key (tag_id) references tags;
alter table if exists lectures
    add constraint FKsj4m8ipr4qnehoyxk7kbu3ide foreign key (course_id) references courses;
alter table if exists lectures
    add constraint FKg7x5mrc5fbq2yx6w3dkyeh2t3 foreign key (homework_id) references homeworks;
alter table if exists notifications
    add constraint FKgr65rstq93yakw9b4l26byhwh foreign key (user_id) references users;
alter table if exists students
    add constraint FK410q61iev7klncmpqfuo85ivh foreign key (user_id) references users;
alter table if exists subscriptions
    add constraint FKhro52ohfqfbay9774bev0qinr foreign key (user_id) references users;
alter table if exists user_achievement
    add constraint FK5hq4ms9ikrxw18tf1wn12anj6 foreign key (user_id) references users;
alter table if exists user_achievement
    add constraint FK7bd14tr3dioj2a091h7ke455b foreign key (achievement_id) references achievements;
alter table if exists user_tag
    add constraint FK30wgo8txt0c0v8nxnwmxmrce6 foreign key (user_id) references users;
alter table if exists user_tag
    add constraint FKd4x1epa5r77ouvbahqth1vrgh foreign key (tag_id) references tags;
alter table if exists users
    add constraint FKp56c1712k691lhsyewcssf40f foreign key (role_id) references roles;
