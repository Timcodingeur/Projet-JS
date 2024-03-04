export const EditorModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "editor",
    {
      id_editor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nameEdit: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le nom ne peut pas être vide.",
          },
          notNull: {
            msg: "Le nom est une propriété obligatoire",
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
