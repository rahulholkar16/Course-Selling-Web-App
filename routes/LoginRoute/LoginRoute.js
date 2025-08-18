import { express, jwt, UserModel, bcrypt } from "../../utils/ImportExporting.js";


const LoginRoute = express.Router();

LoginRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(401).json({ msg: "Invalid email and password!" });

        const ok = await bcrypt.compare(password, user?.password);
        if (!ok) return res.status(401).json({ msg: "Invalid password!" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token, {
            httpOnly: true,
            // secure: true,         // Uncomment in Production(HTTPS)
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ msg: "Login successfully!" });
    } catch (e) {
        return res.status(500).json({ msg: "Error in Login: ", error: e.message });
    }
})

export default LoginRoute;