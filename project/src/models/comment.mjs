export const CommentModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Comment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le prénom ne peut pas être vide.",
          },
          notNull: {
            msg: "Le prénom est une propriété obligatoire",
          },
        },
      },
      note: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isFloat: {
            msg: "La note doit être un nombre comme 4,0.",
          },
          notEmpty: {
            msg: "La note ne peut pas être vide",
          },
          notNull: {
            msg: "La note est une propriété obligatoire",
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
