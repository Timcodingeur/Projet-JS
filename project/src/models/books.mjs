export const BooksModel = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Books",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Ce nom est déjà pris.",
        },
        validate: {
          is: {
            args: /^[^?!]+$/,
            msg: "Les caractères spéciaux comme ?! ne sont pas autorisés, à l'exception des espaces, - et _.",
          },
          notEmpty: {
            msg: "Le nom ne peut pas être vide.",
          },
          notNull: {
            msg: "Le nom est une propriété obligatoire",
          },
        },
      },
      extrait: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "L'extrait'ne peut pas être vide.",
          },
          notNull: {
            msg: "L'extrait est une propriété obligatoire",
          },
        },
      },
      resume: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[^?!]+$/,
            msg: "Les caractères spéciaux comme ?! ne sont pas autorisés, à l'exception des espaces, - et _.",
          },
          notEmpty: {
            msg: "Le resume ne peut pas être vide.",
          },
          notNull: {
            msg: "Le resume est une propriété obligatoire",
          },
        },
      },
      year: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      author: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      editor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[^?!]+$/,
            msg: "Les caractères spéciaux comme ?! ne sont pas autorisés, à l'exception des espaces, - et _.",
          },
          notEmpty: {
            msg: "L'image ne peut pas être vide",
          },
          notNull: {
            msg: "l'image est une propriété obligatoire",
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

  Book.associate = () => {
    Book.hasmany(note, { foreignKey: "note" });
    Book.hasmany(comment, { foreignKey: "comment" });
  };

  return Book;
};
