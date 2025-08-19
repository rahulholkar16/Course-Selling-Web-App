import { express, CourseModel } from "../../utils/ImportExporting";

const CoursesRoute = express.Router();

CoursesRoute.get('/courses', async (req, res) => {
    try {
        const courses = await CourseModel.find({});
        res.status(200).json({ success: true, courses });
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error fetching courses", error: error.message });
    }
});

export default CoursesRoute;