import express from "express"
import { addOrUpdateAddress, getUserAddress } from "../../controllers/buyCourseController/addressController"
const router = express.Router()

// Get user Address
router.get('/get-address',getUserAddress)

// Add Or Update User address
router.post('/add-or-update-address',addOrUpdateAddress)


export default router