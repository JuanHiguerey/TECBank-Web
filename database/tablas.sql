DROP DATABASE IF EXISTS tecbank_db;
CREATE DATABASE tecbank_db;

CREATE TABLE `tecbank_db`.`tipo_cita` (
  `idTipoCita` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`idTipoCita`)
);

CREATE TABLE `tecbank_db`.`tipo_movimiento` (
  `idTipoMovimiento` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`idTipoMovimiento`)
);

CREATE TABLE `tecbank_db`.`tipo_plan` (
  `idTipoPlan` int NOT NULL,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`idTipoPlan`)
);

CREATE TABLE `tecbank_db`.`tipo_servicio` (
  `idTipoServicio` int NOT NULL,
  `nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`idTipoServicio`)
);


CREATE TABLE `tecbank_db`.`usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `nombreUsuario` varchar(45) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `nombreUsuario_UNIQUE` (`nombreUsuario`)
);

CREATE TABLE `tecbank_db`.`cuenta` (
  `idCuenta` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `saldo` decimal(45,0) NOT NULL,
  `IBAN` varchar(45) NOT NULL,
  `idUsuario` int NOT NULL,
  PRIMARY KEY (`idCuenta`),
  UNIQUE KEY `IBAN_UNIQUE` (`IBAN`),
  KEY `idUsuario_idx` (`idUsuario`),
  CONSTRAINT `idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
);

CREATE TABLE `tecbank_db`.`transferencia` (
  `idTransferencia` int NOT NULL AUTO_INCREMENT,
  `cuentaOrigen` varchar(45) NOT NULL,
  `cuentaDestino` varchar(45) NOT NULL,
  `monto` varchar(45) NOT NULL,
  `comision` varchar(45) NOT NULL,
  `fecha` datetime NOT NULL,
  `hora` varchar(45) NOT NULL,
  `cedula` varchar(45) NOT NULL,
  `banco` varchar(45) NOT NULL,
  `idTipoMovimiento` int NOT NULL,
  PRIMARY KEY (`idTransferencia`),
  KEY `idTipoMovimiento_idx` (`idTipoMovimiento`),
  CONSTRAINT `idTipoMovimiento` FOREIGN KEY (`idTipoMovimiento`) REFERENCES `tipo_movimiento` (`idTipoMovimiento`)
);


CREATE TABLE `tecbank_db`.`salida_pais` (
  `idSalidaPais` int NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `cedula` varchar(45) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `destino` varchar(45) NOT NULL,
  `diaSalida` datetime NOT NULL,
  `diaRegreso` datetime NOT NULL,
  `idUsuario` int NOT NULL,
  PRIMARY KEY (`idSalidaPais`),
  KEY `idUsuarioFk_idx` (`idUsuario`),
  CONSTRAINT `idUsuarioFk` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
);


CREATE TABLE `tecbank_db`.`plan_ahorro` (
  `idPlanAhorro` int NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `plazo` datetime NOT NULL,
  `montoFinal` int NOT NULL,
  `idUsuario` int NOT NULL,
  `idTipoPlan` int NOT NULL,
  KEY `idUsuarioFk_idx` (`idUsuario`),
  KEY `idTipoPlan_idx` (`idTipoPlan`),
  CONSTRAINT `idTipoPlan` FOREIGN KEY (`idTipoPlan`) REFERENCES `tipo_plan` (`idTipoPlan`),
  CONSTRAINT `idUsuarioPlan` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
);


CREATE TABLE `tecbank_db`.`servicio` (
  `idServicio` int NOT NULL,
  `Monto` decimal(45,0) NOT NULL,
  `idTipoServicio` int NOT NULL,
  `idUsuario` int NOT NULL,
  PRIMARY KEY (`idServicio`),
  KEY `idTipoServicio_idx` (`idTipoServicio`),
  KEY `idUsuarioServicio_idx` (`idUsuario`),
  CONSTRAINT `idTipoServicio` FOREIGN KEY (`idTipoServicio`) REFERENCES `tipo_servicio` (`idTipoServicio`),
  CONSTRAINT `idUsuarioServicio` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
);

CREATE TABLE `tecbank_db`.`sucursales` (
	`idSucursal` int NOT NULL AUTO_INCREMENT,
    `nombre` varchar(45) NOT NULL,
    PRIMARY KEY (`idSucursal`)
);

CREATE TABLE `tecbank_db`.`cita` (
  `idCita` int NOT NULL AUTO_INCREMENT,
  `dia` date NOT NULL,
  `hora` time NOT NULL,
  `idTipoCita` int NOT NULL,
  `idUsuario` int NOT NULL,
  `idSucursal` int NOT NULL,
  PRIMARY KEY (`idCita`),
  KEY `idTipoCita_idx` (`idTipoCita`),
  KEY `idUsuario_idx` (`idUsuario`),
  KEY `idSucursal_idx` (`idSucursal`),
  CONSTRAINT `idTipoCita` FOREIGN KEY (`idTipoCita`) REFERENCES `tipo_cita` (`idTipoCita`),
  CONSTRAINT `idUsuarioCita` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`),
  CONSTRAINT `idSucursalCita` FOREIGN KEY (`idSucursal`) REFERENCES `sucursales` (`idSucursal`)
);

CREATE TABLE `tecbank_db`.`movimiento_cuenta` (
  `idMovimientosCuenta` int NOT NULL,
  `montoTransferido` decimal(45,0) NOT NULL,
  `fecha` datetime NOT NULL,
  `hora` datetime NOT NULL,
  `idCuenta` int NOT NULL,
  `idTipoMovimiento` int NOT NULL,
  PRIMARY KEY (`idMovimientosCuenta`),
  KEY `idCuentaFk_idx` (`idCuenta`),
  KEY `idTipoMovimiento_idx` (`idTipoMovimiento`),
  CONSTRAINT `idCuentaFk` FOREIGN KEY (`idCuenta`) REFERENCES `cuenta` (`idCuenta`),
  CONSTRAINT `idTipoMovimientoFK` FOREIGN KEY (`idTipoMovimiento`) REFERENCES `tipo_movimiento` (`idTipoMovimiento`)
);

USE tecbank_db;
INSERT INTO usuario(nombre, apellido, nombreUsuario, correo, password) VALUES("Jaime", "Solano", "ElProfe", "jaimess@itcr.ac.cr", "123");

SELECT * FROM usuario;

INSERT INTO tipo_cita (nombre) VALUES ("Firma Digital");
INSERT INTO tipo_cita (nombre) VALUES ("Licencia de Conducir");
INSERT INTO tipo_cita (nombre) VALUES ("Pasaporte");
INSERT INTO tipo_cita (nombre) VALUES ("Espacio");

INSERT INTO sucursales (nombre) VALUES ("San Jose Centro");
INSERT INTO sucursales (nombre) VALUES ("Multiplaza del Este");
INSERT INTO sucursales (nombre) VALUES ("Lincoln Plaza");
INSERT INTO sucursales (nombre) VALUES ("Alajuela Centro");
INSERT INTO sucursales (nombre) VALUES ("City Mall");
INSERT INTO sucursales (nombre) VALUES ("Oxigeno");
INSERT INTO sucursales (nombre) VALUES ("Paseo Metropoli");