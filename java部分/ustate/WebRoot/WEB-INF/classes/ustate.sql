/*----------------创建数据库------------------------*/
drop database if exists ustate;

create database ustate default character set utf8;

use ustate;
/*-------------------profile表-------------------*/
drop table if exists profile;

create table profile
(
	/*个人编号*/
	prof_id int(8) auto_increment,
	/*个人名*/
	prof_nickname varchar(64),
	/*个人头像*/
	prof_avatar varchar(128),
	/*个人性别*/
	prof_gender tinyint(1),
	/*设置个人编号为主键*/
	primary key(prof_id)
);
/*-------------------profiledetail表-------------------*/
drop table if exists profiledetail;

create table profiledetail
(
	/*个人细节编号*/
	profdtl_id int(8) auto_increment,
	/*个人生日*/
	profdtl_birthday Date,
	/*个人地址*/
	profdtl_address varchar(64),
	/*对应个人表id*/
	profdtl_prof_id int(8),
	/*设置个人细节编号为主键*/
	primary key(profdtl_id),
	/*设置外键与个人表关联*/
	constraint profdtl_prof_id_fk foreign key(profdtl_prof_id) references profile(prof_id) on delete set null on update cascade
);

/*-------------------user表--------------------------*/
drop table if exists user;

create table user
(
	/*用户编号*/
	user_id int(8) auto_increment,
	/*用户登录名*/
	user_loginname varchar(16),
	/*用户登录密码*/
	user_password varchar(16),
	/*用户对应个人*/
	user_prof_id int(8),
	/*设置用户编号为主键*/
	primary key(user_id),
	/*设置外键与个人表间的关系*/
	constraint user_prof_id_fk foreign key(user_prof_id) references profile(prof_id) on delete set null on update cascade
);
/*-------------------statement表-------------------*/
drop table if exists statement;

create table statement
(
	/*陈述编号*/
	stmt_id int(8) auto_increment,
	/*陈述内容*/
	stmt_content varchar(512),
	/*陈述创建时间*/
	stmt_createtime timestamp not null default current_timestamp,
	/*陈述者*/
	stmt_prof_id int(8),
	/*是否匿名发表*/
	stmt_sercret tinyint(1),
	/*设置陈述编号为主键*/
	primary key(stmt_id),
	/*设置外键与profile表的关系*/
	constraint stmt_prof_id_fk foreign key(stmt_prof_id) references profile(prof_id) on delete set null on update cascade
);

/*-------------------comment表-------------------*/
drop table if exists comment;

create table comment
(
	/*评论编号*/
	cmt_id int(8) auto_increment,
	/*评论内容*/
	cmt_content varchar(512),
	/*评论创建时间*/
	cmt_createtime timestamp not null default current_timestamp,
	/*评论所在陈述*/
	cmt_stmt_id int(8),
	/*评论者*/
	cmt_prof_id int(8),
	/*是否匿名评论*/
	cmt_sercret tinyint(1),
	/*设置评论编号为主键*/
	primary key(cmt_id),
	/*设置外键与statement表的关系*/
	constraint cmt_stmt_id_fk foreign key(cmt_stmt_id) references statement(stmt_id) on delete set null on update cascade,
	/*设置外键与profile表的关系*/
	constraint cmt_prof_id_fk foreign key(cmt_prof_id) references profile(prof_id) on delete set null on update cascade
);

/*-------------------like_s表-------------------*/
drop table if exists like_s;

create table like_s
(
	/*点赞编号*/
	l_s_id int(8) auto_increment,
	/*点赞人*/
	l_s_prof_id int(8),
	/*点赞时刻*/
	l_s_createtime timestamp not null default current_timestamp,
	/*点赞所在目的地编号*/
	l_s_def_id int(8),
	/*设置点赞编号为主键*/
	primary key(l_s_id),
	/*设置外键与statement表的关系*/
	constraint l_s_def_id_fk foreign key(l_s_def_id) references statement(stmt_id) on delete set null on update cascade
);
/*-------------------like_c表-------------------*/
drop table if exists like_c;

create table like_c
(
	/*点赞编号*/
	l_c_id int(8) auto_increment,
	/*点赞人*/
	l_c_prof_id int(8),
	/*点赞评论编号*/
	l_c_def_id int(8),
	/*点赞时刻*/
	l_c_createtime timestamp not null default current_timestamp,
	/*设置点赞编号为主键*/
	primary key(l_c_id),
	/*设置外键与statement表的关系*/
	constraint l_c_def_id_fk foreign key(l_c_def_id) references comment(cmt_id) on delete set null on update cascade
);

	
/*-------------------notice表-------------------*/
drop table if exists notice;

create table notice (
	/*通知编号*/
	note_id int(8) auto_increment,
	/*通知对象*/
	note_def_prof_id int(8),
	/*产生通知对象*/
	note_prof_id int(8),
	/*通知所在stmtId*/
	note_stmt_id int(8),
	/*通知状态*/
	note_status tinyint default 1,
	/*通知类型*/
	note_type tinyint,
	/*通知产生时间*/
	note_createtime timestamp not null default current_timestamp,
	/*通知评论内容*/
	/*note_content varchar(512) default '',*/
	/*通知所在cmtId*/
	note_cmt_id int(8),
	/*设置通知编号为主键*/
	primary key(note_id),
	constraint note_def_prof_id_fk foreign key(note_def_prof_id) references profile(prof_id) on delete set null on update cascade,
	/*设置外键与profile表的关系*/
	constraint note_porf_id_fk foreign key(note_prof_id) references profile(prof_id) on delete set null on update cascade,
	/*设置外键与statement表的关系*/
	constraint note_stmt_id_fk foreign key(note_stmt_id) references statement(stmt_id) on delete set null on update cascade,
	constraint note_cmt_id_fk foreign key(note_cmt_id) references comment(cmt_id) on delete set null on update cascade
);


/*---------------------report表----------------------*/
drop table if exists report;

create table report (
	/*举报编号*/
	rep_id int(8) auto_increment,
	/*举报时间*/
	rep_createtime timestamp not null default current_timestamp,
	/*举报人*/
	rep_prof_id int(8),
	/*举报发表或评论编号*/
	rep_def_id int(8),
	/*举报类型*/
	rep_type_id tinyint(1),
	/*举报内容类型*/
	rep_content_id tinyint(1),
	primary key(rep_id),
	/*设置外键与profile表的关系*/
	constraint rep_prof_id_fk foreign key(rep_prof_id) references profile(prof_id) on delete set null on update cascade
);


/*---------------------feedback表---------------------------------*/
drop table if exists feedback;

create table feedback (
	/*反馈编号*/
	fb_id int(8) auto_increment,
	/*反馈时间*/
	fb_createtime timestamp not null default current_timestamp,
	/*反馈人*/
	fb_prof_id int(8),
	/*反馈内容*/
	fb_content varchar(512),
	/*设置反馈编号为主键*/
	primary key(fb_id)
);

/*---------------------search表---------------------------------*/
drop table if exists search;

create table search (
	/*寻找编号*/
	sec_id int(8) auto_increment,
	/*发起寻找时刻*/
	sec_createtime timestamp not null default current_timestamp,
	/*发起人编号*/
	sec_prof_id int(8),
	/*校园卡号码*/
	sec_number varchar(10),
	/*校园卡持有者姓名*/
	sec_name varchar(5),
	/*联系电话*/
	sec_phone varchar(11),
	/*联系QQ*/
	sec_qq varchar(10),
	/*寻找类型*/
	sec_type tinyint(1),
	/*寻找状态*/
	sec_status tinyint(1) default 1,
	/*寻找备注*/
	sec_remark varchar(32),
	/*设置主键*/
	primary key(sec_id),
	/*设置外键与profile表间的关系*/
	constraint sec_prof_id_fk foreign key(sec_prof_id) references profile(prof_id) on delete set null on update cascade
);




/*-----------插入值-----------*/

insert into user (user_loginname, user_password, user_prof_id) values(,'jokerxue','jokerxue','000012138');

insert into profile (prof_nickname, prof_avatar, prof_gender) values('薛之谦', 'http://tva3.sinaimg.cn/crop.0.1.750.750.180/49dd64e2jw8f0ebj1wrlpj20ku0kw74z.jpg', true);
insert into statement (stmt_content, stmt_createtime,stmt_prof_id, stmt_sercret) values('这首歌我没有写满... 留了点余地...希望它能贴近生活的存在....免费但不廉价...希望你能喜欢...', '2017-5-10 18:55:12', '000012138', 1);
insert into like_s (l_s_createtime, l_s_l_s_def_id) values('2017-5-10 18:36:38', '000012138', '012139');
insert into comment (cmt_content, cmt_createtime, cmt_cmt_cmt_sercret) values('红红火火恍恍惚惚', '2017-5-10 18:58:38','012139', '000012138', 0);
insert into comment (cmt_content, cmt_createtime, cmt_cmt_cmt_sercret) values('嗯', '2017-5-11 15:40:38','012139', '000012143', 0);

insert into like_c(l_c_id, l_cprof_id, l_c_createtime, l_c_def_id) values('2017-5-11 17:03:04', '0002');

insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values(1, '2017-5-11 17:03:04', 24);
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values(2, '2017-5-11 17:03:04', 24);
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values(3, '2017-5-11 17:03:04', 24);
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values(4 ,'2017-5-11 17:03:04', 24);
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values(5 ,'2017-5-11 17:03:04', 24);
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values(6 ,'2017-5-11 17:03:04', 24);
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values(7 ,'2017-5-11 17:03:04', 24);
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values(8 ,'2017-5-11 17:03:04', 24);
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values(9 ,'2017-5-11 17:03:04', 24);
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values(10 ,'2017-5-11 17:03:04', 24);
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values(11,'2017-5-11 17:03:04', 24);
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values(12 ,'2017-5-11 17:03:04', 24);
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values(13 ,'2017-5-11 17:03:04', 24);
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values(14 ,'2017-5-11 17:03:04', 24);
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values(15 ,'2017-5-11 17:03:04', 24);

insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values('2017-5-11 17:03:04', );
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values('2017-5-11 17:03:04', );
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values('2017-5-11 17:03:04', );
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values('2017-5-11 17:03:04', );
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values('2017-5-11 17:03:04', );
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values('2017-5-11 17:03:04', );
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values('2017-5-11 17:03:04', );
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values('2017-5-11 17:03:04', );
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values('2017-5-11 17:03:04', );
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values('2017-5-11 17:03:04', );
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values('2017-5-11 17:03:04', );
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values('2017-5-11 17:03:04', );
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values('2017-5-11 17:03:04', );
insert into like_s( l_s_prof_id, l_s_createtime, l_s_def_id) values('2017-5-11 17:03:04', );


insert into profile (prof_nickname, prof_avatar, prof_gender) values('薛之谦', 'http://tva3.sinaimg.cn/crop.0.1.750.750.180/49dd64e2jw8f0ebj1wrlpj20ku0kw74z.jpg', true);
insert into profile (prof_nickname, prof_avatar, prof_gender) values('袁姗姗', 'http://tva3.sinaimg.cn/crop.0.0.1136.1136.180/4eafaa70jw8em0cj6p2nnj20vk0vk427.jpg', false);
insert into profile (prof_nickname, prof_avatar, prof_gender) values('郭顶', 'http://tva3.sinaimg.cn/crop.8.0.733.733.180/5f0b4dafjw8fa4tsvmhatj20ku0kdaco.jpg', true);
insert into profile (prof_nickname, prof_avatar, prof_gender) values('NBA', 'http://tva2.sinaimg.cn/crop.50.50.126.126.180/7049c17bjw8eujf8ahs4zj206b06bt8n.jpg', true);
insert into profile (prof_nickname, prof_avatar, prof_gender) values('宋茜', 'http://tva3.sinaimg.cn/crop.5.0.1232.1232.180/acff3e61jw8faalsxfu54j20yi0y80w1.jpg', false);
insert into profile (prof_nickname, prof_avatar, prof_gender) values('傅双波', 'http://tvax2.sinaimg.cn/crop.0.0.996.996.180/aed48a0aly8fefkx6h4yoj20ro0roab4.jpg', true);
insert into profile (prof_nickname, prof_avatar, prof_gender) values('同学_你的头上有光环', 'http://tva1.sinaimg.cn/crop.0.0.1002.1002.180/babb3a97jw8fcntl5nr70j20ru0ru0ur.jpg', true);
insert into profile (prof_nickname, prof_avatar, prof_gender) values('乔丹-克拉克森资讯', 'http://tvax1.sinaimg.cn/crop.9.0.732.732.180/006CXISsly8fdlmf70vocj30ku0kc0t4.jpg', true);
insert into profile (prof_nickname, prof_avatar, prof_gender) values('中国第一狗仔卓伟', 'http://tva1.sinaimg.cn/crop.0.0.579.579.180/562fa161jw8f2mwmnysldj20hs0hsdh4.jpg', true);
insert into profile (prof_nickname, prof_avatar, prof_gender) values('杨幂', 'http://tva4.sinaimg.cn/crop.0.0.512.512.180/473df571jw8eku7gao4irj20e80e8dg7.jpg', false);
insert into profile (prof_nickname, prof_avatar, prof_gender) values('王丽坤', 'http://tva3.sinaimg.cn/crop.0.0.512.512.180/4fe735b8jw8ee9u2tiikmj20e80e8t99.jpg', false);
insert into profile (prof_nickname, prof_avatar, prof_gender) values('尤小右', 'http://tva3.sinaimg.cn/crop.0.0.500.500.180/68fe876ajw1en264z2b2gj20dw0dwdii.jpg', true);
insert into profile (prof_nickname, prof_avatar, prof_gender) values('慕课网', 'http://tvax3.sinaimg.cn/crop.0.0.1024.1024.180/c5131475ly8fdl70vs48jj20sg0sgjsi.jpg', true);
insert into profile (prof_nickname, prof_avatar, prof_gender) values('嘿嘿闰土', 'http://tva2.sinaimg.cn/crop.0.0.720.720.180/bd63d3e2jw8eronf87dabj20k00k0ab2.jpg', true);
insert into profile (prof_nickname, prof_avatar, prof_gender) values('么么哒嬷嬷打', 'http://tva4.sinaimg.cn/crop.0.0.996.996.180/005Kg8N4jw8f6r97zqvz3j30ro0rptbo.jpg', true);


insert into statement (stmt_content, stmt_createtime,stmt_prof_id, stmt_sercret) values('我想努力做一个人民女演员。', '2017-3-11 13:26:33', 10, 1);
insert into statement (stmt_content, stmt_createtime,stmt_prof_id, stmt_sercret) values('这首歌我没有写满... 留了点余地...希望它能贴近生活的存在....免费但不廉价...希望你能喜欢...', '2017-4-11 17:15:12', 1, 1);
insert into statement (stmt_content, stmt_createtime,stmt_prof_id, stmt_sercret) values('十分钟后... 各大音乐平台... 免费见...听歌看词... 不糊弄....愿你... 能给我这4分钟.....', '2017-3-28 23:50:00', 1, 0);
insert into statement (stmt_content, stmt_createtime,stmt_prof_id, stmt_sercret) values('要崩溃了', '2017-3-29 22:19:00', 6, 1);
insert into statement (stmt_content, stmt_createtime,stmt_prof_id, stmt_sercret) values('好的睡眠质量决定了第二天一整天的精神状态', '2017-4-11 23:31:00', 7, 1);
insert into statement (stmt_content, stmt_createtime,stmt_prof_id, stmt_sercret) values('大清早练功～佛山无影脚～', '2017-4-2 08:08:00', 2, 1);
insert into statement (stmt_content, stmt_createtime,stmt_prof_id, stmt_sercret) values('突然来了一个电话说他想我了，没错，他。我有点慌', '2017-4-18 20:45:00', 7, 0);
insert into statement (stmt_content, stmt_createtime,stmt_prof_id, stmt_sercret) values('咖啡馆里旁边两个妹子很热烈地在讨论王者荣耀如何出装，这个渗透率太厉害了', '2017-4-17 18:51:00', 12, 1);
insert into statement (stmt_content, stmt_createtime,stmt_prof_id, stmt_sercret) values('我的脾气也是超暴躁啊。不服的一定要喷回去。', '2017-3-18 01:21:00', 14, 1);
insert into statement (stmt_content, stmt_createtime,stmt_prof_id, stmt_sercret) values('感觉很诚恳是好事', '2016-7-25 15:35:00', 15, 1);
insert into statement (stmt_content, stmt_createtime,stmt_prof_id, stmt_sercret) values('“飞执期”很开心落地台北宣传，谢谢大家关照，下次再进站。', '2017-4-15 11:09:00', 3, 1);
insert into statement (stmt_content, stmt_createtime,stmt_prof_id, stmt_sercret) values('湖人的16-17赛季正式结束啦！今年年轻人们打出了13-14赛季以来的最佳战绩，下赛季我们有理由对他们有更大的期待。本赛季克拉为湖人出战81场比赛，场均上场29.2分钟，得到14.7分，3个篮板和2.6次助攻。最后还是感谢大家陪伴湖人和克拉度过了又一个赛季', '2017-4-17 18:51:00', 8, 1);
insert into statement (stmt_content, stmt_createtime,stmt_prof_id, stmt_sercret) values('收工之后是走到哪儿，就可以坐到哪儿[嘻嘻]都是知识点', '2017-4-18 17:13:00', 11, 1);
insert into statement (stmt_content, stmt_createtime,stmt_prof_id, stmt_sercret) values('学编程先修内功，算法基础与进阶', '2017-4-17 18:51:00', 13, 0);
insert into statement (stmt_content, stmt_createtime,stmt_prof_id, stmt_sercret) values('昨有一指禅，今有“摸臀杀”，还一起去“算命”，这是什么节奏？', '2017-4-13 12:15:00', 9, 1);
insert into statement (stmt_content, stmt_createtime,stmt_prof_id, stmt_sercret) values('回来继续工作咯…[加油][加油]', '2017-4-17 11:19:00', 5, 1);
insert into statement (stmt_content, stmt_createtime,stmt_prof_id, stmt_sercret) values('你真的想了解季后赛？首先，你需要“忘记”。听听六届总冠军得主、名人堂成员斯科蒂-皮蓬的讲述。NBA季后赛4月16日火热来袭，锁定CCTV5，腾讯体育和百视通。', '2017-4-12 00:05:00', 4, 1);
insert into statement (stmt_content, stmt_createtime,stmt_prof_id, stmt_sercret) values('明明你也很爱我，没理由爱不到结果~', '2017-4-26 18:29:50', 6, 1);
insert into statement (stmt_content, stmt_createtime,stmt_prof_id, stmt_sercret) values('我是开发者，我是来做测试的~', '2017-4-27 19:37:10', 6, 0);



insert into comment (cmt_content, cmt_createtime, cmt_stmt_id, cmt_prof_id) values('红红火火恍恍惚惚', '2017-4-17 13:31:38','012153', '000012153');
insert into comment (cmt_content, cmt_createtime, cmt_stmt_id, cmt_prof_id) values('嗯，vue使你快乐', '2017-4-17 21:45:04','012153', '000012150');
insert into comment (cmt_content, cmt_createtime, cmt_stmt_id, cmt_prof_id) values('巧了，我也这么打算', '2017-4-18 23:31:00','012153', '000012139');
insert into comment (cmt_content, cmt_createtime, cmt_stmt_id, cmt_prof_id) values('加油！', '2017-4-20 08:22:09','012153', '000012152');
insert into comment (cmt_content, cmt_createtime, cmt_stmt_id, cmt_prof_id) values('加油！', '2017-4-19 15:08:45','012153', '000012147');
insert into comment (cmt_content, cmt_createtime, cmt_stmt_id, cmt_prof_id) values('我是开发者，我是来做测试的', '2017-4-20 17:18:01','012153','000000666');

insert into praise_s (pra_s_id, pra_s_createtime, pra_s_profile, pra_s_statement) values('2017-4-17 13:31:38', '000012153', '012153');
insert into praise_s (pra_s_id, pra_s_createtime, pra_s_profile, pra_s_statement) values('2017-4-17 15:35:11', '000012151', '012153');
insert into praise_s (pra_s_id, pra_s_createtime, pra_s_profile, pra_s_statement) values('2017-4-17 18:26:57', '000000667', '012153');
insert into praise_s (pra_s_id, pra_s_createtime, pra_s_profile, pra_s_statement) values('2017-4-18 01:14:09', '000012138', '012153');
insert into praise_s (pra_s_id, pra_s_createtime, pra_s_profile, pra_s_statement) values('2017-4-17 09:20:37', '000012149', '012153');
insert into praise_s (pra_s_id, pra_s_createtime, pra_s_profile, pra_s_statement) values('2017-4-20 17:18:01', '000000666', '012153');
insert into praise_s (pra_s_id, pra_s_createtime, pra_s_profile, pra_s_statement) values('2017-4-21 11:20:13', '000000666', '012141');


insert into user (user_loginname, user_password, user_profile) values ('jokerxue', 'jokerxue', '000012138');
insert into user (user_loginname, user_password, user_profile) values ('nba', 'nba', '000012141');
insert into user (user_loginname, user_password, user_profile) values ('yuanss', 'yuanss', '000012139');
insert into user (user_loginname, user_password, user_profile) values ('fhb', 'fhb', '000000667');
insert into user (user_loginname, user_password, user_profile) values ('fsy', 'fsy', '000012149');


insert into praise_c (pra_c_id, pra_c_createtime, pra_c_profile, pra_c_comment) values('0001', '2017-4-21 11:20:13', '000000666', '0006');
select stmt_content, stmt_createtime, prof.prof_nickname, prof.prof_gender from statement as stmt left join profile as prof on stmt.stmt_profile = prof.prof_id order by prof.prof_id;
