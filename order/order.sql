SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";



CREATE DATABASE IF NOT EXISTS `order` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `order`;



DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `Order` (
  `productName` varchar(64) NOT NULL,
  `productId` char(13) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `availability` int(11) DEFAULT NULL,
  `paymentStatus` boolean DEFAULT false,
  PRIMARY KEY (`productID`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;


INSERT INTO `order` (`productName`, `productId`, `price`, `availability`, `paymentStatus`) VALUES
('Hair Dryer', '7463829261823', '15.25', 50, false),
('Microphone', '7463829261821', '50.50', 1, false),
('Bottle', '7463829261862', '9.00', 20, false),
('Tissue Box', '7463829269261', '4.00', 60, false),
('Phone Charger', '7463829261925', '15.00', 34, false),
('SAMSUNG Tablet', '7463829261079', '200.00', 3, false),
('Printer', '7463829253625', '34.00', 4, false),
('Phone Stand', '7463829264293', '10.00', 17, false);
COMMIT;

