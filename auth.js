const jwtDecode = require('jwt-decode');

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

exports.token_valid = token_valid;