import express, { Router } from 'express'
import controller from '../controllers/mainController'

const router = express.Router()

router.get('/slideshow' , controller.slideshow)

export = router