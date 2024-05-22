-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 06, 2024 at 06:40 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node-mysql-signup-verification-api`
--

-- --------------------------------------------------------

--
-- Table structure for table `refreshtokens`
--

CREATE TABLE `refreshtokens` (
  `id` int(11) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `expires` datetime DEFAULT NULL,
  `created` datetime NOT NULL,
  `createdByIp` varchar(255) DEFAULT NULL,
  `revoked` datetime DEFAULT NULL,
  `revokedByIp` varchar(255) DEFAULT NULL,
  `replacedByToken` varchar(255) DEFAULT NULL,
  `accountId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `refreshtokens`
--

INSERT INTO `refreshtokens` (`id`, `token`, `expires`, `created`, `createdByIp`, `revoked`, `revokedByIp`, `replacedByToken`, `accountId`) VALUES
(1, '179fc36d25db3ba1590dea36ae62ab511b6b6a79b9759dfe62a39472631604ba79b9801cff2e3f45', '2024-04-13 04:15:33', '2024-04-06 04:15:33', '::ffff:127.0.0.1', NULL, NULL, NULL, 1),
(2, 'c80ea43d370715818af553bf5bf2137d6859a6d676184dc7192c4ff22d214e5d7a3a8b0869d6d76c', '2024-04-13 04:23:16', '2024-04-06 04:23:16', '::ffff:127.0.0.1', '2024-04-06 04:31:29', '::ffff:127.0.0.1', '096a979635c97bfac10165758feb90208c7e99d151b05f2e208fdf42f786f7a6241b4cfb03345cbe', 1),
(3, '096a979635c97bfac10165758feb90208c7e99d151b05f2e208fdf42f786f7a6241b4cfb03345cbe', '2024-04-13 04:31:29', '2024-04-06 04:31:29', '::ffff:127.0.0.1', NULL, NULL, NULL, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `refreshtokens`
--
ALTER TABLE `refreshtokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `accountId` (`accountId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `refreshtokens`
--
ALTER TABLE `refreshtokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `refreshtokens`
--
ALTER TABLE `refreshtokens`
  ADD CONSTRAINT `refreshtokens_ibfk_1` FOREIGN KEY (`accountId`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
