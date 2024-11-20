module.exports = (sequelize, Sequelize) => {
    const Professor = sequelize.define("professor", {
        
        UserId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          field: "user_id",
          allowNull: false,        
        },
        FacultyId: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            field: "faculty_id",
            allowNull: false,
            references: {
              model: "faculty",
              key: "facultyId",
            },
          }
    });

    return Professor;
}