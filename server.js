import { express, mongoose, cookieParser } from "./utils/ImportExporting.js";
import { SignupRoute, LoginRoute, UploadVideo, AdminSignupRoute, AdminLoginRoute, CoursesRoute } from "./routes/routes.js";
import { auth, authAdmin } from "./middlewares/middlewares.js";

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

// Login route
app.use('/user', LoginRoute);

// All Courses route
app.use('/user', auth, CoursesRoute);

// ---------- User routes ----------

// Admin Signup Route
app.use('/admin', AdminSignupRoute);

// Admin Login Route
app.use('/admin', AdminLoginRoute);

// Admin Create course route
app.use('/admin', )

// Admin uploadVideo Route 
app.use('/admin', authAdmin, UploadVideo);

app.listen(PORT, () => {
    console.log("🚀 Server start at:", PORT);
})