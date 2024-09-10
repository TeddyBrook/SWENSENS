-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 10, 2024 at 06:25 AM
-- Server version: 8.0.37
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `swensens`
--

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `item_Id` int NOT NULL,
  `item_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `item_price` varchar(50) NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`item_Id`, `item_name`, `item_price`, `image`) VALUES
(1, 'มาการองแสนหวาน 1.5 ปอนด์', '599', NULL),
(2, 'ไอศกรีมเค้ก โซ สตรอว์เบอร์รี 1.5 ปอนด์', '499', NULL),
(3, 'ไอศกรีมเค้ก โซ สตรอว์เบอร์รี 2 ปอนด์', '699', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_Id` int NOT NULL,
  `role_Name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `user_Id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_Id`, `role_Name`, `user_Id`) VALUES
(1, 'male', 1),
(2, 'male', 2),
(3, 'female', 3),
(4, 'male', 4),
(5, 'male', 5);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_Id` int NOT NULL,
  `first_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `passwords` varchar(100) DEFAULT NULL,
  `date_of_birth` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `phone_number` int DEFAULT NULL,
  `role_Id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_Id`, `first_name`, `last_name`, `email`, `passwords`, `date_of_birth`, `phone_number`, `role_Id`) VALUES
(1, 'Kritsada', 'Gowintasuttikul', 'Brook-Kritsada@hotmail.com', '123456', '2000-08-18', 945539514, 1),
(2, 'Taleongrath', 'Gowintasuttikul', 'T@hotmail.com', '123456', '1999-06-26', 945455536, 2),
(3, 'Nongnapat', 'Chobtham', 'M@hotmail.com', '123456', '1997-10-06', 945462692, 3),
(4, 'Pakphoom', 'Suwanwijit', 'J@hotmail.com', '123456', '2000-08-01', 946587924, 4),
(5, 'Anirut', 'Kamnoi', 'C@hotmail.com', '123456', '2000-01-05', 923654879, 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`item_Id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_Id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_Id`),
  ADD KEY `role_Id_fk` (`role_Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `item_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `role_Id_fk` FOREIGN KEY (`role_Id`) REFERENCES `role` (`role_Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
