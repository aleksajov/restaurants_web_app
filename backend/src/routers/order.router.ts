import express from 'express'
import { OrderController } from '../controllers/order.controller';

const orderRouter = express.Router()

orderRouter.route("/addOrder").post(
    (req,res)=>new OrderController().addOrder(req,res)
)

export default orderRouter;