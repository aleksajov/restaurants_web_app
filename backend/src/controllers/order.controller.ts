import express from "express"
import OrderRequestModel from "../models/orderReq"
import RestaurantModel from "../models/restaurant"
import UserModel from "../models/user"
import { Request, Response } from "express-serve-static-core"
import { ParsedQs } from "qs"

export class OrderController{
    getMyOrders= async (req: express.Request, res: express.Response)=>{
        let usernameP=req.body.username
        try{
            const data = await OrderRequestModel.find({username:usernameP})
            let dataReturn:any[] = []
            for(let i=0; i<data.length; i++){
                if(data[i] && data[i].idR!=null){
                    const data1=await RestaurantModel.findOne({id:data[i].idR})
                    if (data1) {
                        let order = data[i].toObject()
                        dataReturn.push({...order, restaurant: data1.name})
                    }
                    
                }

            }
            if(dataReturn.length>0){
                res.json(dataReturn)
            }
            else res.json(null)
        }
        catch(err){
            console.log(err)
        }
         
    }
    reject= (req: express.Request, res: express.Response)=>{
        let idO=req.body.idO
        OrderRequestModel.deleteOne({idO:idO}).then(data=>{
            res.json({"msg":"Narudžbina odbijena"})
        }).catch(err=>{
            res.json({"msg":err})
        })
    }
    acceptOrder= (req: express.Request, res: express.Response)=>{
        let idO=req.body.idO
        let time=parseInt(req.body.time)
        let currTime=new Date().getTime()
        let estimatedDeliveryTime=currTime+time*60*1000
        let estimated=estimatedDeliveryTime.toString()
        OrderRequestModel.updateOne({idO:idO}, {deliveryTime:estimated}).then(data=>{
            res.json({"msg":"Narudžbina prihvaćena"})
        }).catch((err)=>{
            res.json({"msg":err})
        })
    }
    getPending= (req: express.Request, res: express.Response)=>{
        let waiterP=req.body.waiter
        UserModel.findOne({username:waiterP}).then(data=>{
            if(data && data.idR!=null){
                OrderRequestModel.find({idR:data.idR, deliveryTime:""}).then(data1=>{
                    if(data1){
                        res.json(data1)
                    }
                })
            }
            else{
                res.json(null)
            }
        }).catch(err=>{
            console.log(err)
        })
        
    }
    addOrder= (req: express.Request, res: express.Response)=>{
        let usernameP=req.body.username
        let idRP=req.body.idR
        let itemsP=req.body.items
    
        
        RestaurantModel.findOne({id:idRP}).then(data1=>{
            if(data1 && data1.workingTime)
            {
                const currDay=new Date().getDay()
                const currHours=new Date().getHours()
                const currMinutes=new Date().getMinutes()
                const openingTimeHours=data1.workingTime[currDay].split("-")[0].split(":")[0]
                const openingTimeMinutes=data1.workingTime[currDay].split("-")[0].split(":")[1]
                const closingTimeHours=data1.workingTime[currDay].split("-")[1].split(":")[0]
                const closingTimeMinutes=data1.workingTime[currDay].split("-")[1].split(":")[1]
                if(currHours<openingTimeHours || currHours>closingTimeHours || (currHours==openingTimeHours && currMinutes<openingTimeMinutes) || (currHours==closingTimeHours && currMinutes>closingTimeMinutes)){
                    res.json({"msg":"Restoran trenutno ne radi"})
                    return
                }
                OrderRequestModel.find().then(data=>{
                    if(data){
                        let idO=0
                        data.forEach(element => {
                            if(element.idO && element.idO>idO){
                                idO=element.idO
                            }
                        });
                        new OrderRequestModel({
                            username: usernameP,
                            idR: idRP,
                            items: itemsP,
                            idO: idO+1,
                            deliveryTime:""
                        }).save().then(data=>{
                            res.json({"msg":"Zahtev za narudžbinu poslat"})
                        })
        
                    }
        
                })
            }
        }).catch(err=>{
            res.json({"msg":"Greška pri čuvanju zahteva za narudžbinom"})
        })

    }
}