const jwt = require("jsonwebtoken");
const User = require("../schema/user.schema");
const CustomErrorHandler = require("../error/error");

// REGISTER
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      throw CustomErrorHandler.alreadyExists("Foydalanuvchi allaqachon mavjud");
    }

    const user = await User.create({ username, email, password });

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      message: "Foydalanuvchi muvaffaqiyatli yaratildi",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      throw CustomErrorHandler.notFound("Foydalanuvchi topilmadi");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw CustomErrorHandler.unauthorized("Parol noto'g'ri");
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(200).json({
      message: "Tizimga muvaffaqiyatli kirdingiz",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET ME 
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      throw CustomErrorHandler.notFound("Foydalanuvchi topilmadi");
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe };
