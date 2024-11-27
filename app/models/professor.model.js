module.exports = (sequelize, Sequelize) => {
    const Professor = sequelize.define("professor", {
        
        userId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          field: "user_id",
          allowNull: false, 
          references: {
            model: "user",
            key: "userId",
          },       
        },
        facultyId: {
            type: Sequelize.INTEGER,
            foreignKey: true,
            field: "faculty_id",
            allowNull: false,
            references: {
              model: "faculties",
              key: "faculty_id",
            },
          }
    });

    return Professor;
}