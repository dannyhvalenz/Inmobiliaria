/*
    Proyecto: Inmobiliaria
    Materia: Sistemas Web
    Fecha: 5 de noviembre del 2019
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP DATABASE IF EXISTS `Inmobiliaria`;
CREATE DATABASE `Inmobiliaria`;
USE `Inmobiliaria`;

-- ----------------------------
-- Table structure for Asesor
-- ----------------------------
DROP TABLE IF EXISTS `Asesor`;
CREATE TABLE `Asesor` (
  `nombre` varchar(255) NOT NULL,
  `apellidoP` varchar(255) NOT NULL,
  `apellidoM` varchar(255) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `idAsesor` int(11) NOT NULL AUTO_INCREMENT,
  `contrasena` varchar(255) NOT NULL,
  PRIMARY KEY (`idAsesor`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of Asesor
-- ----------------------------
BEGIN;
INSERT INTO `Asesor` VALUES ('Daniela', 'Hernandez', 'Valenzuela', 'dany', '2717117751', 1, '12345');
INSERT INTO `Asesor` VALUES ('Valeria', 'Sanchez', 'Garcia', 'vale', '2282121211', 2, '12345');
INSERT INTO `Asesor` VALUES ('Rafael', 'Rojano', 'Caceres', 'rojano', '2121212121', 3, '12345');
COMMIT;

-- ----------------------------
-- Table structure for Casa
-- ----------------------------
DROP TABLE IF EXISTS `Casa`;
CREATE TABLE `Casa` (
  `idCasa` int(11) NOT NULL AUTO_INCREMENT,
  `metrosCuadrados` varchar(255) NOT NULL,
  `metrosConstruccion` varchar(255) NOT NULL,
  `numPisos` varchar(255) NOT NULL,
  `numRecamaras` varchar(255) NOT NULL,
  `numBanos` varchar(255) NOT NULL,
  `tipoCasa` varchar(255) NOT NULL,
  `tipoCocina` varchar(255) DEFAULT NULL,
  `edadCasa` varchar(255) NOT NULL,
  `cochera` varchar(255) DEFAULT NULL,
  `cocheraTechada` varchar(255) DEFAULT NULL,
  `numCoches` varchar(255) DEFAULT NULL,
  `fraccionamiento` varchar(255) DEFAULT NULL,
  `fraccionamientoVigilancia` varchar(255) DEFAULT NULL,
  `fraccionamientoAreaVerde` varchar(255) DEFAULT NULL,
  `fraccionamientoCasaClub` varchar(255) DEFAULT NULL,
  `cuartoServicio` varchar(255) DEFAULT NULL,
  `sala` varchar(255) DEFAULT NULL,
  `comedor` varchar(255) DEFAULT NULL,
  `jardin` varchar(255) DEFAULT NULL,
  `areaLavado` varchar(255) DEFAULT NULL,
  `idInmueble` int(11) NOT NULL,
  `bodega` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idCasa`),
  KEY `idInmuebleCasa` (`idInmueble`),
  CONSTRAINT `idInmuebleCasa` FOREIGN KEY (`idInmueble`) REFERENCES `Inmueble` (`idInmueble`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of Casa
-- ----------------------------
BEGIN;
INSERT INTO `Casa` VALUES (1, '700', '200', '2', '3', '3', 'InteresAlto', 'CocinaIntegral', '2', 'No', 'No', '', 'No', 'No', 'No', 'No', 'No', 'Si', 'Si', 'Si', 'Si', 57, 'No');
COMMIT;

-- ----------------------------
-- Table structure for Cliente
-- ----------------------------
DROP TABLE IF EXISTS `Cliente`;
CREATE TABLE `Cliente` (
  `nombre` varchar(255) NOT NULL,
  `apellidoP` varchar(255) NOT NULL,
  `apellidoM` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `celular` varchar(15) NOT NULL,
  `idAsesor` int(11) NOT NULL,
  `idCliente` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of Cliente
-- ----------------------------
BEGIN;
INSERT INTO `Cliente` VALUES ('Dillon', 'Mclean', 'Carter', 'feugiat@sodales.edu', '0292850988', 3, 1);
INSERT INTO `Cliente` VALUES ('Julio', 'Hardin', 'Arnold', 'Aliquam.fringilla@Phasellus.edu', '9037592028', 1, 2);
INSERT INTO `Cliente` VALUES ('Harriet', 'Mayo', 'Malone', 'eu.metus@ascelerisquesed.ca', '8112041915', 2, 4);
INSERT INTO `Cliente` VALUES ('Avram', 'Garrett', 'Rhodes', 'erat@sapienmolestieorci.ca', '9699863036', 2, 5);
INSERT INTO `Cliente` VALUES ('Igor', 'Dillon', 'Shepard', 'erat.Etiam.vestibulum@Donec.co.uk', '5324397986', 2, 6);
INSERT INTO `Cliente` VALUES ('Geoffrey', 'Wyatt', 'Gallegos', 'Donec.dignissim@musProin.net', '1126685150', 3, 10);
INSERT INTO `Cliente` VALUES ('Abbot', 'Maynard', 'Patton', 'malesuada.ut.sem@dapibusligula.com', '7473885687', 1, 11);
INSERT INTO `Cliente` VALUES ('Marny', 'Gonzales', 'Wise', 'Nam.interdum.enim@atauctorullamcorper.ca', '9551565755', 2, 12);
INSERT INTO `Cliente` VALUES ('Ima', 'Macdonald', 'Higgins', 'tempor.arcu.Vestibulum@sollicitudin.co.uk', '7000513318', 2, 13);
INSERT INTO `Cliente` VALUES ('Abdul', 'Frost', 'Ferguson', 'netus.et@vitae.net', '5484912632', 3, 14);
INSERT INTO `Cliente` VALUES ('Duncan', 'Kelly', 'Boyer', 'aliquet.libero@etmalesuada.ca', '7774987075', 2, 15);
INSERT INTO `Cliente` VALUES ('Vaughan', 'Juarez', 'Warner', 'tincidunt.nunc.ac@eutellus.net', '4374356000', 3, 16);
INSERT INTO `Cliente` VALUES ('Jorden', 'Walters', 'Spence', 'sem@incursus.ca', '9330789081', 3, 17);
INSERT INTO `Cliente` VALUES ('Kendall', 'Medina', 'Flowers', 'arcu.vel@tellusNunclectus.co.uk', '1873870957', 3, 18);
INSERT INTO `Cliente` VALUES ('Serina', 'Nixon', 'Mayer', 'consectetuer.adipiscing.elit@purusMaecenas.org', '4443991707', 1, 19);
INSERT INTO `Cliente` VALUES ('Fritz', 'Young', 'Hanson', 'commodo@iaculisenimsit.com', '1446534956', 3, 21);
INSERT INTO `Cliente` VALUES ('Uma', 'Fleming', 'Webb', 'tincidunt.pede.ac@malesuada.com', '0033829402', 1, 22);
INSERT INTO `Cliente` VALUES ('Felix', 'Casey', 'Mccormick', 'magna.sed.dui@Vestibulumaccumsan.co.uk', '3025829921', 1, 23);
INSERT INTO `Cliente` VALUES ('Lydia', 'Stephenson', 'Downs', 'ultrices.a@mi.ca', '1343540914', 1, 24);
INSERT INTO `Cliente` VALUES ('Lucas', 'Roberson', 'Sellers', 'interdum.Nunc.sollicitudin@Curabitursed.org', '4879483836', 3, 25);
INSERT INTO `Cliente` VALUES ('Daphne', 'Acevedo', 'Jacobson', 'scelerisque@lacusQuisquepurus.co.uk', '8251117670', 2, 26);
INSERT INTO `Cliente` VALUES ('Avye', 'Bailey', 'Sullivan', 'nec@molestie.co.uk', '2592539652', 3, 27);
INSERT INTO `Cliente` VALUES ('Alyssa', 'Maddox', 'Brady', 'ut.nulla.Cras@Aeneaneuismod.org', '6549909857', 2, 28);
INSERT INTO `Cliente` VALUES ('Uma', 'Padilla', 'Garner', 'malesuada.vel.convallis@placerat.ca', '0694752374', 2, 29);
INSERT INTO `Cliente` VALUES ('Quentin', 'Fleming', 'Flores', 'luctus@gravidaPraesenteu.ca', '3247055417', 2, 30);
INSERT INTO `Cliente` VALUES ('Angelica', 'Dale', 'Bright', 'ante@Quisquetincidunt.ca', '4614838908', 1, 31);
INSERT INTO `Cliente` VALUES ('Cassady', 'Bowen', 'Velez', 'Aliquam@sit.edu', '5979728382', 2, 32);
INSERT INTO `Cliente` VALUES ('Elizabeth', 'Rios', 'Stewart', 'vulputate@ac.edu', '0057727537', 2, 33);
INSERT INTO `Cliente` VALUES ('Quail', 'Key', 'Torres', 'et.nunc.Quisque@musDonec.com', '7738052312', 1, 34);
INSERT INTO `Cliente` VALUES ('Tatum', 'Moon', 'Gardner', 'Quisque.ac@nisiCum.edu', '4805048041', 1, 35);
INSERT INTO `Cliente` VALUES ('Hayley', 'Crawford', 'Nicholson', 'commodo@ProindolorNulla.org', '3769216513', 3, 36);
INSERT INTO `Cliente` VALUES ('Jin', 'Huber', 'Kinney', 'per.inceptos@ridiculusmus.com', '3429688131', 3, 37);
INSERT INTO `Cliente` VALUES ('Kennedy', 'Arnold', 'Perez', 'enim.Mauris.quis@Pellentesque.com', '7462988679', 3, 38);
INSERT INTO `Cliente` VALUES ('Emerson', 'Norton', 'Barron', 'Mauris.non.dui@magnisdisparturient.com', '4544460865', 3, 39);
INSERT INTO `Cliente` VALUES ('Hadassah', 'Spencer', 'Skinner', 'lobortis@ac.com', '1098084125', 3, 40);
INSERT INTO `Cliente` VALUES ('Brittany', 'Ferguson', 'Buchanan', 'rutrum.eu@sedsapien.ca', '6577517390', 1, 41);
INSERT INTO `Cliente` VALUES ('Miranda', 'Mcmillan', 'Merritt', 'neque.pellentesque@adipiscinglacusUt.ca', '0627357482', 1, 42);
INSERT INTO `Cliente` VALUES ('Dai', 'Contreras', 'Glass', 'aliquet@sodalespurusin.org', '8884490849', 3, 43);
INSERT INTO `Cliente` VALUES ('Adara', 'Perkins', 'Dyer', 'molestie@idanteNunc.net', '6191372671', 1, 44);
INSERT INTO `Cliente` VALUES ('Katelyn', 'Moreno', 'Leon', 'nisl.Quisque.fringilla@fringillaeuismodenim.net', '2171580534', 1, 45);
INSERT INTO `Cliente` VALUES ('Bernard', 'Mcgee', 'Nichols', 'purus.Maecenas@nec.ca', '7289222728', 1, 46);
INSERT INTO `Cliente` VALUES ('Colton', 'Roach', 'Moss', 'placerat.Cras.dictum@vitaesodales.com', '1784361937', 1, 47);
INSERT INTO `Cliente` VALUES ('Hu', 'Carlson', 'Todd', 'eu.lacus.Quisque@Aliquamfringillacursus.net', '6394959633', 3, 48);
INSERT INTO `Cliente` VALUES ('Eaton', 'Glover', 'Summers', 'Integer@vitaealiquet.edu', '1097128712', 2, 49);
INSERT INTO `Cliente` VALUES ('Erin', 'Maldonado', 'Ware', 'non.dapibus.rutrum@dolor.com', '0937534476', 2, 50);
INSERT INTO `Cliente` VALUES ('Graham', 'Hickman', 'Glover', 'rutrum.justo@adipiscingfringillaporttitor.co.uk', '8146308407', 1, 51);
INSERT INTO `Cliente` VALUES ('Shafira', 'Ross', 'Shannon', 'pharetra@placeratvelitQuisque.com', '0333249654', 2, 52);
INSERT INTO `Cliente` VALUES ('Quintessa', 'Jenkins', 'Hahn', 'augue.Sed@venenatislacus.edu', '9549619302', 1, 53);
INSERT INTO `Cliente` VALUES ('Melanie', 'Pate', 'Hood', 'eros@sedliberoProin.edu', '6658532153', 2, 54);
INSERT INTO `Cliente` VALUES ('Castor', 'Bentley', 'Fischer', 'Donec.at@Donecdignissimmagna.co.uk', '0419877540', 1, 55);
INSERT INTO `Cliente` VALUES ('Solomon', 'Chase', 'Sexton', 'vitae.aliquet.nec@lacusNulla.org', '3580999700', 3, 56);
INSERT INTO `Cliente` VALUES ('Scott', 'Patel', 'Carroll', 'luctus.aliquet.odio@dictum.ca', '5082963007', 3, 57);
INSERT INTO `Cliente` VALUES ('Hector', 'Malone', 'Case', 'nonummy.ac.feugiat@Integervulputate.co.uk', '9531985290', 3, 58);
INSERT INTO `Cliente` VALUES ('Hedy', 'Fleming', 'Bartlett', 'tempus.scelerisque.lorem@Phasellusfermentumconvallis.edu', '1855665513', 2, 59);
INSERT INTO `Cliente` VALUES ('Cassandra', 'Caldwell', 'Fry', 'ornare.facilisis.eget@Fuscediam.co.uk', '0050879943', 1, 60);
INSERT INTO `Cliente` VALUES ('Inga', 'Casey', 'Levy', 'conubia.nostra.per@posuerecubilia.edu', '5755553022', 1, 61);
INSERT INTO `Cliente` VALUES ('Griffin', 'Morin', 'Ortiz', 'ut@amet.co.uk', '8028655973', 2, 62);
INSERT INTO `Cliente` VALUES ('Marny', 'Patrick', 'Kidd', 'dolor.Nulla.semper@quamafelis.ca', '9189217047', 3, 63);
INSERT INTO `Cliente` VALUES ('Chiquita', 'Lewis', 'Short', 'eget.laoreet@nectempusmauris.net', '6170565398', 1, 64);
INSERT INTO `Cliente` VALUES ('Brent', 'Holman', 'Burt', 'Duis.mi.enim@mipedenonummy.com', '3512296458', 3, 65);
INSERT INTO `Cliente` VALUES ('Avye', 'Waters', 'Sanchez', 'tellus@semsempererat.com', '4823519574', 3, 66);
INSERT INTO `Cliente` VALUES ('Colby', 'Patton', 'Ware', 'Quisque.purus@augueeutempor.co.uk', '4922104418', 2, 67);
INSERT INTO `Cliente` VALUES ('Blaine', 'Duran', 'Maldonado', 'non.bibendum@egetmetuseu.org', '0685989214', 2, 68);
INSERT INTO `Cliente` VALUES ('Nomlanga', 'Bowen', 'Garner', 'mattis.Integer.eu@Donecfelisorci.ca', '5894278067', 1, 69);
INSERT INTO `Cliente` VALUES ('Stephen', 'Sullivan', 'Hopkins', 'consectetuer.adipiscing@ipsum.co.uk', '9777786156', 1, 70);
INSERT INTO `Cliente` VALUES ('Illiana', 'Ray', 'Villarreal', 'sed@Fuscediam.co.uk', '1934505753', 2, 71);
INSERT INTO `Cliente` VALUES ('Kenneth', 'Manning', 'Blanchard', 'libero.mauris@famesacturpis.ca', '2326987167', 1, 72);
INSERT INTO `Cliente` VALUES ('Lavinia', 'Blevins', 'Knight', 'varius.orci.in@facilisisvitae.co.uk', '2897099194', 2, 73);
INSERT INTO `Cliente` VALUES ('Ori', 'Chambers', 'Nelson', 'faucibus@Quisqueornare.com', '5681643113', 2, 74);
INSERT INTO `Cliente` VALUES ('Xaviera', 'Sharpe', 'Soto', 'Nulla@arcueuodio.org', '7756491870', 2, 75);
INSERT INTO `Cliente` VALUES ('Vincent', 'Haley', 'Rivas', 'Nulla.dignissim.Maecenas@volutpatornarefacilisis.com', '6875785607', 3, 76);
INSERT INTO `Cliente` VALUES ('Gray', 'Watts', 'Hensley', 'bibendum.ullamcorper@duiquis.co.uk', '5200073240', 3, 77);
INSERT INTO `Cliente` VALUES ('Linda', 'Dunn', 'Fuentes', 'fermentum.arcu.Vestibulum@tempusmauris.ca', '4353990875', 2, 78);
INSERT INTO `Cliente` VALUES ('Keaton', 'Burch', 'Edwards', 'eu.elit.Nulla@consequat.ca', '3205329662', 3, 79);
INSERT INTO `Cliente` VALUES ('Jolie', 'Santiago', 'Bond', 'nulla.vulputate.dui@cursus.org', '1735202362', 3, 80);
INSERT INTO `Cliente` VALUES ('Elliott', 'Montgomery', 'Pollard', 'nec.euismod.in@facilisisSuspendissecommodo.ca', '3279164396', 2, 81);
INSERT INTO `Cliente` VALUES ('Ivan', 'James', 'Padilla', 'dui@liberoInteger.edu', '8439661128', 2, 82);
INSERT INTO `Cliente` VALUES ('Murphy', 'Sutton', 'Molina', 'egestas.hendrerit@maurisMorbi.co.uk', '2779585986', 3, 83);
INSERT INTO `Cliente` VALUES ('Britanni', 'Cross', 'Burton', 'massa@sagittis.com', '8732995630', 1, 84);
INSERT INTO `Cliente` VALUES ('Sydney', 'Peterson', 'Daniels', 'Nunc.ac.sem@nibh.org', '3626350667', 2, 85);
INSERT INTO `Cliente` VALUES ('Bryar', 'Davidson', 'Fields', 'pede@eratEtiamvestibulum.co.uk', '9082901284', 2, 86);
INSERT INTO `Cliente` VALUES ('Jelani', 'Alexander', 'Barry', 'pede.malesuada@sitamet.net', '0395547953', 2, 87);
INSERT INTO `Cliente` VALUES ('Kamal', 'Lara', 'Wright', 'lacus@nonummy.ca', '2850524973', 1, 88);
INSERT INTO `Cliente` VALUES ('Lucian', 'Hartman', 'Petty', 'Phasellus.at@sedorci.co.uk', '3080940192', 2, 89);
INSERT INTO `Cliente` VALUES ('Flavia', 'Snow', 'Haley', 'lorem.eget@purusgravidasagittis.net', '8267759707', 2, 90);
INSERT INTO `Cliente` VALUES ('Pandora', 'Carr', 'Barron', 'ligula.tortor.dictum@sem.edu', '4411541966', 3, 91);
INSERT INTO `Cliente` VALUES ('Dai', 'Avila', 'Page', 'eu.enim@rhoncusProin.ca', '1554974937', 3, 93);
INSERT INTO `Cliente` VALUES ('Adria', 'Hewitt', 'Puckett', 'pellentesque.eget.dictum@utcursusluctus.org', '0154781171', 3, 94);
INSERT INTO `Cliente` VALUES ('Vanna', 'Deleon', 'Haynes', 'dolor.elit.pellentesque@consequatlectus.com', '6486505737', 3, 96);
INSERT INTO `Cliente` VALUES ('Justin', 'Scott', 'Mack', 'consectetuer.ipsum.nunc@aliquet.ca', '4008065038', 2, 97);
INSERT INTO `Cliente` VALUES ('Gillian', 'Rivera', 'Best', 'vulputate@aliquetmetus.co.uk', '6465631443', 3, 98);
INSERT INTO `Cliente` VALUES ('Venus', 'Mcknight', 'York', 'ipsum.primis@porttitorerosnec.com', '7998034681', 3, 99);
INSERT INTO `Cliente` VALUES ('Ivan', 'Boyer', 'Mills', 'eget.lacus.Mauris@magna.edu', '5210818626', 3, 100);
COMMIT;

-- ----------------------------
-- Table structure for Departamento
-- ----------------------------
DROP TABLE IF EXISTS `Departamento`;
CREATE TABLE `Departamento` (
  `idDepartamento` int(11) NOT NULL AUTO_INCREMENT,
  `idInmueble` int(11) NOT NULL,
  `metrosConstruccion` varchar(255) NOT NULL,
  `numRecamaras` varchar(255) DEFAULT NULL,
  `numPiso` varchar(255) DEFAULT NULL,
  `espacioHabitable` varchar(255) DEFAULT NULL,
  `numBanos` varchar(255) DEFAULT NULL,
  `edadDepartamento` varchar(255) DEFAULT NULL,
  `tipoDepartamento` varchar(255) DEFAULT NULL,
  `tipoCocina` varchar(255) DEFAULT NULL,
  `estacionamiento` varchar(255) DEFAULT NULL,
  `numCoches` varchar(255) DEFAULT NULL,
  `estacionamientoTechado` varchar(255) DEFAULT NULL,
  `vigilancia` varchar(255) DEFAULT NULL,
  `cuartoServicio` varchar(255) DEFAULT NULL,
  `sala` varchar(255) DEFAULT NULL,
  `comedor` varchar(255) DEFAULT NULL,
  `jardin` varchar(255) DEFAULT NULL,
  `areaLavado` varchar(255) DEFAULT NULL,
  `bodega` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idDepartamento`),
  KEY `idInmuebleDepartamento` (`idInmueble`),
  CONSTRAINT `idInmuebleDepartamento` FOREIGN KEY (`idInmueble`) REFERENCES `Inmueble` (`idInmueble`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of Departamento
-- ----------------------------
BEGIN;
INSERT INTO `Departamento` VALUES (1, 58, '150', '3', '8', '100', '3', '2', 'DeLujo', 'CocinaIntegral', 'No', '', 'No', 'Si', 'No', 'Si', 'Si', 'No', 'Si', 'No');
COMMIT;

-- ----------------------------
-- Table structure for Edificio
-- ----------------------------
DROP TABLE IF EXISTS `Edificio`;
CREATE TABLE `Edificio` (
  `idEdificio` int(11) NOT NULL AUTO_INCREMENT,
  `idInmueble` int(11) NOT NULL,
  `metrosConstruccion` varchar(255) NOT NULL,
  `numPisos` varchar(255) NOT NULL,
  `numBanos` varchar(255) DEFAULT NULL,
  `edadEdificio` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idEdificio`),
  KEY `idInmuebleEdificio` (`idInmueble`),
  CONSTRAINT `idInmuebleEdificio` FOREIGN KEY (`idInmueble`) REFERENCES `Inmueble` (`idInmueble`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of Edificio
-- ----------------------------
BEGIN;
INSERT INTO `Edificio` VALUES (1, 59, '1000', '14', '14', '2');
COMMIT;

-- ----------------------------
-- Table structure for Inmueble
-- ----------------------------
DROP TABLE IF EXISTS `Inmueble`;
CREATE TABLE `Inmueble` (
  `idPropietario` int(11) NOT NULL,
  `ciudad` varchar(255) NOT NULL,
  `colonia` varchar(255) NOT NULL,
  `calle` varchar(255) NOT NULL,
  `numExt` varchar(255) NOT NULL,
  `numInt` varchar(255) DEFAULT NULL,
  `precio` int(255) NOT NULL,
  `idInmueble` int(11) NOT NULL AUTO_INCREMENT,
  `tipoInmueble` varchar(255) NOT NULL,
  `tipoTransaccion` varchar(255) NOT NULL,
  PRIMARY KEY (`idInmueble`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of Inmueble
-- ----------------------------
BEGIN;
INSERT INTO `Inmueble` VALUES (37, 'Puebla', 'Centro', '2 Oriente', '345', '', 13000000, 56, 'Local', 'Venta');
INSERT INTO `Inmueble` VALUES (36, 'Veracruz', 'Alameda', '3', '132', '1', 13000, 57, 'Casa', 'Renta');
INSERT INTO `Inmueble` VALUES (48, 'Mexico', 'Condesa', 'Allende', '564', '18', 18000, 58, 'Departamento', 'Renta');
INSERT INTO `Inmueble` VALUES (30, 'Xalapa', 'Animas', 'Francia', '15', '', 2500000, 59, 'Edificio', 'Venta');
INSERT INTO `Inmueble` VALUES (61, 'Xalapa', 'Centro', 'Enriquez', '143', '11', 10000, 60, 'Local', 'Renta');
INSERT INTO `Inmueble` VALUES (100, 'Xalapa', 'Cuauhtemoc', 'Murillo Vidal', '210', '1', 15000, 61, 'Oficina', 'Renta');
INSERT INTO `Inmueble` VALUES (28, 'Xalapa', 'Animas', 'Francia', '35', '', 2300000, 62, 'Terreno', 'Venta');
COMMIT;

-- ----------------------------
-- Table structure for Local
-- ----------------------------
DROP TABLE IF EXISTS `Local`;
CREATE TABLE `Local` (
  `idLocal` int(11) NOT NULL AUTO_INCREMENT,
  `idInmueble` int(11) NOT NULL,
  `metrosCuadrados` varchar(255) NOT NULL,
  `numBanos` varchar(255) NOT NULL,
  `dentroPlaza` varchar(255) NOT NULL,
  `edadLocal` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idLocal`),
  KEY `idInmuebleLocal` (`idInmueble`),
  CONSTRAINT `idInmuebleLocal` FOREIGN KEY (`idInmueble`) REFERENCES `Inmueble` (`idInmueble`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of Local
-- ----------------------------
BEGIN;
INSERT INTO `Local` VALUES (3, 56, '500', '1', 'Si', '2');
INSERT INTO `Local` VALUES (4, 60, '200', '3', 'No', '2');
COMMIT;

-- ----------------------------
-- Table structure for Oficina
-- ----------------------------
DROP TABLE IF EXISTS `Oficina`;
CREATE TABLE `Oficina` (
  `idOficina` int(11) NOT NULL AUTO_INCREMENT,
  `idInmueble` int(11) NOT NULL,
  `metrosCuadrados` varchar(255) NOT NULL,
  `numBanos` varchar(255) NOT NULL,
  `edadOficina` varchar(255) DEFAULT NULL,
  `areaAbierta` varchar(255) DEFAULT NULL,
  `metrosAreaAbierta` varchar(255) DEFAULT NULL,
  `privados` varchar(255) DEFAULT NULL,
  `numPrivados` varchar(255) DEFAULT NULL,
  `estacionamiento` varchar(255) DEFAULT NULL,
  `numCoches` varchar(255) DEFAULT NULL,
  `recepcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idOficina`),
  KEY `idInmuebleOficina` (`idInmueble`),
  CONSTRAINT `idInmuebleOficina` FOREIGN KEY (`idInmueble`) REFERENCES `Inmueble` (`idInmueble`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of Oficina
-- ----------------------------
BEGIN;
INSERT INTO `Oficina` VALUES (1, 61, '200', '2', '1', 'No', '', 'Si', '12', 'Si', '5', 'Si');
COMMIT;

-- ----------------------------
-- Table structure for Propietario
-- ----------------------------
DROP TABLE IF EXISTS `Propietario`;
CREATE TABLE `Propietario` (
  `nombre` varchar(255) NOT NULL,
  `apellidoP` varchar(255) NOT NULL,
  `apellidoM` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `celular` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `idPropietario` int(11) NOT NULL AUTO_INCREMENT,
  `idAsesor` varchar(255) NOT NULL,
  PRIMARY KEY (`idPropietario`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of Propietario
-- ----------------------------
BEGIN;
INSERT INTO `Propietario` VALUES ('Maria', 'Rodriguez', 'Lopez', 'maria@live.com', '2717117751', 'Xalapa, Veracruz', 1, '1');
INSERT INTO `Propietario` VALUES ('Sylvester', 'Franks', 'Mueller', 'Nullam.ut@dolor.com', '5354282578', 'Apartado núm.: 356, 6601 Senectus Avda.', 2, '1');
INSERT INTO `Propietario` VALUES ('Trevor', 'Kelley', 'Macdonald', 'Suspendisse@scelerisquemollis.net', '5774813578', '9594 Feugiat. Calle', 4, '3');
INSERT INTO `Propietario` VALUES ('Ariel', 'Melton', 'Gross', 'magnis.dis.parturient@mauris.ca', '5401944528', 'Apdo.:808-6812 Ridiculus Calle', 5, '3');
INSERT INTO `Propietario` VALUES ('Jael', 'Frazier', 'Rutledge', 'Proin@nisimagna.ca', '7364163912', 'Apdo.:195-5892 Fringilla Avda.', 6, '2');
INSERT INTO `Propietario` VALUES ('Noel', 'Romero', 'Chandler', 'dis.parturient@euenim.ca', '4259670416', '495-9113 Donec ', 7, '3');
INSERT INTO `Propietario` VALUES ('Genevieve', 'Page', 'Woodward', 'Suspendisse.aliquet@placerategetvenenatis.com', '5111032648', 'Apartado núm.: 134, 9903 Adipiscing. Calle', 8, '3');
INSERT INTO `Propietario` VALUES ('Tanek', 'Vance', 'Brennan', 'Duis.sit.amet@diam.com', '6223958953', 'Apartado núm.: 806, 5417 Fusce ', 9, '3');
INSERT INTO `Propietario` VALUES ('Elvis', 'Lott', 'Levine', 'Nam@Nuncacsem.edu', '3697259376', '4653 Orci, Avda.', 10, '3');
INSERT INTO `Propietario` VALUES ('Cedric', 'Ortega', 'Wall', 'sodales@dictumeueleifend.edu', '2925874113', '5777 Sapien, Carretera', 11, '1');
INSERT INTO `Propietario` VALUES ('Joshua', 'Douglas', 'Jensen', 'erat.volutpat@nonfeugiatnec.com', '2116698278', 'Apartado núm.: 395, 583 Quis Av.', 12, '3');
INSERT INTO `Propietario` VALUES ('Cyrus', 'Levy', 'Gay', 'ante@semperetlacinia.edu', '9546318883', '369-3181 Blandit ', 13, '2');
INSERT INTO `Propietario` VALUES ('Aaron', 'Luna', 'Bennett', 'Nullam.nisl@felisDonec.com', '6029410477', '4616 Sed Carretera', 14, '1');
INSERT INTO `Propietario` VALUES ('Bruno', 'Elliott', 'Robinson', 'pretium.neque@utaliquamiaculis.ca', '9721441581', 'Apartado núm.: 611, 9893 Facilisis, Calle', 15, '1');
INSERT INTO `Propietario` VALUES ('Nero', 'Walton', 'Hyde', 'aliquet.magna@tristique.com', '8875066011', '694-4270 Tempor C/', 16, '3');
INSERT INTO `Propietario` VALUES ('Indira', 'Stephens', 'Hebert', 'morbi.tristique@erat.com', '9580770580', '380-9657 Risus C.', 17, '3');
INSERT INTO `Propietario` VALUES ('MacKenzie', 'Hull', 'Wallace', 'condimentum@ornare.com', '3343034162', 'Apdo.:619-7916 Sem, Calle', 18, '2');
INSERT INTO `Propietario` VALUES ('Zeph', 'Cameron', 'Chapman', 'mollis.nec.cursus@ut.net', '8083980421', '385-8818 Est. Carretera', 19, '3');
INSERT INTO `Propietario` VALUES ('Jane', 'Wiggins', 'Maynard', 'viverra.Donec.tempus@accumsaninterdum.org', '0221547841', '660-9255 Ornare Avda.', 20, '2');
INSERT INTO `Propietario` VALUES ('Emma', 'Patel', 'Mcintosh', 'primis.in@atliberoMorbi.ca', '1474645534', '249-5904 Luctus C/', 21, '1');
INSERT INTO `Propietario` VALUES ('Guy', 'Spencer', 'Leach', 'Pellentesque.ut.ipsum@id.co.uk', '4179822415', '511-135 Ut C/', 22, '2');
INSERT INTO `Propietario` VALUES ('Felicia', 'Knowles', 'Guthrie', 'adipiscing.elit@pedeacurna.edu', '5913897756', '8910 Semper C/', 23, '2');
INSERT INTO `Propietario` VALUES ('Noble', 'Beck', 'Walton', 'Maecenas.mi@venenatisvel.net', '7377008650', '6143 Nibh Av.', 24, '2');
INSERT INTO `Propietario` VALUES ('Jesse', 'Townsend', 'Curtis', 'magna@facilisisfacilisis.org', '3067165436', '8157 Luctus ', 25, '2');
INSERT INTO `Propietario` VALUES ('Rosalyn', 'Owens', 'Merritt', 'pellentesque.Sed.dictum@nullaDonecnon.co.uk', '9503971926', '9777 Massa Calle', 26, '3');
INSERT INTO `Propietario` VALUES ('Adria', 'Mack', 'Fields', 'vel.nisl.Quisque@Namtempordiam.net', '4517030225', '3792 Nulla C.', 27, '3');
INSERT INTO `Propietario` VALUES ('Kennan', 'Rios', 'Stark', 'amet.lorem@laoreetposuere.edu', '5441009663', '5989 Metus ', 28, '1');
INSERT INTO `Propietario` VALUES ('Serena', 'Giles', 'Rojas', 'eu@Fuscealiquam.net', '3340998165', '647-7335 Eu Calle', 29, '3');
INSERT INTO `Propietario` VALUES ('Anne', 'Skinner', 'Wilkerson', 'ante.lectus@mauris.com', '6441408136', 'Apdo.:906-8608 Diam Avda.', 30, '1');
INSERT INTO `Propietario` VALUES ('Zane', 'Mcfarland', 'Graves', 'Sed@ametconsectetueradipiscing.edu', '0561408144', '9652 Dapibus Av.', 31, '2');
INSERT INTO `Propietario` VALUES ('Rae', 'Briggs', 'Kemp', 'augue@ipsumSuspendissenon.org', '7045193399', '2470 Semper ', 32, '3');
INSERT INTO `Propietario` VALUES ('Lunea', 'Castro', 'Riddle', 'elementum.purus.accumsan@aliquetmolestietellus.net', '1693036394', '369 Purus Avda.', 33, '1');
INSERT INTO `Propietario` VALUES ('Brenden', 'Dawson', 'Cole', 'lorem@Phasellusornare.ca', '9869847409', 'Apartado núm.: 338, 2003 Quis Ctra.', 34, '3');
INSERT INTO `Propietario` VALUES ('Eleanor', 'Figueroa', 'Mueller', 'feugiat@dolor.org', '9294261481', 'Apartado núm.: 945, 9511 Cursus C.', 35, '3');
INSERT INTO `Propietario` VALUES ('Uriah', 'Warren', 'Acevedo', 'per.conubia@vulputate.ca', '2720018583', '402-6058 Vivamus C.', 36, '1');
INSERT INTO `Propietario` VALUES ('Hanna', 'Smith', 'Palmer', 'elit.fermentum@volutpatNulladignissim.com', '4648208338', 'Apdo.:214-3026 Sociis Carretera', 37, '1');
INSERT INTO `Propietario` VALUES ('Burton', 'Strong', 'Walters', 'laoreet.posuere@Donecnibh.edu', '0927879156', 'Apartado núm.: 768, 4339 Lectus C/', 38, '3');
INSERT INTO `Propietario` VALUES ('Kibo', 'Schmidt', 'Austin', 'risus.Donec.nibh@ante.ca', '3684578976', 'Apartado núm.: 148, 1042 Duis Calle', 39, '1');
INSERT INTO `Propietario` VALUES ('Halla', 'Logan', 'Boyer', 'Donec@facilisismagnatellus.org', '9474682834', '5738 Nonummy C.', 40, '3');
INSERT INTO `Propietario` VALUES ('Leroy', 'Delgado', 'Baldwin', 'Cras.interdum.Nunc@placeratCras.net', '2412407510', 'Apdo.:173-5135 Ut Avenida', 41, '2');
INSERT INTO `Propietario` VALUES ('Guinevere', 'Garza', 'Mercado', 'id@hendreritaarcu.edu', '5926821313', '675-6646 Interdum. C/', 42, '2');
INSERT INTO `Propietario` VALUES ('Fletcher', 'Rodgers', 'Mcbride', 'accumsan@Nuncquis.org', '1442176340', '389-6252 Auctor Avda.', 43, '1');
INSERT INTO `Propietario` VALUES ('Leilani', 'Blackburn', 'Trevino', 'Aliquam.ultrices@lacusNulla.ca', '5822920779', 'Apartado núm.: 219, 9919 Magna ', 44, '1');
INSERT INTO `Propietario` VALUES ('Maia', 'York', 'Bowen', 'massa.non@mauris.net', '9301306372', '819-9371 Maecenas Carretera', 45, '1');
INSERT INTO `Propietario` VALUES ('Renee', 'Delaney', 'Arnold', 'ultricies.ligula.Nullam@purusMaecenas.com', '2138689620', 'Apdo.:896-4525 Vel Ctra.', 46, '2');
INSERT INTO `Propietario` VALUES ('Devin', 'Kennedy', 'Mathews', 'consectetuer.mauris.id@Maecenasornareegestas.org', '6600173385', '4874 Porta Avda.', 47, '1');
INSERT INTO `Propietario` VALUES ('Naomi', 'Cline', 'Flynn', 'sem.elit.pharetra@esttempor.org', '0624087134', 'Apdo.:797-5546 Nec Ctra.', 48, '1');
INSERT INTO `Propietario` VALUES ('Ralph', 'Mason', 'Banks', 'sapien@arcu.org', '0772328149', '6819 Sed Carretera', 49, '1');
INSERT INTO `Propietario` VALUES ('Silas', 'Cantrell', 'Cantrell', 'Aliquam.vulputate@necanteblandit.edu', '8530922939', '2113 Aliquam Calle', 50, '1');
INSERT INTO `Propietario` VALUES ('Jenna', 'Delgado', 'Nunez', 'metus.eu@enim.co.uk', '5247357840', 'Apartado núm.: 360, 8672 Tempor Av.', 51, '3');
INSERT INTO `Propietario` VALUES ('Joshua', 'Williams', 'Pratt', 'tincidunt@enim.ca', '3452297123', 'Apdo.:997-8694 Dolor C.', 52, '2');
INSERT INTO `Propietario` VALUES ('Shea', 'Hudson', 'Simpson', 'adipiscing.elit@nonlobortisquis.org', '3995403370', '3918 Aliquet ', 53, '2');
INSERT INTO `Propietario` VALUES ('Ivory', 'Mcgowan', 'Gould', 'a.auctor.non@bibendumullamcorperDuis.co.uk', '2910485258', 'Apdo.:889-4429 Dolor, C.', 54, '3');
INSERT INTO `Propietario` VALUES ('Lance', 'Bauer', 'Warren', 'quis@egetvenenatis.com', '3988807187', '8112 Phasellus Avenida', 55, '2');
INSERT INTO `Propietario` VALUES ('Fulton', 'Bond', 'Bates', 'Maecenas@tinciduntnibhPhasellus.co.uk', '4353033960', 'Apdo.:525-446 Enim C.', 56, '3');
INSERT INTO `Propietario` VALUES ('Elliott', 'Perez', 'Pate', 'auctor@mattis.com', '7388260546', 'Apartado núm.: 775, 993 Hendrerit C/', 57, '2');
INSERT INTO `Propietario` VALUES ('Emerald', 'Reyes', 'English', 'in.hendrerit@porttitor.org', '7469728901', 'Apartado núm.: 589, 7489 Odio. Carretera', 58, '2');
INSERT INTO `Propietario` VALUES ('Scott', 'Garner', 'Christensen', 'vitae.sodales@ametloremsemper.net', '7178186324', 'Apartado núm.: 728, 2031 Mauris C/', 59, '2');
INSERT INTO `Propietario` VALUES ('Olga', 'Patton', 'Stevenson', 'pharetra.sed.hendrerit@eu.ca', '6828551388', 'Apdo.:855-1849 Fringilla ', 60, '3');
INSERT INTO `Propietario` VALUES ('Britanni', 'Knapp', 'Spence', 'iaculis@eutellusPhasellus.com', '2432281113', '178-4071 Eleifend. Avenida', 61, '1');
INSERT INTO `Propietario` VALUES ('Martin', 'Britt', 'Love', 'lacus.Ut.nec@molestie.co.uk', '6851094147', '879-9953 Nullam Avda.', 62, '3');
INSERT INTO `Propietario` VALUES ('Amy', 'Cook', 'Saunders', 'Donec.est@aliquamenim.ca', '1802362961', 'Apdo.:344-8931 Nec Avda.', 63, '3');
INSERT INTO `Propietario` VALUES ('Branden', 'Franco', 'Bond', 'arcu@Integer.co.uk', '9663092689', '9133 Felis Avenida', 64, '2');
INSERT INTO `Propietario` VALUES ('Scarlett', 'Gill', 'Griffin', 'sem@Suspendissenonleo.ca', '2090446529', 'Apdo.:239-3280 Sit Carretera', 65, '1');
INSERT INTO `Propietario` VALUES ('Geoffrey', 'Weiss', 'Grimes', 'vitae.nibh.Donec@et.net', '2076143249', 'Apartado núm.: 393, 5456 Vitae, Avenida', 66, '2');
INSERT INTO `Propietario` VALUES ('Juliet', 'Sexton', 'Donovan', 'mi.pede.nonummy@necligulaconsectetuer.net', '8478223607', '6889 In, Avda.', 67, '3');
INSERT INTO `Propietario` VALUES ('Quintessa', 'Gilmore', 'Bauer', 'leo.Cras.vehicula@lacusCras.ca', '4348608995', 'Apartado núm.: 499, 528 Natoque Av.', 68, '3');
INSERT INTO `Propietario` VALUES ('Macon', 'Dean', 'Gamble', 'pede@elementum.org', '7603087086', '557-7130 Egestas C/', 69, '2');
INSERT INTO `Propietario` VALUES ('Martina', 'Barron', 'Hurley', 'euismod.mauris@eleifendnuncrisus.com', '8151148654', 'Apartado núm.: 712, 8068 Faucibus. ', 70, '2');
INSERT INTO `Propietario` VALUES ('Cole', 'Freeman', 'Lynn', 'Cum.sociis.natoque@ligulaNullam.ca', '3707344064', 'Apdo.:871-200 Sem, Avda.', 71, '1');
INSERT INTO `Propietario` VALUES ('Keiko', 'Medina', 'Hood', 'ligula.Donec@a.ca', '7772698316', 'Apartado núm.: 889, 6710 Faucibus C/', 72, '2');
INSERT INTO `Propietario` VALUES ('Xavier', 'Aguirre', 'Olson', 'Nam@vestibulumnec.ca', '5153401170', '5358 Placerat Ctra.', 73, '3');
INSERT INTO `Propietario` VALUES ('Nina', 'Carrillo', 'Meyer', 'eros.nec@Etiamgravida.co.uk', '9757963263', '941-8798 Vel Ctra.', 74, '1');
INSERT INTO `Propietario` VALUES ('Kermit', 'Reynolds', 'Armstrong', 'tincidunt.vehicula.risus@Donectempuslorem.com', '5386152484', 'Apdo.:543-3774 Etiam Carretera', 75, '3');
INSERT INTO `Propietario` VALUES ('Hyacinth', 'Weaver', 'Paul', 'Donec@tellusnonmagna.ca', '1156737934', 'Apartado núm.: 248, 6133 Fermentum Ctra.', 76, '2');
INSERT INTO `Propietario` VALUES ('Kieran', 'Greer', 'Forbes', 'ullamcorper@SedmolestieSed.ca', '9789586032', 'Apartado núm.: 811, 5056 Semper ', 77, '3');
INSERT INTO `Propietario` VALUES ('Brady', 'Briggs', 'Langley', 'tellus@utmiDuis.ca', '3611798115', '344-193 Sagittis. Avda.', 78, '3');
INSERT INTO `Propietario` VALUES ('Joel', 'Buckley', 'Lowe', 'Cras.eget@pedesagittisaugue.com', '7446280974', '687-728 Donec Av.', 79, '3');
INSERT INTO `Propietario` VALUES ('Ayanna', 'Cooley', 'Middleton', 'mi@molestie.com', '6719443544', 'Apdo.:381-3795 Dictum ', 80, '2');
INSERT INTO `Propietario` VALUES ('Emi', 'Molina', 'Palmer', 'a.ultricies.adipiscing@turpisNulla.net', '2032024744', 'Apdo.:117-2740 Proin Avda.', 81, '3');
INSERT INTO `Propietario` VALUES ('Fiona', 'Koch', 'Rocha', 'in.lobortis.tellus@interdum.net', '1536740236', '504-4531 Suspendisse ', 82, '1');
INSERT INTO `Propietario` VALUES ('Timothy', 'Savage', 'Mclean', 'lacus.Quisque@Quisquefringillaeuismod.co.uk', '6423134022', 'Apdo.:280-283 Nam Carretera', 83, '1');
INSERT INTO `Propietario` VALUES ('Josephine', 'Salinas', 'Alvarez', 'suscipit@sodales.edu', '3759566627', '865-2123 Proin ', 84, '2');
INSERT INTO `Propietario` VALUES ('Nichole', 'Padilla', 'Bolton', 'aliquet.vel.vulputate@maurisaliquam.com', '4940598091', 'Apartado núm.: 154, 9650 Libero C/', 85, '3');
INSERT INTO `Propietario` VALUES ('Morgan', 'Henderson', 'Simmons', 'et.ultrices@imperdiet.ca', '6880847460', 'Apartado núm.: 452, 5266 Bibendum Ctra.', 86, '3');
INSERT INTO `Propietario` VALUES ('Cyrus', 'Baldwin', 'Wilson', 'ut.eros.non@dictumplacerataugue.edu', '3153330536', '2518 Dolor C/', 87, '1');
INSERT INTO `Propietario` VALUES ('Cody', 'Horn', 'Barrera', 'tellus.justo.sit@Incondimentum.ca', '3228514187', 'Apdo.:462-3306 A Av.', 88, '2');
INSERT INTO `Propietario` VALUES ('Vielka', 'Love', 'Vega', 'suscipit.est.ac@arcuSedeu.org', '8639181834', 'Apdo.:259-2925 Arcu. Avda.', 89, '1');
INSERT INTO `Propietario` VALUES ('Carol', 'Newton', 'Sanchez', 'placerat@sagittis.org', '6341462125', 'Apartado núm.: 648, 3825 Massa C.', 90, '3');
INSERT INTO `Propietario` VALUES ('Hadassah', 'Gaines', 'Combs', 'consectetuer.adipiscing@semsempererat.co.uk', '5440462354', 'Apartado núm.: 947, 1031 Tincidunt ', 91, '2');
INSERT INTO `Propietario` VALUES ('Hiram', 'Chen', 'Howe', 'gravida.sagittis@euismodenim.edu', '5291662912', 'Apartado núm.: 795, 3193 Eget, Avda.', 92, '2');
INSERT INTO `Propietario` VALUES ('Chiquita', 'Hill', 'Rios', 'accumsan.interdum@etnetuset.ca', '5747719097', '8773 Fermentum Calle', 93, '1');
INSERT INTO `Propietario` VALUES ('Tamekah', 'Cote', 'Collier', 'lacus@mi.com', '9441269130', 'Apdo.:177-3248 Dictum C/', 94, '1');
INSERT INTO `Propietario` VALUES ('Denton', 'Huff', 'Gross', 'Nulla@tinciduntvehicula.org', '3664876759', 'Apdo.:622-4111 Mi Ctra.', 95, '3');
INSERT INTO `Propietario` VALUES ('Len', 'Holcomb', 'Frazier', 'felis.purus.ac@Vestibulumaccumsan.org', '6640346191', 'Apartado núm.: 776, 5538 Nonummy C.', 96, '2');
INSERT INTO `Propietario` VALUES ('Aspen', 'Tillman', 'Manning', 'felis.eget.varius@lobortistellusjusto.org', '3839489612', '752-6717 Quis Avda.', 97, '3');
INSERT INTO `Propietario` VALUES ('Farrah', 'Pena', 'Padilla', 'orci@neque.ca', '8562775238', 'Apdo.:272-289 Sem Ctra.', 98, '2');
INSERT INTO `Propietario` VALUES ('Florence', 'Fleming', 'Potts', 'in@lobortis.net', '9366733857', 'Apdo.:781-6990 Cras C/', 99, '1');
INSERT INTO `Propietario` VALUES ('Patrick', 'Miles', 'Donovan', 'lorem@Aliquamornare.edu', '6285050660', '1182 In C.', 100, '1');
INSERT INTO `Propietario` VALUES ('Juan Jose', 'Martinez', 'Rodriguez', 'juanjose@live.com', '2717117751', 'Avenida Xalapa #145 Xalapa, Ver', 101, '1');
INSERT INTO `Propietario` VALUES ('Daniela', 'Hernandez', 'Valenzuela', 'dany@live.com', '2282212271', 'Xalapa', 102, '1');
INSERT INTO `Propietario` VALUES ('Francisco', 'Romano', 'Galicia', 'francisco@live.com', '2929384587', 'Xalapa', 103, '1');
COMMIT;

-- ----------------------------
-- Table structure for Terreno
-- ----------------------------
DROP TABLE IF EXISTS `Terreno`;
CREATE TABLE `Terreno` (
  `idTerreno` int(11) NOT NULL AUTO_INCREMENT,
  `idInmueble` int(11) NOT NULL,
  `metrosCuadrados` varchar(255) NOT NULL,
  `usoSuelo` varchar(255) NOT NULL,
  `poligonal` varchar(255) NOT NULL,
  `pendiente` varchar(255) NOT NULL,
  `esquina` varchar(255) NOT NULL,
  PRIMARY KEY (`idTerreno`),
  KEY `idInmuebleTerreno` (`idInmueble`),
  CONSTRAINT `idInmuebleTerreno` FOREIGN KEY (`idInmueble`) REFERENCES `Inmueble` (`idInmueble`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of Terreno
-- ----------------------------
BEGIN;
INSERT INTO `Terreno` VALUES (1, 62, '300', 'Residencial', 'Regular', 'Plano', 'Si');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
