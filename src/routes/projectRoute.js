const projectController = require('../controllers/projectController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

module.exports = (server) => {
    server.route('/project')
        .post(verify.requiredToken, projectController.createProject);

    server.route('/project/:id')
        .get(verify.requiredToken, projectController.getProjectById)
        .put(verify.requiredToken, projectController.updateProject)
        .delete(verify.requiredToken, projectController.deleteProject)
        
    server.route('/projects/')
        .get(verify.requiredToken, projectController.getAllProjects)
}