-- TAGS
ALTER TABLE tags
    ADD COLUMN source TEXT NOT NULL DEFAULT '';

-- SEED TAGS
INSERT INTO tags (id, created_at, updated_at,name, source)
    VALUES ('0d48af6f-861e-4b1f-8d03-9fa993fbe9cf', '2020-08-05 08:32:07.701000', '2020-08-05 08:32:07.701000',
            'Swift', 'https://i.imgur.com/430VVln.png');
INSERT INTO tags (id, created_at, updated_at, name, source)
    VALUES ('2c511b0c-fc47-4801-99d5-525efc89708e', '2020-08-05 08:32:07.701000', '2020-08-05 08:32:07.701000',
            'Angular', 'https://i.imgur.com/v69nP6w.png');
INSERT INTO tags (id, created_at, updated_at, name, source)
    VALUES ('56dd3e0a-5e64-46a1-a40d-767278302e95', '2020-08-05 08:32:07.701000', '2020-08-05 08:32:07.701000',
            'C++', 'https://i.imgur.com/NmipgdZ.png');
INSERT INTO tags (id, created_at, updated_at, name, source)
    VALUES ('93c5f866-b51c-4ba7-a338-2ecefe1ccf97', '2020-08-05 08:32:07.701000', '2020-08-05 08:32:07.701000',
            'PHP', 'https://i.imgur.com/qlPhduY.png');
INSERT INTO tags (id, created_at, updated_at, name, source)
    VALUES ('e63bf7e9-86d4-46a8-9ab2-4b37a0d7dca5', '2020-08-05 08:32:07.701000', '2020-08-05 08:32:07.701000',
            'C#', 'https://i.imgur.com/3xrlexh.png');
INSERT INTO tags (id, created_at, updated_at, name, source)
    VALUES ('78c99383-418f-475d-8cd9-4d0ca0d73974', '2020-08-05 08:32:07.701000', '2020-08-05 08:32:07.701000',
            'Kotlin', 'https://i.imgur.com/CvwjGEk.png');
INSERT INTO tags (id, created_at, updated_at, name, source)
    VALUES ('e655f7d5-5cb1-4c12-9812-4a9d7ff2a0c4', '2020-08-05 08:32:07.701000', '2020-08-05 08:32:07.701000',
            'Android', 'https://i.imgur.com/M6cKObL.png');
INSERT INTO tags (id, created_at, updated_at, name, source)
    VALUES ('c7aa3ce6-4abf-42ba-b0be-dbd4aa46cec4', '2020-08-05 08:32:07.701000', '2020-08-05 08:32:07.701000',
            'Java', 'https://i.imgur.com/vRfLMk3.png');
INSERT INTO tags (id, created_at, updated_at, name, source)
    VALUES ('ae0e2869-9168-4176-bb30-a2bc52ebadcc', '2020-08-05 08:32:07.701000', '2020-08-05 08:32:07.701000',
            'JavaScript', 'https://i.imgur.com/A9ZVHmk.png');
INSERT INTO tags (id, created_at, updated_at, name, source)
    VALUES ('d63d743d-e982-412a-baf2-c555b2a38e66', '2020-08-05 08:32:07.701000', '2020-08-05 08:32:07.701000',
            'Python', 'https://i.imgur.com/gQ5VLem.png');
INSERT INTO tags (id, created_at, updated_at, name, source)
    VALUES ('140f2da3-e86f-440b-8b24-fd40440dca45', '2020-08-05 08:32:07.701000', '2020-08-05 08:32:07.701000',
            'HTML', 'https://i.imgur.com/xLxjG0e.png');
INSERT INTO tags (id, created_at, updated_at, name, source)
    VALUES ('549c51ec-6cf8-4b07-9dad-40229433fb31', '2020-08-05 08:32:07.701000', '2020-08-05 08:32:07.701000',
            'CSS', 'https://i.imgur.com/FGspyQ3.png');
INSERT INTO tags (id, created_at, updated_at, name, source)
    VALUES ('c27aaa0b-ec08-4563-a102-d0af66b5ae80', '2020-08-05 08:32:07.701000', '2020-08-05 08:32:07.701000',
            'Design', 'https://i.imgur.com/3WROS3k.png');
INSERT INTO tags (id, created_at, updated_at, name, source)
    VALUES ('473276c8-68e9-4187-b611-a3cacae62d0b', '2020-08-05 08:32:07.701000', '2020-08-05 08:32:07.701000',
            'NodeJS', 'https://i.imgur.com/BEsgQbX.png');
INSERT INTO tags (id, created_at, updated_at, name, source)
    VALUES ('52160941-b9bf-49f6-a034-c1bee92d7897', '2020-08-05 08:32:07.701000', '2020-08-05 08:32:07.701000',
            'React', 'https://i.imgur.com/b2Tp4A3.png');
INSERT INTO tags (id, created_at, updated_at, name, source)
    VALUES ('bcb2491c-2881-4825-bfb7-6c8cbb8d509c', '2020-08-05 08:32:07.701000', '2020-08-05 08:32:07.701000',
            'Ruby', 'https://i.imgur.com/WS4C6pF.png');
INSERT INTO tags (id, created_at, updated_at, name, source)
    VALUES ('5ea6f83a-bc20-4cf4-816f-e91a7d76d59b', '2020-08-05 08:32:07.701000', '2020-08-05 08:32:07.701000',
            '.NET', 'https://i.imgur.com/F00TfCT.png');

-- ADD AUTHOR, DESCRIPTION, IMAGE TAG TO PATH
ALTER TABLE paths
    ADD description TEXT;
ALTER TABLE paths
-- Clark Kent
    ADD author_id UUID NOT NULL DEFAULT 'ef7ece86-445f-4ad1-b0b1-901c74fc0591';
ALTER TABLE paths
-- Java
    ADD image_tag_id UUID NOT NULL DEFAULT 'c7aa3ce6-4abf-42ba-b0be-dbd4aa46cec4';

ALTER TABLE paths
    ALTER COLUMN author_id DROP DEFAULT;

ALTER TABLE paths
    ALTER COLUMN image_tag_id DROP DEFAULT;

ALTER TABLE paths
    ADD CONSTRAINT FK__paths__author_id FOREIGN KEY (author_id) REFERENCES authors;
ALTER TABLE paths
    ADD CONSTRAINT FK__paths__tag_id FOREIGN KEY (image_tag_id) REFERENCES tags;

-- CREATE PATH_TAG TABLE
CREATE TABLE path_tag
(
    tag_id  UUID NOT NULL,
    path_id UUID NOT NULL
);

ALTER TABLE path_tag
    ADD CONSTRAINT UK__tag_path UNIQUE (tag_id, path_id);
ALTER TABLE path_tag
    ADD CONSTRAINT FK__tag_path__tag FOREIGN KEY (tag_id) REFERENCES tags;
ALTER TABLE path_tag
    ADD CONSTRAINT FK__tag_path__path FOREIGN KEY (path_id) REFERENCES paths;

-- ADD COMPOSED KEY FOR COURSE_PATH
ALTER TABLE course_path
    ADD CONSTRAINT UK__course_path UNIQUE (course_id, path_id);

-- ADD NEW CATEGORY
INSERT INTO categories (id, created_at, updated_at, name)
    VALUES ('102b56f8-29da-4a9f-96f3-0350e3b8b05e', '2020-08-08 08:33:07.704000', '2020-08-08 08:33:07.704000',
            'Angular Programming');

-- MAKE LECTURE DESCRIPTION TEXT TYPE
ALTER TABLE lectures
    ALTER COLUMN description TYPE TEXT;

-- SEED COURSES
-- AUTHOR CLARK KENT
INSERT INTO courses (id, created_at, updated_at, level, name, released_date, author_id, image, category_id, description)
    VALUES ('c98fcc33-18bb-427f-bb60-56f65268ae30', '2020-08-05 08:32:07.796000', '2020-08-05 08:32:07.796000',
            'BEGINNER', 'AngularJS: Get Started', '2020-08-05 08:32:07.791000', 'ef7ece86-445f-4ad1-b0b1-901c74fc0591',
            'https://i.imgur.com/UCPBGKv.jpg', '102b56f8-29da-4a9f-96f3-0350e3b8b05e', 'Hello! My name is Clark Kent, and welcome to AngularJS: Get Started.

In this course, you will learn about the core features of the JavaScript framework using practical, easy to follow examples.

You will get there by learning major topics like how two-way data binding makes it easy to build pages and forms while maintaining simplicity in the JavaScript code, and come to understand the essential abstractions of AngularJS, including modules, controllers, directives, and services.

By the end of this course, you will be able to start building your own single page application using AngularJS.

Before you begin, make sure you are already familiar with the basics of JavaScript and HTML.

Optional and after this course, you’ll be ready to move on to deeper Angular topics like Angular components, routing, and forms.');
INSERT INTO courses (id, created_at, updated_at, level, name, released_date, author_id, image, category_id, description)
    VALUES ('730feda0-b022-471d-8c90-6bf198916f6a', '2020-08-05 08:32:07.796000', '2020-08-05 08:32:07.796000',
            'BEGINNER', 'AngularJS Fundamentals', '2020-08-05 08:32:07.791000', 'ef7ece86-445f-4ad1-b0b1-901c74fc0591',
            'https://i.imgur.com/CRMC0zj.png', '102b56f8-29da-4a9f-96f3-0350e3b8b05e', 'In this course');
INSERT INTO courses (id, created_at, updated_at, level, name, released_date, author_id, image, category_id, description)
    VALUES ('7eb372e7-50c2-4614-979d-af990b021c7b', '2020-08-05 08:32:07.796000', '2020-08-05 08:32:07.796000',
            'BEGINNER', 'AngularJS: The Big Picture', '2020-08-05 08:32:07.791000',
            'ef7ece86-445f-4ad1-b0b1-901c74fc0591', 'https://i.imgur.com/fne9eqv.jpg',
            '102b56f8-29da-4a9f-96f3-0350e3b8b05e',
            'Angular is exploding in popularity. If you are considering using it on a project');
INSERT INTO courses (id, created_at, updated_at, level, name, released_date, author_id, image, category_id, description)
    VALUES ('f68c4c18-3d5e-4e5d-9f86-9c027a149c0d', '2020-08-05 08:32:07.796000', '2020-08-05 08:32:07.796000',
            'INTERMEDIATE', 'AngularJS Services In-depth', '2020-08-05 08:32:07.791000',
            'ef7ece86-445f-4ad1-b0b1-901c74fc0591', 'https://i.imgur.com/Cp3SOFg.jpg',
            '102b56f8-29da-4a9f-96f3-0350e3b8b05e',
            'Services are a major piece of every AngularJS application and will likely make up the majority of the code you write in your own apps. Creating your own services requires understanding the different types of services and how and why to use each of them. The framework also provides lots of built-in services that can help you manage network requests');
INSERT INTO courses (id, created_at, updated_at, level, name, released_date, author_id, image, category_id, description)
    VALUES ('2e5b6ba4-8e41-4a77-a690-5ad09721bebb', '2020-08-05 08:32:07.796000', '2020-08-05 08:32:07.796000',
            'INTERMEDIATE', 'AngularJS Routing In-depth', '2020-08-05 08:32:07.791000',
            'ef7ece86-445f-4ad1-b0b1-901c74fc0591', 'https://i.imgur.com/khlshCR.jpg',
            '102b56f8-29da-4a9f-96f3-0350e3b8b05e',
            'Routing is a fundamental component of Angular applications. Taking full advantage of client-side routing in your Angular apps will lead to better structured code and a better experience for your users');
INSERT INTO courses (id, created_at, updated_at, level, name, released_date, author_id, image, category_id, description)
    VALUES ('294f732d-5715-482f-a611-1498acbdd792', '2020-08-05 08:32:07.796000', '2020-08-05 08:32:07.796000',
            'INTERMEDIATE', 'AngularJS Unit Testing in-depth', '2020-08-05 08:32:07.791000',
            'ef7ece86-445f-4ad1-b0b1-901c74fc0591', 'https://i.imgur.com/LFR6UaK.jpg',
            '102b56f8-29da-4a9f-96f3-0350e3b8b05e',
            'This course introduces the ngMock module for unit testing in AngularJS. The course will cover this module extensively');
INSERT INTO courses (id, created_at, updated_at, level, name, released_date, author_id, image, category_id, description)
    VALUES ('2f9bb430-0a85-4e00-bc9c-c020bfa85b5e', '2020-08-05 08:32:07.796000', '2020-08-05 08:32:07.796000',
            'INTERMEDIATE', 'AngularJS Directives Fundamentals', '2020-08-05 08:32:07.791000',
            'ef7ece86-445f-4ad1-b0b1-901c74fc0591', 'https://i.imgur.com/kSXETOZ.jpg',
            '102b56f8-29da-4a9f-96f3-0350e3b8b05e', 'Directives are one of the most complex pieces of Angular');
INSERT INTO courses (id, created_at, updated_at, level, name, released_date, author_id, image, category_id, description)
    VALUES ('68b01646-e569-4e9f-bd72-67a5b6c7e40a', '2020-08-05 08:32:07.796000', '2020-08-05 08:32:07.796000',
            'INTERMEDIATE', 'AngularJS Line of Business Applications', '2020-08-05 08:32:07.791000',
            'ef7ece86-445f-4ad1-b0b1-901c74fc0591', 'https://i.imgur.com/4E3HBoF.jpg',
            '102b56f8-29da-4a9f-96f3-0350e3b8b05e',
            'This course takes you step by step through the process of building line of business Web applications using Angular. It covers layout and routing');
INSERT INTO courses (id, created_at, updated_at, level, name, released_date, author_id, image, category_id, description)
    VALUES ('a06b3432-f085-46be-807f-029a9d38fb17', '2020-08-05 08:32:07.796000', '2020-08-05 08:32:07.796000',
            'INTERMEDIATE', 'AngularJS Best Practices', '2020-08-05 08:32:07.791000',
            'ef7ece86-445f-4ad1-b0b1-901c74fc0591', 'https://i.imgur.com/Mr9IJY8.jpg',
            '102b56f8-29da-4a9f-96f3-0350e3b8b05e',
            'In this course you will take your AngularJS development to the next level by taking a deeper look at developing web applications with Angular. Building on the topics taught in the Angular Fundamentals course');
INSERT INTO courses (id, created_at, updated_at, level, name, released_date, author_id, image, category_id, description)
    VALUES ('a2b0dd91-62f9-4bf3-a141-79e3ed0cc6ff', '2020-08-05 08:32:07.796000', '2020-08-05 08:32:07.796000',
            'INTERMEDIATE', 'AngularJS Patterns: Clean Code', '2020-08-05 08:32:07.791000',
            'ef7ece86-445f-4ad1-b0b1-901c74fc0591', 'https://i.imgur.com/nD5XeeN.jpg',
            '102b56f8-29da-4a9f-96f3-0350e3b8b05e', 'Once you learn the basics of AngularJS');
INSERT INTO courses (id, created_at, updated_at, level, name, released_date, author_id, image, category_id, description)
    VALUES ('5c54ea5c-5bfe-4530-a7e9-7c35cfa41b73', '2020-08-05 08:32:07.796000', '2020-08-05 08:32:07.796000',
            'ADVANCED', 'AngularJS In-Depth', '2020-08-05 08:32:07.791000', 'ef7ece86-445f-4ad1-b0b1-901c74fc0591',
            'https://i.imgur.com/csrqFtn.jpg', '102b56f8-29da-4a9f-96f3-0350e3b8b05e',
            '"AngularJS In Action" author Lukas Ruebbelke dives into AngularJS, an intuitive framework that makes it easy to organize code by incorporates concepts like two-way binding, dependency injection and views which results in very testable code.');
INSERT INTO courses (id, created_at, updated_at, level, name, released_date, author_id, image, category_id, description)
    VALUES ('266bfc6e-ef22-464b-9677-622844c8ee99', '2020-08-05 08:32:07.796000', '2020-08-05 08:32:07.796000',
            'ADVANCED', 'Building a SPA Framework Using AngularJS', '2020-08-05 08:32:07.791000',
            'ef7ece86-445f-4ad1-b0b1-901c74fc0591', 'https://i.imgur.com/MO8Z5LI.jpg',
            '102b56f8-29da-4a9f-96f3-0350e3b8b05e', 'Do you need a starting point for your Angular SPAs? Menus');
INSERT INTO courses (id, created_at, updated_at, level, name, released_date, author_id, image, category_id, description)
    VALUES ('8c4e0626-464f-4db3-828d-4344f57e6847', '2020-08-05 08:32:07.796000', '2020-08-05 08:32:07.796000',
            'ADVANCED', 'An AngularJS Playbook', '2020-08-05 08:32:07.791000', 'ef7ece86-445f-4ad1-b0b1-901c74fc0591',
            'https://i.imgur.com/A4Fw12A.jpg', '102b56f8-29da-4a9f-96f3-0350e3b8b05e',
            'The Playbook contains strategies and patterns for common scenarios in AngularJS applications. After an introductory module');

-- SEED LECTURES
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('96e112b4-d827-4891-9ed0-f7ebabcb949c', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000',
            'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What''s happened to me? " he thought.',
            36, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'c98fcc33-18bb-427f-bb60-56f65268ae30', NULL,
            'The quick, brown fox jumps over a lazy dog.');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('a29d4119-3e99-496d-b7af-44d1e6edb891', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000',
            'It wasn''t a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer.',
            6, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'c98fcc33-18bb-427f-bb60-56f65268ae30', NULL,
            'DJs flock by when MTV ax quiz prog.');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('27d49398-1093-4717-ad19-9d1ef49e5f8c', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000',
            'Gregor then turned to look out the window at the dull weather. Drops of rain could be heard hitting the pane, which made him feel quite sad. "How about if I sleep a little bit longer and forget all this nonsense", he thought, but that was something he was unable to do because he was used to sleeping on his right, and in his present state couldn''t get into that position. However hard he threw himself onto his right, he always rolled back to where he was.',
            50, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'c98fcc33-18bb-427f-bb60-56f65268ae30', NULL, 'Junk MTV quiz graced by fox whelps.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('558d4078-f6d6-4716-9150-1788b2ef2693', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000',
            'He must have tried it a hundred times, shut his eyes so that he wouldn''t have to look at the floundering legs, and only stopped when he began to feel a mild, dull pain there that he had never felt before. "Oh, God", he thought, "what a strenuous career it is that I''ve chosen! Travelling day in and day out.',
            4, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'c98fcc33-18bb-427f-bb60-56f65268ae30', NULL, 'Bawds jog, flick quartz, vex nymphs.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('703c07b9-2331-4cf8-b9e7-fe267f5f50d8', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000',
            'Doing business like this takes much more effort than doing your own business at home, and on top of that there''s the curse of travelling, worries about making train connections, bad and irregular food, contact with different people all the time so that you can never get to know anyone or become friendly with them. It can all go to Hell!',
            38, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'c98fcc33-18bb-427f-bb60-56f65268ae30', NULL, 'Waltz, bad nymph, for quick jigs vex!
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('c015b42c-6a7d-4e72-a3f2-7c40163c9f33', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000',
            '" He felt a slight itch up on his belly; pushed himself slowly up on his back towards the headboard so that he could lift his head better; found where the itch was, and saw that it was covered with lots of little white spots which he didn''t know what to make of; and when he tried to feel the place with one of his legs he drew it quickly back because as soon as he touched it he was overcome by a cold shudder. He slid back into his former position. "Getting up early all the time", he thought, "it makes you stupid.',
            15, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '730feda0-b022-471d-8c90-6bf198916f6a', NULL, 'Fox nymphs grab quick-jived waltz.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('738159b6-56ea-4d18-a316-d9c79dba40a4', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000',
            'You''ve got to get enough sleep. Other travelling salesmen live a life of luxury. For instance, whenever I go back to the guest house during the morning to copy out the contract, these gentlemen are always still sitting there eating their breakfasts. I ought to just try that with my boss; I''d get kicked out on the spot. But who knows, maybe that would be the best thing for me.',
            3, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '730feda0-b022-471d-8c90-6bf198916f6a', NULL, 'Brick quiz whangs jumpy veldt fox.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('9a15b430-929e-4d2a-bf00-fd9b3db3b5ec', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000',
            'If I didn''t have my parents to think about I''d have given in my notice a long time ago, I''d have gone up to the boss and told him just what I think, tell him everything I would, let him know just what I feel. He''d fall right off his desk! And it''s a funny sort of business to be sitting up there at your desk, talking down at your subordinates from up there, especially when you have to go right up close because the boss is hard of hearing.',
            27, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '730feda0-b022-471d-8c90-6bf198916f6a', NULL, 'Bright vixens jump; dozy fowl quack.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('e6a7b867-ae7d-46a9-b133-7793f4d4388d', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000',
            'Well, there''s still some hope; once I''ve got the money together to pay off my parents'' debt to him - another five or six years I suppose - that''s definitely what I''ll do. That''s when I''ll make the big change. First of all though, I''ve got to get up, my train leaves at five. " And he looked over at the alarm clock, ticking on the chest of drawers. "God in Heaven! " he thought. It was half past six and the hands were quietly moving forwards, it was even later than half past, more like quarter to seven. Had the alarm clock not rung?',
            58, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '7eb372e7-50c2-4614-979d-af990b021c7b', NULL, 'Quick wafting zephyrs vex bold Jim.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('ac24e0ba-5914-4f28-bbd0-caf1833f5bf2', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000',
            'He could see from the bed that it had been set for four o''clock as it should have been; it certainly must have rung. Yes, but was it possible to quietly sleep through that furniture-rattling noise? True, he had not slept peacefully, but probably all the more deeply because of that. What should he do now? The next train went at seven; if he were to catch that he would have to rush like mad and the collection of samples was still not packed, and he did not at all feel particularly fresh and lively.',
            31, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '7eb372e7-50c2-4614-979d-af990b021c7b', NULL, 'Quick zephyrs blow, vexing daft Jim.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('fe0a8a5d-d3c2-4546-9007-a1835842b109', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000',
            'And even if he did catch the train he would not avoid his boss''s anger as the office assistant would have been there to see the five o''clock train go, he would have put in his report about Gregor''s not being there a long time ago. The office assistant was the boss''s man, spineless, and with no understanding. What about if he reported sick? But that would be extremely strained and suspicious as in fifteen years of service Gregor had never once yet been ill.',
            49, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '7eb372e7-50c2-4614-979d-af990b021c7b', NULL, 'Kekw-charged fop blew my junk TV quiz.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('3197078d-b0e3-4878-88ea-fb2281691613', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'His boss would certainly come round with the doctor from the medical insurance company, accuse his parents of having a lazy son, and accept the doctor''s recommendation not to make any claim as the doctor believed that no-one was ever ill but that many were workshy. And what''s more, would he have been entirely wrong in this case? Gregor did in fact, apart from excessive sleepiness after sleeping for so long, feel completely well and even felt much hungrier than usual.
', 59, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '7eb372e7-50c2-4614-979d-af990b021c7b', NULL, 'How quickly daft jumping zebras vex.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('44957390-e94b-40ac-8585-f834fe4f2252', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What''s happened to me? " he thought. It wasn''t a dream.
', 1, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'f68c4c18-3d5e-4e5d-9f86-9c027a149c0d', NULL, 'Two driven jocks help fax my big quiz.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('a9ecaff6-c1e9-4840-b6c8-2b5070cc05ae', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather.
', 24, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'f68c4c18-3d5e-4e5d-9f86-9c027a149c0d', NULL, 'Quick, Baz, get my woven flax jodhpurs!
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('ec2a517d-068b-4f32-9758-247b0aaddb7d', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'Drops of rain could be heard hitting the pane, which made him feel quite sad. "How about if I sleep a little bit longer and forget all this nonsense", he thought, but that was something he was unable to do because he was used to sleeping on his right, and in his present state couldn''t get into that position. However hard he threw himself onto his right, he always rolled back to where he was.
', 52, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'f68c4c18-3d5e-4e5d-9f86-9c027a149c0d', NULL, '"Now fax quiz Jack! " my brave ghost pled.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('cf2d2dde-714c-4ccc-b61b-86f57856c538', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'He must have tried it a hundred times, shut his eyes so that he wouldn''t have to look at the floundering legs, and only stopped when he began to feel a mild, dull pain there that he had never felt before. "Oh, God", he thought, "what a strenuous career it is that I''ve chosen! Travelling day in and day out.
', 19, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'f68c4c18-3d5e-4e5d-9f86-9c027a149c0d', NULL, 'Five quacking zephyrs jolt my wax bed.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('de535f2f-b8c7-41f2-94df-019544c12c87', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'Doing business like this takes much more effort than doing your own business at home, and on top of that there''s the curse of travelling, worries about making train connections, bad and irregular food, contact with different people all the time so that you can never get to know anyone or become friendly with them. It can all go to Hell!
', 14, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '2e5b6ba4-8e41-4a77-a690-5ad09721bebb', NULL, 'Flummoxed by job, kvetching W. zaps Iraq.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('4efc0621-3fb3-4033-8d6c-c7726a9dfc42', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', '" He felt a slight itch up on his belly; pushed himself slowly up on his back towards the headboard so that he could lift his head better; found where the itch was, and saw that it was covered with lots of little white spots which he didn''t know what to make of; and when he tried to feel the place with one of his legs he drew it quickly back because as soon as he touched it he was overcome by a cold shudder. He slid back into his former position. "Getting up early all the time", he thought, "it makes you stupid. You''ve got to get enough sleep.
', 26, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '2e5b6ba4-8e41-4a77-a690-5ad09721bebb', NULL, 'Cozy sphinx waves quart jug of bad milk.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('1d203946-cb4a-4c74-bfca-ac12e851942d', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'Other travelling salesmen live a life of luxury. For instance, whenever I go back to the guest house during the morning to copy out the contract, these gentlemen are always still sitting there eating their breakfasts. I ought to just try that with my boss; I''d get kicked out on the spot. But who knows, maybe that would be the best thing for me. If I didn''t have my parents to think about I''d have given in my notice a long time ago, I''d have gone up to the boss and told him just what I think, tell him everything I would, let him know just what I feel.
', 6, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '294f732d-5715-482f-a611-1498acbdd792', NULL, 'A very bad quack might jinx zippy fowls.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('5ae8ad92-9144-4457-9980-331a00b769d1', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'He''d fall right off his desk! And it''s a funny sort of business to be sitting up there at your desk, talking down at your subordinates from up there, especially when you have to go right up close because the boss is hard of hearing. Well, there''s still some hope; once I''ve got the money together to pay off my parents'' debt to him - another five or six years I suppose - that''s definitely what I''ll do. That''s when I''ll make the big change. First of all though, I''ve got to get up, my train leaves at five.
', 54, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '294f732d-5715-482f-a611-1498acbdd792', NULL, 'Few quips galvanized the mock jury box.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('57b483d2-f101-4a7a-92f9-3cdf506eb92c', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', '" And he looked over at the alarm clock, ticking on the chest of drawers. "God in Heaven! " he thought. It was half past six and the hands were quietly moving forwards, it was even later than half past, more like quarter to seven. Had the alarm clock not rung? He could see from the bed that it had been set for four o''clock as it should have been; it certainly must have rung. Yes, but was it possible to quietly sleep through that furniture-rattling noise? True, he had not slept peacefully, but probably all the more deeply because of that. What should he do now?
', 55, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '294f732d-5715-482f-a611-1498acbdd792', NULL, 'Quick brown dogs jump over the lazy fox.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('a58a6702-ccfc-4c32-a459-76244d7b0ee3', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'The next train went at seven; if he were to catch that he would have to rush like mad and the collection of samples was still not packed, and he did not at all feel particularly fresh and lively. And even if he did catch the train he would not avoid his boss''s anger as the office assistant would have been there to see the five o''clock train go, he would have put in his report about Gregor''s not being there a long time ago. The office assistant was the boss''s man, spineless, and with no understanding. What about if he reported sick?
', 58, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '294f732d-5715-482f-a611-1498acbdd792', NULL, 'The jay, pig, fox, zebra, and my wolves quack!
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('364964db-cf86-4bb0-8827-1b173fa3a952', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'But that would be extremely strained and suspicious as in fifteen years of service Gregor had never once yet been ill. His boss would certainly come round with the doctor from the medical insurance company, accuse his parents of having a lazy son, and accept the doctor''s recommendation not to make any claim as the doctor believed that no-one was ever ill but that many were workshy. And what''s more, would he have been entirely wrong in this case?
', 39, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '294f732d-5715-482f-a611-1498acbdd792', NULL, 'Blwzy red vixens fight for a quick jump.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('1d188f53-2472-4d90-accd-cb20bebf8b7e', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'Gregor did in fact, apart from excessive sleepiness after sleeping for so long, feel completely well and even felt much hungrier than usual. One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.
', 60, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '2f9bb430-0a85-4e00-bc9c-c020bfa85b5e', NULL, 'Joaquin Phoenix was gazed by MTV for luck.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('45412e9c-6d93-4b83-815b-20095fcc7d77', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What''s happened to me? " he thought. It wasn''t a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.
', 22, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '2f9bb430-0a85-4e00-bc9c-c020bfa85b5e', NULL, 'A wizard’s job is to vex chumps quickly in fog.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('16e3548a-2c93-4a2d-bf8d-2fc29a74095e', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops of rain could be heard hitting the pane, which made him feel quite sad. "How about if I sleep a little bit longer and forget all this nonsense", he thought, but that was something he was unable to do because he was used to sleeping on his right, and in his present state couldn''t get into that position.
', 37, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '2f9bb430-0a85-4e00-bc9c-c020bfa85b5e', NULL, 'Watch "Jeopardy! ", Alex Trebek fun TV quiz game.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('4c8f7317-32b3-49ef-9ede-af7f1929eaec', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'However hard he threw himself onto his right, he always rolled back to where he was. He must have tried it a hundred times, shut his eyes so that he wouldn''t have to look at the floundering legs, and only stopped when he began to feel a mild, dull pain there that he had never felt before. "Oh, God", he thought, "what a strenuous career it is that I''ve chosen! Travelling day in and day out.
', 3, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '68b01646-e569-4e9f-bd72-67a5b6c7e40a', NULL, 'Woven silk pyjamas exchanged for blue quartz.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('43b2c448-62de-4f8f-af1a-6dbb745222e8', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'Doing business like this takes much more effort than doing your own business at home, and on top of that there''s the curse of travelling, worries about making train connections, bad and irregular food, contact with different people all the time so that you can never get to know anyone or become friendly with them. It can all go to Hell!
', 45, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '68b01646-e569-4e9f-bd72-67a5b6c7e40a', NULL, 'Brawny gods just flocked up to quiz and vex him.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('3606e925-37f8-44b7-a537-c30955ee50ee', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', '" He felt a slight itch up on his belly; pushed himself slowly up on his back towards the headboard so that he could lift his head better; found where the itch was, and saw that it was covered with lots of little white spots which he didn''t know what to make of; and when he tried to feel the place with one of his legs he drew it quickly back because as soon as he touched it he was overcome by a cold shudder. He slid back into his former position. "Getting up early all the time", he thought, "it makes you stupid. You''ve got to get enough sleep. Other travelling salesmen live a life of luxury.
', 16, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '68b01646-e569-4e9f-bd72-67a5b6c7e40a', NULL, 'Adjusting quiver and bow, Zompyc[1] killed the fox.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('f1f04853-6c96-4255-8f25-ad6d577a3f2b', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'For instance, whenever I go back to the guest house during the morning to copy out the contract, these gentlemen are always still sitting there eating their breakfasts. I ought to just try that with my boss; I''d get kicked out on the spot. But who knows, maybe that would be the best thing for me. If I didn''t have my parents to think about I''d have given in my notice a long time ago, I''d have gone up to the boss and told him just what I think, tell him everything I would, let him know just what I feel. He''d fall right off his desk!
', 46, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '68b01646-e569-4e9f-bd72-67a5b6c7e40a', NULL, 'My faxed joke won a pager in the cable TV quiz show.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('d1139b25-45e0-4a96-9f54-2beb755aedc8', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'And it''s a funny sort of business to be sitting up there at your desk, talking down at your subordinates from up there, especially when you have to go right up close because the boss is hard of hearing. Well, there''s still some hope; once I''ve got the money together to pay off my parents'' debt to him - another five or six years I suppose - that''s definitely what I''ll do. That''s when I''ll make the big change. First of all though, I''ve got to get up, my train leaves at five. " And he looked over at the alarm clock, ticking on the chest of drawers. "God in Heaven! " he thought.
', 30, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'a06b3432-f085-46be-807f-029a9d38fb17', NULL, 'Amazingly few discotheques provide jukeboxes.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('110234fe-fb2f-45dd-b554-10345bfee98e', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'It was half past six and the hands were quietly moving forwards, it was even later than half past, more like quarter to seven. Had the alarm clock not rung? He could see from the bed that it had been set for four o''clock as it should have been; it certainly must have rung. Yes, but was it possible to quietly sleep through that furniture-rattling noise? True, he had not slept peacefully, but probably all the more deeply because of that. What should he do now?
', 14, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'a06b3432-f085-46be-807f-029a9d38fb17', NULL, 'My girl wove six dozen plaid jackets before she quit.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('3c2cbb58-ed5d-475d-9cd1-9ee084d6cbdc', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'The next train went at seven; if he were to catch that he would have to rush like mad and the collection of samples was still not packed, and he did not at all feel particularly fresh and lively. And even if he did catch the train he would not avoid his boss''s anger as the office assistant would have been there to see the five o''clock train go, he would have put in his report about Gregor''s not being there a long time ago. The office assistant was the boss''s man, spineless, and with no understanding. What about if he reported sick?
', 51, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'a06b3432-f085-46be-807f-029a9d38fb17', NULL, 'Six big devils from Japan quickly forgot how to waltz.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('9752ef13-b266-48d1-b43b-907e815e4ace', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'But that would be extremely strained and suspicious as in fifteen years of service Gregor had never once yet been ill. His boss would certainly come round with the doctor from the medical insurance company, accuse his parents of having a lazy son, and accept the doctor''s recommendation not to make any claim as the doctor believed that no-one was ever ill but that many were workshy. And what''s more, would he have been entirely wrong in this case? Gregor did in fact, apart from excessive sleepiness after sleeping for so long, feel completely well and even felt much hungrier than usual.
', 21, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'a06b3432-f085-46be-807f-029a9d38fb17', NULL, 'Big July earthquakes confound zany experimental vow.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('9394c005-7080-4625-905e-9d0a46423500', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What''s happened to me? " he thought. It wasn''t a dream.
', 58, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'a2b0dd91-62f9-4bf3-a141-79e3ed0cc6ff', NULL, 'Foxy parsons quiz and cajole the lovably dim wiki-girl.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('476372b9-5df7-4b26-93ae-ebc3c281ff60', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops of rain could be heard hitting the pane, which made him feel quite sad.
', 3, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'a2b0dd91-62f9-4bf3-a141-79e3ed0cc6ff', NULL, 'Have a pick: twenty six letters - no forcing a jumbled quiz!
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('b6e352c4-f25c-412e-8148-487f7dd8d89b', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', '"How about if I sleep a little bit longer and forget all this nonsense", he thought, but that was something he was unable to do because he was used to sleeping on his right, and in his present state couldn''t get into that position. However hard he threw himself onto his right, he always rolled back to where he was. He must have tried it a hundred times, shut his eyes so that he wouldn''t have to look at the floundering legs, and only stopped when he began to feel a mild, dull pain there that he had never felt before. "Oh, God", he thought, "what a strenuous career it is that I''ve chosen! Travelling day in and day out.
', 44, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'a2b0dd91-62f9-4bf3-a141-79e3ed0cc6ff', NULL, 'Crazy Fredericka bought many very exquisite opal jewels.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('f902415a-3fe0-46c1-9333-0e18506df7a7', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'Doing business like this takes much more effort than doing your own business at home, and on top of that there''s the curse of travelling, worries about making train connections, bad and irregular food, contact with different people all the time so that you can never get to know anyone or become friendly with them. It can all go to Hell!
', 49, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'a2b0dd91-62f9-4bf3-a141-79e3ed0cc6ff', NULL, 'Sixty zippers were quickly picked from the woven jute bag.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('0ae0ef47-8ee5-4408-8a28-478b3f026621', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', '" He felt a slight itch up on his belly; pushed himself slowly up on his back towards the headboard so that he could lift his head better; found where the itch was, and saw that it was covered with lots of little white spots which he didn''t know what to make of; and when he tried to feel the place with one of his legs he drew it quickly back because as soon as he touched it he was overcome by a cold shudder. He slid back into his former position. "Getting up early all the time", he thought, "it makes you stupid. You''ve got to get enough sleep. Other travelling salesmen live a life of luxury.
', 59, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '5c54ea5c-5bfe-4530-a7e9-7c35cfa41b73', NULL, 'A quick movement of the enemy will jeopardize six gunboats.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('f01e50a4-b78e-4f09-b8ef-36a0c0111bb6', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'For instance, whenever I go back to the guest house during the morning to copy out the contract, these gentlemen are always still sitting there eating their breakfasts. I ought to just try that with my boss; I''d get kicked out on the spot. But who knows, maybe that would be the best thing for me. If I didn''t have my parents to think about I''d have given in my notice a long time ago, I''d have gone up to the boss and told him just what I think, tell him everything I would, let him know just what I feel. He''d fall right off his desk!
', 36, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '5c54ea5c-5bfe-4530-a7e9-7c35cfa41b73', NULL, 'All questions asked by five watch experts amazed the judge.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('307f6086-25c7-428d-a837-36b4a93c1513', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'And it''s a funny sort of business to be sitting up there at your desk, talking down at your subordinates from up there, especially when you have to go right up close because the boss is hard of hearing. Well, there''s still some hope; once I''ve got the money together to pay off my parents'' debt to him - another five or six years I suppose - that''s definitely what I''ll do. That''s when I''ll make the big change. First of all though, I''ve got to get up, my train leaves at five. " And he looked over at the alarm clock, ticking on the chest of drawers. "God in Heaven! " he thought.
', 10, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '5c54ea5c-5bfe-4530-a7e9-7c35cfa41b73', NULL, 'Jack quietly moved up front and seized the big ball of wax.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('c3f00569-ff1e-4252-9681-e3bc890fcc57', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'It was half past six and the hands were quietly moving forwards, it was even later than half past, more like quarter to seven. Had the alarm clock not rung? He could see from the bed that it had been set for four o''clock as it should have been; it certainly must have rung. Yes, but was it possible to quietly sleep through that furniture-rattling noise? True, he had not slept peacefully, but probably all the more deeply because of that. What should he do now? The next train went at seven; if he were to catch that he would have to rush like mad and the collection of samples was still not packed, and he did not at all feel particularly fresh and lively.
', 13, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '5c54ea5c-5bfe-4530-a7e9-7c35cfa41b73', NULL, 'The quick, brown fox jumps over a lazy dog.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('a57554e8-77d7-4e2d-8531-3a086f3ce195', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'And even if he did catch the train he would not avoid his boss''s anger as the office assistant would have been there to see the five o''clock train go, he would have put in his report about Gregor''s not being there a long time ago. The office assistant was the boss''s man, spineless, and with no understanding. What about if he reported sick? But that would be extremely strained and suspicious as in fifteen years of service Gregor had never once yet been ill.
', 23, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '5c54ea5c-5bfe-4530-a7e9-7c35cfa41b73', NULL, 'DJs flock by when MTV ax quiz prog.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('ac2273e9-1bcd-4c34-af14-bab73e37f330', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'His boss would certainly come round with the doctor from the medical insurance company, accuse his parents of having a lazy son, and accept the doctor''s recommendation not to make any claim as the doctor believed that no-one was ever ill but that many were workshy. And what''s more, would he have been entirely wrong in this case? Gregor did in fact, apart from excessive sleepiness after sleeping for so long, feel completely well and even felt much hungrier than usual. One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin.
', 49, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '266bfc6e-ef22-464b-9677-622844c8ee99', NULL, 'Junk MTV quiz graced by fox whelps.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('1fded924-8e83-492e-8dce-8fe26b57469b', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What''s happened to me? " he thought. It wasn''t a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.
', 41, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '266bfc6e-ef22-464b-9677-622844c8ee99', NULL, 'Bawds jog, flick quartz, vex nymphs.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('25b5e0a8-cb69-485b-941a-77dc276155db', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather. Drops of rain could be heard hitting the pane, which made him feel quite sad. "How about if I sleep a little bit longer and forget all this nonsense", he thought, but that was something he was unable to do because he was used to sleeping on his right, and in his present state couldn''t get into that position. However hard he threw himself onto his right, he always rolled back to where he was.
', 43, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '266bfc6e-ef22-464b-9677-622844c8ee99', NULL, 'Waltz, bad nymph, for quick jigs vex!
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('c76ebe25-286d-46b9-827e-dd4478053620', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'He must have tried it a hundred times, shut his eyes so that he wouldn''t have to look at the floundering legs, and only stopped when he began to feel a mild, dull pain there that he had never felt before. "Oh, God", he thought, "what a strenuous career it is that I''ve chosen! Travelling day in and day out. Doing business like this takes much more effort than doing your own business at home, and on top of that there''s the curse of travelling, worries about making train connections, bad and irregular food, contact with different people all the time so that you can never get to know anyone or become friendly with them. It can all go to Hell!
', 32, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '266bfc6e-ef22-464b-9677-622844c8ee99', NULL,
            'Fox nymphs grab quick-jived waltz.');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('97153d20-b0b5-4b6c-b8e4-59de4e540bc6', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', '" He felt a slight itch up on his belly; pushed himself slowly up on his back towards the headboard so that he could lift his head better; found where the itch was, and saw that it was covered with lots of little white spots which he didn''t know what to make of; and when he tried to feel the place with one of his legs he drew it quickly back because as soon as he touched it he was overcome by a cold shudder. He slid back into his former position. "Getting up early all the time", he thought, "it makes you stupid. You''ve got to get enough sleep. Other travelling salesmen live a life of luxury. For instance, whenever I go back to the guest house during the morning to copy out the contract, these gentlemen are always still sitting there eating their breakfasts.
', 7, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '8c4e0626-464f-4db3-828d-4344f57e6847', NULL, 'Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('59951320-6350-4e98-8793-62977328eaf3', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'I ought to just try that with my boss; I''d get kicked out on the spot. But who knows, maybe that would be the best thing for me. If I didn''t have my parents to think about I''d have given in my notice a long time ago, I''d have gone up to the boss and told him just what I think, tell him everything I would, let him know just what I feel. He''d fall right off his desk! And it''s a funny sort of business to be sitting up there at your desk, talking down at your subordinates from up there, especially when you have to go right up close because the boss is hard of hearing. Well, there''s still some hope; once I''ve got the money together to pay off my parents'' debt to him - another five or six years I suppose - that''s definitely what I''ll do. That''s when I''ll make the big change.
', 29, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '8c4e0626-464f-4db3-828d-4344f57e6847', NULL, 'Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim.
');
INSERT INTO lectures (id, created_at, updated_at, description, duration, source_url, course_id, homework_id,
                      name)
    VALUES ('78332609-ff35-4fe4-b473-07b0cef8343f', '2020-08-05 08:32:07.821000', '2020-08-05 08:32:07.821000', 'First of all though, I''ve got to get up, my train leaves at five. " And he looked over at the alarm clock, ticking on the chest of drawers. "God in Heaven! " he thought. It was half past six and the hands were quietly moving forwards, it was even later than half past, more like quarter to seven. Had the alarm clock not rung? He could see from the bed that it had been set for four o''clock as it should have been; it certainly must have rung. Yes, but was it possible to quietly sleep through that furniture-rattling noise? True, he had not slept peacefully, but probably all the more deeply because of that. What should he do now? The next train went at seven; if he were to catch that he would have to rush like mad and the collection of samples was still not packed, and he did not at all feel particularly fresh and lively. And even if he did catch the train he would not avoid his boss''s anger as the office assistant would have been there to see the five o''clock train go, he would have put in his report about Gregor''s not being there a long time ago. The office assistant was the boss''s man, spineless, and with
', 47, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '8c4e0626-464f-4db3-828d-4344f57e6847', NULL, 'Kek-charged fop blew my
');



