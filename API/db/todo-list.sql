-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 21, 2024 at 05:50 PM
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
-- Database: `todo-list`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `activityId` int(11) NOT NULL,
  `activityName` varchar(50) NOT NULL,
  `timeStarted` datetime NOT NULL,
  `timeEnd` datetime NOT NULL,
  `repeated` tinyint(4) NOT NULL DEFAULT 0,
  `color` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`activityId`, `activityName`, `timeStarted`, `timeEnd`, `repeated`, `color`, `userId`) VALUES
(4, 'Ăn Tối', '2024-07-21 14:26:58', '2024-07-21 21:59:58', 4, 'white', 1);

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `countryId` int(11) NOT NULL,
  `countryName` varchar(255) NOT NULL,
  `countryLanguage` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`countryId`, `countryName`, `countryLanguage`) VALUES
(1, 'Việt Nam', 'Vietnamese');

-- --------------------------------------------------------

--
-- Table structure for table `deadline`
--

CREATE TABLE `deadline` (
  `deadlineId` int(11) NOT NULL,
  `deadlineName` varchar(255) NOT NULL,
  `timeEnd` datetime NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `color` varchar(10) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deadline`
--

INSERT INTO `deadline` (`deadlineId`, `deadlineName`, `timeEnd`, `status`, `color`, `userId`) VALUES
(1, 'Hoan thanh project', '2024-07-31 15:08:43', 0, 'white', 1);

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `eventId` int(11) NOT NULL,
  `eventName` varchar(255) NOT NULL,
  `dayStarted` date NOT NULL,
  `dayEnd` date NOT NULL,
  `repeated` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `color` varchar(10) NOT NULL DEFAULT '#2ecc71'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`eventId`, `eventName`, `dayStarted`, `dayEnd`, `repeated`, `userId`, `color`) VALUES
(3, 'choi tet', '2024-11-24', '2024-11-24', 4, 1, 'red'),
(11, 'Nghi Mat', '2024-12-15', '2024-12-19', 4, 1, 'white');

-- --------------------------------------------------------

--
-- Table structure for table `goal`
--

CREATE TABLE `goal` (
  `goalId` int(11) NOT NULL,
  `goalName` varchar(255) NOT NULL,
  `repeated` int(11) NOT NULL DEFAULT 0,
  `unitsOfTime` varchar(20) NOT NULL DEFAULT 'days',
  `timeStarted` date NOT NULL DEFAULT current_timestamp(),
  `color` varchar(10) NOT NULL,
  `lastDone` date DEFAULT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `goal`
--

INSERT INTO `goal` (`goalId`, `goalName`, `repeated`, `unitsOfTime`, `timeStarted`, `color`, `lastDone`, `userId`) VALUES
(1, 'Chay bo', 100, 'days', '2023-07-20', 'white', '2023-07-21', 1);

-- --------------------------------------------------------

--
-- Table structure for table `holiday`
--

CREATE TABLE `holiday` (
  `holidayId` int(11) NOT NULL,
  `holidayName` varchar(255) NOT NULL,
  `timeStarted` date NOT NULL,
  `timeEnd` date NOT NULL,
  `countryId` int(11) NOT NULL,
  `color` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `region`
--

CREATE TABLE `region` (
  `regionId` int(11) NOT NULL,
  `countryId` int(11) NOT NULL,
  `regionName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `region`
--

INSERT INTO `region` (`regionId`, `countryId`, `regionName`) VALUES
(1, 1, 'Hà Nội');

-- --------------------------------------------------------

--
-- Table structure for table `userbasic`
--

CREATE TABLE `userbasic` (
  `userId` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `regionId` int(11) NOT NULL,
  `gender` tinyint(4) DEFAULT 1,
  `birth` date DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `permission` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userbasic`
--

INSERT INTO `userbasic` (`userId`, `email`, `firstName`, `lastName`, `password`, `mobile`, `regionId`, `gender`, `birth`, `height`, `weight`, `avatar`, `permission`) VALUES
(1, 'gunnytuananh@gmail.com', 'nguyen tuan', 'anh', '123456', '0879524005', 1, 2, '2005-02-23', 190, 73, 'like', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`activityId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`countryId`);

--
-- Indexes for table `deadline`
--
ALTER TABLE `deadline`
  ADD PRIMARY KEY (`deadlineId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`eventId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `goal`
--
ALTER TABLE `goal`
  ADD PRIMARY KEY (`goalId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `holiday`
--
ALTER TABLE `holiday`
  ADD PRIMARY KEY (`holidayId`),
  ADD KEY `countryId` (`countryId`);

--
-- Indexes for table `region`
--
ALTER TABLE `region`
  ADD PRIMARY KEY (`regionId`),
  ADD UNIQUE KEY `cityName` (`regionName`),
  ADD KEY `countryId` (`countryId`);

--
-- Indexes for table `userbasic`
--
ALTER TABLE `userbasic`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `regionId` (`regionId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `activityId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `countryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `deadline`
--
ALTER TABLE `deadline`
  MODIFY `deadlineId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `eventId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `goal`
--
ALTER TABLE `goal`
  MODIFY `goalId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `holiday`
--
ALTER TABLE `holiday`
  MODIFY `holidayId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `region`
--
ALTER TABLE `region`
  MODIFY `regionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `userbasic`
--
ALTER TABLE `userbasic`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `userbasic` (`userId`);

--
-- Constraints for table `deadline`
--
ALTER TABLE `deadline`
  ADD CONSTRAINT `deadline_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `userbasic` (`userId`);

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `userbasic` (`userId`);

--
-- Constraints for table `goal`
--
ALTER TABLE `goal`
  ADD CONSTRAINT `goal_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `userbasic` (`userId`);

--
-- Constraints for table `holiday`
--
ALTER TABLE `holiday`
  ADD CONSTRAINT `holiday_ibfk_1` FOREIGN KEY (`countryId`) REFERENCES `country` (`countryId`);

--
-- Constraints for table `region`
--
ALTER TABLE `region`
  ADD CONSTRAINT `region_ibfk_1` FOREIGN KEY (`countryId`) REFERENCES `country` (`countryId`);

--
-- Constraints for table `userbasic`
--
ALTER TABLE `userbasic`
  ADD CONSTRAINT `userbasic_ibfk_1` FOREIGN KEY (`regionId`) REFERENCES `region` (`regionId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
