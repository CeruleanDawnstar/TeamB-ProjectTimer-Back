const projectController = require('../controllers/projectController');
const jwtMiddleware = require('../middlewares/jwtmiddleware');


module.exports = (server) => {
    server.route('/project')
        .all(jwtMiddleware.verifyToken)
        .post(projectController.createProject);

    server.route('/project/:id_project')
        .get(projectController.projectsByUser)
        .put(projectController.updatedProject)
        .delete(projectController.deletedProject);
}