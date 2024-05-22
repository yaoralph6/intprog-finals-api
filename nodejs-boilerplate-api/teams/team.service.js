const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const teams = await db.Team.findAll({
        include: [{ model: db.Player }]
    });
    return teams.map(x => basicTeamDetails(x));
}

async function getById(teamId) {
    const team = await getTeam(teamId);
    return basicTeamDetails(team);
}

async function create(params) {
    const existingTeam = await db.Team.findOne({ where: { name: params.name } });
    if (existingTeam) {
        throw new Error('Team "' + params.name + '" is already registered');
    }

    const team = await db.Team.create(params);
    return basicTeamDetails(team);
}

async function update(teamId, params) {
    const team = await getTeam(teamId);

    if (params.name && team.name !== params.name && await db.Team.findOne({ where: { name: params.name } })) {
        throw new Error('Team name "' + params.name + '" is already taken');
    }

    Object.assign(team, params);
    team.updated = Date.now();
    await team.save();

    return basicTeamDetails(team);
}

async function _delete(teamId) {
    const team = await getTeam(teamId);
    await team.destroy();
}

async function getTeam(teamId) {
    const team = await db.Team.findByPk(teamId, {
        include: [{ model: db.Player }]
    });
    if (!team) throw new Error('Team not found');
    return team;
}

function basicTeamDetails(team) {
    const { teamId, name, location, coach, region, manager, Players } = team;
    return { teamId, name, location, coach, region, manager, players: Players };
}
