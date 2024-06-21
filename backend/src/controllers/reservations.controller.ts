import express from 'express'
import ReservationM from '../models/reservations'
import { Request, Response } from 'express-serve-static-core'
import { ParsedQs } from 'qs'


export class ReservationController{
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