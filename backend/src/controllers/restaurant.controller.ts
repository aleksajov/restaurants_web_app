import express from 'express'
import UserM from '../models/user'
import RestaurantModel from '../models/restaurant'
import { Request, Response } from 'express-serve-static-core';


export class RestaurantController{
    getTablesForRestaurant= (req: express.Request, res: express.Response)=>{
        let restaurantId = req.body.restaurantId
        RestaurantModel.findOne({id: restaurantId}).then(data=>{
            res.json(data!.tables)
        }).catch(err=>{
            console.log(err)
        })
    }
    getRestaurantById= (req: express.Request, res: express.Response)=>{
        let id = req.body.id
        RestaurantModel.findOne({id: id}).then(data=>{
            res.json(data)
        }).catch(err=>{
            console.log(err)
        })

    }
    
    getAll= (req: express.Request, res: express.Response)=>{
        RestaurantModel.find().then(data=>{
            res.json(data)
        }).catch(err=>{
            console.log(err)
        })
    }
}