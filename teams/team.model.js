const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Team = sequelize.define('Team', {
        teamId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: { type: DataTypes.STRING, allowNull: false },
        location: { type: DataTypes.STRING, allowNull: false },
        coach: { type: DataTypes.STRING, allowNull: false },
        region: { type: DataTypes.STRING, allowNull: false },
        manager: { type: DataTypes.STRING, allowNull: false },
    });

    Team.associate = function(models) {
        Team.hasMany(models.Player, { foreignKey: 'teamId' });
    };

    return Team;
};
