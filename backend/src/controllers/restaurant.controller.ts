import express from 'express'
import UserM from '../models/user'
import RestaurantModel from '../models/restaurant'
import { Request, Response } from 'express-serve-static-core';


export class RestaurantController{
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