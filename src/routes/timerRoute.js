const timerController = require('../controllers/timerController');
const jwtMiddleware = require('../middlewares/jwtmiddleware'); 

module.exports = (server) => {
    server.route('/timer/') // set a new timer
        .post(jwtMiddleware.verifyToken, timerController.setTimer);

    server.route('/timer/:id')
        .put(jwtMiddleware.verifyToken, timerController.updateTimer)
        .delete(jwtMiddleware.verifyToken, timerController.deleteTimer);

    server.route('/timers/user/:id')
        .get(jwtMiddleware.verifyToken, timerController.getTimerByUser);

    server.route('/timers/project/:id')
        .get(jwtMiddleware.verifyToken, timerController.getTimerByProject);

}