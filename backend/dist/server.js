"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
const customer_1 = __importDefault(require("./customer"));
// Use customer routes
app.use('/customer', customer_1.default);
// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    res.status(404);
    next(err);
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(res.statusCode || 500).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
