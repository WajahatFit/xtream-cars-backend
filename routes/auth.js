const router = require("express").Router();
const User = require("../models/User");
const ErrorResponse = require("../utils/error");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const TOKEN_SECRET = process.env.SECRET_TOKEN;

// @desc    SIGN UP new user
// @route   POST /api/v1/auth/signup
// @access  Public
router.post("/signup", async (req, res, next) => {
  const { email, password, username } = req.body;
  // Check if email or password or name are provided as empty string
  if (email === "" || password === "" || username === "") {
    return next(
      new ErrorResponse("Please fill all the fields to register", 400)
    );
  }
  // Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return next(new ErrorResponse("Email is not a valid format", 400));
  }
  // Use regex to validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    return next(
      new ErrorResponse(
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter",
        400
      )
    );
  }
  try {
    const userInDB = await User.findOne({ email });
    if (userInDB) {
      return next(
        new ErrorResponse(`User already exists with email ${email}`, 400)
      );
    } else {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const user = await User.create({ email, hashedPassword, username });
      const publicUser = {
        // Decide what fields of our user we want to return
        username: user.username,
        email: user.email,
      };
      res.status(201).json({ message: "success!", data: publicUser });
    }
  } catch (error) {
    next(error);
  }
});

// @desc    get all the users
// @route   POST /api/v1/auth/users
// @access  Private
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: "error getting users" });
  }
});
// @desc    LOG IN user
// @route   POST /api/v1/auth/login
// @access  Public

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  // Check if email or password are provided as empty string
  if (email === "" || password === "") {
    return next(new ErrorResponse("Please fill all the fields to login", 400));
  }
  try {
    const userInDb = await User.findOne({ email });

    if (!userInDb) {
      return next(
        new ErrorResponse(
          `Looks like you don't have account registered by ${email}`,
          404
        )
      );
    } else {
      const passwordMatches = bcrypt.compareSync(
        password,
        userInDb.hashedPassword
      );
      if (passwordMatches) {
        const payload = {
          email: userInDb.email,
          username: userInDb.username,
          role: userInDb.role,
          _id: userInDb._id,
        };

        const authToken = jwt.sign(payload, TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "30d",
        });

        res.status(200).json({ authToken: authToken });
      } else {
        next(new ErrorResponse("Unable to authenticate user", 401));
      }
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
