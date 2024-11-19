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
    },
    bossId: {
      type: Sequelize.INTEGER,
      foreignKey: true,
      field: "boss_id",
      allowNull: false,
    },
    year: {
      type: 'TIMESTAMP',
      field: "an",
      allowNull: false,
    },
  });

  return Group;
};
