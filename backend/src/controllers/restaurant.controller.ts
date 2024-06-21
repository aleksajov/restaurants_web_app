import express from 'express'
import UserM from '../models/user'
import RestaurantModel from '../models/restaurant'
import { Request, Response } from 'express-serve-static-core';


export class RestaurantController{
    getAll= (req: express.Request, res: express.Response)=>{
        RestaurantModel.find().then(data=>{
            res.json(data)
        }).catch(err=>{
            console.log(err)
        })
    }
}