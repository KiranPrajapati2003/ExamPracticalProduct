const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
    const token = req.cookies?.token;

        

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, 'kiran'); // Verify the token
        req.user = decoded; // Attach decoded info to req.user
        console.log('Decoded JWT:', decoded);
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        console.error('JWT Verification Error:', err.message);
        return res.redirect('/login'); // Redirect to login on error
    }
};

module.exports = userAuth;

