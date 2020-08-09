alter table notifications
add column is_read boolean, add column source_name varchar(255);

update notifications
set is_read = false, source_name = 'Hi Hi';

insert into public.notifications (id, created_at, updated_at, link, source_id, source_type, text, user_id, is_read, source_name)
values ('a7daf2fd-e031-421c-b124-07939ac83162', '2020-08-02 10:02:08.167000', '2020-08-05 10:02:08.167000',
        'https://academy.binary-studio.com/ua/', '5208962f-9ece-4f92-9dad-1cad7bf185bf', 'LECTURE',
        'quia et suscipit suscipit recusandae consequuntur', 'f5f987b5-eaee-4709-93f4-94ac585cb812', 'true', 'User Userenko');

insert into public.notifications (id, created_at, updated_at, link, source_id, source_type, text, user_id, is_read, source_name)
values ('a7daf2fd-e031-421c-b124-07939ac83163', '2020-08-03 10:02:08.167000', '2020-08-05 10:02:08.167000',
        'https://academy.binary-studio.com/ua/', '5208962f-9ece-4f92-9dad-1cad7bf185bf', 'LECTURE',
        'quia et suscipit suscipit recusandae consequuntur', 'f5f987b5-eaee-4709-93f4-94ac585cb812', 'true', 'Aaa Aaaa');

insert into public.notifications (id, created_at, updated_at, link, source_id, source_type, text, user_id, is_read, source_name)
values ('a7daf2fd-e031-421c-b124-07939ac83164', '2020-08-04 10:02:08.167000', '2020-08-05 10:02:08.167000',
        'https://academy.binary-studio.com/ua/', '5208962f-9ece-4f92-9dad-1cad7bf185bf', 'LECTURE',
        'quia et suscipit suscipit recusandae consequuntur', 'f5f987b5-eaee-4709-93f4-94ac585cb812', 'true', 'Asaas asaas');

insert into public.notifications (id, created_at, updated_at, link, source_id, source_type, text, user_id, is_read, source_name)
values ('a7daf2fd-e031-421c-b124-07939ac83165', '2020-08-04 10:02:08.167000', '2020-08-05 10:02:08.167000',
        'https://academy.binary-studio.com/ua/', '5208962f-9ece-4f92-9dad-1cad7bf185bf', 'LECTURE',
        'quia et suscipit suscipit recusandae consequuntur', 'f5f987b5-eaee-4709-93f4-94ac585cb812', 'true', 'Ahahah ahaha');

insert into public.notifications (id, created_at, updated_at, link, source_id, source_type, text, user_id, is_read, source_name)
values ('a7daf2fd-e031-421c-b124-07939ac83166', '2020-08-04 10:02:08.167000', '2020-08-05 10:02:08.167000',
        'https://academy.binary-studio.com/ua/', '5208962f-9ece-4f92-9dad-1cad7bf185bf', 'LECTURE',
        'quia et suscipit suscipit recusandae consequuntur', 'f5f987b5-eaee-4709-93f4-94ac585cb812', 'true', 'Ololo ololo');

insert into public.notifications (id, created_at, updated_at, link, source_id, source_type, text, user_id, is_read, source_name)
values ('a7daf2fd-e031-421c-b124-07939ac83167', '2020-08-03 10:02:08.167000', '2020-08-05 10:02:08.167000',
        'https://academy.binary-studio.com/ua/', '5208962f-9ece-4f92-9dad-1cad7bf185bf', 'LECTURE',
        'quia et suscipit suscipit recusandae consequuntur', 'f5f987b5-eaee-4709-93f4-94ac585cb812', 'true', 'Ohoho hojoj');

insert into public.notifications (id, created_at, updated_at, link, source_id, source_type, text, user_id, is_read, source_name)
values ('a7daf2fd-e031-421c-b124-07939ac83168', '2020-07-02 10:02:08.167000', '2020-08-05 10:02:08.167000',
        'https://academy.binary-studio.com/ua/', '5208962f-9ece-4f92-9dad-1cad7bf185bf', 'LECTURE',
        'quia et suscipit suscipit recusandae consequuntur1111', 'f5f987b5-eaee-4709-93f4-94ac585cb812', 'false', 'Source name');

insert into public.notifications (id, created_at, updated_at, link, source_id, source_type, text, user_id, is_read, source_name)
values ('a7daf2fd-e031-421c-b124-07939ac83169', '2020-08-04 10:02:08.167000', '2020-08-05 10:02:08.167000',
        'https://academy.binary-studio.com/ua/', '5208962f-9ece-4f92-9dad-1cad7bf185bf', 'LECTURE',
        'quia et suscipit suscipit recusandae consequuntur', 'f5f987b5-eaee-4709-93f4-94ac585cb812', 'true', 'agaga gagag');

insert into public.notifications (id, created_at, updated_at, link, source_id, source_type, text, user_id, is_read, source_name)
values ('a7daf2fd-e031-421c-b124-07939ac83170', '2020-06-04 10:02:08.167000', '2020-08-05 10:02:08.167000',
        'https://academy.binary-studio.com/ua/', '5208962f-9ece-4f92-9dad-1cad7bf185bf', 'LECTURE',
        'quia et suscipit suscipit recusandae consequuntur', 'f5f987b5-eaee-4709-93f4-94ac585cb812', 'false', 'Ihihih ihihih');

insert into public.notifications (id, created_at, updated_at, link, source_id, source_type, text, user_id, is_read, source_name)
values ('a7daf2fd-e031-421c-b124-07939ac83171', '2020-08-04 10:02:08.167000', '2020-08-05 10:02:08.167000',
        'https://academy.binary-studio.com/ua/', '5208962f-9ece-4f92-9dad-1cad7bf185bf', 'LECTURE',
        'quia et suscipit suscipit recusandae consequuntur', 'f5f987b5-eaee-4709-93f4-94ac585cb812', 'true', 'Hi Hello');
