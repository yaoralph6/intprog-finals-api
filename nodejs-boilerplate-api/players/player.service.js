const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const players = await db.Player.findAll({
        include: db.Team
    });
    return players.map(x => basicPlayerDetails(x));
}

async function getById(playerId) {
    const player = await getPlayer(playerId);
    return basicPlayerDetails(player);
}

async function create(params) {
    // Validate
    const existingPlayer = await db.Player.findOne({ where: { name: params.name } });
    if (existingPlayer) {
        throw new Error('Player "' + params.name + '" is already registered');
    }

    // Create and save new player
    const player = await db.Player.create(params);
    return basicPlayerDetails(player);
}

async function update(playerId, params) {
    const player = await getPlayer(playerId);

    // Validate if the name was changed and is already taken
    if (params.name && player.name !== params.name && await db.Player.findOne({ where: { name: params.name } })) {
        throw new Error('Player name "' + params.name + '" is already taken');
    }

    // Copy params to player and save
    Object.assign(player, params);
    player.updated = Date.now();
    await player.save();

    return basicPlayerDetails(player);
}

async function _delete(playerId) {
    const player = await getPlayer(playerId);
    await player.destroy();
}

// Helper functions

async function getPlayer(playerId) {
    const player = await db.Player.findByPk(playerId, {
        include: db.Team
    });
    if (!player) throw new Error('Player not found');
    return player;
}

function basicPlayerDetails(player) {
    const { playerId, name, nationality, born, region, role, ingameName, teamId } = player;
    return { playerId, name, nationality, born, region, role, ingameName, teamId };
}
