-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mer. 17 mai 2023 à 11:26
-- Version du serveur :  5.7.24
-- Version de PHP : 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `opwatt`
--

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `pseudo` text NOT NULL,
  `password` text NOT NULL,
  `cards` text NOT NULL,
  `decks` text NOT NULL,
  `money` int(11) NOT NULL,
  `email` text NOT NULL,
  `pack_bronze` int(11) NOT NULL,
  `pack_silver` int(11) NOT NULL,
  `pack_gold` int(11) NOT NULL,
  `pack_north_blue` int(11) NOT NULL,
  `pack_south_blue` int(11) NOT NULL,
  `pack_east_blue` int(11) NOT NULL,
  `pack_west_blue` int(11) NOT NULL,
  `progressionhistoire` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `pseudo`, `password`, `cards`, `decks`, `money`, `email`, `pack_bronze`, `pack_silver`, `pack_gold`, `pack_north_blue`, `pack_south_blue`, `pack_east_blue`, `pack_west_blue`, `progressionhistoire`) VALUES
(1, 'EVAWDUNOS', 'admin', '3786,2909,3226,3609,2700,3695,3720,3812,2018,2381,2964,1267,2363,3672,3755,8,2661,2804,3275,3048,1593', '3786,2909,3226,3609,2700,3695,3720,3812,2018,2381,2964,1267,2363,3672,3755;', 99999, '', 0, 0, 0, 0, 0, 0, 0, 16),
(2, 'rere', 'rere', '3786,2909,3226,3609,2700,3695,3720,3812,2018,2381,2964,1267,2363,3672,3755,8,2661,2804,3275,3048,1593', '3786,2909,3226,3609,2700,3695,3720,3812,2018,2381,2964,1267,2363,3672,3755', 99999, 'rem.degraeve@gmail.com', 0, 0, 0, 0, 0, 0, 0, 0),
(3, 'mordekaiser', 'caca', '0', '0', 0, 'prout@gmail.com', 3, 0, 0, 3, 0, 0, 0, 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
