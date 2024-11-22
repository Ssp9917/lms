import { Router } from "express";
import { createCheckoutSession, getCourseDetailWithPurchaseStatus } from "../controllers/coursePurchase.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const purchaseRoute = Router()

purchaseRoute.post('/create-checkout-session',protectRoute,createCheckoutSession)
purchaseRoute.get('/:courseId/detail-with-status',protectRoute,getCourseDetailWithPurchaseStatus)

export default purchaseRoute