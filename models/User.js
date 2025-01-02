module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      }, {
          tableName: 'user', // Explicitly specify the table name
          timestamps: true, // Enable createdAt and updatedAt columns
        });      
    return User;
  };
  