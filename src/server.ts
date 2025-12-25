import express from "express";
import path from "path";
import { memories } from "./memories";

const app = express();

// Gebruik de door Railway toegekende poort, fallback lokaal 3000
const PORT = process.env.PORT || 3000;

// ===== EJS setup =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ===== Static files =====
app.use(express.static(path.join(__dirname, "../public"))); // pas pad aan indien nodig

// ===== Routes =====
app.get("/", (req, res) => {
  res.render("index", {
    introText: "A little look into our race ❤️"
  });
});

app.get("/garage", (req, res) => {
  res.render("garage", { memories });
});

// Detailpagina per memory
memories.forEach((memory) => {
  app.get(`/garage/${memory.file}`, (req, res) => {
    res.render(memory.file, { memory });
  });
});

app.get("/final", (req, res) => {
  res.render("final", {
    message: "Wat dit ook wordt, ik ben blij dat ik jou heb leren kennen ❤️. Looking forward to seeing you soon! Merry Christmas! I hope you like your gift... I guess I do like you ;). PS: (Yes, it is signed by your hero)"
  });
});

// ===== Server start =====
app.listen(PORT, () => {
  console.log(`🚀 Server draait op poort ${PORT}`);
});

export {};
