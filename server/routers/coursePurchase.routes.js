import { Router } from "express";
import { getCourseDetailWithPurchaseStatus } from "../controllers/coursePurchase.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const purchaseRoute = Router()

purchaseRoute.get('/:courseId/detail-with-status',protectRoute,getCourseDetailWithPurchaseStatus)

export default purchaseRoute