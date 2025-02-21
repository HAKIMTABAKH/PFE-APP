import { clerk } from '../config/clerk.js';

const authenticate = async (req, res, next) => {
    try {
        const session = await clerk.sessions.verifySession(req.headers.authorization);
        req.user = session.user; // Attach the user to the request object
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export default authenticate;