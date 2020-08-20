alter table lectures
RENAME COLUMN source_url TO web_link;
alter table  lectures
add url_origin TEXT,
add url_1080  TEXT,
add url_720 TEXT,
add url_480 TEXT;