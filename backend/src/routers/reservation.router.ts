import express from 'express'
import { ReservationController } from '../controllers/reservations.controller';

const reservationRouter = express.Router()

reservationRouter.route("/getAvgGrade").post(
    (req,res)=>new ReservationController().getAvgGrade(req,res)
)
reservationRouter.route("/addRequest").post(
    (req,res)=>new ReservationController().addRequest(req,res)
)



export default reservationRouter;