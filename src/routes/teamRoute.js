const teamController = require('../controllers/teamController');

module.exports = (server) => {
    server.route('/team')
        .get(teamController.listAllTeam)
        .post(teamController.createATeam);

    server.route('/team/:id_team')
        .get(teamController.getATeam)
        .put(teamController.updateATeam)
        .delete(teamController.deleteATeam);
}