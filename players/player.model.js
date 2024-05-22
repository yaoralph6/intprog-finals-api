const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Player = sequelize.define('Player', {
        playerId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: { type: DataTypes.STRING, allowNull: false },
        nationality: { type: DataTypes.STRING, allowNull: false },
        born: { type: DataTypes.DATEONLY, allowNull: false },
        region: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, allowNull: false },
        ingameName: { type: DataTypes.STRING, allowNull: false },
        teamId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Teams',
                key: 'teamId'
            }
        }
    });

    Player.associate = function(models) {
        Player.belongsTo(models.Team, { foreignKey: 'teamId' });
    };

    return Player;
};
