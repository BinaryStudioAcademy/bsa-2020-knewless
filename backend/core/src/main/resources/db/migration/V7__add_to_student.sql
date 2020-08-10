alter table  students
add  avatar TEXT,
add  job TEXT,
add  location  TEXT,
add  company TEXT,
add  website TEXT,
add  biography TEXT,
add  direction TEXT,
add  experience int,
add  level TEXT,
add  industry TEXT,
add  role TEXT,
add  employment TEXT,
add  education TEXT,
add  year int
;
UPDATE students
SET
  avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSG3KHfY3oDZe6TF-kkBPb946XLJvZD8BE01w&usqp=CAU',
  job = 'Product Manager',
  location = 'France',
  company = 'ESEN',
  website = 'https://hamilton.com',
  biography = 'I learn fast.',
  direction = 'Other',
  experience = 4 ,
  level = 'Intermediate',
  industry = 'Web Services',
  role = 'Manager',
  employment = 'Employee',
  education = 'Barchelor`s degree',
  year = 1990
  where id = '8fa76b23-4d52-4456-8c19-556f58093290' ;

UPDATE students
SET
  avatar = 'https://cdn.pixabay.com/photo/2017/11/20/03/06/male-2964328_960_720.jpg',
  job = 'QA',
  location = 'Canada',
  company = 'TH',
  website = 'https://harold.com',
  biography = 'Smart boy',
  direction = 'Other',
  experience = 2 ,
  level = 'Begginer',
  industry = 'Software Products',
  role = 'QA',
  employment = 'Employee',
  education = 'Barchelor`s degree',
  year = 1995
  where id = 'be907411-379f-4448-95c7-6d28fb61d303' ;

UPDATE students
SET
  avatar = 'https://www.dontwasteyourmoney.com/wp-content/uploads/2017/03/Screen-Shot-2017-03-27-at-2.31.07-PM.png',
  job = 'QA',
  location = 'Canada',
  company = 'TestSoft',
  website = 'https://cunanan.com',
  biography = 'I want to improve my skills.',
  direction = 'Developer',
  experience = 1 ,
  level = 'Begginer',
  industry = 'Software Products',
  role = 'QA',
  employment = 'Employee',
  education = 'High School',
  year = 1997
  where id = 'bd42bb6a-d944-4244-9ee4-7b74c05c401f' ;

UPDATE students
SET
  avatar = 'https://static.seattletimes.com/wp-content/uploads/2017/12/12222017_Aaron-harris_140021-780x719.jpg',
  job = 'Product Manager',
  location = 'Canada',
  company = 'Hi-Tech',
  website = 'https://singleton.com',
  biography = 'I want to improve my skills.',
  direction = 'Other',
  experience = 2 ,
  level = 'Begginer',
  industry = 'Web Services',
  role = 'Manager',
  employment = 'Employee',
  education = 'Barchelor`s degree',
  year = 1995
  where id = 'aae317d2-4306-4412-9583-51c49e6f09e4' ;

UPDATE students
SET
  avatar = 'https://s3.amazonaws.com/tinycards/image/c5b605125dd3a4685555bf56c37555ed',
  job = 'Android Developer',
  location = 'Germany',
  company = 'Idea',
  website = 'https://doe.com',
  biography = 'I want to improve my skills.',
  direction = 'Other',
  experience = 3 ,
  level = 'Intermediate',
  industry = 'Software Products',
  role = 'Mobile Dev',
  employment = 'Employee',
  education = 'Master`s degree',
  year = 1994
  where id = '2fced078-c3a5-4c01-826e-a4183056b19f' ;
