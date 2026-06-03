const jwt = require("jsonwebtoken");
const User = require("../schema/user.schema");
const CustomErrorHandler = require("../error/error");

// JWT tokenni tekshiruvchi middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return next(CustomErrorHandler.unauthorized("Token topilmadi"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(CustomErrorHandler.unauthorized("Foydalanuvchi topilmadi"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(
      CustomErrorHandler.unauthorized("Token noto'g'ri yoki muddati tugagan"),
    );
  }
};

module.exports = auth;
