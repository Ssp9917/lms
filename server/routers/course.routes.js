import { Router } from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { addCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getLectureById, getPublishedCourse, getSearchCourse, removeLecture, toggelPublishCourse } from "../controllers/course.controller.js";
import upload from "../config/multerConfig.js";

const courseRouter = Router();

courseRouter.post('/addCourse',protectRoute,addCourse);
courseRouter.get('/getAllCourse',protectRoute,getCreatorCourses);
courseRouter.get('/getSearchCourse',protectRoute,getSearchCourse)
courseRouter.get('/getPublishedCourses',getPublishedCourse);
courseRouter.get('/getCourseById/:courseId',protectRoute,getCourseById);
courseRouter.put('/editCourse/:courseId',protectRoute,upload.single("courseThumbnail"),editCourse);
courseRouter.post('/:courseId/addLecture',protectRoute,createLecture);
courseRouter.get('/:courseId/lecture',protectRoute,getCourseLecture);
courseRouter.put('/:courseId/lecture/:lectureId',protectRoute,editLecture);
courseRouter.get('/lecture/:lectureId',protectRoute,getLectureById);
courseRouter.patch('/:courseId',protectRoute,toggelPublishCourse);
courseRouter.delete(`/lecture/:lectureId`,protectRoute,removeLecture)

export default courseRouter