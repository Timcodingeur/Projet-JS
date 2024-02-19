CREATE TABLE Categorie (
   id_categorie INT AUTO_INCREMENT,
   nom VARCHAR(100) NOT NULL,
   PRIMARY KEY(id_categorie),
   UNIQUE(nom)
);

CREATE TABLE Auteur (
   id_auteur INT AUTO_INCREMENT,
   Nom VARCHAR(100) NOT NULL,
   Prenom VARCHAR(100) NOT NULL,
   PRIMARY KEY(id_auteur),
   UNIQUE(Nom, Prenom)
);

CREATE TABLE Utilisateur (
   id_utilisateur INT AUTO_INCREMENT,
   Pseudo VARCHAR(100) NOT NULL,
   Nom VARCHAR(100) NOT NULL,
   Prenom VARCHAR(100) NOT NULL,
   PRIMARY KEY(id_utilisateur),
   UNIQUE(Pseudo)
);

CREATE TABLE Ouvrage (
   id_ouvrage INT AUTO_INCREMENT,
   Titre VARCHAR(100) NOT NULL,
   Extrait TEXT NOT NULL,
   Resume TEXT NOT NULL,
   Annee_edition YEAR,
   Moyenne_appreciation_utilisateur DECIMAL(3,1),
   Image TEXT NOT NULL,
   id_categorie INT NOT NULL,
   id_auteur INT NOT NULL,
   PRIMARY KEY(id_ouvrage),
   UNIQUE(Titre),
   FOREIGN KEY(id_categorie) REFERENCES Categorie(id_categorie),
   FOREIGN KEY(id_auteur) REFERENCES Auteur(id_auteur)
);

CREATE TABLE Commente (
   id_ouvrage INT,
   id_utilisateur INT,
   Commentaire TEXT NOT NULL,
   PRIMARY KEY(id_ouvrage, id_utilisateur),
   FOREIGN KEY(id_ouvrage) REFERENCES Ouvrage(id_ouvrage),
   FOREIGN KEY(id_utilisateur) REFERENCES Utilisateur(id_utilisateur)
);
