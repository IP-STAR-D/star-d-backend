module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'user_id'
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING,
        field: 'first_name',
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        field: 'last_name',
        allowNull: false
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        field: 'is_admin',
        default: false,
        allowNull: false
      },
    });
  
    return User;
  };