alter table lectures add name varchar(255);

update lectures set name = 'Some description one' where id = '31b2d2bc-7fb4-4a45-9fc4-c73279d04dec';
update lectures set name = 'Some description two' where id = '5208962f-9ece-4f92-9dad-1cad7bf185bf';
