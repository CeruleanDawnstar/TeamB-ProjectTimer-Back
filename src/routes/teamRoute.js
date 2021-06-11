const teamController = require('../controllers/teamController');

module.exports = (server) => {
    server.route('/project/:id_project/team')
        .get(teamController.listAllTeam)
        .post(teamController.createATeam);

    server.route('/team/:id_team')
        .get(teamController.getATeam)
        .put(teamController.updateATeam)
        .delete(teamController.deleteATeam);
}