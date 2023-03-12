drop table if exists QUIZ CASCADE;
drop table if exists QUIZ_QUESTION_LIST CASCADE;

create table QUIZ
(
    ID          VARCHAR(255) not null primary key,
    DESCRIPTION VARCHAR(255),
    NAME        VARCHAR(255)
);

create table QUIZ_QUESTION_LIST
(
    QUIZ_ID       VARCHAR(255) not null
                    constraint QUIZ_ID_IDX
                    references QUIZ,
    ANSWERS       VARCHAR(255) ARRAY,
    QUESTION_TEXT VARCHAR(2048)
);

create index QUIZ_ID_IDX
    on QUIZ_QUESTION_LIST (QUIZ_ID);