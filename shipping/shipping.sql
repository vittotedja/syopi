CREATE DATABASE IF NOT EXISTS `shipping` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `shipping`;

DROP TABLE IF EXISTS `shipping`;
CREATE TABLE IF NOT EXISTS `shipping` (
  `shipment_id` int(10) NOT NULL,
  `from_port` char(13) NOT NULL,
  `to_port` char(13) NOT NULL,
  `status` char(13) DEFAULT NULL,
  PRIMARY KEY (`shipment_id`),
--   CONSTRAINT `fk_order_id`
--     FOREIGN KEY (`order_id`)
--     REFERENCES `order` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `shipping`(`shipment_id`, `from_port`, `to_port`, `status`) VALUES (01, 'Jakarta', 'Singapore', 'OTW'), (02, 'Hatiku', 'Hatimu', 'OTW'), (03, 'Dunia', 'Surga', 'OTW');
