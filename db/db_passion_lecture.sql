DROP DATABASE IF EXISTS db_ouvrage;
CREATE DATABASE db_ouvrage;
USE db_ouvrage;

CREATE TABLE T_CATEGORY(
   idCategorie INT AUTO_INCREMENT,
   catName VARCHAR(100)  NOT NULL,
   catDescription VARCHAR(255) ,
   PRIMARY KEY(idCategorie),
   UNIQUE(catName)
);

CREATE TABLE T_AUTHOR(
   idAuteur INT AUTO_INCREMENT,
   autLastname VARCHAR(100)  NOT NULL,
   autFirstname VARCHAR(100)  NOT NULL,
   PRIMARY KEY(idAuteur)
);

CREATE TABLE T_USERS(
   idUtilisateur INT AUTO_INCREMENT,
   useUsername VARCHAR(100)  NOT NULL,
   useLastname VARCHAR(100)  NOT NULL,
   useFirstname VARCHAR(100)  NOT NULL,
   usePassword VARCHAR(256)  NOT NULL,
   useIsAdmin BOOLEAN,
   PRIMARY KEY(idUtilisateur),
   UNIQUE(useUsername)
);

CREATE TABLE T_EDITORS(
   IdEditeur INT AUTO_INCREMENT,
   ediName VARCHAR(255)  NOT NULL,
   PRIMARY KEY(IdEditeur),
   UNIQUE(ediName)
);

CREATE TABLE T_BOOKS(
   idBooks INT AUTO_INCREMENT,
   booTitle VARCHAR(100)  NOT NULL,
   booExtrait TEXT NOT NULL,
   booResume VARCHAR(1500)  NOT NULL,
   booCreated DATE,
   booImage TEXT NOT NULL,
   booDate_year INT,
   booNb_pages VARCHAR(50) ,
   IdEditeur INT NOT NULL,
   idCategorie INT NOT NULL,
   idAuteur INT NOT NULL,
   PRIMARY KEY(idBooks),
   UNIQUE(booTitle),
   FOREIGN KEY(IdEditeur) REFERENCES T_EDITORS(IdEditeur),
   FOREIGN KEY(idCategorie) REFERENCES T_CATEGORY(idCategorie),
   FOREIGN KEY(idAuteur) REFERENCES T_AUTHOR(idAuteur)
);

CREATE TABLE T_COMMENT(
   idBooks INT,
   idUtilisateur INT,
   comComment VARCHAR(1000)  NOT NULL,
   comNote DECIMAL(2,1)   NOT NULL,
   PRIMARY KEY(idBooks, idUtilisateur),
   FOREIGN KEY(idBooks) REFERENCES T_BOOKS(idBooks),
   FOREIGN KEY(idUtilisateur) REFERENCES T_USERS(idUtilisateur)
);

CREATE TABLE T_BELONG(
   idBooks INT,
   idUtilisateur INT,
   PRIMARY KEY(idBooks, idUtilisateur),
   FOREIGN KEY(idBooks) REFERENCES T_BOOKS(idBooks),
   FOREIGN KEY(idUtilisateur) REFERENCES T_USERS(idUtilisateur)
);
