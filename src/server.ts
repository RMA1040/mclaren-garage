import express from "express";
import path from "path";
import { memories } from "./memories";

const app = express();
const PORT = 3000;

// ===== EJS setup =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ===== Static files =====
app.use(express.static(path.join(__dirname, "../public"))); // pas pad aan indien nodig

// ===== Routes =====

// Home / index
app.get("/", (req, res) => {
  res.render("index", {
    introText: "A little look into our race ❤️"
  });
});

// Garage overzicht
app.get("/garage", (req, res) => {
  res.render("garage", { memories });
});

// Detailpagina per memory
memories.forEach((memory) => {
  app.get(`/garage/${memory.file}`, (req, res) => {
    res.render(memory.file, { memory });
  });
});

// Finale pagina
app.get("/final", (req, res) => {
  res.render("final", {
    message: "Wat dit ook wordt, ik ben blij dat ik jou heb leren kennen ❤️. Looking forward to seeing you soon! Merry Christmas! I hope you like your gift... I guess I do like you ;). PS: (Yes, it is signed by your hero)"
  });
});

// ===== Server start =====
app.listen(PORT, () => {
  console.log(`🚀 Server draait op http://localhost:${PORT}`);
});
export {};