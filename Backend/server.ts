import express, { Application } from "express";
import cors from 'cors'; // Import the cors package
import index from "./src/index";

const app: Application = express();

// Enable CORS for specific origins (more secure approach)
const allowedOrigins = ['https://your-allowed-domain1.com', 'https://your-allowed-domain2.com'];
app.use(cors({
  origin: allowedOrigins
}));

// ... Add your API routes and middleware here ...

// Error handling middleware (optional but recommended)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})
.on("error", (err: any) => {
  if (err.code === "EADDRINUSE") {
    console.log("Error: address already in use");
  } else {
    console.log(err);
  }
});

// Import and start your main application logic (optional)
if (process.env.NODE_ENV !== 'test') {
  new index(app);
}

module.exports = app; // Export the app instance for testing (optional)
