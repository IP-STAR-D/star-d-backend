module.exports = (sequelize, Sequelize) => {
  const AppSettings = sequelize.define("app_settings", {
    name: {
      type: Sequelize.STRING,
      field: 'name',
      default: '',
      allowNull: false
    },
    value: {
      type: Sequelize.BOOLEAN,
      field: 'value',
      default: false,
      allowNull: false
    },
  });

  return AppSettings;
};
