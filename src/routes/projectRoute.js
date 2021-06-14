const projectController = require('../controllers/projectController');
const jwtMiddleware = require('../middlewares/jwtmiddleware');


module.exports = (server) => {
    server.route('/project')
        .post(jwtMiddleware.verifyToken, projectController.createProject);

    server.route('/project/:id')
        .get(jwtMiddleware.verifyToken, projectController.getProjectById)
        .put(jwtMiddleware.verifyToken, projectController.updateProject)
        .delete(jwtMiddleware.verifyToken, projectController.deleteProject)
        
    server.route('/projects')
        .get(jwtMiddleware.verifyToken, projectController.getAllProjects)
}