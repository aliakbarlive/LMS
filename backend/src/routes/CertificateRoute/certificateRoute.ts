import express from 'express'
import { addCertificate, getCertificate } from '../../controllers/certificate/certificateController'
const router = express.Router()

router.get('/',getCertificate)
router.post('/',addCertificate)

export default router