const { Router } = require("express");
const { register, login, getMe } = require("../controller/auth.controller");
const {
  registerValidator,
  loginValidator,
} = require("../validator/auth.validator");
const auth = require("../middleware/auth.middleware");

const authRouter = Router();

// Inline validator middleware'lar
const checkRegister = (req, res, next) => {
  const error = registerValidator(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Validation xatosi", error: error.details[0].message });
  }
  next();
};

const checkLogin = (req, res, next) => {
  const error = loginValidator(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: "Validation xatosi", error: error.details[0].message });
  }
  next();
};

// POST /register — yangi foydalanuvchi ro'yxatdan o'tish
authRouter.post("/register", checkRegister, register);

// POST /login — tizimga kirish
authRouter.post("/login", checkLogin, login);

// GET /me — o'z profilini olish (auth middleware orqali)
authRouter.get("/me", auth, getMe);

module.exports = authRouter;
