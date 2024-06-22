import express from "express"
import OrderRequestModel from "../models/orderReq"

export class OrderController{
    addOrder= (req: express.Request, res: express.Response)=>{
        let usernameP=req.body.username
        let idRP=req.body.idR
        let itemsP=req.body.items

        new OrderRequestModel({
            username: usernameP,
            idR: idRP,
            items: itemsP
        }).save().then(data=>{
            res.json({"msg":"Zahtev za narudžbinu poslat"})
        }).catch(err=>{
            res.json({"msg":"Greška pri čuvanju zahteva za narudžbinom"})
        })

    }
}