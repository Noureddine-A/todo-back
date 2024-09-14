const jwtoken = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.get("Authorization").split(" ")[0];

    const decodedToken = jwtoken.verify(token, "asecretpasswordnoonewillknowabout");

    if(!decodedToken) {
        let error = new Error();
        error.message = "Authorization failed."
        error.status = 401;
        throw error;
    }

    console.log(decodedToken);
    
}