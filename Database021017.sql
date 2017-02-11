CREATE DATABASE  IF NOT EXISTS `sharingeco` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `sharingeco`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: sharingeco
-- ------------------------------------------------------
-- Server version	5.5.54-log

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
INSERT INTO `mail` VALUES (1,2,'1486770509','Hi this is Matt, I\'d like to rent your house'),(2,1,'1486770512','Sounds great, here is my phone number 408-867-5309. Call me between 8am and 10pm mon to sat to schedule a viewing');
/*!40000 ALTER TABLE `mail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post` (
  `ID` int(11) NOT NULL,
  `CreatorID` int(11) NOT NULL,
  `Title` varchar(256) NOT NULL,
  `ItemType` varchar(32) NOT NULL,
  `JsonDesc` varchar(8192) NOT NULL,
  `DateCreated` mediumtext NOT NULL,
  KEY `CreatorID` (`CreatorID`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`CreatorID`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,1,'4BD House','House','{\"post\":[{\"location\":\"Fremont\",\"sqft\":\"725\",\"pets\":\"cats\",\"parking\":\"street\",\"cost\":\"700\",\"lease\":\"12 Months\"}]}','1486770500');
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
  `Email` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'12f2d0cfacf10953fba3bb1aa1ea6bff817f997d1b574f840bf16fbe6e29e942','thissalt','Matt','Davis','Mdavis2599@gmail.com'),(2,'78a096f49651dc644eaa3a9ba43abae627a197035aef180d8cff82b894d0bff7','thatsalt','John','Doe','JohnDoe@gmail.com');
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

-- Dump completed on 2017-02-10 16:12:30
