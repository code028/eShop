"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const PORT = process.env.SERVER_PORT;
const Server = (0, express_1.default)();
Server.use(express_1.default.json());
Server.get("/", (req, res) => {
    res.send("Hello there");
});
Server.listen(PORT, () => {
    console.clear();
});
// \"npm run dev\" --prefix client
