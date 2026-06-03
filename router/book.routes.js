const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const {
  getAllBooks,
  getOneBook,
  addBook,
  updateBook,
  deleteBook,
  getBooksStats,
} = require("../controller/book.controller");
const auth = require("../middleware/auth.middleware");
const bookValidate = require("../middleware/book.validate.middleware");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.fieldname + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Faqat rasm fayllari qabul qilinadi (jpg, png, webp, gif)"),
      false,
    );
  }
};

const upload = multer({storage,fileFilter,limits: { fileSize: 5 * 1024 * 1024 }});

const bookRouter = Router();


bookRouter.get("/books/stats", getBooksStats);
bookRouter.get("/get_all_books", getAllBooks);
bookRouter.get("/get_one_book/:id", getOneBook);
bookRouter.post("/add_book",auth,upload.single("file"),bookValidate,addBook);
bookRouter.put("/update_book/:id",auth,upload.single("file"),bookValidate,updateBook);
bookRouter.delete("/delete_book/:id", auth, deleteBook);

module.exports = bookRouter;
