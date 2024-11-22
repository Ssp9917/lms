import { fileURLToPath } from "url";
import Category from "../models/category.model.js";
import Course from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import fs from 'fs';
import path from 'path';

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

// get search corse

export const getSearchCourse = async (req, res) => {
    try {
        const { query = "", categories = [], sortByPrice = "" } = req.query;

        console.log("Query Params:", { query, categories, sortByPrice });

        // Build regex for the query
        const queryRegex = new RegExp(query, "i");

        // Step 1: Find category IDs if `category` is a reference
        let categoryIds = [];
        if (query && !categories.length) {
            const matchingCategories = await Category.find({ name: queryRegex });
            categoryIds = matchingCategories.map((cat) => cat._id);
        }

        // Step 2: Construct search criteria
        const searchCriteria = {
            isPublished: true,
            $or: [
                { courseTitle: queryRegex },
                { subTitle: queryRegex },
            ],
        };

        if (categories.length > 0) {
            // Use directly provided category IDs
            searchCriteria.category = { $in: categories };
        } else if (categoryIds.length > 0) {
            // Use fetched category IDs based on query
            searchCriteria.category = { $in: categoryIds };
        }

        // Step 3: Fetch courses
        let courses = await Course.find(searchCriteria).populate({
            path: "creator",
            select: "name photoUrl",
        });

        // console.log(sortByPrice)
        // Step 4: Sort courses
        if (sortByPrice == "high") {
            // console.log("high coll")
            // console.log(courses)
            courses = courses.sort((a, b) => a.coursePrice - b.coursePrice);
        } else if (sortByPrice == "low") {
            // console.log("low call")
            // console.log(courses)
            courses = courses.sort((a, b) => b.coursePrice - a.coursePrice);
        }

        return res.status(200).json({
            success: true,
            courses: courses || [],
        });
    } catch (error) {
        console.error("Error in getSearchCourse controller:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// toggel publish course
export const toggelPublishCourse = async (req,res) => {
    try {
        const {courseId} = req.params;
        const {publish} = req.query; //true, false

        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                message:"Course not found"
            });
        }

        // publish status based on the query parameter
        course.isPublished = publish === "true";
        await course.save()

        const statusMessage = course.isPublished ? "Published" : "Unpublished";

        return res.status(200).json({
            message:`Course is ${statusMessage}`
        })

    } catch (error) {
        console.log("Error in toggelPublishCourse",error.message);
        res.status(500).json({message:"Internal server error"})        
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

// remove lecture
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const removeLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;

        // Find lecture
        const lecture = await Lecture.findByIdAndDelete(lectureId);

        if (!lecture) {
            return res.status(404).json({ message: "Lecture not found" });
        }
        console.log(__dirname,lecture)
        // Delete the lecture video from the uploads folder
        if (lecture.videoUrl) {
            const filePath = path.join(__dirname, '..', 'uploads', lecture.videoUrl.replace(/^uploads[\\/]/, '')); // Remove "uploads/" prefix if it exists


            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log("Error deleting video file:", err.message);
                } else {
                    console.log("Lecture video file deleted successfully.");
                }
            });
        }

        // Remove the lecture from the associated course
        await Course.updateOne(
            { lectures: lectureId }, // Find the course containing this lecture
            { $pull: { lectures: lectureId } } // Remove the lecture's ID from the lectures array
        );

        return res.status(200).json({
            message: "Lecture removed successfully.",
        });
    } catch (error) {
        console.log("Error in removeLecture controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

