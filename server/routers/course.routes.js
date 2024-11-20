import { Router } from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { addCourse, editCourse, getCourseById, getCreatorCourses } from "../controllers/course.controller.js";
import upload from "../config/multerConfig.js";

const courseRouter = Router();

courseRouter.post('/addCourse',protectRoute,addCourse);
courseRouter.get('/getAllCourse',protectRoute,getCreatorCourses);
courseRouter.get('/getCourseById/:courseId',protectRoute,getCourseById);
courseRouter.put('/editCourse/:courseId',protectRoute,upload.single("courseThumbnail"),editCourse);
courseRouter.post('/:courseId/addLecture',protectRoute,createLecture)

export default courseRouter