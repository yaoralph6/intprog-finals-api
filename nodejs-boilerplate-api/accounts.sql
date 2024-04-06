-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 06, 2024 at 06:39 AM
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
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `acceptTerms` tinyint(1) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `verificationToken` varchar(255) DEFAULT NULL,
  `verified` datetime DEFAULT NULL,
  `resetToken` varchar(255) DEFAULT NULL,
  `resetTokenExpires` datetime DEFAULT NULL,
  `passwordReset` datetime DEFAULT NULL,
  `created` datetime NOT NULL,
  `updated` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `email`, `passwordHash`, `title`, `firstName`, `lastName`, `acceptTerms`, `role`, `verificationToken`, `verified`, `resetToken`, `resetTokenExpires`, `passwordReset`, `created`, `updated`) VALUES
(1, 'arvindy10111@gmail.com', '$2a$10$KkOkODax03SlV3OuzlYEzOxCOxWTGbRy6qfMOmI8.NiprUicHg3.y', 'Mrs.', 'Jamjam', 'Yapliong', 1, 'Admin', NULL, '2024-04-06 04:05:29', NULL, '2024-04-07 04:08:27', '2024-04-06 04:12:12', '2024-04-06 04:01:26', '2024-04-06 04:27:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
