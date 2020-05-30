const jwt_decode = require('jwt-decode')
const db = require('./models');

 const getUser = async (token) => {

    const decodedToken = jwt_decode(token);
    
    const getUser = await db.user.findOne({
        where: {
          email: decodedToken.email
        }
      });

      return  getUser
}

const getScope = async (token) => {

    const decodedToken = jwt_decode(token);
    
    const getUser = await db.user.findOne({
        where: {
          email: decodedToken.email
        }
      });

      const scope = getUser.accessLevel
      const getGroup = await db.group.findOne({
          where: {
              name: scope.toLowerCase()
          }
      });

      console.log(getGroup)

   return getGroup


}



exports.getUser = getUser;
exports.getScope = getScope;
