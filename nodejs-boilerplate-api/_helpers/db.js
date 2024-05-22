const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.Account = require('../accounts/account.model')(sequelize);
    db.Player = require('../players/player.model')(sequelize);
    db.Team = require('../teams/team.model')(sequelize);
    db.RefreshToken = require('../accounts/refresh-token.model')(sequelize);
    db.Tournament = require('../tournaments/tournament.model')(sequelize); // Add the Tournament model

    // Define model relationships
    db.Team.hasMany(db.Player, { foreignKey: 'teamId' });
    db.Player.belongsTo(db.Team, { foreignKey: 'teamId' });
    db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    db.RefreshToken.belongsTo(db.Account);

    // Define relationships for tournaments
    // Assuming each tournament has multiple teams and matches (if applicable)
    db.Tournament.belongsToMany(db.Team, { through: 'TournamentTeams', foreignKey: 'tournamentId' });
    db.Team.belongsToMany(db.Tournament, { through: 'TournamentTeams', foreignKey: 'teamId' });
    // sync all models with database
    await sequelize.sync();
}