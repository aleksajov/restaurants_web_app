import express from 'express'
import ReservationM from '../models/reservations'
import ReservationReqM from '../models/reservationRequests'
import RestaurantModel from '../models/restaurant'
import { Request, Response } from 'express-serve-static-core'
import { ParsedQs } from 'qs'


export class ReservationController{
    addRequest= (req: express.Request, res: express.Response)=>{
        let username = req.body.username
        let id = req.body.id
        let dateTime = req.body.dateTime
        let number = req.body.number
        let description = req.body.description
        
        RestaurantModel.findOne({id: id}).then(restaurant=>{
            if(restaurant){
                let day=new Date(dateTime.split("T")[0]).getDay()
                
                if(restaurant.workingTime[day]=="/"){
                    res.json({"msg":"Restoran ne radi tog dana"})
                    return
                }
                else{
                    let openTime = parseInt(restaurant.workingTime[day].split("-")[0])
                    let closeTime = parseInt(restaurant.workingTime[day].split("-")[1])
                    let time = parseInt(dateTime.split("T")[1].split(":")[0])
                    if(time<openTime || time>=closeTime){
                        res.json({"msg":"Restoran ne radi u tom vremenu"})
                        return
                    }
                    else{
                        for (let i = 0; i < restaurant.tables!.length; i++) {
                            const table = restaurant.tables![i];
                            
                        }
                    }
                    let newReservation = new ReservationReqM({
                        username: username,
                        restaurantId: id,
                        dateTime: dateTime,
                        number: number,
                        description: description,
                        extended: false,
                        grade: -1,
                        comment: ""
            
                    })
                    newReservation.save().then(data=>{
                        res.json({"msg":"Zahtev za rezervaciju je poslat"})
                    })
                }
            }
        }).catch(err=>{
                res.json({"msg":err})
            })

        
    }
    getAvgGrade= (req: express.Request, res: express.Response)=>{
        let idP = req.body.id
        ReservationM.find({restaurantId: idP, grade: { $gte: 1, $lte: 5 }}).then(data=>{
            if(data.length>0){
                let sum=0
                let count=0
                data.forEach(element => {
                    if(element.grade){
                        sum+=element.grade
                        count++
                    }
                });
                let result= sum/count
                res.json(result)
            }
            else{
                res.json(-1)
            }
            
        }).catch(err=>{
            console.log(err)
        })
    }
}