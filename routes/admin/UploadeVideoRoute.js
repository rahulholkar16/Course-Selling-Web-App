import { express, VideoModel } from "../../utils/ImportExporting.js";

const UploadVideo = express.Router();

UploadVideo.post('/upload', async (req, res) => {
    const { title, description } = req.body;

    await VideoModel.create({
        title, description, videoUrl: "../../videos/Part_1.mp4"
    })

    res.status(200).json({ msg: "Ok!" });
})

export default UploadVideo;