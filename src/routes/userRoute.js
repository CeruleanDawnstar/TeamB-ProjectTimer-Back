const userController = require('../controllers/userController');

module.exports = (server) => {
    server.post('/user/login', userController.userLogin);
    server.post('/user/register', userController.userRegister);

}