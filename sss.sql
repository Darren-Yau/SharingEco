-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: eshare
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `car` (
  `Make` varchar(64) NOT NULL,
  `Model` varchar(64) NOT NULL,
  `Yr` int(11) NOT NULL,
  `Color` varchar(64) NOT NULL,
  `Price` int(11) NOT NULL,
  `CarID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`CarID`),
  KEY `ID` (`CarID`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` VALUES ('Porsche','Panamera',2014,'Black',120,1),('Dodge','Avenger',2015,'White',200,2),('Toyota','CAMERY',2018,'RED',110,3),('Infiniti','G-37',2013,'Silver',150,4),('Chevrolet','LT-Sedan',2014,'Grey',100,5),('Toyota','Corolla',2016,'Black',100,6),('Audi','A4',2015,'Black',100,7),('BMW','535',2011,'Black',80,8),('Chevrolet','Cruze',2015,'Red',60,9),('Chevrolet','Evanda',2000,'Grey',30,10),('Hyundai','Elantra',2015,'Silver',45,11),('Nissan','Versa',2014,'Blue',40,12),('Tesla','ModelS',2013,'Red',200,13),('Accura','TSX',2016,'Black',125,14),('Ferrari','FFCoupe',2016,'Red',1000,15),('Mazda','Mazda3',2014,'Blue',80,16),('Lexsus','IS250',2016,'White',115,17),('asdasd','sadsa',1952,'asdasd',222,74);
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `house`
--

DROP TABLE IF EXISTS `house`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `house` (
  `Rent` int(11) NOT NULL,
  `Sqft` int(11) NOT NULL,
  `Rooms` int(11) NOT NULL,
  `Baths` int(11) NOT NULL,
  `HouseID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`HouseID`),
  UNIQUE KEY `HouseID_UNIQUE` (`HouseID`),
  KEY `ID` (`HouseID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `house`
--

LOCK TABLES `house` WRITE;
/*!40000 ALTER TABLE `house` DISABLE KEYS */;
INSERT INTO `house` VALUES (65,200,2,2,1),(45,100,1,1,2),(42,100,1,1,3),(118,60,3,2,4),(85,16,8,4,5),(69,315,1,1,6),(199,135,1,1,7),(49,200,1,1,8),(135,300,1,1,9),(170,350,1,1,10);
/*!40000 ALTER TABLE `house` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mail`
--

DROP TABLE IF EXISTS `mail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mail` (
  `SendID` int(11) NOT NULL,
  `RecID` int(11) NOT NULL,
  `TimeSent` mediumtext NOT NULL,
  `Message` varchar(4096) NOT NULL,
  `Sender` varchar(45) NOT NULL,
  `Receiver` varchar(45) NOT NULL,
  KEY `SendID` (`SendID`),
  KEY `RecID` (`RecID`),
  CONSTRAINT `mail_ibfk_1` FOREIGN KEY (`SendID`) REFERENCES `user` (`ID`),
  CONSTRAINT `mail_ibfk_2` FOREIGN KEY (`RecID`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mail`
--

LOCK TABLES `mail` WRITE;
/*!40000 ALTER TABLE `mail` DISABLE KEYS */;
INSERT INTO `mail` VALUES (1,2,'9997570509','Hi this is Matt, I\'d like to rent your house','Matt','John'),(2,1,'838070512','Sounds great, here is my phone number 408-867-5309. Call me between 8am and 10pm mon to sat to schedule a viewing','John','Matt'),(1,2,'9997570509','Hi this is Matt, I\'d like to rent your house','Matt','John'),(2,1,'838070512','Sounds great, here is my phone number 408-867-5309. Call me between 8am and 10pm mon to sat to schedule a viewing','John','Matt'),(1,2,'9997570509','Hi this is Matt, I\'d like to rent your house','Matt','John'),(2,1,'838070512','Sounds great, here is my phone number 408-867-5309. Call me between 8am and 10pm mon to sat to schedule a viewing','John','Matt');
/*!40000 ALTER TABLE `mail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DateCreated` date NOT NULL,
  `CreatorID` int(11) NOT NULL,
  `Title` varchar(256) NOT NULL,
  `ItemType` varchar(32) NOT NULL,
  `Description` varchar(4096) DEFAULT NULL,
  `AvailStart` date NOT NULL,
  `AvailEnd` date NOT NULL,
  `Address` varchar(45) DEFAULT NULL,
  `CarID` int(11) DEFAULT '0',
  `HouseID` int(11) DEFAULT '0',
  `imgsrc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  KEY `CreatorID` (`CreatorID`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`CreatorID`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'2017-03-04',1,'Porschess','car','Panamera 2012 Blackss','2017-02-28','2017-04-28','Hayward',1,0,'./carimg/car19.jpg'),(2,'2017-03-04',2,'Dodge','car','Avenger','2017-02-28','2017-04-28','Hayward',2,0,'./carimg/car2.jpg'),(3,'2017-03-04',3,'Toyota','car','2018 Camery','2017-02-28','2017-04-28','Hayward',3,0,'./carimg/car3.jpg'),(4,'2017-03-04',4,'Infiniti','car','G-37 silver','2017-02-28','2017-04-28','Hayward',4,0,'./carimg/car4.jpg'),(5,'2017-03-04',5,'Chevrolet','car','LT-Sedan','2017-02-28','2017-04-28','Hayward',5,0,'./carimg/car5.jpg'),(6,'2017-03-04',6,'Toyota','car','Corolla 2016','2017-02-28','2017-04-28','Hayward',6,0,'./carimg/car6.jpg'),(7,'2017-03-04',1,'Audi','car','A4 2015','2017-02-28','2017-04-28','Hayward',7,0,'./carimg/car7.jpg'),(8,'2017-03-04',2,'BMW','car','BMW 535','2017-02-28','2017-04-28','Hayward',8,0,'./carimg/car8.jpg'),(9,'2017-03-04',3,'Chevrolet','car','Red Cruze','2017-02-28','2017-04-28','Hayward',9,0,'./carimg/car9.jpg'),(10,'2017-03-04',1,'Room for Rent','house','Room by the water','2017-02-28','2017-04-28','Hayward',0,1,'./houseimg/house1.jpg'),(11,'2017-03-04',2,'The Cole Valley Cubby','house','Remodeled Bedroom','2017-02-28','2017-04-28','Hayward',0,2,'./houseimg/house2.jpg'),(12,'2017-03-04',3,'Large Sunny Bedroom','house','Private Luxury room\"','2017-02-28','2017-04-28','Hayward',0,3,'./houseimg/house3.jpg'),(13,'2017-03-04',4,'Near Central','house','Business Ready','2017-02-28','2017-04-28','Hayward',0,4,'./houseimg/house4.jpg'),(14,'2017-03-04',5,'Cozy & City','house','Good Location','2017-02-28','2017-04-28','Hayward',0,5,'./houseimg/house5.jpg'),(15,'2017-03-04',6,'Gorgeous Balcony','house','Few blocks From Golden Gate Park','2017-02-28','2017-04-28','San Francisco',0,6,'./houseimg/house6.jpg'),(16,'2017-03-04',1,'Quiet Private rooms','house','Room by the water','2017-02-28','2017-04-28','San Francisco',0,7,'./houseimg/house7.jpg'),(17,'2017-03-04',2,'Ocean Beach Hilltop','house','Beautiful view of the ocean','2017-02-28','2017-04-28','San Francisco',0,8,'./houseimg/house8.jpg'),(18,'2017-03-04',3,'Studio next the beach','house','Newly Built','2017-02-28','2017-04-28','San Francisco',0,9,'./houseimg/house9.jpg'),(19,'2017-03-04',4,'One Bed Room Amazing','house','Beautiful view of the ocean','2017-02-28','2017-04-28','San Francisco',0,10,'./houseimg/house10.jpg'),(20,'2017-03-04',4,'Chevrolet','car','Evanda','2017-02-28','2017-04-28','Hayward',10,0,'./carimg/car10.jpg'),(21,'2017-03-04',5,'Hyundai','car','Elantra','2017-02-28','2017-04-28','Hayward',11,0,'./carimg/car11.jpg'),(22,'2017-03-04',6,'Nissan','car','Versa','2017-02-28','2017-04-28','San Francisco',12,0,'./carimg/car12.jpg'),(23,'2017-03-04',1,'Tesla','car','Models','2017-02-28','2017-04-28','San Francisco',13,0,'./carimg/car13.jpg'),(24,'2017-03-04',2,'Accura','car','TSX','2017-02-28','2017-04-28','San Francisco',14,0,'./carimg/car14.jpg'),(25,'2017-03-04',3,'Ferrari','car','FFCoupe','2017-02-28','2017-04-28','San Francisco',15,0,'./carimg/car15.jpg'),(26,'2017-03-04',4,'Mazda','car','Mazda3','2017-02-28','2017-04-28','San Francisco',16,0,'./carimg/car16.jpg'),(27,'2017-03-04',5,'Lexus','car','IS250','2017-02-28','2017-04-28','San Francisco',17,0,'./carimg/car17.jpg'),(48,'2017-03-06',1,'2015','car','asdsadasd','2017-03-01','2017-04-01','asdsad',74,0,'./carimg/car19.jpg');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PassHash` varchar(64) NOT NULL,
  `PassSalt` varchar(8) NOT NULL,
  `Fname` varchar(32) NOT NULL,
  `Lname` varchar(32) NOT NULL,
  `Email` varchar(128) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'12f2d0cfacf10953fba3bb1aa1ea6bff817f997d1b574f840bf16fbe6e29e942','thissalt','Matt','Davis','Mdavis2599@gmail.com'),(2,'78a096f49651dc644eaa3a9ba43abae627a197035aef180d8cff82b894d0bff7','thatsalt','John','Doe','JohnDoe@gmail.com'),(3,'1e8eb238ff32189a634f06c65319f40e','3fb848c7','kaichen','zhu','kaichenzhu@yahoo.com'),(4,'2e9e1306b43340a0663f28491ec15a16','fd55627e','asd','asdqwe','kaichenzhu@asd.com'),(5,'92c4e3de2459de4e4b12ee0389003348','72d48b09','sasa','hh','kaichenzhu@eggw.com'),(6,'7124f7bd3adaf0209b49d80980f5b025','2b9a365b','fbdsg','sdf','kaichenzhu@y22ahoo.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-03-06 15:22:21
