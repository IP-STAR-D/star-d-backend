module.exports = (sequelize, Sequelize) => {
  const Group = sequelize.define("group", {
    groupId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: "group_id",
    },
    degreeId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      field: "degree_id",
      allowNull: false,
      references: {
        model: "degrees",
        key: "degree_id",
      },
    },
    bossId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      field: "boss_id",
      allowNull: false,
    },
    year: {
      type: Sequelize.INTEGER,
      field: "an",
      allowNull: false,
    },
  });

  return Group;
};
