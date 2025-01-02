module.exports = (sequelize, DataTypes) => {
  const Deal = sequelize.define(
    'deal',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true, // Ensures the value is a valid URL
        },
      },
      couponCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      association: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Not Associated',
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      expiryDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isFreebie: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tags: {
        type: DataTypes.STRING, // Store comma-separated tags as a string
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      votes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imageUrl: { 
        type: DataTypes.STRING,
        allowNull: true 
      },
    },
    {
      tableName: 'deals',
      timestamps: true, // Includes createdAt and updatedAt columns
    }
  );

  return Deal;
};
