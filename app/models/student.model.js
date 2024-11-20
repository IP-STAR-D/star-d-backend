module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {
        
        UserId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          field: "user_id",
          allowNull: false,        
        },
        groupId: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            field: "group_id",
            allowNull: false,
            references: {
              model: "group",
              key: "groupId",
            },
          }
    });

    return Student;
}