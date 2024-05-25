const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const tournaments = await db.Tournament.findAll();
    return tournaments.map(x => basicTournamentDetails(x));
}

async function getById(tournamentId) {
    const tournament = await getTournament(tournamentId);
    return basicTournamentDetails(tournament);
}

async function create(params) {
    // Check if a tournament with the same name already exists
    const existingTournament = await db.Tournament.findOne({ where: { name: params.name } });
    if (existingTournament) {
        throw new Error(`Tournament "${params.name}" is already registered`);
    }

    // Create new tournament
    const tournament = await db.Tournament.create(params);
    return basicTournamentDetails(tournament);
}

async function update(tournamentId, params) {
    const tournament = await getTournament(tournamentId);

    // Check if the new name is already taken by another tournament
    if (params.name && tournament.name !== params.name) {
        const existingTournament = await db.Tournament.findOne({ where: { name: params.name } });
        if (existingTournament) {
            throw new Error(`Tournament name "${params.name}" is already taken`);
        }
    }

    // Update tournament details
    Object.assign(tournament, params);
    tournament.updated = Date.now();
    await tournament.save();

    return basicTournamentDetails(tournament);
}

async function _delete(tournamentId) {
    const tournament = await getTournament(tournamentId);
    await tournament.destroy();
}

async function getTournament(tournamentId) {
    const tournament = await db.Tournament.findByPk(tournamentId);
    if (!tournament) throw new Error('Tournament not found');
    return tournament;
}

function basicTournamentDetails(tournament) {
    const { tournamentId, name, location, startDate, endDate } = tournament;
    return { tournamentId, name, location, startDate, endDate };
}
