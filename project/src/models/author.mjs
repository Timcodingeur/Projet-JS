export const AuthorModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Author",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
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
            msg: "Le nom de famille ne peut pas être vide",
          },
          notNull: {
            msg: "Le prenom est une propriété obligatoire",
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updateAt: false,
    }
  );
};
