insert into roles (id, created_at, updated_at, name)
values ('9467cfe9-63db-4f56-a553-a8fa000217fe', '2020-08-05 08:32:07.068000', '2020-08-05 08:32:07.068000', 'AUTHOR');
insert into public.roles (id, created_at, updated_at, name)
values ('76a8e72c-ed25-4b21-8514-a3a09b647c02', '2020-08-05 08:32:07.075000', '2020-08-05 08:32:07.075000', 'USER');

insert into users (id, created_at, updated_at, email, nickname, password, role_id)
values ('c4513edc-5901-485a-868d-38f83941c15e', '2020-08-05 08:32:07.673000', '2020-08-05 08:32:07.673000',
        'demo@mail.com', 'Demo', '$2a$10$huIMTBvIj6priovdUyFqeeUvG.nhBWD25WTnrVsvjLz1zPvQJyLdm',
        '9467cfe9-63db-4f56-a553-a8fa000217fe');
insert into users (id, created_at, updated_at, email, nickname, password, role_id)
values ('eaea544b-8383-49ee-90c6-2a169e5c560a', '2020-08-05 08:32:07.675000', '2020-08-05 08:32:07.675000',
        'clarkkent@mail.com', 'ClarkKent', '$2a$10$gjURInoka1rfmyGHSCEGZ.qZhYf/GwBzXU5nGsha8uQioD6CCsdgm',
        '76a8e72c-ed25-4b21-8514-a3a09b647c02');
insert into users (id, created_at, updated_at, email, nickname, password, role_id)
values ('9aaf962a-831e-4b49-8c03-e820cee71b41', '2020-08-05 08:32:07.675000', '2020-08-05 08:32:07.675000',
        'johndoe@mail.com', 'JohnDoe', '$2a$10$og1BsnhMUPkeGRpC1UEqIuDWdctOUfJOEBn9coOEqaDX5FK96oUR6',
        '9467cfe9-63db-4f56-a553-a8fa000217fe');
insert into users (id, created_at, updated_at, email, nickname, password, role_id)
values ('d1d9eb03-f80a-4f9b-9e84-202e7d88a7b9', '2020-08-05 08:32:07.676000', '2020-08-05 08:32:07.676000',
        'andrewcunanan@mail.com', 'AndrewCunanan', '$2a$10$NkbI7M8cBWvvhbuhtfAIoOJc78cpcyR1SK1eQ1jeD.YiAgREClhUq',
        '9467cfe9-63db-4f56-a553-a8fa000217fe');
insert into users (id, created_at, updated_at, email, nickname, password, role_id)
values ('f5f987b5-eaee-4709-93f4-94ac585cb812', '2020-08-05 08:32:07.676000', '2020-08-05 08:32:07.676000',
        'haroldauthor@mail.com', 'HaroldFirst', '$2a$10$zrMA/pfxGatFi110YrzuQOZ.SGsxlcI/b/f6gzSjNxyrIeH03MQZe',
        '76a8e72c-ed25-4b21-8514-a3a09b647c02');

insert into students (id, created_at, updated_at, first_name, last_name, total_content_watched, user_id)
values ('aae317d2-4306-4412-9583-51c49e6f09e4', '2020-08-05 08:32:07.701000', '2020-08-05 08:32:07.701000', 'Andrew',
        'Singleton', 20, 'c4513edc-5901-485a-868d-38f83941c15e');
insert into students (id, created_at, updated_at, first_name, last_name, total_content_watched, user_id)
values ('2fced078-c3a5-4c01-826e-a4183056b19f', '2020-08-05 08:32:07.703000', '2020-08-05 08:32:07.703000', 'John',
        'Doe', 73, 'eaea544b-8383-49ee-90c6-2a169e5c560a');
insert into students (id, created_at, updated_at, first_name, last_name, total_content_watched, user_id)
values ('8fa76b23-4d52-4456-8c19-556f58093290', '2020-08-05 08:32:07.704000', '2020-08-05 08:32:07.704000', 'Andrew',
        'Hamilton', 46, '9aaf962a-831e-4b49-8c03-e820cee71b41');
insert into students (id, created_at, updated_at, first_name, last_name, total_content_watched, user_id)
values ('be907411-379f-4448-95c7-6d28fb61d303', '2020-08-05 08:32:07.704000', '2020-08-05 08:32:07.704000', 'Harold',
        'First', 62, 'd1d9eb03-f80a-4f9b-9e84-202e7d88a7b9');
insert into students (id, created_at, updated_at, first_name, last_name, total_content_watched, user_id)
values ('bd42bb6a-d944-4244-9ee4-7b74c05c401f', '2020-08-05 08:32:07.705000', '2020-08-05 08:32:07.705000', 'John',
        'Cunanan', 88, 'f5f987b5-eaee-4709-93f4-94ac585cb812');

insert into schools (id, created_at, updated_at, description, logo, name)
values ('6208adf4-dc87-4aef-a761-66d622dc2048', '2020-08-05 08:32:07.708000', '2020-08-05 08:32:07.708000',
        'Over the course of two and a half months, we transform novice developers into true engineers, ' ||
        'who are capable of building world-class software.',
        'http://logok.org/wp-content/uploads/2014/05/Total-logo-earth-1024x768.png', 'Binary Studio School');

insert into authors (id, created_at, updated_at, name, school_id, user_id)
values ('ef7ece86-445f-4ad1-b0b1-901c74fc0591', '2020-08-05 08:32:07.749000', '2020-08-05 08:32:07.749000', 'ClarkKent',
        '6208adf4-dc87-4aef-a761-66d622dc2048', 'eaea544b-8383-49ee-90c6-2a169e5c560a');
insert into authors (id, created_at, updated_at, name, school_id, user_id)
values ('bb0ae90c-6030-4635-8eb0-fe40ff7345ce', '2020-08-05 08:32:07.751000', '2020-08-05 08:32:07.751000',
        'HaroldFirst', '6208adf4-dc87-4aef-a761-66d622dc2048', 'f5f987b5-eaee-4709-93f4-94ac585cb812');

insert into articles (id, created_at, updated_at, name, text, author_id)
values ('69b2ac56-3d3e-42d5-8894-472a4c04cdd8', '2020-08-05 08:32:07.774000', '2020-08-05 08:32:07.774000',
        'There should be a title here 1', 'quia et suscipit
        suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
        'ef7ece86-445f-4ad1-b0b1-901c74fc0591');
insert into articles (id, created_at, updated_at, name, text, author_id)
values ('76c07395-6039-4d16-b2ec-e5093653a3e8', '2020-08-05 08:32:07.775000', '2020-08-05 08:32:07.775000',
        'There should be a title here 1', 'est rerum tempore vitae
        sequi sint nihil reprehenderit dolor beatae ea dolores neque
        fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis
        qui aperiam non debitis possimus qui neque nisi nulla', 'bb0ae90c-6030-4635-8eb0-fe40ff7345ce');
insert into articles (id, created_at, updated_at, name, text, author_id)
values ('6616b4fe-f25c-4ddc-804e-cb6cd5263b2b', '2020-08-05 08:32:07.776000', '2020-08-05 08:32:07.776000',
        'There should be a title here 0', 'et iusto sed quo iure
        voluptatem occaecati omnis eligendi aut ad
        voluptatem doloribus vel accusantium quis pariatur
        molestiae porro eius odio et labore et velit aut', 'ef7ece86-445f-4ad1-b0b1-901c74fc0591');
insert into articles (id, created_at, updated_at, name, text, author_id)
values ('ab382c0a-400a-41fa-95c3-4cc582e03fb7', '2020-08-05 08:32:07.776000', '2020-08-05 08:32:07.776000',
        'There should be a title here 1', 'ullam et saepe reiciendis voluptatem adipisci
        sit amet autem assumenda provident rerum culpa
        quis hic commodi nesciunt rem tenetur doloremque ipsam iure
        quis sunt voluptatem rerum illo velit', 'bb0ae90c-6030-4635-8eb0-fe40ff7345ce');
insert into articles (id, created_at, updated_at, name, text, author_id)
values ('79d29cff-4207-4f4c-94c7-f884b5b711ce', '2020-08-05 08:32:07.777000', '2020-08-05 08:32:07.777000',
        'There should be a title here 1', 'repudiandae veniam quaerat sunt sed
        alias aut fugiat sit autem sed est
        voluptatem omnis possimus esse voluptatibus quis
        est aut tenetur dolor neque', 'ef7ece86-445f-4ad1-b0b1-901c74fc0591');
insert into articles (id, created_at, updated_at, name, text, author_id)
values ('58900a57-31a1-4a61-9366-5ca8269f1a50', '2020-08-05 08:32:07.777000', '2020-08-05 08:32:07.777000',
        'There should be a title here 0', 'ut aspernatur corporis harum nihil quis provident sequi
        mollitia nobis aliquid molestiae
        perspiciatis et ea nemo ab reprehenderit accusantium quas
        voluptate dolores velit et doloremque molestiae', 'bb0ae90c-6030-4635-8eb0-fe40ff7345ce');
insert into articles (id, created_at, updated_at, name, text, author_id)
values ('1b67f305-33f9-4d59-934c-9c85d95c1141', '2020-08-05 08:32:07.778000', '2020-08-05 08:32:07.778000',
        'There should be a title here 0', 'dolore placeat quibusdam ea quo vitae
        magni quis enim qui quis quo nemo aut saepe
        quidem repellat excepturi ut quia
        sunt ut sequi eos ea sed quas', 'ef7ece86-445f-4ad1-b0b1-901c74fc0591');
insert into articles (id, created_at, updated_at, name, text, author_id)
values ('639a639a-76e5-48aa-ab4b-1ffb06d3e03e', '2020-08-05 08:32:07.778000', '2020-08-05 08:32:07.778000',
        'There should be a title here 0', 'dignissimos aperiam dolorem qui eum
        facilis quibusdam animi sint suscipit qui sint possimus cum
        quaerat magni maiores excepturi
        ipsam ut commodi dolor voluptatum modi aut vitae', 'bb0ae90c-6030-4635-8eb0-fe40ff7345ce');
insert into articles (id, created_at, updated_at, name, text, author_id)
values ('8496b967-47e9-4411-99d0-3f55c32cc543', '2020-08-05 08:32:07.779000', '2020-08-05 08:32:07.779000',
        'There should be a title here 1', 'consectetur animi nesciunt iure dolore
        enim quia ad
        veniam autem ut quam aut nobis
        et est aut quod aut provident voluptas autem voluptas', 'ef7ece86-445f-4ad1-b0b1-901c74fc0591');
insert into articles (id, created_at, updated_at, name, text, author_id)
values ('13cac0a2-4394-43b3-a8b4-8711cf91c716', '2020-08-05 08:32:07.779000', '2020-08-05 08:32:07.779000',
        'There should be a title here 0', 'quo et expedita modi cum officia vel magni
        doloribus qui repudiandae
        vero nisi sit
        quos veniam quod sed accusamus veritatis error', 'ef7ece86-445f-4ad1-b0b1-901c74fc0591');

insert into paths (id, created_at, updated_at, name)
values ('ed214a7a-a07b-4f99-9b5e-300056efaba7', '2020-08-05 08:32:07.782000', '2020-08-05 08:32:07.782000',
        'JS Developer');
insert into paths (id, created_at, updated_at, name)
values ('7b3208ba-e9bd-4b71-a763-72bf719c7c9b', '2020-08-05 08:32:07.784000', '2020-08-05 08:32:07.784000',
        'Java Developer');

insert into courses (id, created_at, updated_at, level, name, released_date, author_id)
values ('50d545a1-8b29-42bf-b447-5c36728f77a8', '2020-08-05 08:32:07.793000', '2020-08-05 08:32:07.793000', 1,
        'JavaScript Essential', '2020-08-05 08:32:07.791000', 'ef7ece86-445f-4ad1-b0b1-901c74fc0591');
insert into courses (id, created_at, updated_at, level, name, released_date, author_id)
values ('f57dc74d-a8ef-4f49-b266-e6fec420f928', '2020-08-05 08:32:07.795000', '2020-08-05 08:32:07.795000', 1,
        'Java Essential', '2020-08-05 08:32:07.791000', 'bb0ae90c-6030-4635-8eb0-fe40ff7345ce');
insert into courses (id, created_at, updated_at, level, name, released_date, author_id)
values ('0b47cb8e-f458-4390-8d0e-65daef09a780', '2020-08-05 08:32:07.796000', '2020-08-05 08:32:07.796000', 4,
        'Java Advanced', '2020-08-05 08:32:07.791000', 'ef7ece86-445f-4ad1-b0b1-901c74fc0591');

insert into course_path (course_id, path_id)
values ('50d545a1-8b29-42bf-b447-5c36728f77a8', 'ed214a7a-a07b-4f99-9b5e-300056efaba7');
insert into course_path (course_id, path_id)
values ('f57dc74d-a8ef-4f49-b266-e6fec420f928', '7b3208ba-e9bd-4b71-a763-72bf719c7c9b');
insert into course_path (course_id, path_id)
values ('0b47cb8e-f458-4390-8d0e-65daef09a780', 'ed214a7a-a07b-4f99-9b5e-300056efaba7');
insert into course_path (course_id, path_id)
values ('0b47cb8e-f458-4390-8d0e-65daef09a780', '7b3208ba-e9bd-4b71-a763-72bf719c7c9b');

insert into lectures (id, created_at, updated_at, description, duration, source_url, course_id)
values ('31b2d2bc-7fb4-4a45-9fc4-c73279d04dec', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000',
        'est rerum tempore vitae
        sequi sint nihil reprehenderit dolor beatae ea dolores neque
        fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis
        qui aperiam non debitis possimus qui neque nisi nulla',
        34, 'https://www.youtube.com/watch?v=gPUX1oRtxPM',
        'f57dc74d-a8ef-4f49-b266-e6fec420f928');

insert into homeworks (id, created_at, updated_at, description, lecture_id)
values ('d5e8447a-8855-42de-a766-54897a6ecac8', '2020-08-05 08:32:07.820000', '2020-08-05 08:32:07.820000',
        'ut aspernatur corporis harum nihil quis provident sequi
        mollitia nobis aliquid molestiae
        perspiciatis et ea nemo ab reprehenderit accusantium quas
        voluptate dolores velit et doloremque molestiae', '31b2d2bc-7fb4-4a45-9fc4-c73279d04dec');

insert into lectures (id, created_at, updated_at, description, duration, source_url, course_id)
values ('5208962f-9ece-4f92-9dad-1cad7bf185bf', '2020-08-05 08:32:07.823000', '2020-08-05 08:32:07.823000',
        'dolore placeat quibusdam ea quo vitae
        magni quis enim qui quis quo nemo aut saepe
        quidem repellat excepturi ut quia
        sunt ut sequi eos ea sed quas',
        43, 'https://www.youtube.com/watch?v=gPUX1oRtxPM',
        '50d545a1-8b29-42bf-b447-5c36728f77a8');

insert into homeworks (id, created_at, updated_at, description, lecture_id)
values ('a1582aca-ba93-4f81-878f-043098975525', '2020-08-05 08:32:07.823000', '2020-08-05 08:32:07.839000',
        'dolore placeat quibusdam ea quo vitae
        magni quis enim qui quis quo nemo aut saepe
        quidem repellat excepturi ut quia
        sunt ut sequi eos ea sed quas', '5208962f-9ece-4f92-9dad-1cad7bf185bf');

update lectures set homework_id = 'd5e8447a-8855-42de-a766-54897a6ecac8' where id = '31b2d2bc-7fb4-4a45-9fc4-c73279d04dec';
update lectures set homework_id = 'a1582aca-ba93-4f81-878f-043098975525' where id = '5208962f-9ece-4f92-9dad-1cad7bf185bf';

insert into current_user_courses (id, created_at, updated_at, course_id, user_id)
values ('6d70827d-89fb-45b5-ad49-1b4a7d4bc3ba', '2020-08-05 08:32:07.851000', '2020-08-05 08:32:07.851000',
        '0b47cb8e-f458-4390-8d0e-65daef09a780', 'eaea544b-8383-49ee-90c6-2a169e5c560a');
insert into current_user_courses (id, created_at, updated_at, course_id, user_id)
values ('4dfa0a55-3c4c-4b2d-bcb0-2de03733c4ea', '2020-08-05 08:32:07.853000', '2020-08-05 08:32:07.853000',
        'f57dc74d-a8ef-4f49-b266-e6fec420f928', 'eaea544b-8383-49ee-90c6-2a169e5c560a');
insert into current_user_courses (id, created_at, updated_at, course_id, user_id)
values ('794e20b6-f72d-4048-a38a-6afea0172354', '2020-08-05 08:32:07.853000', '2020-08-05 08:32:07.853000',
        '50d545a1-8b29-42bf-b447-5c36728f77a8', 'f5f987b5-eaee-4709-93f4-94ac585cb812');
insert into current_user_courses (id, created_at, updated_at, course_id, user_id)
values ('bcaadcc4-33f5-4fa5-8970-bd92affe6638', '2020-08-05 08:32:07.854000', '2020-08-05 08:32:07.854000',
        '50d545a1-8b29-42bf-b447-5c36728f77a8', 'f5f987b5-eaee-4709-93f4-94ac585cb812');
insert into current_user_courses (id, created_at, updated_at, course_id, user_id)
values ('523db44c-7e3f-4aec-ab5b-7a47b9ff2e5f', '2020-08-05 08:32:07.855000', '2020-08-05 08:32:07.855000',
        '0b47cb8e-f458-4390-8d0e-65daef09a780', 'eaea544b-8383-49ee-90c6-2a169e5c560a');
insert into current_user_courses (id, created_at, updated_at, course_id, user_id)
values ('56e87ded-1f29-4e0a-9b79-af25ea503696', '2020-08-05 08:32:07.855000', '2020-08-05 08:32:07.855000',
        'f57dc74d-a8ef-4f49-b266-e6fec420f928', 'eaea544b-8383-49ee-90c6-2a169e5c560a');

insert into article_comments (id, created_at, updated_at, text, user_id, article_id)
values ('cce32998-ff9d-4ba9-a99d-c64154f135a4', '2020-08-05 08:32:07.873000', '2020-08-05 08:32:07.873000',
        'laudantium enim quasi est quidem magnam voluptate ipsam eos
        tempora quo necessitatibus
        dolor quam autem quasi
        reiciendis et nam sapiente accusantium', 'd1d9eb03-f80a-4f9b-9e84-202e7d88a7b9',
        '639a639a-76e5-48aa-ab4b-1ffb06d3e03e');
insert into article_comments (id, created_at, updated_at, text, user_id, article_id)
values ('e7c2f129-3514-4428-b9da-d8f813097d13', '2020-08-05 08:32:07.875000', '2020-08-05 08:32:07.875000',
        'est natus enim nihil est dolore omnis voluptatem numquam
    et omnis occaecati quod ullam at
    voluptatem error expedita pariatur
    nihil sint nostrum voluptatem reiciendis et', '9aaf962a-831e-4b49-8c03-e820cee71b41',
        '13cac0a2-4394-43b3-a8b4-8711cf91c716');
insert into article_comments (id, created_at, updated_at, text, user_id, article_id)
values ('75dd51ef-bc0f-40de-b6f5-f932c7a2950b', '2020-08-05 08:32:07.875000', '2020-08-05 08:32:07.875000',
        'quia molestiae reprehenderit quasi aspernatur
        aut expedita occaecati aliquam eveniet laudantium
        omnis quibusdam delectus saepe quia accusamus maiores nam est
        cum et ducimus et vero voluptates excepturi deleniti ratione', '9aaf962a-831e-4b49-8c03-e820cee71b41',
        '639a639a-76e5-48aa-ab4b-1ffb06d3e03e');
insert into article_comments (id, created_at, updated_at, text, user_id, article_id)
values ('09b200c8-6f05-4dea-ae2c-002957806e75', '2020-08-05 08:32:07.876000', '2020-08-05 08:32:07.876000',
        'non et atque
        occaecati deserunt quas accusantium unde odit nobis qui voluptatem
        quia voluptas consequuntur itaque dolor
        et qui rerum deleniti ut occaecati', 'f5f987b5-eaee-4709-93f4-94ac585cb812',
        '13cac0a2-4394-43b3-a8b4-8711cf91c716');
insert into article_comments (id, created_at, updated_at, text, user_id, article_id)
values ('ab081ffc-1582-43f7-8a7a-9413565628cd', '2020-08-05 08:32:07.877000', '2020-08-05 08:32:07.877000',
        'harum non quasi et ratione
        tempore iure ex voluptates in ratione
        harum architecto fugit inventore cupiditate
        voluptates magni quo et', 'c4513edc-5901-485a-868d-38f83941c15e', 'ab382c0a-400a-41fa-95c3-4cc582e03fb7');
insert into article_comments (id, created_at, updated_at, text, user_id, article_id)
values ('e0230bbf-1dde-42ff-8988-b976c9f7defe', '2020-08-05 08:32:07.877000', '2020-08-05 08:32:07.877000',
        'doloribus at sed quis culpa deserunt consectetur qui praesentium
        accusamus fugiat dicta
        voluptatem rerum ut voluptate autem
        voluptatem repellendus aspernatur dolorem in', 'c4513edc-5901-485a-868d-38f83941c15e',
        '1b67f305-33f9-4d59-934c-9c85d95c1141');
insert into article_comments (id, created_at, updated_at, text, user_id, article_id)
values ('d94324fb-a2fc-4774-8752-90f36b4daa4d', '2020-08-05 08:32:07.878000', '2020-08-05 08:32:07.878000',
        'maiores sed dolores similique labore et inventore et
        quasi temporibus esse sunt id et
        eos voluptatem aliquam
        aliquid ratione corporis molestiae mollitia quia et magnam dolor', '9aaf962a-831e-4b49-8c03-e820cee71b41',
        '639a639a-76e5-48aa-ab4b-1ffb06d3e03e');
insert into article_comments (id, created_at, updated_at, text, user_id, article_id)
values ('f4e49724-e92d-4f68-a3a5-e36536b90fb3', '2020-08-05 08:32:07.879000', '2020-08-05 08:32:07.879000',
        'ut voluptatem corrupti velit
        ad voluptatem maiores
        et nisi velit vero accusamus maiores
        voluptates quia aliquid ullam eaque', '9aaf962a-831e-4b49-8c03-e820cee71b41',
        '69b2ac56-3d3e-42d5-8894-472a4c04cdd8');
insert into article_comments (id, created_at, updated_at, text, user_id, article_id)
values ('d87441d0-9357-4417-8122-80ac1d5c514a', '2020-08-05 08:32:07.879000', '2020-08-05 08:32:07.879000',
        'sapiente assumenda molestiae atque
        adipisci laborum distinctio aperiam et ab ut omnis
        et occaecati aspernatur odit sit rem expedita
        quas enim ipsam minus', 'eaea544b-8383-49ee-90c6-2a169e5c560a', '58900a57-31a1-4a61-9366-5ca8269f1a50');
insert into article_comments (id, created_at, updated_at, text, user_id, article_id)
values ('6256c59e-c54c-4f0d-835e-817dd80baf52', '2020-08-05 08:32:07.880000', '2020-08-05 08:32:07.880000',
        'voluptate iusto quis nobis reprehenderit ipsum amet nulla
        quia quas dolores velit et non
        aut quia necessitatibus
        nostrum quaerat nulla et accusamus nisi facilis', '9aaf962a-831e-4b49-8c03-e820cee71b41',
        '58900a57-31a1-4a61-9366-5ca8269f1a50');

insert into course_comments (id, created_at, updated_at, text, user_id, course_id)
values ('2308daed-767f-413a-a350-bfa63c4014b3', '2020-08-05 08:32:07.906000', '2020-08-05 08:32:07.906000',
        'laudantium enim quasi est quidem magnam voluptate ipsam eos
        tempora quo necessitatibus
        dolor quam autem quasi
        reiciendis et nam sapiente accusantium', 'd1d9eb03-f80a-4f9b-9e84-202e7d88a7b9',
        'f57dc74d-a8ef-4f49-b266-e6fec420f928');
insert into course_comments (id, created_at, updated_at, text, user_id, course_id)
values ('6087db9a-9e5c-4337-9930-17698d150aea', '2020-08-05 08:32:07.907000', '2020-08-05 08:32:07.907000',
        'est natus enim nihil est dolore omnis voluptatem numquam
        et omnis occaecati quod ullam at
        voluptatem error expedita pariatur
        nihil sint nostrum voluptatem reiciendis et', 'c4513edc-5901-485a-868d-38f83941c15e',
        'f57dc74d-a8ef-4f49-b266-e6fec420f928');
insert into course_comments (id, created_at, updated_at, text, user_id, course_id)
values ('25037abd-d050-47b2-9d4c-80d8cb18867a', '2020-08-05 08:32:07.908000', '2020-08-05 08:32:07.908000',
        'quia molestiae reprehenderit quasi aspernatur
        aut expedita occaecati aliquam eveniet laudantium
        omnis quibusdam delectus saepe quia accusamus maiores nam est
        cum et ducimus et vero voluptates excepturi deleniti ratione', 'eaea544b-8383-49ee-90c6-2a169e5c560a',
        'f57dc74d-a8ef-4f49-b266-e6fec420f928');
insert into course_comments (id, created_at, updated_at, text, user_id, course_id)
values ('91bcf5f0-65c8-4b77-a48c-586aa193980a', '2020-08-05 08:32:07.909000', '2020-08-05 08:32:07.909000',
        'non et atque
        occaecati deserunt quas accusantium unde odit nobis qui voluptatem
        quia voluptas consequuntur itaque dolor
        et qui rerum deleniti ut occaecati', 'f5f987b5-eaee-4709-93f4-94ac585cb812',
        '0b47cb8e-f458-4390-8d0e-65daef09a780');
insert into course_comments (id, created_at, updated_at, text, user_id, course_id)
values ('e4a8e352-decf-4ed0-b50e-a772887d745c', '2020-08-05 08:32:07.909000', '2020-08-05 08:32:07.909000',
        'harum non quasi et ratione
        tempore iure ex voluptates in ratione
        harum architecto fugit inventore cupiditate
        voluptates magni quo et', 'f5f987b5-eaee-4709-93f4-94ac585cb812', '0b47cb8e-f458-4390-8d0e-65daef09a780');
insert into course_comments (id, created_at, updated_at, text, user_id, course_id)
values ('c9cb713d-1d49-4293-9501-add00b9fa967', '2020-08-05 08:32:07.910000', '2020-08-05 08:32:07.910000',
        'doloribus at sed quis culpa deserunt consectetur qui praesentium
        accusamus fugiat dicta
        voluptatem rerum ut voluptate autem
        voluptatem repellendus aspernatur dolorem in', 'c4513edc-5901-485a-868d-38f83941c15e',
        '50d545a1-8b29-42bf-b447-5c36728f77a8');
insert into course_comments (id, created_at, updated_at, text, user_id, course_id)
values ('317bcb8e-edcc-40d6-8734-9c79d4948c4a', '2020-08-05 08:32:07.911000', '2020-08-05 08:32:07.911000',
        'maiores sed dolores similique labore et inventore et
        quasi temporibus esse sunt id et
        eos voluptatem aliquam
        aliquid ratione corporis molestiae mollitia quia et magnam dolor', 'c4513edc-5901-485a-868d-38f83941c15e',
        '50d545a1-8b29-42bf-b447-5c36728f77a8');
insert into course_comments (id, created_at, updated_at, text, user_id, course_id)
values ('9256c0ab-fa20-4064-817e-910121562fa9', '2020-08-05 08:32:07.911000', '2020-08-05 08:32:07.911000',
        'ut voluptatem corrupti velit
        ad voluptatem maiores
        et nisi velit vero accusamus maiores
        voluptates quia aliquid ullam eaque', '9aaf962a-831e-4b49-8c03-e820cee71b41',
        'f57dc74d-a8ef-4f49-b266-e6fec420f928');
insert into course_comments (id, created_at, updated_at, text, user_id, course_id)
values ('f8c8a35d-02d6-4f00-9597-0cc7255db3f8', '2020-08-05 08:32:07.912000', '2020-08-05 08:32:07.912000',
        'sapiente assumenda molestiae atque
        adipisci laborum distinctio aperiam et ab ut omnis
        et occaecati aspernatur odit sit rem expedita
        quas enim ipsam minus', 'c4513edc-5901-485a-868d-38f83941c15e', '0b47cb8e-f458-4390-8d0e-65daef09a780');
insert into course_comments (id, created_at, updated_at, text, user_id, course_id)
values ('c2744fa8-a159-4faa-9cf9-ea630ec2292f', '2020-08-05 08:32:07.912000', '2020-08-05 08:32:07.912000',
        'voluptate iusto quis nobis reprehenderit ipsum amet nulla
        quia quas dolores velit et non
        aut quia necessitatibus
        nostrum quaerat nulla et accusamus nisi facilis', 'eaea544b-8383-49ee-90c6-2a169e5c560a',
        '50d545a1-8b29-42bf-b447-5c36728f77a8');

insert into lecture_comments (id, created_at, updated_at, text, user_id, lecture_id)
values ('40e83e23-2a6d-43b1-a383-351a917e2cae', '2020-08-05 08:32:07.934000', '2020-08-05 08:32:07.934000',
        'laudantium enim quasi est quidem magnam voluptate ipsam eos
        tempora quo necessitatibus
        dolor quam autem quasi
        reiciendis et nam sapiente accusantium', '9aaf962a-831e-4b49-8c03-e820cee71b41',
        '5208962f-9ece-4f92-9dad-1cad7bf185bf');
insert into lecture_comments (id, created_at, updated_at, text, user_id, lecture_id)
values ('5bd7c08c-27b5-434e-b145-19e9edc79157', '2020-08-05 08:32:07.936000', '2020-08-05 08:32:07.936000',
        'est natus enim nihil est dolore omnis voluptatem numquam
        et omnis occaecati quod ullam at
        voluptatem error expedita pariatur
        nihil sint nostrum voluptatem reiciendis et', 'd1d9eb03-f80a-4f9b-9e84-202e7d88a7b9',
        '31b2d2bc-7fb4-4a45-9fc4-c73279d04dec');
insert into lecture_comments (id, created_at, updated_at, text, user_id, lecture_id)
values ('395c1805-8c17-492c-8c43-5731a435f8df', '2020-08-05 08:32:07.937000', '2020-08-05 08:32:07.937000',
        'quia molestiae reprehenderit quasi aspernatur
        aut expedita occaecati aliquam eveniet laudantium
        omnis quibusdam delectus saepe quia accusamus maiores nam est
        cum et ducimus et vero voluptates excepturi deleniti ratione', '9aaf962a-831e-4b49-8c03-e820cee71b41',
        '31b2d2bc-7fb4-4a45-9fc4-c73279d04dec');
insert into lecture_comments (id, created_at, updated_at, text, user_id, lecture_id)
values ('48380112-7727-4f7d-a030-0a83a223154e', '2020-08-05 08:32:07.937000', '2020-08-05 08:32:07.937000',
        'non et atque
        occaecati deserunt quas accusantium unde odit nobis qui voluptatem
        quia voluptas consequuntur itaque dolor
        et qui rerum deleniti ut occaecati', 'c4513edc-5901-485a-868d-38f83941c15e',
        '31b2d2bc-7fb4-4a45-9fc4-c73279d04dec');
insert into lecture_comments (id, created_at, updated_at, text, user_id, lecture_id)
values ('d0d3ad77-8a8b-4855-9c3d-8776a068f6e5', '2020-08-05 08:32:07.938000', '2020-08-05 08:32:07.938000',
        'harum non quasi et ratione
        tempore iure ex voluptates in ratione
        harum architecto fugit inventore cupiditate
        voluptates magni quo et', '9aaf962a-831e-4b49-8c03-e820cee71b41', '5208962f-9ece-4f92-9dad-1cad7bf185bf');
insert into lecture_comments (id, created_at, updated_at, text, user_id, lecture_id)
values ('2c89b455-671e-4ce8-ac31-de372bbcd728', '2020-08-05 08:32:07.938000', '2020-08-05 08:32:07.938000',
        'doloribus at sed quis culpa deserunt consectetur qui praesentium
        accusamus fugiat dicta
        voluptatem rerum ut voluptate autem
        voluptatem repellendus aspernatur dolorem in', '9aaf962a-831e-4b49-8c03-e820cee71b41',
        '31b2d2bc-7fb4-4a45-9fc4-c73279d04dec');
insert into lecture_comments (id, created_at, updated_at, text, user_id, lecture_id)
values ('76e536ee-f2fd-4b8b-9c71-7a411635cda2', '2020-08-05 08:32:07.939000', '2020-08-05 08:32:07.939000',
        'maiores sed dolores similique labore et inventore et
        quasi temporibus esse sunt id et
        eos voluptatem aliquam
        aliquid ratione corporis molestiae mollitia quia et magnam dolor', 'f5f987b5-eaee-4709-93f4-94ac585cb812',
        '5208962f-9ece-4f92-9dad-1cad7bf185bf');
insert into lecture_comments (id, created_at, updated_at, text, user_id, lecture_id)
values ('047c58c2-5d84-4d28-8c26-3be10aed0c07', '2020-08-05 08:32:07.939000', '2020-08-05 08:32:07.939000',
        'ut voluptatem corrupti velit
        ad voluptatem maiores
        et nisi velit vero accusamus maiores
        voluptates quia aliquid ullam eaque', 'c4513edc-5901-485a-868d-38f83941c15e',
        '31b2d2bc-7fb4-4a45-9fc4-c73279d04dec');
insert into lecture_comments (id, created_at, updated_at, text, user_id, lecture_id)
values ('db3d1566-a485-457e-a947-3cb0dcd0ca0f', '2020-08-05 08:32:07.940000', '2020-08-05 08:32:07.940000',
        'sapiente assumenda molestiae atque
        adipisci laborum distinctio aperiam et ab ut omnis
        et occaecati aspernatur odit sit rem expedita
        quas enim ipsam minus', 'eaea544b-8383-49ee-90c6-2a169e5c560a', '5208962f-9ece-4f92-9dad-1cad7bf185bf');
insert into lecture_comments (id, created_at, updated_at, text, user_id, lecture_id)
values ('39894f5e-e7cc-441d-ab9a-2babad9e330b', '2020-08-05 08:32:07.940000', '2020-08-05 08:32:07.940000',
        'voluptate iusto quis nobis reprehenderit ipsum amet nulla
        quia quas dolores velit et non
        aut quia necessitatibus
        nostrum quaerat nulla et accusamus nisi facilis', '9aaf962a-831e-4b49-8c03-e820cee71b41',
        '5208962f-9ece-4f92-9dad-1cad7bf185bf');

insert into public.notifications (id, created_at, updated_at, link, source_id, source_type, text, user_id)
values ('2484a791-7558-49ce-928c-d4de8d2e2c3f', '2020-08-05 10:02:08.163000', '2020-08-05 10:02:08.163000',
        'https://academy.binary-studio.com/ua/', '31b2d2bc-7fb4-4a45-9fc4-c73279d04dec', 'LECTURE',
        'ullam et saepe reiciendis voluptatem adipisci', 'c4513edc-5901-485a-868d-38f83941c15e');
insert into public.notifications (id, created_at, updated_at, link, source_id, source_type, text, user_id)
values ('681a7d68-86dd-4c8c-a460-eb50d4685162', '2020-08-05 10:02:08.165000', '2020-08-05 10:02:08.165000',
        'https://academy.binary-studio.com/ua/', '31b2d2bc-7fb4-4a45-9fc4-c73279d04dec', 'LECTURE',
        'ullam et saepe reiciendis voluptatem adipisci', 'c4513edc-5901-485a-868d-38f83941c15e');
insert into public.notifications (id, created_at, updated_at, link, source_id, source_type, text, user_id)
values ('2a30ef93-762b-4759-9b14-0d7ffe7e82b7', '2020-08-05 10:02:08.166000', '2020-08-05 10:02:08.166000',
        'https://academy.binary-studio.com/ua/', '31b2d2bc-7fb4-4a45-9fc4-c73279d04dec', 'LECTURE',
        'ullam et saepe reiciendis voluptatem adipisci', '9aaf962a-831e-4b49-8c03-e820cee71b41');
insert into public.notifications (id, created_at, updated_at, link, source_id, source_type, text, user_id)
values ('737aa56a-8540-4bc2-b919-0219f393b7cf', '2020-08-05 10:02:08.166000', '2020-08-05 10:02:08.166000',
        'https://academy.binary-studio.com/ua/', '5208962f-9ece-4f92-9dad-1cad7bf185bf', 'LECTURE',
        'ullam et saepe reiciendis voluptatem adipisci', 'f5f987b5-eaee-4709-93f4-94ac585cb812');
insert into public.notifications (id, created_at, updated_at, link, source_id, source_type, text, user_id)
values ('a7daf2fd-e031-421c-b124-07939ac83161', '2020-08-05 10:02:08.167000', '2020-08-05 10:02:08.167000',
        'https://academy.binary-studio.com/ua/', '5208962f-9ece-4f92-9dad-1cad7bf185bf', 'LECTURE',
        'quia et suscipit suscipit recusandae consequuntur', 'f5f987b5-eaee-4709-93f4-94ac585cb812');

