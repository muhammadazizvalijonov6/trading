import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Для __dirname в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Подключение MongoDB
mongoose.connect(process.env.MONGODB_URI = "mongodb+srv://muhammadazizvalijonov956_db_user:T8FmEjftB2T5CVic@website.afl93ok.mongodb.net/?retryWrites=true&w=majority&appName=Website", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});

// Middleware
app.use(express.json());

// Раздаём статические файлы (корень проекта)
app.use(express.static(__dirname));

// Если человек заходит просто на сайт → показываем index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Проверочный маршрут
app.get("/ping", (req, res) => {
  res.send("✅ Server is running and MongoDB is connected!");
});

// Запуск
app.listen(port, () => {
  console.log(`🌍 Server running at http://localhost:${port}`);
});
