import { Router } from 'express'
import { addCategory, deleteCategory, editCategory, getAllCategory, getCategoryById } from '../controllers/category.controller.js';
import upload from '../config/multerConfig.js'

const categoryRouter = Router();

categoryRouter.get('/getAllCategory',getAllCategory);
categoryRouter.get('/getCategoryById/:id',getCategoryById)
categoryRouter.post('/addCategory',upload.single('categoryImage'),addCategory);
categoryRouter.put('/editCategory/:id',upload.single('categoryImage'), editCategory);
categoryRouter.delete('/deleteCategory/:id',deleteCategory)

export default categoryRouter