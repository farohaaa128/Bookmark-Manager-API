const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { Stats } = require('node:fs');
require('dotenv').config();

const userRouter = express.Router();

userRouter.post('/register', (req,res) => {
    if(!req.body)
    {
        res.status(401).json({
            status : "Error",
            message : "User credentials are required"
        })
    }
    else
    {
        bcrypt.hash(req.body.password, 10).then((hashedPassword) =>
        {
            User.create({
                name : req.body.name,
                email : req.body.email,
                password : hashedPassword
            })
        .then((newUser) => {
            res.status(201).json({
                status : "Success",
                data : {newUser}
            })
        }).catch(err =>{
            res.status(500).json({
                status : "Error",
                message : err.message
            })
        })
        }).catch(err => {
            res.status(401).json({
                status : "Error",
                message : "Unauthorized Access"
            })
        })
    }
});

userRouter.post('/login', (req,res) => {
    if(!req.body){
        res.status(400).json({status:'error', message:"User credentials are required"})
    }
    else
    {
        User.findOne({email : req.body.email}).then((user) =>
        {
            if(!user)
            {
                res.status(401).json({
                    status : "Error",
                    message : "invalid credentials"
                })
            }
            else
            {
                bcrypt.compare(req.body.password, user.password).then((isMatch) =>
                {
                    if(isMatch)
                    {
                        const token = jwt.sign({id : user._id}, process.env.JWT_SECRT, {expiresIn : "1h"});
                        res.status(200).json({
                            status : "Success",
                            data : {user, token}
                        });                   
                    }
                    else
                    {
                        res.status(401).json({
                            status : "Error",
                            message : "invalid credentials"
                        });
                    }
                }).catch(err => {
                    res.status(500).json({
                        status : "Error",
                        message : err.message
                    });
                }).catch(err => {
                    Stats(500).json({
                        status : "Error",
                        message : err.message
                    });
                })
            }
        })
    }
})


module.exports = userRouter;