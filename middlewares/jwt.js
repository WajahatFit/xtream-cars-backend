const { expressjwt: jwt } = require("express-jwt");
const ErrorResponse = require("../utils/error");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Function to extract the JWT token from the request's 'Authorization' headers
function getTokenFromHeaders(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }
  return null;
}

// Log to ensure the JWT secret is being loaded
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const isAuthenticated = jwt({
  secret: process.env.JWT_SECRET, // Ensure this matches the key in your .env file
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders,
});

const isAdmin = (req, res, next) => {
  if (req.payload && req.payload.role === "admin") {
    next();
  } else {
    next(new ErrorResponse("User is not admin", 401));
  }
};

module.exports = {
  isAuthenticated,
  isAdmin,
};
