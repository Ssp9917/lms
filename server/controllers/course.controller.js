import Course from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";

// add a course
export const addCourse = async (req, res) => {
    try {
        const { courseTitle, category } = req.body;

        const creatorId = req.user._id

        if (!courseTitle || !category) {
            return res.status(400).json({
                message: "Course title and category is required."
            })
        }

        const course = new Course({
            courseTitle,
            category,
            creator: creatorId
        });

        await course.save()

        return res.status(201).json({
            course,
            message: "Course created."
        })
    } catch (error) {
        console.log("Error in addCourse controller", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

// get creatorCourses
export const getCreatorCourses = async (req, res) => {
    try {
        const creatorId = req.user._id;
        const courses = await Course.find({ creator: creatorId });
        if (!courses) {
            return res.status(404).json({
                courses: [],
                message: "Course not found"
            })
        };
        return res.status(200).json({
            courses,
        })
    } catch (error) {
        console.log("Error in getCretorCorses controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

// get course by id
export const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId).populate("category");

        if (!course) {
            res.status(404).json({
                message: "Course not found!"
            })
        }
        res.status(200).json({
            course
        })
    } catch (error) {
        console.log("Error in getCourseById controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

// edit course by id
export const editCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;

        // Build the update data object dynamically
        const updateData = {
            courseTitle,
            subTitle,
            description,
            category,
            courseLevel,
            coursePrice,
        };

        // Add courseThumbnail only if a file is provided
        if (req.file?.path) {
            updateData.courseThumbnail = req.file.path;
        }

        // Find and update the course
        const course = await Course.findByIdAndUpdate(courseId, updateData, { new: true });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json({
            course,
            message: "Course updated successfully.",
        });
    } catch (error) {
        console.error("Error in editCourse controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// create lecture
export const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body
        const { courseId } = req.params

        if (!lectureTitle || !courseId) {
            return res.status(400).json({ message: "Lecture Title and courseId is required" })
        }

        // create lecture
        const lecture = await Lecture.create({ lectureTitle })

        // find course
        const course = await Course.findById(courseId)

        if (course) {
            course.lectures.push(lecture._id)
            await course.save()
        }

        return res.status(201).json({ lecture, message: "Lecture created successfully" })



    } catch (error) {
        console.log("Error in createLecture controller", error.message);
        res.status(500).json({ message: "Internal server error" })
    }
}

// get all lecture
export const getCourseLecture = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId).populate("lectures")

        if (!course) {
            return res.status(404).json({ message: "Course not found" })
        }

        return res.status(200).json({ lectures: course.lectures })

    } catch (error) {
        console.log("Error in getCourseLecture", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

// get lecture by id
export const getLectureById = async (req, res) => {
    try {
        const { lectureId } = req.params

        const lecture = await Lecture.findById(lectureId)

        if (!lecture) return res.status(404).json({ message: "Lecture Not Found" });

        res.status(200).json({ message: "Lecture Find successfully", lecture });


    } catch (error) {
        console.log("Erroe in getLectureById controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

// Edit lecture
export const editLecture = async (req, res) => {
    try {

        const { courseId, lectureId } = req.params;
        const { lectureTitle, videoInfo, isPreviewFree } = req.body;

        // find lecture by id
        const lecture = await Lecture.findById(lectureId);

        if (!lecture) {
            return res.status(404).json({ message: "lecture not found" })
        }

        // update lecture
        if (lectureTitle) lecture.lectureTitle = lectureTitle || lecture.lectureTitle;
        if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl || lecture.videoInfo.videoUrl;
        lecture.isPreviewFree = isPreviewFree || lecture.isPreviewFree;

        await lecture.save();

        // Ensure the course still has the lecture id if it was not aleardy added;
        // find course
        const course = await Course.findById(courseId);

        if (course && !course.lectures.includes(lecture._id)) {
            course.lectures.push(lecture._id);
            await course.save();
        };

        return res.status(200).json({
            lecture,
            message: "Lecture updated successfully."
        })

    } catch (error) {
        console.log("Error in editLecture controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

// get published course
export const getPublishedCourse = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).populate({ path: "creator", select: "name photoUrl" });
        if (!courses) {
            return res.status(404).json({
                message: "Course not found"
            })
        }
        return res.status(200).json({
            courses,
        })
    } catch (error) {
        console.log("Error in getPublishedCourse controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}
