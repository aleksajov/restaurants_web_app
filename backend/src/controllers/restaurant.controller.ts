import express from 'express'
import UserM from '../models/user'
import RestaurantModel from '../models/restaurant'
import { Request, Response } from 'express-serve-static-core';


export class RestaurantController{
    addFood= (req: express.Request, res: express.Response)=>{
        let idR=req.body.idR
        let name=req.body.name
        let price=req.body.price
        let ingredients=req.body.ingredients
        let idFN=-1
        RestaurantModel.findOne({id:idR}).then(data=>{
            data?.menu.forEach(food => {
                if(food.idF>idFN)idFN=food.idF
            });
            RestaurantModel.updateOne({id:idR}, {$push:{menu:{idF:idFN+1, name:name, cost:price, ingredients:ingredients}}}).then(data=>{
                res.json(0)
            })
        }).catch(err=>{
            console.log(err)
        })
    }
    getKitchens= (req: express.Request, res: express.Response)=>{
        let restaurantId = req.body.restaurant
        RestaurantModel.findOne({id: restaurantId}).then(data=>{
            res.json(data!.kitchens)
        }).catch(err=>{
            console.log(err)
        })
    }
    getToilets= (req: express.Request, res: express.Response)=>{
        let restaurantId = req.body.restaurant
        RestaurantModel.findOne({id: restaurantId}).then(data=>{
            res.json(data!.toilets)
        }).catch(err=>{
            console.log(err)
        })
    }
    addRestaurant= (req: express.Request, res: express.Response)=>{
        let name=req.body.name
        let address=req.body.address
        let type=req.body.type
        let phone=req.body.phone
        let workingTime=req.body.workingTime
        let tables=req.body.tables
        let kitchens=req.body.kitchens
        let toilets=req.body.toilets
        let short_desc=req.body.short_desc
        let map_url=req.body.map_url
        let idN=0
        RestaurantModel.find().then(data=>{
            data.forEach(element => {
                if(element.id && element.id>idN)idN=element.id
            });
            new RestaurantModel({
                id:idN+1,
                name: name,
                address: address,
                type: type,
                phone: phone,
                mapUrl:map_url,
                workingTime: workingTime,
                tables: tables,
                menu:[],
                kitchens: kitchens,
                toilets: toilets,
                short_desc:short_desc
            }).save().then(data=>{
                res.json({"msg": "Restoran uspešno dodat"})
            })
        }).catch(err=>{
            res.json({"msg":err})
        })
    }
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