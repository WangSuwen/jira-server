### 1、user
|字段名|类型|默认值|描述|
|--|--|--|--|
|id|INT| not null | ID |
| account | VARCHAR | not null | 账号 |
| password | VARCHAR | not null | 密码 |
| name | VARCHAR | not null | 姓名 |
| avatar | VARCHAR |  | 头像 |
```
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL DEFAULT '' COMMENT '姓名',
  `age` int(11) NOT NULL DEFAULT '0' COMMENT '年龄',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```
### 2、project (项目)
|字段名|类型|默认值|描述|
|--|--|--|--|
|id|INT| not null | ID |
| name | VARCHAR | not null | 项目名称 |
| created_at | DATE | not null | 创建时间 |
| created_by | VARCHAR | not null | 创建人 ID |
| key | VARCHAR | not null, unique | 项目的key，id的替代品 |

### 3、proj_follow_rel (项目关注关系表)
|字段名|类型|默认值|描述|
|--|--|--|--|
| proj_id | INT | not null | 项目ID |
| user_id | INT | not null | 关注人ID |
| follow | INT | not null | 是否关注  0：否；1： 是 |