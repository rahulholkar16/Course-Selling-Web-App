import { express, CourseModel } from "../../utils/ImportExporting.js";

const CreateCourseRoute = express.Router();

CreateCourseRoute.post('/create-course', async (req, res) => {
    const { title, description, price, category, thumbnailUrl, instructor } = req.body;

    try {
        const newCourse = await CourseModel.create({
            title, 
            description, 
            price, 
            category,
            thumbnailUrl,
            instructor,
            videos: [],
            students: []
        });

        res.status(201).json({
            message: "Course created successfully!",
            course: newCourse
        });
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ error: "Server error" });
    }
});