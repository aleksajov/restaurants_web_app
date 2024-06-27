import express from 'express'
import { OrderController } from '../controllers/order.controller';

const orderRouter = express.Router()

orderRouter.route("/addOrder").post(
    (req,res)=>new OrderController().addOrder(req,res)
)
orderRouter.route("/getPending").post(
    (req,res)=>new OrderController().getPending(req,res)
)

orderRouter.route("/acceptOrder").post(
    (req,res)=>new OrderController().acceptOrder(req,res)
)
orderRouter.route("/reject").post(
    (req,res)=>new OrderController().reject(req,res)
)

orderRouter.route("/getMyOrders").post(
    (req,res)=>new OrderController().getMyOrders(req,res)
)



export default orderRouter;