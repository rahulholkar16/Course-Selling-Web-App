import { express, mongoose, cookieParser } from "./utils/ImportExporting.js";
import { SignupRoute, LoginRoute, UploadVideo } from "./routes/routes.js";

// DB Config
mongoose.connect(process.env.DB_URL)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB error:", err.message));
