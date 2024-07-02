import express from 'express'
import ReservationM from '../models/reservations'
import ReservationReqM from '../models/reservationRequests'
import RestaurantModel from '../models/restaurant'
import { Request, Response } from 'express-serve-static-core'
import { ParsedQs } from 'qs'


export class ReservationController{
    allRes= (req: express.Request, res: express.Response) => {
        ReservationM.find().then(data=>{
            res.json(data)
        }).catch(err=>{
            console.log(err)
        })
    }
    getResforwaiter= (req: express.Request, res: express.Response) => {
        let waiter=req.body.waiter
        ReservationM.find({waiter: waiter}).then(data=>{
            res.json(data)
        }).catch(err=>{
            console.log(err)
        })
    }
    number= (req: express.Request, res: express.Response) => {
        let array=[]
        array.push(0)
        array.push(0)
        array.push(0)
        const curr=new Date().getTime()
        ReservationM.find().then(data=>{
            data.forEach(element => {
                if(element && element.dateTime)
                {
                    if(curr-(30*24*60*60*1000)<new Date(element!.dateTime).getTime() && new Date(element!.dateTime).getTime()<curr)
                        array[0]++
                    if(curr-(7*24*60*60*1000)<new Date(element!.dateTime).getTime() && new Date(element!.dateTime).getTime()<curr)
                        array[1]++
                    if(curr-(24*60*60*1000)<new Date(element!.dateTime).getTime() && new Date(element!.dateTime).getTime()<curr)
                        array[2]++
                }
            })
            res.json(array)
        }).catch(err=>{
            console.log(err)
        })
    }
    didntCame= (req: express.Request, res: express.Response) => {
        let dataP=req.body.reservation
        ReservationM.deleteOne({username: dataP.username, restaurantId: dataP.restaurantId, dateTime: dataP.dateTime, number: dataP.number, description: dataP.description}).then(data=>{
            RestaurantModel.updateOne({id: dataP.restaurantId, "tables.idT": dataP.tableId}, {$pull: {"tables.$.taken": dataP.dateTime}}).then(data=>{
                res.json({"msg":"Rezervacija otkazana, sto oslobođen"})
            })
        }).catch(err=>{
            res.json({"msg":err})
        })
    }
    getMyReservations= (req: express.Request, res: express.Response) => {
        let username=req.body.username
        ReservationM.find({waiter: username}).then(data=>{
            if(data){
                const dataFiltered=data.filter(r=>{
                if(r!.dateTime){
                    if(new Date(r.dateTime).getTime()+3*60*60*1000 < new Date().getTime()){
                        return false
                      }
                      else{
                        return true
                      }
                }
                else return false
                })
                res.json(dataFiltered)
            }
            else{
                res.json(data)
            }
            
        }).catch(err=>{
            console.log(err)
        })
    }
    cancel= (req: express.Request, res: express.Response) => {
        let dataP=req.body.reservation
        ReservationM.deleteOne({username: dataP.username, restaurantId: dataP.restaurantId, dateTime: dataP.dateTime, number: dataP.number, description: dataP.description}).then(data=>{
            RestaurantModel.updateOne({id: dataP.restaurantId, "tables.idT": dataP.tableId}, {$pull: {"tables.$.taken": dataP.dateTime}}).then(data=>{
            res.json({"msg":"Rezervacija je uspešno otkazana"})
            })
        }).catch(err=>{
            res.json({"msg":err})
        })
    }
    getAcceptedForUser= (req: express.Request, res: express.Response) => {
        let username=req.body.username
        ReservationM.find({username: username}).then(async data=>{
            const withRestaurant = await Promise.all(data.map(async item => {
                const restaurantName = await RestaurantModel.findOne({id: item.restaurantId},{name:1, address:1});
                const restaurantNameOnly = restaurantName!.name;
                const restaurantAddressOnly=restaurantName!.address;
                return {...item.toObject(), restaurantName: restaurantNameOnly, restaurantAddress: restaurantAddressOnly};
            }));
            res.json(withRestaurant);
        }).catch(err=>{
            console.log(err)
        })
    }
    getPending= (req: express.Request, res: express.Response) => {
        let username=req.body.username

        ReservationReqM.find({username: username, declination:""}).then(async data=>{
            const currDate = new Date();
            const active = data.filter((item) => {
                if(item.dateTime){
                    const reservationDate = new Date(item.dateTime);
                    return reservationDate > currDate;
                }
                return false;
            });

            const activeWithRestaurant = await Promise.all(active.map(async item => {
                const restaurantName = await RestaurantModel.findOne({id: item.restaurantId},{name:1});
                const restaurantNameOnly = restaurantName!.name;
                return {...item.toObject(), restaurantName: restaurantNameOnly};
            }));
            res.json(activeWithRestaurant);
        }).catch(err=>{
            console.log(err)
        })
    }
    approve= (req: express.Request, res: express.Response) => {
        let data=req.body.reservationToApprove
        let tableId=req.body.selectedTableId
        let waiter=req.body.waiter

        let newReservation = new ReservationM({
            username: data.username,
            restaurantId: data.restaurantId,
            dateTime: data.dateTime,
            number: data.number,
            description: data.description,
            tableId: tableId,
            waiter: waiter,
            grade: -1,
            comment: "",
            extended: false
        })
        newReservation.save().then(data=>{
            ReservationReqM.deleteOne({username: data.username, restaurantId: data.restaurantId, dateTime: data.dateTime, number: data.number, description: data.description}).then(data=>{
                RestaurantModel.updateOne({id: newReservation.restaurantId, "tables.idT": newReservation.tableId}, {$push: {"tables.$.taken": newReservation.dateTime}}).then(data=>{
                    res.json({"msg":"Rezervacija prihvaćena"})
                })
            })
        }).catch(err=>{
            res.json({"msg":err})
        })
    }
    decline= (req: express.Request, res: express.Response) => {
        let data=req.body.declinedRes
        let declination=req.body.declination
        ReservationReqM.updateMany({username: data.username, restaurantId: data.restaurantId, dateTime: data.dateTime, number: data.number, description: data.description}, {$set:{declination: declination}}).then(data=>{
            res.json({"msg":"Zahtev je uspešno odbijen"})
            
        }).catch(err=>{
            res.json({"msg":err})
        })
    }
    getUnprocessed = (req: express.Request, res: express.Response) => {
        let idRP = req.body.idR
        ReservationReqM.find({restaurantId: idRP, declination:""}).then(data=>{
            res.json(data)
        }).catch(err=>{
            console.log(err)
        })
    }
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
                        comment: "",
                        declination: ""
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