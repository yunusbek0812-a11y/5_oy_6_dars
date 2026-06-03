const { Schema, model } = require("mongoose");

const Book = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    period: {
      type: String,
      required: true,
      enum: {
        values: [
          "Temuriylar davri",
          "Jadid adabiyoti",
          "Sovet davri",
          "Mustaqillik davri",
        ],
        message: "{VALUE} — bunday davr mavjud emas",
      },
    },
    genre: {
      type: String,
      required: true,
      enum: {
        values: [
          "Nasr",
          "Nazm",
          "Drama",
          "Esse",
          "Qissa",
          "Roman",
          "She'riyat",
        ],
        message: "{VALUE} — bunday janr mavjud emas",
      },
    },
    cover_url: { type: String, default: "" },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    price: {
      type: Number,
      required: [true, "Narx majburiy"],
      min: [0, "Narx manfiy bo'lmaydi"],
    },
    published_year: { type: Number, required: [true, "Nashr yili majburiy"] },
    pages: { type: Number, default: 0 },
    is_available: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true },
);

module.exports = model("Book", Book);
