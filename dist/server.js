"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const memories_1 = require("./memories");
const app = (0, express_1.default)();
// ===== EJS setup =====
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
// ===== Static files =====
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
// ===== Routes =====
app.get("/", (req, res) => {
    res.render("index", {
        introText: "A little look into our race ❤️"
    });
});
app.get("/garage", (req, res) => {
    res.render("garage", { memories: memories_1.memories });
});
// Detailpagina per memory
memories_1.memories.forEach((memory) => {
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server draait op port ${PORT}`);
});
