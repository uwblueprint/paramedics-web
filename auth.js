const jwtDecode = require('jwt-decode');
const db = require('./models');
const { AuthenticationError } = require('apollo-server');

function token_valid(token) {
    try {
        var decoded = jwtDecode(token);
    }
    catch {
        return false;
    }
    // Date.not() uses milliseconds, unix timestamp is in seconds
    return Date.now() / 1000 < decoded["exp"];
}

 const getUser = async (token) => {

    const decodedToken = jwtDecode(token);
    
    try{
        var getUser = await db.user.findOne({
            where: {
            email: decodedToken.email
            }
        });
    }
    catch {
        throw new AuthenticationError("error fetching user");
    }
      return getUser
}

const getScope = async (token) => {

    const decodedToken = jwtDecode(token);
    
    try {
    const getUser = await db.user.findOne({
        where: {
          email: decodedToken.email
        }
      });

      const scope = getUser.accessLevel
      var getGroup = await db.group.findOne({
          where: {
              name: scope.toLowerCase()
          }
      });
    } 
    catch {
        throw new AuthenticationError("error fetching group");
    }
   return getGroup


}

exports.token_valid = token_valid;
exports.getUser = getUser;
exports.getScope = getScope;
