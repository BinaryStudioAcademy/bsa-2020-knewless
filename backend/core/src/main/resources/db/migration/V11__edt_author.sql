alter table authors
drop column name;
alter table  authors
add first_name TEXT,
add last_name  TEXT,
add job TEXT,
add twitter TEXT;

UPDATE authors
SET first_name = 'Clack',
 last_name = 'Kent',
 job = 'Project Manager',
 twitter = 'https://twitter.com/clackkent'
 where id = 'ef7ece86-445f-4ad1-b0b1-901c74fc0591' ;

UPDATE authors
SET first_name = 'Harold',
 last_name = 'First',
 job = 'Android Developer',
 twitter = 'https://twitter.com/haroldfirst'
 where id = 'bb0ae90c-6030-4635-8eb0-fe40ff7345ce' ;