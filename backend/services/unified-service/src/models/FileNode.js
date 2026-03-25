const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const FileNode = sequelize.define(
  "FileNode",
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "legacy",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("folder", "file"),
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "FileNodes",
        key: "id",
      },
    },
    content: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    link: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    isSolved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isRevised: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isImportant: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "FileNodes",
    timestamps: true,
  },
);

FileNode.hasMany(FileNode, { as: "children", foreignKey: "parentId" });
FileNode.belongsTo(FileNode, { as: "parent", foreignKey: "parentId" });

module.exports = FileNode;
