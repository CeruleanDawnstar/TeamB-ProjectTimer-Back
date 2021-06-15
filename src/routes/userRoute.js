const userController = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtmiddleware');


module.exports = (server) => {
    server.post('/user/login', userController.userLogin);
    server.post('/user/register', userController.userRegister);


    server.route('/users')
        .get(jwtMiddleware.verifyToken, userController.getAllUsers)

    server.route('/user')
        .put(jwtMiddleware.verifyToken, userController.updateUser)
        .delete(jwtMiddleware.verifyToken, userController.deleteUser)

    server.route('/user/:id')
        .get(jwtMiddleware.verifyToken, userController.getUserById)

    server.route('/logout')
        .get(jwtMiddleware.verifyToken, userController.logout)

}