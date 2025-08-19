import { express, jwt, bcrypt, authSchema, AdminModel } from "../../utils/ImportExporting";

const AdminSignupRoute = express.Router();

AdminSignupRoute.post('/signup', async (req, res) => {
    const { name, email, password, secret_key } = req.body;

    // Validation
    if(secret_key !== process.env.SECRET_KEY) return res.status(401).json({ msg: "Invalid Secret Key!" });

    const result = authSchema.safeParse({ name, email, password });
    if(!result.success){
        return res.status(400).json({
            msg: "Validation failed",
            errors: result.error.issues.map(issue => ({
                path: issue.path.join('.'),
                message: issue.message
            }))
        });
    }

    try {
        // avoid duplicate Admin
        const exist = await AdminModel.findOne({ email: result.data.email });
        if(exist) return res.status(401).json({ msg: "Admin alredy exist!" });

        // create hash
        const hash = await bcrypt.hash(result.data.password, 5);
        AdminModel.create({ 
            name: result.data.name,
            email: result.data.email,
            password: hash
        })

        res.status(201).json({ msg: "Admin added successfully!" });
    } catch (error) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
})

export default AdminSignupRoute;