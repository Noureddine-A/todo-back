const jwtoken = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.get("Authorization").split(" ")[1];
     let decodedToken;

     try {
        decodedToken = jwtoken.verify(token, "asecretpasswordnoonewillknowabout");
     } catch (error) {
        error.status = 500;
        error.message = 'Something went wrong.'
        throw error;
     }

    if(!decodedToken) {
        let error = new Error();
        error.message = "Authorization failed."
        error.status = 401;
        throw error;
    }

    req.user = decodedToken;

    next();
}