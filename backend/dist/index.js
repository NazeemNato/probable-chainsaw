"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import required modules
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import routes
const comment_routes_1 = __importDefault(require("./routes/comment_routes"));
// initialize express
const app = (0, express_1.default)();
// set cors
app.use((0, cors_1.default)());
// json
app.use(express_1.default.json());
// set port
const port = process.env.PORT || 7000;
// set routes
app.get("/", (req, res) => {
    return res.send("hello world");
});
app.use("/api", comment_routes_1.default);
// listen
app.listen(port, () => console.log(`Server started on port ${port}`));
