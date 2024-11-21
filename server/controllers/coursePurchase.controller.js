import Course from "../models/course.model.js";
import { CoursePurchase } from "../models/CoursePurchase.model.js";


export const getCourseDetailWithPurchaseStatus = async (req,res) => {
    try {
        const { courseId } = req.params;
        const userId =  req.user._id;

        console.log(courseId)
    
        const course = await Course.findById(courseId)
          .populate({ path: "creator" })
          .populate({ path: "lectures" });
    
        const purchased = await CoursePurchase.findOne({ userId, courseId });
        console.log(purchased);
    
        if (!course) {
          return res.status(404).json({ message: "course not found!" });
        }
    
        return res.status(200).json({
          course,
          purchased: !!purchased, // true if purchased, false otherwise
        });
    } catch (error) {
        console.log("Error In getCourseDetailWithPurchaseStatus controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}