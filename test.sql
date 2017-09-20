/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.7.14 : Database - db_testing
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_testing` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `db_testing`;

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`migration`,`batch`) values (1,'2017_09_20_024842_create_user_table',1);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telpon` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`nama`,`alamat`,`telpon`,`created_at`,`updated_at`) values (2,'Hasanudin','Malang','081335240212','2017-09-20 05:06:23','2017-09-20 05:07:21'),(3,'Supri','Malang','083212121112','2017-09-20 05:07:13','2017-09-20 05:07:13'),(4,'Silah','Malang','08133532121212','2017-09-20 05:18:02','2017-09-20 05:18:02'),(5,'Silah','Malang','08133532121212','2017-09-20 05:18:32','2017-09-20 05:18:32'),(6,'Silah','Malang','08133532121212','2017-09-20 05:18:45','2017-09-20 05:18:45'),(7,'Sisil','Malang','081335240212','2017-09-20 05:20:03','2017-09-20 05:20:03'),(8,'Sisil','Malang','081335240212','2017-09-20 05:21:20','2017-09-20 05:21:20'),(9,'A','S','12345','2017-09-20 05:21:34','2017-09-20 05:21:34'),(10,'A','S','12345','2017-09-20 05:21:38','2017-09-20 05:21:38'),(11,'A','S','12345','2017-09-20 05:21:57','2017-09-20 05:21:57'),(12,'A','S','12345','2017-09-20 05:22:18','2017-09-20 05:22:18'),(13,'A','S','12345','2017-09-20 05:23:50','2017-09-20 05:23:50'),(14,'Salim','89','083212121113','2017-09-20 05:51:05','2017-09-20 05:51:05');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
