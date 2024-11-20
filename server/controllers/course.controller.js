import Course from "../models/course.model.js";

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

export const createLecture = async (req,res) => {
    try {
        const {lectureTitle} = req.body
        const {courseId} = req.params

        if(!lectureTitle || !courseId){
            return res.status(400).json({message:"Lecture Title and courseId is required"})
        }

        // create lecture
        const lecture = await 
        
    } catch (error) {
        console.log("Error in createLecture controller", error.message);
        res.status(500).json({message:"Internal server error"})
    }
} 
