import { express, authSchema, bcrypt, UserModel } from "../../utils/ImportExporting.js";
const SignupRoute = express.Router();

SignupRoute.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    // validation
    const result = authSchema.safeParse({ name, email, password });
    if (!result.success) {
        return res.status(400).json({
            msg: "Validation failed",
            errors: result.error.issues.map(issue => ({
                path: issue.path.join('.'),
                message: issue.message
            }))
        });
    }

    try {
        // avoid duplicate user
        const exists = await UserModel.findOne({ email: result.data.email });
        if (exists) return res.status(409).json({ msg: "User alredy exist!" });

        // create hash of password
        const hash = await bcrypt.hash(result.data.password, 5);
        await UserModel.create({
            name: result.data.name,
            email: result.data.email,
            password: hash
        })

        res.status(201).json({ msg: "User added successfully!" });
    } catch (e) {
        return res.status(500).json({ msg: "Error creating user", error: e.message });
    }
})

export default SignupRoute;