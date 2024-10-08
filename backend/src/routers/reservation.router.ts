import express from 'express'
import { ReservationController } from '../controllers/reservations.controller';

const reservationRouter = express.Router()

reservationRouter.route("/approve").post(
    (req,res)=>new ReservationController().approve(req,res)
)

reservationRouter.route("/getAvgGrade").post(
    (req,res)=>new ReservationController().getAvgGrade(req,res)
)
reservationRouter.route("/addRequest").post(
    (req,res)=>new ReservationController().addRequest(req,res)
)

reservationRouter.route("/getUnprocessed").post(
    (req,res)=>new ReservationController().getUnprocessed(req,res)
)

reservationRouter.route("/decline").post(
    (req,res)=>new ReservationController().decline(req,res)
)

reservationRouter.route("/getPending").post(
    (req,res)=>new ReservationController().getPending(req,res)
)

reservationRouter.route("/getAcceptedForUser").post(
    (req,res)=>new ReservationController().getAcceptedForUser(req,res)
)
reservationRouter.route("/getMyReservations").post(
    (req,res)=>new ReservationController().getMyReservations(req,res)
)

reservationRouter.route("/didntCame").post(
    (req,res)=>new ReservationController().didntCame(req,res)
)

reservationRouter.route("/number").get(
    (req,res)=>new ReservationController().number(req,res)
)
reservationRouter.route("/getResforwaiter").post(
    (req,res)=>new ReservationController().getResforwaiter(req,res)
)

reservationRouter.route("/allRes").get(
    (req,res)=>new ReservationController().allRes(req,res)
)

reservationRouter.route("/cancel").post(
    (req,res)=>new ReservationController().cancel(req,res)
)
export default reservationRouter;