/*
 * 数据库相关建库建表操作
 * 用于数据库初始化（在服务器手动执行）
 */

-- ----------------------------
-- Table structure for `t_accounts`
-- ----------------------------
DROP TABLE IF EXISTS `t_accounts`;
CREATE TABLE `t_accounts` (
  `account` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
