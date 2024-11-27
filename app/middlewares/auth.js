const jwt = require('jsonwebtoken');

exports.authorize = (req, res, next) => {
    let token;

    if (req.headers.authorization) {
        try {
            token = req.headers.authorization;

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};
