import express from 'express'
import { deleteOrder, getOrderById, getOrders } from '../../controllers/buyCourseController/orderController'
const router = express.Router()

// get Order
router.get('/all',getOrders)

// get Order by Id
router.get('/:orderId',getOrderById)

// Delete Order
router.delete('/delete/:orderId',deleteOrder)


export default router