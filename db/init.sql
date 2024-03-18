create database sobriety_app;
use sobriety_app;


create table addiction_types (
	id int auto_increment,
    name varchar(255),
    
    primary key (id)
);

create table users (
	user_id int auto_increment,
	display_name varchar(255) not null,
    email varchar(320) unique not null,
    password varchar(255) not null,
    addiction int,
    
    primary key (user_id),
    foreign key (addiction) references addiction_types(id)
);

create table streak (
	user_id int not null,
    streak_year year not null,
    streak_array text,

	primary key (user_id, streak_year),
    foreign key (user_id) references users(user_id)
);

create table blog_posts (
	post_id int auto_increment,
    author int not null,
    date_created datetime not null,
    date_edited datetime,
    heading varchar(255) not null,
    content text not null,
    upvote int,
    
    primary key (post_id),
    foreign key (author) references users(user_id)
);

create table main_content (
	id int auto_increment,
    author int not null,
    heading varchar(255) not null,
    body text not null,
    
    primary key (id),
    foreign key (author) references users(user_id)
);
