"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Import the cors package
const index_1 = __importDefault(require("./src/index"));
const app = (0, express_1.default)();
// Enable CORS for specific origins (more secure approach)
const allowedOrigins = ['https://your-allowed-domain1.com', 'https://your-allowed-domain2.com'];
app.use((0, cors_1.default)({
    origin: allowedOrigins
}));
// ... Add your API routes and middleware here ...
// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})
    .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.log("Error: address already in use");
    }
    else {
        console.log(err);
    }
});
// Import and start your main application logic (optional)
if (process.env.NODE_ENV !== 'test') {
    new index_1.default(app);
}
module.exports = app; // Export the app instance for testing (optional)
