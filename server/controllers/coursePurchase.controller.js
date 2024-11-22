import Stripe from 'stripe'
import Course from "../models/course.model.js";
import { CoursePurchase } from "../models/CoursePurchase.model.js";
import dotenv from 'dotenv'

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


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

export const createCheckoutSession = async (req,res) => {
  try {

    console.log(process.env.FRONTEND_URL)
    
    const userId = req.user._id
    const {courseId} = req.body

    console.log(userId)

    // find course
    const course = await Course.findById(courseId)
    if(!course) return res.status(404).json({message:"Course not found"});

    // create a new course purchase record
    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount:course.coursePrice,
      status:"pending"
    })

    // Create a stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      line_items:[
        {
          price_data:{
            currency:"inr",
            product_data:{
              name:course.courseTitle,
              // images:[course.courseThumbnail]
            },
            unit_amount:course.coursePrice * 100
          },
          quantity:1,
        }
      ],
      mode:"payment",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: {
        courseId: courseId,
        userId: userId.toString(),
      },
      shipping_address_collection: {
        allowed_countries: ["IN"], // Optionally restrict allowed countries
      },
    });

    console.log(session)

    if (!session.url) {
      return res
        .status(400)
        .json({ success: false, message: "Error while creating session" });
    }

     // Save the purchase record
     newPurchase.paymentId = session.id;
     await newPurchase.save();
 
     return res.status(200).json({
       success: true,
       url: session.url,
     });

  } catch (error) {
    console.log("Error in createCheckoutSession",error);
    res.status(500).json({message:"Internal server error"})    
  }
}