export const UserModel = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Ce username est déjà pris.",
      },
      notEmpty: {
        msg: "Le prénom ne peut pas être vide.",
      },
      notNull: {
        msg: "Le prénom est une propriété obligatoire",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      is: {
        args: /^[A-Za-z\s]*$/,
        msg: "Seules les lettres et les espaces sont autorisées",
      },
      notEmpty: {
        msg: "Le prénom ne peut pas être vide.",
      },
      notNull: {
        msg: "Le prénom est une propriété obligatoire",
      },
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[A-Za-z\s]*$/,
          msg: "Seules les lettres et les espaces sont autorisées",
        },
        notEmpty: {
          msg: "Le nom de famille ne peut pas être vide.",
        },
        notNull: {
          msg: "Le nom de famille est une propriété obligatoire",
        },
      },
    },
  });
};
