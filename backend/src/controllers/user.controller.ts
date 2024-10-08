import express from 'express'
import UserM from '../models/user'
import RegisterRequestModel from '../models/registerRequest'
import { Request, Response } from 'express-serve-static-core';

const crypto = require('crypto-js');

export class UserController{
    getWaiters= (req: express.Request, res: express.Response)=>{
        let idRP=req.body.idR
        UserM.find({idR:idRP, type:"waiter"}, { answer: 0, password: 0, salt: 0 }).then(data=>{
            res.json(data)
        }).catch(err=>{
            console.log(err)
        })
    }
    addWaiter= (req: express.Request, res: express.Response)=>{
        const { username, password, question, answer, firstname, lastname,gender, address, phone, mail, idR, photo} = req.body;
        UserM.findOne({username:username}).then(user=>{
            if(user==null){
                UserM.findOne({mail:mail}).then(user2=>{
                    if(user2==null){
                        const salt = crypto.lib.WordArray.random(16).toString();
                        const hashedPassword = crypto.SHA512(password + salt).toString();
                
                        let register={
                            username: username,
                            password: hashedPassword,
                            question: question,
                            answer: answer,
                            firstname: firstname,
                            lastname: lastname,
                            gender: gender,
                            address: address,
                            phone: phone,
                            mail: mail,
                            idR: idR,
                            photo: photo,
                            type: "waiter",
                            salt: salt,
                            deactivated: false
                        }
                
                        new UserM(register).save().then(ok=>{
                            res.json({"msg": "Konobar dodat"})
                        })
                    }
                    else{
                        res.json({"msg":"Mejl vec postoji u sistemu"})
                    }
                })
            }
            else{
                res.json({"msg":"Korisnicko ime vec postoji u sistemu"})
            }
        }).catch((err)=>{
            res.json({"msg":err})
        })

    }
    declineRegister= (req: express.Request, res: express.Response)=>{
        let usernameP=req.body.username
        let mailP=req.body.mail
        RegisterRequestModel.deleteOne({username:usernameP}).then(data=>{
            new UserM({
                username:usernameP,
                mail:mailP,
                type:""
            }).save().then(data2=>{
                res.json({"msg":"Zahtev odbijen"})
            })
        }).catch(err=>{
            res.json({"msg":err})
        })
    }
    acceptRegister= (req: express.Request, res: express.Response)=>{
        let usernameP=req.body.username
        RegisterRequestModel.findOne({username:usernameP}).then(user=>{
            if(user){
                let userToSave=user.toObject()
                delete (userToSave as any)._id;
                new UserM(userToSave).save().then(data=>{
                    RegisterRequestModel.deleteOne({username:usernameP}).then(data2=>{
                        res.json({"msg":"Korisnik registrovan"})
                    })
                })

            }
            else{
                res.json({"msg":"nepoznato korisničko ime"})
            }
        }).catch(err=>{
            res.json({"msg":err})
        })
    }
    getRequests= (req: express.Request, res: express.Response)=>{
        RegisterRequestModel.find().then(data=>{
            res.json(data)
        }).catch(err=>{
            console.log(err)
        })
    }
    checkAnswer= (req: express.Request, res: express.Response)=>{

        let usernameP=req.body.username
        let answerP=req.body.answer

        UserM.findOne({username:usernameP}).then(user=>{
            if(user){
                if(user.answer==answerP){
                    res.json({"msg":"ok"})
                }
                else{
                    res.json({"msg":"false"})
                }
            }
            else{
                res.json({"msg":"unknown user"})
            }
        }).catch((err)=>{console.log(err)})
    }
    getUsers= (req: express.Request, res: express.Response)=>{

        UserM.find({}, { answer: 0, password: 0, salt: 0 }).then(data=>{
            res.json(data);
        }).catch(err=>{
            console.log(err);
        });
    }
    getAllWaiters= (req: express.Request, res: express.Response)=>{
        UserM.find({type:"waiter"}, { answer: 0, password: 0, salt: 0 }).then(data=>{
            res.json(data)
        }).catch(err=>{
            console.log(err)
        })
    }
    updateData= (req: express.Request, res: express.Response)=>{
        let newFirst=req.body.newFirstname
        let newLast=req.body.newLastname
        let newAdd=req.body.newAddress
        let newPhone=req.body.newPhone
        let newMail=req.body.newMail
        let newCard=req.body.newCard
        let newPhoto=req.body.photo
        let user=req.body.username
        try {
            if(newFirst!=""){
                UserM.updateOne({username:user},{$set:{firstname:newFirst}}).then(data=>{
                    if(data){
                        console.log(data.modifiedCount)
                    }
                })
            }
            if(newLast!=""){
                UserM.updateOne({username:user},{$set:{lastname:newLast}}).then(data=>{
                    if(data){
                        console.log(data.modifiedCount)
                    }
                })
            }
            if(newAdd!=""){
                UserM.updateOne({username:user},{$set:{address:newAdd}}).then(data=>{
                    if(data){
                        console.log(data.modifiedCount)
                    }
                })
            }
            if(newPhone!=""){
                UserM.updateOne({username:user},{$set:{phone:newPhone}}).then(data=>{
                    if(data){
                        console.log(data.modifiedCount)
                    }
                })
            }
            if(newMail!=""){
                UserM.updateOne({username:user},{$set:{mail:newMail}}).then(data=>{
                    if(data){
                        console.log(data.modifiedCount)
                    }
                })
            }
            if(newCard!=""){
                UserM.updateOne({username:user},{$set:{card:newCard}}).then(data=>{
                    if(data){
                        console.log(data.modifiedCount)
                    }
                })
            }
            if(newPhoto!=""){
                UserM.updateOne({username:user},{$set:{photo:newPhoto}}).then(data=>{
                    if(data){
                        console.log(data.modifiedCount)
                    }
                })
            }
            res.json({"msg":"Podaci azurirani"})
            
        } catch (error) {
            res.json({"msg":error})
        }

        
    }
    changePassword= (req: express.Request, res: express.Response)=>{
        let usernamep=req.body.username
        let newPass=req.body.password

        const newSalt = crypto.lib.WordArray.random(16).toString();
        const hashedPassword = crypto.SHA512(newPass + newSalt).toString();


        UserM.updateOne({username:usernamep},{$set:{password:hashedPassword, salt:newSalt}}).then(
            data=>{
                res.json({"msg":"Lozinka ažurirana"})
            }
        ).catch((err)=>{
            res.json({"msg":err})
        })
    }
    checkPassword= (req: express.Request, res: express.Response)=>{
        let usernamep=req.body.username
        let passwordp=req.body.password
        UserM.findOne({username:usernamep}).then(user=>{
            if(user){
                const hashedPassword=user.password
                const salt=user.salt
                const hashedPasswordP = crypto.SHA512(passwordp + salt).toString();
                if(hashedPasswordP==hashedPassword){
                    res.json({"msg":"ok"})
                }
                else{
                    res.json({"msg":"false"})
                }
            }
            else{
                res.json({"msg":"unknown user"})
            }
        }).catch((err)=>{
            res.json({"msg":err})
        })
    }
    getUser= (req: express.Request, res: express.Response)=>{
        let usernamep=req.body.username
        UserM.findOne({username:usernamep}).then(user=>{
            if(user){
                const { username, password, question, answer, firstname, lastname, gender, address,
                    phone, mail, photo, card, type, deactivated, idR
                } = user;
                const user2 = { 
                    username,
                    question,
                    firstname,
                    lastname,
                    gender,
                    address,
                    phone,
                    mail,
                    photo,
                    card,
                    type,
                    deactivated,
                    idR
                };
                res.json(user2);
            }
            else
                res.json(null)
        }).catch((err)=>{
            console.log(err)
        })
    }
    register= (req: express.Request, res: express.Response)=>{
        const { username, password, question, answer, firstname, lastname,gender, address, phone, mail, card, photo} = req.body;
        UserM.findOne({username:username}).then(user=>{
            if(user==null){
                UserM.findOne({mail:mail}).then(user2=>{
                    if(user2==null){
                        const salt = crypto.lib.WordArray.random(16).toString();
                        const hashedPassword = crypto.SHA512(password + salt).toString();
                
                        let register={
                            username: username,
                            password: hashedPassword,
                            question: question,
                            answer: answer,
                            firstname: firstname,
                            lastname: lastname,
                            gender: gender,
                            address: address,
                            phone: phone,
                            mail: mail,
                            card: card,
                            photo: photo,
                            type: "guest",
                            salt: salt,
                            deactivated: false
                        }
                
                        new RegisterRequestModel(register).save().then(ok=>{
                            res.json({"msg": "Zahtev za registraciju poslat"})
                        })
                    }
                    else{
                        res.json({"msg":"Mejl vec postoji u sistemu"})
                    }
                })
            }
            else{
                res.json({"msg":"Korisnicko ime vec postoji u sistemu"})
            }
        }).catch((err)=>{
            res.json({"msg":err})
        })
        
    }
    loginAdmin= (req: express.Request, res: express.Response)=>{
        let usernameP = req.body.username;
        let passwordP = req.body.password;

        UserM.findOne({username: usernameP, type: "admin"}).then((user)=>{
            if(user){
                const hashedPassword=user.password
                const salt=user.salt
                const hashedPasswordP = crypto.SHA512(passwordP + salt).toString();
                if(hashedPasswordP==hashedPassword){
                    const { username, password, question, answer, firstname, lastname, gender, address,
                        phone, mail, photo, card, type, deactivated, idR
                    } = user;
                    const user2 = { 
                        username,
                        question,
                        firstname,
                        lastname,
                        gender,
                        address,
                        phone,
                        mail,
                        photo,
                        card,
                        type,
                        deactivated,
                        idR
                    };
                    res.json(user2);
                }
                else{
                    res.json(null)
                }
            }
            else{
                res.json(null)
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    login = (req: express.Request, res: express.Response)=>{
        let usernameP = req.body.username;
        let passwordP = req.body.password;

        UserM.findOne({username: usernameP, type: { $in: ['guest', 'waiter'] }}).then((user)=>{
            if(user){
                const hashedPassword=user.password
                const salt=user.salt
                const hashedPasswordP = crypto.SHA512(passwordP + salt).toString();
                if(hashedPasswordP==hashedPassword){
                    const { username, password, question, answer, firstname, lastname, gender, address,
                        phone, mail, photo, card, type, deactivated, idR
                    } = user;
                    const user2 = { 
                        username,
                        question,
                        firstname,
                        lastname,
                        gender,
                        address,
                        phone,
                        mail,
                        photo,
                        card,
                        type,
                        deactivated,
                        idR
                    };
                    res.json(user2);
                }
                else{
                    res.json(null)
                }
            }
            else{
                res.json(null)
            }
            
        }).catch((err)=>{
            console.log(err)
        })

        
    }
   
}