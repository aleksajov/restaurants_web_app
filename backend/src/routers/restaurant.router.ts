import express from 'express'
import { RestaurantController } from '../controllers/restaurant.controller';

const restaurantRouter = express.Router()

restaurantRouter.route("/getAllRestaurants").get(
    (req,res)=>new RestaurantController().getAll(req,res)
)



export default restaurantRouter;