import { express, jwt, AdminModel } from "../../utils/ImportExporting.js";

const AdminLoginRoute = express.Router();

AdminLoginRoute.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ msg: "email and password are required" });

        const admin = await AdminModel.findOne({ email });
        if (!admin) return res.status(401).json({ msg: "Invalid credentials" });

        const ok = await bcrypt.compare(password, admin.password);
        if (!ok) return res.status(401).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.cookie("admin_token", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });
        const { password: _pw, ...adminSafe } = admin.toObject();
        return res.status(200).json({ msg: "Admin logged in ✅", admin: adminSafe });
    } catch (err) {
        console.error("Admin Login Error:", err.message);
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
})

export default AdminLoginRoute;