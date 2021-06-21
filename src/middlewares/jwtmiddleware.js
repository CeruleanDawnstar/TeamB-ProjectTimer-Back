const jwt = require('jsonwebtoken');

const jwtKey = process.env.JWT_KEY;

exports.verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];

    if (token !== undefined) {
        jwt.verify(token, jwtKey, (error, payload) => {
            console.log(payload)
            if (error) {
                res.status(403);
                res.json({
                    message: 'Forbidden access : invalid token'
                });
            } else {
                next();
            }
        })

    } else {
        res.status(403);
        res.json({
            message: 'Forbidden access : missing token'
        });
    }
}