-- drop table if exists users ;
create table users
(
    id serial primary key,
    user_name text not null unique,
    user_count int not null
);
