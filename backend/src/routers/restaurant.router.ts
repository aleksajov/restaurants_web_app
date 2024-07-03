import express from 'express'
import { RestaurantController } from '../controllers/restaurant.controller';

const restaurantRouter = express.Router()

restaurantRouter.route("/getAllRestaurants").get(
    (req,res)=>new RestaurantController().getAll(req,res)
)

restaurantRouter.route("/getRestaurantById").get(
    (req,res)=>new RestaurantController().getRestaurantById(req,res)
)


restaurantRouter.route("/getTablesForRestaurant").post(
    (req,res)=>new RestaurantController().getTablesForRestaurant(req,res)
)
restaurantRouter.route("/addRestaurant").post(
    (req,res)=>new RestaurantController().addRestaurant(req,res)
)
restaurantRouter.route("/getToilets").post(
    (req,res)=>new RestaurantController().getToilets(req,res)
)
restaurantRouter.route("/getKitchens").post(
    (req,res)=>new RestaurantController().getKitchens(req,res)
)


export default restaurantRouter;