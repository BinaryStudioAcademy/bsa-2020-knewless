--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

-- Started on 2020-09-07 10:33:25

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 22132)
-- Name: achievements; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.achievements (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    name character varying(255)
);


ALTER TABLE public.achievements OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 22137)
-- Name: article_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.article_comments (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    text text,
    user_id uuid,
    article_id uuid
);


ALTER TABLE public.article_comments OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 22145)
-- Name: article_reactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.article_reactions (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    reaction boolean,
    user_id uuid,
    article_id uuid
);


ALTER TABLE public.article_reactions OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 22150)
-- Name: article_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.article_tag (
    tag_id uuid NOT NULL,
    article_id uuid NOT NULL
);


ALTER TABLE public.article_tag OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 22155)
-- Name: articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.articles (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    name character varying(255),
    text text,
    author_id uuid,
    image text
);


ALTER TABLE public.articles OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 22163)
-- Name: authors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.authors (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    school_id uuid,
    user_id uuid,
    location text,
    avatar text,
    company text,
    website text,
    biography text,
    first_name text,
    last_name text,
    job text,
    twitter text
);


ALTER TABLE public.authors OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 22168)
-- Name: course_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_comments (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    text text,
    user_id uuid,
    course_id uuid
);


ALTER TABLE public.course_comments OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 22176)
-- Name: course_path; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_path (
    course_id uuid NOT NULL,
    path_id uuid NOT NULL
);


ALTER TABLE public.course_path OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 22179)
-- Name: course_reactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_reactions (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    user_id uuid,
    course_id uuid,
    reaction integer
);


ALTER TABLE public.course_reactions OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 22184)
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    level text,
    name character varying(255),
    released_date timestamp without time zone,
    author_id uuid,
    image character varying(255),
    description text,
    overview text
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 22189)
-- Name: current_user_courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.current_user_courses (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    course_id uuid,
    user_id uuid
);


ALTER TABLE public.current_user_courses OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 22555)
-- Name: daily_progress; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.daily_progress (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    seconds integer,
    user_id uuid,
    date date
);


ALTER TABLE public.daily_progress OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 22194)
-- Name: favorites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorites (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    source_id uuid,
    source_type character varying(255),
    user_id uuid
);


ALTER TABLE public.favorites OWNER TO postgres;


--
-- TOC entry 215 (class 1259 OID 22199)
-- Name: histories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.histories (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    lecture_id uuid,
    user_id uuid,
    seconds_watched integer,
    fraction_watched real
);


ALTER TABLE public.histories OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 22204)
-- Name: homeworks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.homeworks (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    description character varying(255),
    lecture_id uuid
);


ALTER TABLE public.homeworks OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 22209)
-- Name: lecture_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lecture_comments (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    text text,
    user_id uuid,
    lecture_id uuid
);


ALTER TABLE public.lecture_comments OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 22217)
-- Name: lecture_reactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lecture_reactions (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    reaction boolean,
    user_id uuid,
    lecture_id uuid
);


ALTER TABLE public.lecture_reactions OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 22222)
-- Name: lecture_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lecture_tag (
    tag_id uuid NOT NULL,
    lecture_id uuid NOT NULL
);


ALTER TABLE public.lecture_tag OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 22227)
-- Name: lectures; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lectures (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    description text,
    duration integer,
    web_link character varying(255),
    course_id uuid,
    homework_id uuid,
    name character varying(255),
    user_id uuid,
    url_origin text,
    url_1080 text,
    url_720 text,
    url_480 text,
    preview_image character varying(255)
);


ALTER TABLE public.lectures OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 22235)
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    source_id uuid,
    source_type character varying(255),
    text character varying(255),
    user_id uuid,
    is_read boolean
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 22531)
-- Name: path_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.path_tag (
    tag_id uuid NOT NULL,
    path_id uuid NOT NULL
);


ALTER TABLE public.path_tag OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 22243)
-- Name: paths; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.paths (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    name character varying(255),
    description text,
    author_id uuid NOT NULL,
    image_tag_id uuid,
    released_date timestamp without time zone
);


ALTER TABLE public.paths OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 22566)
-- Name: progress_goal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.progress_goal (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    name text,
    interval_seconds integer,
    duration_seconds integer
);


ALTER TABLE public.progress_goal OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 22256)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    name character varying(255)
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 22261)
-- Name: schools; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schools (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    description character varying(255),
    logo character varying(255),
    name character varying(255)
);


ALTER TABLE public.schools OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 22248)
-- Name: students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.students (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    first_name character varying(255),
    last_name character varying(255),
    user_id uuid,
    avatar text,
    job text,
    location text,
    company text,
    website text,
    biography text,
    direction text,
    experience integer,
    level text,
    industry text,
    role text,
    employment text,
    education text,
    year integer,
    date_goal_set date,
    goal_id uuid
);


ALTER TABLE public.students OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 22269)
-- Name: subscriptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subscriptions (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    source_id uuid,
    source_type character varying(255),
    user_id uuid
);


ALTER TABLE public.subscriptions OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 22274)
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    name character varying(255),
    source text DEFAULT ''::text NOT NULL
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 22279)
-- Name: user_achievement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_achievement (
    achievement_id uuid NOT NULL,
    user_id uuid NOT NULL
);


ALTER TABLE public.user_achievement OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 22284)
-- Name: user_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_tag (
    tag_id uuid NOT NULL,
    user_id uuid NOT NULL
);


ALTER TABLE public.user_tag OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 22289)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    email character varying(255),
    nickname character varying(255),
    password character varying(255),
    role_id uuid,
    verified_email boolean
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 2830 (class 2606 OID 22136)
-- Name: achievements achievements_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.achievements
    ADD CONSTRAINT achievements_pkey PRIMARY KEY (id);


--
-- TOC entry 2832 (class 2606 OID 22144)
-- Name: article_comments article_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article_comments
    ADD CONSTRAINT article_comments_pkey PRIMARY KEY (id);


--
-- TOC entry 2834 (class 2606 OID 22149)
-- Name: article_reactions article_reactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article_reactions
    ADD CONSTRAINT article_reactions_pkey PRIMARY KEY (id);


--
-- TOC entry 2836 (class 2606 OID 22154)
-- Name: article_tag article_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article_tag
    ADD CONSTRAINT article_tag_pkey PRIMARY KEY (tag_id, article_id);


--
-- TOC entry 2838 (class 2606 OID 22162)
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- TOC entry 2840 (class 2606 OID 22167)
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (id);


--
-- TOC entry 2842 (class 2606 OID 22175)
-- Name: course_comments course_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_comments
    ADD CONSTRAINT course_comments_pkey PRIMARY KEY (id);


--
-- TOC entry 2846 (class 2606 OID 22183)
-- Name: course_reactions course_reactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_reactions
    ADD CONSTRAINT course_reactions_pkey PRIMARY KEY (id);


--
-- TOC entry 2848 (class 2606 OID 22188)
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- TOC entry 2850 (class 2606 OID 22193)
-- Name: current_user_courses current_user_courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.current_user_courses
    ADD CONSTRAINT current_user_courses_pkey PRIMARY KEY (id);


--
-- TOC entry 2892 (class 2606 OID 22559)
-- Name: daily_progress daily_progress_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.daily_progress
    ADD CONSTRAINT daily_progress_pk PRIMARY KEY (id);


--
-- TOC entry 2852 (class 2606 OID 22198)
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (id);

--
-- TOC entry 2854 (class 2606 OID 22203)
-- Name: histories histories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.histories
    ADD CONSTRAINT histories_pkey PRIMARY KEY (id);


--
-- TOC entry 2858 (class 2606 OID 22208)
-- Name: homeworks homeworks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.homeworks
    ADD CONSTRAINT homeworks_pkey PRIMARY KEY (id);


--
-- TOC entry 2860 (class 2606 OID 22216)
-- Name: lecture_comments lecture_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lecture_comments
    ADD CONSTRAINT lecture_comments_pkey PRIMARY KEY (id);


--
-- TOC entry 2862 (class 2606 OID 22221)
-- Name: lecture_reactions lecture_reactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lecture_reactions
    ADD CONSTRAINT lecture_reactions_pkey PRIMARY KEY (id);


--
-- TOC entry 2864 (class 2606 OID 22226)
-- Name: lecture_tag lecture_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lecture_tag
    ADD CONSTRAINT lecture_tag_pkey PRIMARY KEY (tag_id, lecture_id);


--
-- TOC entry 2866 (class 2606 OID 22234)
-- Name: lectures lectures_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lectures
    ADD CONSTRAINT lectures_pkey PRIMARY KEY (id);


--
-- TOC entry 2868 (class 2606 OID 22242)
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- TOC entry 2870 (class 2606 OID 22247)
-- Name: paths paths_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paths
    ADD CONSTRAINT paths_pkey PRIMARY KEY (id);


--
-- TOC entry 2895 (class 2606 OID 22573)
-- Name: progress_goal progress_goal_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.progress_goal
    ADD CONSTRAINT progress_goal_pk PRIMARY KEY (id);


--
-- TOC entry 2874 (class 2606 OID 22260)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- TOC entry 2876 (class 2606 OID 22268)
-- Name: schools schools_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schools
    ADD CONSTRAINT schools_pkey PRIMARY KEY (id);


--
-- TOC entry 2872 (class 2606 OID 22255)
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- TOC entry 2878 (class 2606 OID 22273)
-- Name: subscriptions subscriptions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT subscriptions_pkey PRIMARY KEY (id);


--
-- TOC entry 2880 (class 2606 OID 22278)
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- TOC entry 2886 (class 2606 OID 22298)
-- Name: users uk_6dotkott2kjsp8vw4d0m25fb7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk_6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email);


--
-- TOC entry 2844 (class 2606 OID 22547)
-- Name: course_path uk__course_path; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_path
    ADD CONSTRAINT uk__course_path UNIQUE (course_id, path_id);


--
-- TOC entry 2856 (class 2606 OID 22554)
-- Name: histories uk__histories__lecture_user; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.histories
    ADD CONSTRAINT uk__histories__lecture_user UNIQUE (lecture_id, user_id);


--
-- TOC entry 2890 (class 2606 OID 22535)
-- Name: path_tag uk__tag_path; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.path_tag
    ADD CONSTRAINT uk__tag_path UNIQUE (tag_id, path_id);


--
-- TOC entry 2882 (class 2606 OID 22283)
-- Name: user_achievement user_achievement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_achievement
    ADD CONSTRAINT user_achievement_pkey PRIMARY KEY (achievement_id, user_id);


--
-- TOC entry 2884 (class 2606 OID 22288)
-- Name: user_tag user_tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tag
    ADD CONSTRAINT user_tag_pkey PRIMARY KEY (tag_id, user_id);


--
-- TOC entry 2888 (class 2606 OID 22296)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2893 (class 1259 OID 22565)
-- Name: daily_progress_user_id_date_uindex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX daily_progress_user_id_date_uindex ON public.daily_progress USING btree (user_id, date);

--
-- TOC entry 2940 (class 2606 OID 22560)
-- Name: daily_progress daily_progress_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.daily_progress
    ADD CONSTRAINT daily_progress_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2935 (class 2606 OID 22474)
-- Name: user_tag fk30wgo8txt0c0v8nxnwmxmrce6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tag
    ADD CONSTRAINT fk30wgo8txt0c0v8nxnwmxmrce6 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2914 (class 2606 OID 22389)
-- Name: favorites fk3dumejmn8lkhnlrcvky8x5qq2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT fk3dumejmn8lkhnlrcvky8x5qq2 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2901 (class 2606 OID 22324)
-- Name: article_tag fk3nvn435qf5rn1e9ph51e3r55h; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article_tag
    ADD CONSTRAINT fk3nvn435qf5rn1e9ph51e3r55h FOREIGN KEY (tag_id) REFERENCES public.tags(id);


--
-- TOC entry 2920 (class 2606 OID 22419)
-- Name: lecture_reactions fk3q4ijg32js4y557yhl7aoitw9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lecture_reactions
    ADD CONSTRAINT fk3q4ijg32js4y557yhl7aoitw9 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2930 (class 2606 OID 22454)
-- Name: students fk410q61iev7klncmpqfuo85ivh; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT fk410q61iev7klncmpqfuo85ivh FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2933 (class 2606 OID 22464)
-- Name: user_achievement fk5hq4ms9ikrxw18tf1wn12anj6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_achievement
    ADD CONSTRAINT fk5hq4ms9ikrxw18tf1wn12anj6 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2904 (class 2606 OID 22339)
-- Name: authors fk6g6ireq6qd4nxohq9ldidxfin; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT fk6g6ireq6qd4nxohq9ldidxfin FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2934 (class 2606 OID 22469)
-- Name: user_achievement fk7bd14tr3dioj2a091h7ke455b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_achievement
    ADD CONSTRAINT fk7bd14tr3dioj2a091h7ke455b FOREIGN KEY (achievement_id) REFERENCES public.achievements(id);


--
-- TOC entry 2912 (class 2606 OID 22379)
-- Name: current_user_courses fk84ird7r1wuhijlvhbffhwkrw3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.current_user_courses
    ADD CONSTRAINT fk84ird7r1wuhijlvhbffhwkrw3 FOREIGN KEY (course_id) REFERENCES public.courses(id);


--
-- TOC entry 2897 (class 2606 OID 22304)
-- Name: article_comments fk8gyngt3dpovo1ypp3psb7mbs5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article_comments
    ADD CONSTRAINT fk8gyngt3dpovo1ypp3psb7mbs5 FOREIGN KEY (article_id) REFERENCES public.articles(id);


--
-- TOC entry 2911 (class 2606 OID 22374)
-- Name: courses fk8vtofx6w51is16ihtsqgsr9f6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT fk8vtofx6w51is16ihtsqgsr9f6 FOREIGN KEY (author_id) REFERENCES public.authors(id);


--
-- TOC entry 2916 (class 2606 OID 22399)
-- Name: histories fk8w9eva74w7t7xtf2opb33f8bq; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.histories
    ADD CONSTRAINT fk8w9eva74w7t7xtf2opb33f8bq FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2928 (class 2606 OID 22521)
-- Name: paths fk__paths__author_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paths
    ADD CONSTRAINT fk__paths__author_id FOREIGN KEY (author_id) REFERENCES public.authors(id);


--
-- TOC entry 2929 (class 2606 OID 22526)
-- Name: paths fk__paths__tag_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paths
    ADD CONSTRAINT fk__paths__tag_id FOREIGN KEY (image_tag_id) REFERENCES public.tags(id);


--
-- TOC entry 2939 (class 2606 OID 22541)
-- Name: path_tag fk__tag_path__path; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.path_tag
    ADD CONSTRAINT fk__tag_path__path FOREIGN KEY (path_id) REFERENCES public.paths(id);


--
-- TOC entry 2938 (class 2606 OID 22536)
-- Name: path_tag fk__tag_path__tag; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.path_tag
    ADD CONSTRAINT fk__tag_path__tag FOREIGN KEY (tag_id) REFERENCES public.tags(id);


--
-- TOC entry 2926 (class 2606 OID 22548)
-- Name: lectures fk_constraint_lecture_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lectures
    ADD CONSTRAINT fk_constraint_lecture_user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2918 (class 2606 OID 22409)
-- Name: lecture_comments fkaasdgbqa6njaw47o2x6xohiho; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lecture_comments
    ADD CONSTRAINT fkaasdgbqa6njaw47o2x6xohiho FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2915 (class 2606 OID 22394)
-- Name: histories fkac33aupjexx06h4vgtphb989o; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.histories
    ADD CONSTRAINT fkac33aupjexx06h4vgtphb989o FOREIGN KEY (lecture_id) REFERENCES public.lectures(id);


--
-- TOC entry 2922 (class 2606 OID 22429)
-- Name: lecture_tag fkaprglh5r49a4gt36iv2c66kfd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lecture_tag
    ADD CONSTRAINT fkaprglh5r49a4gt36iv2c66kfd FOREIGN KEY (lecture_id) REFERENCES public.lectures(id);


--
-- TOC entry 2906 (class 2606 OID 22349)
-- Name: course_comments fkci2448eb50cohwai93f8a7sos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_comments
    ADD CONSTRAINT fkci2448eb50cohwai93f8a7sos FOREIGN KEY (course_id) REFERENCES public.courses(id);


--
-- TOC entry 2936 (class 2606 OID 22479)
-- Name: user_tag fkd4x1epa5r77ouvbahqth1vrgh; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_tag
    ADD CONSTRAINT fkd4x1epa5r77ouvbahqth1vrgh FOREIGN KEY (tag_id) REFERENCES public.tags(id);


--
-- TOC entry 2903 (class 2606 OID 22334)
-- Name: authors fke5ksm61aosfsbcco30ysuhh3c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT fke5ksm61aosfsbcco30ysuhh3c FOREIGN KEY (school_id) REFERENCES public.schools(id);


--
-- TOC entry 2909 (class 2606 OID 22364)
-- Name: course_reactions fken8c6uoy5tpx3j3rwo7ou8ymo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_reactions
    ADD CONSTRAINT fken8c6uoy5tpx3j3rwo7ou8ymo FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2925 (class 2606 OID 22444)
-- Name: lectures fkg7x5mrc5fbq2yx6w3dkyeh2t3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lectures
    ADD CONSTRAINT fkg7x5mrc5fbq2yx6w3dkyeh2t3 FOREIGN KEY (homework_id) REFERENCES public.homeworks(id);


--
-- TOC entry 2902 (class 2606 OID 22329)
-- Name: articles fkglvhv5e43dmjhmiovwhcax7aq; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT fkglvhv5e43dmjhmiovwhcax7aq FOREIGN KEY (author_id) REFERENCES public.authors(id);


--
-- TOC entry 2927 (class 2606 OID 22449)
-- Name: notifications fkgr65rstq93yakw9b4l26byhwh; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT fkgr65rstq93yakw9b4l26byhwh FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2932 (class 2606 OID 22459)
-- Name: subscriptions fkhro52ohfqfbay9774bev0qinr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subscriptions
    ADD CONSTRAINT fkhro52ohfqfbay9774bev0qinr FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2919 (class 2606 OID 22414)
-- Name: lecture_comments fkiekvglp3glcxt5xsbip7julm9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lecture_comments
    ADD CONSTRAINT fkiekvglp3glcxt5xsbip7julm9 FOREIGN KEY (lecture_id) REFERENCES public.lectures(id);


--
-- TOC entry 2907 (class 2606 OID 22354)
-- Name: course_path fkkbknacer60irnd2m9d5dxdc19; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_path
    ADD CONSTRAINT fkkbknacer60irnd2m9d5dxdc19 FOREIGN KEY (path_id) REFERENCES public.paths(id);


--
-- TOC entry 2900 (class 2606 OID 22319)
-- Name: article_tag fkkfkj25ialwd9il3fajd6vkmv5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article_tag
    ADD CONSTRAINT fkkfkj25ialwd9il3fajd6vkmv5 FOREIGN KEY (article_id) REFERENCES public.articles(id);


--
-- TOC entry 2908 (class 2606 OID 22359)
-- Name: course_path fklnhrplmfn94led1ioflrwjkgj; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_path
    ADD CONSTRAINT fklnhrplmfn94led1ioflrwjkgj FOREIGN KEY (course_id) REFERENCES public.courses(id);


--
-- TOC entry 2898 (class 2606 OID 22309)
-- Name: article_reactions fklqvt3q3ciaikqtdst7ieypr5v; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article_reactions
    ADD CONSTRAINT fklqvt3q3ciaikqtdst7ieypr5v FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2896 (class 2606 OID 22299)
-- Name: article_comments fkn40omsbuitpr309fymoqidcry; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article_comments
    ADD CONSTRAINT fkn40omsbuitpr309fymoqidcry FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2910 (class 2606 OID 22369)
-- Name: course_reactions fko2b8lp8c2lsdijx7br5thb4cq; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_reactions
    ADD CONSTRAINT fko2b8lp8c2lsdijx7br5thb4cq FOREIGN KEY (course_id) REFERENCES public.courses(id);


--
-- TOC entry 2913 (class 2606 OID 22384)
-- Name: current_user_courses fkosqqgrup8iop4d3xtbacdr87r; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.current_user_courses
    ADD CONSTRAINT fkosqqgrup8iop4d3xtbacdr87r FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2937 (class 2606 OID 22484)
-- Name: users fkp56c1712k691lhsyewcssf40f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT fkp56c1712k691lhsyewcssf40f FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- TOC entry 2899 (class 2606 OID 22314)
-- Name: article_reactions fksg9vlu2i6nrxyjd2to3oyqiss; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.article_reactions
    ADD CONSTRAINT fksg9vlu2i6nrxyjd2to3oyqiss FOREIGN KEY (article_id) REFERENCES public.articles(id);


--
-- TOC entry 2905 (class 2606 OID 22344)
-- Name: course_comments fksga1204uxye4tjjn2bn1marn9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_comments
    ADD CONSTRAINT fksga1204uxye4tjjn2bn1marn9 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2924 (class 2606 OID 22439)
-- Name: lectures fksj4m8ipr4qnehoyxk7kbu3ide; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lectures
    ADD CONSTRAINT fksj4m8ipr4qnehoyxk7kbu3ide FOREIGN KEY (course_id) REFERENCES public.courses(id);


--
-- TOC entry 2917 (class 2606 OID 22404)
-- Name: homeworks fksu2t9ij660j01y1atx16d1okx; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.homeworks
    ADD CONSTRAINT fksu2t9ij660j01y1atx16d1okx FOREIGN KEY (lecture_id) REFERENCES public.lectures(id);


--
-- TOC entry 2923 (class 2606 OID 22434)
-- Name: lecture_tag fktfple3s8uj8rjdd330tl2c5tk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lecture_tag
    ADD CONSTRAINT fktfple3s8uj8rjdd330tl2c5tk FOREIGN KEY (tag_id) REFERENCES public.tags(id);


--
-- TOC entry 2921 (class 2606 OID 22424)
-- Name: lecture_reactions fkvlipk3spr1c14n6mwubaon5k; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lecture_reactions
    ADD CONSTRAINT fkvlipk3spr1c14n6mwubaon5k FOREIGN KEY (lecture_id) REFERENCES public.lectures(id);


--
-- TOC entry 2931 (class 2606 OID 22574)
-- Name: students students_progress_goal_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_progress_goal_id_fk FOREIGN KEY (goal_id) REFERENCES public.progress_goal(id);


-- Completed on 2020-09-07 10:33:26

--
-- PostgreSQL database dump complete
--