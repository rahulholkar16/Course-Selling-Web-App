import { mongoose } from "./utils/ImportExporting.js";

const Schema = mongoose.Schema;

const User = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    purchasedCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }]
}, { timestamps: true });

const Admin = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: String
}, { timestamps: true });

// Course Schema
const CourseSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: String,
    thumbnailUrl: String,
    instructor: { type: Schema.Types.ObjectId, ref: "Instructor" },
    videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    students: [{ type: Schema.Types.ObjectId, ref: "users" }],
}, { timestamps: true });

const VideoSchema = new Schema({
    title: String,
    description: String,
    videoUrl: { type: String, required: true },   // Cloud URL
    duration: String,
    order: Number,                               // sequence in course
    course: { type: Schema.Types.ObjectId, ref: "Course" }
});


// const AdminVideo = new Schema

export const UserModel = mongoose.model('User', User);
export const AdminModel = mongoose.model('Admin', Admin);
export const CourseModel = mongoose.model('Course', CourseSchema);
export const VideoModel = mongoose.model('Video', VideoSchema);