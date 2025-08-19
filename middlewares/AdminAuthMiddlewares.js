import { jwt, AdminModel } from "../utils/ImportExporting.js";

export const authAdmin = async (req, res, next) => {
    try {
        const token = res.cookies?.admin_token;
        if (!token) return res.status(401).json({ msg: "Unauthorized: no token" });

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) return res.status(403).json({ msg: "Forbidden: not admin" });

        const admin = await AdminModel.findById(decode.id).select("-password");
        if (!admin) return res.status(401).json({ msg: "Unauthorized: admin not found" });

        req.admin = admin;
        next();
    } catch (error) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ msg: "Token expired" });
        }
        return res.status(401).json({ msg: "Invalid token" });
    }
}