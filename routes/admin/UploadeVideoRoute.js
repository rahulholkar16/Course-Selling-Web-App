import { CourseModel, express, VideoModel } from "../../utils/ImportExporting.js";

const UploadVideo = express.Router();

UploadVideo.post('/upload', async (req, res) => {
    const { courseId } = req.params;
    const { title, description, videoUrl, duration, order } = req.body;

    // add video
    const newVideo = await VideoModel.create({
        title,
        description,
        videoUrl,
        duration,
        order,
        course: courseId
    });

    // add video in course
    await CourseModel.findByIdAndUpdate(courseId, {
        $push: { videos: newVideo._id}
    });

    res.status(200).json({ msg: "Ok!" });
})

export default UploadVideo;