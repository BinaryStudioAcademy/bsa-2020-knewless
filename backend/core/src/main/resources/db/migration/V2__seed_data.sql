INSERT INTO public.roles (id, created_at, updated_at, name)
values ('9467cfe9-63db-4f56-a553-a8fa000217fe', '2020-08-05 08:32:07.068000', '2020-08-05 08:32:07.068000', 'AUTHOR'),
('76a8e72c-ed25-4b21-8514-a3a09b647c02', '2020-08-05 08:32:07.075000', '2020-08-05 08:32:07.075000', 'USER');

INSERT INTO public.tags (id, created_at, updated_at,name, source)
values ('0d48af6f-861e-4b1f-8d03-9fa993fbe9cf',	'2020-08-05 08:32:07.701',	'2020-08-05 08:32:07.701',	'Swift',	'https://i.imgur.com/430VVln.png'),
('2c511b0c-fc47-4801-99d5-525efc89708e',	'2020-08-05 08:32:07.701',	'2020-08-05 08:32:07.701',	'Angular',	'https://i.imgur.com/v69nP6w.png'),
('56dd3e0a-5e64-46a1-a40d-767278302e95',	'2020-08-05 08:32:07.701',	'2020-08-05 08:32:07.701',	'C++',	'https://i.imgur.com/NmipgdZ.png'),
('93c5f866-b51c-4ba7-a338-2ecefe1ccf97',	'2020-08-05 08:32:07.701',	'2020-08-05 08:32:07.701',	'PHP',	'https://i.imgur.com/qlPhduY.png'),
('e63bf7e9-86d4-46a8-9ab2-4b37a0d7dca5',	'2020-08-05 08:32:07.701',	'2020-08-05 08:32:07.701',	'C#',	'https://i.imgur.com/3xrlexh.png'),
('78c99383-418f-475d-8cd9-4d0ca0d73974',	'2020-08-05 08:32:07.701',	'2020-08-05 08:32:07.701',	'Kotlin',	'https://i.imgur.com/CvwjGEk.png'),
('e655f7d5-5cb1-4c12-9812-4a9d7ff2a0c4',	'2020-08-05 08:32:07.701',	'2020-08-05 08:32:07.701',	'Android',	'https://i.imgur.com/M6cKObL.png'),
('ae0e2869-9168-4176-bb30-a2bc52ebadcc',	'2020-08-05 08:32:07.701',	'2020-08-05 08:32:07.701',	'JavaScript',	'https://i.imgur.com/A9ZVHmk.png'),
('d63d743d-e982-412a-baf2-c555b2a38e66',	'2020-08-05 08:32:07.701',	'2020-08-05 08:32:07.701',	'Python',	'https://i.imgur.com/gQ5VLem.png'),
('140f2da3-e86f-440b-8b24-fd40440dca45',	'2020-08-05 08:32:07.701',	'2020-08-05 08:32:07.701',	'HTML',	'https://i.imgur.com/xLxjG0e.png'),
('549c51ec-6cf8-4b07-9dad-40229433fb31',	'2020-08-05 08:32:07.701',	'2020-08-05 08:32:07.701',	'CSS',	'https://i.imgur.com/FGspyQ3.png'),
('c27aaa0b-ec08-4563-a102-d0af66b5ae80',	'2020-08-05 08:32:07.701',	'2020-08-05 08:32:07.701',	'Design',	'https://i.imgur.com/3WROS3k.png'),
('473276c8-68e9-4187-b611-a3cacae62d0b',	'2020-08-05 08:32:07.701',	'2020-08-05 08:32:07.701',	'NodeJS',	'https://i.imgur.com/BEsgQbX.png'),
('52160941-b9bf-49f6-a034-c1bee92d7897',	'2020-08-05 08:32:07.701',	'2020-08-05 08:32:07.701',	'React',	'https://i.imgur.com/b2Tp4A3.png'),
('bcb2491c-2881-4825-bfb7-6c8cbb8d509c',	'2020-08-05 08:32:07.701',	'2020-08-05 08:32:07.701',	'Ruby',	'https://i.imgur.com/WS4C6pF.png'),
('5ea6f83a-bc20-4cf4-816f-e91a7d76d59b',	'2020-08-05 08:32:07.701',	'2020-08-05 08:32:07.701',	'.NET',	'https://i.imgur.com/F00TfCT.png'),
('c7aa3ce6-4abf-42ba-b0be-dbd4aa46cec4',	'2020-08-05 08:32:07.701',	'2020-08-05 08:32:07.701',	'Java',	'https://i.imgur.com/RM1NDFD.png?1');

INSERT INTO public.progress_goal (id, created_at, updated_at, name, interval_seconds, duration_seconds)
VALUES('f1b1f41b-78bd-44d1-8be9-cad85d9ee750',	'2020-08-05 08:32:07.704',	'2020-08-05 08:32:07.704',	'30 minutes a week',	604800,	1800),
('b7c80d5e-4e93-428b-b7ca-4436b34b642c',	'2020-08-05 08:32:07.704',	'2020-08-05 08:32:07.704',	'1 hour a week',	604800,	3600),
('3463a5a8-b2e5-42f5-a2eb-74aa55603a04',	'2020-08-05 08:32:07.704',	'2020-08-05 08:32:07.704',	'2 hours a week',	604800,	7200);