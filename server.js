import { express, mongoose, cookieParser } from "./utils/ImportExporting.js";
import { SignupRoute, LoginRoute, UploadVideo } from "./routes/routes.js";

// DB Config
mongoose.connect(process.env.DB_URL)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB error:", err.message));

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());

// ---------- User routes ----------

// Sign Up route
app.use('/user', SignupRoute);
