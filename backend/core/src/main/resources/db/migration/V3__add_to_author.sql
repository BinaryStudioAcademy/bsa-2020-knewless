alter table  authors
add location TEXT,
add  avatar  TEXT,
add  company TEXT,
add  website TEXT,
add biography TEXT;

UPDATE authors
SET location = 'Denmark',
 avatar = 'https://i.imgur.com/rGqrhwK.jpg',
company = 'LearnAll',
 website = 'https://learnall.com' ,
 biography ='Let''s learn a new thing with me.'
  where id = 'ef7ece86-445f-4ad1-b0b1-901c74fc0591' ;

UPDATE authors
SET location = 'United Kingdom',
 avatar = 'https://i.imgur.com/o9Y62qk.jpg',
company = 'MacDev',
 website = 'https://learnall.com' ,
 biography = 'I will teach you things which you didn`t know.'
 where id = 'bb0ae90c-6030-4635-8eb0-fe40ff7345ce' ;