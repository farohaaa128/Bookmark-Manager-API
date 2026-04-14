const express = require('express');
const BookMark = require('../models/Bookmark');
const authMiddleWare = require('../middleware/authMiddleWare');
const bookMark = require('../models/Bookmark');
const bookMarkRouter = express.Router();

bookMarkRouter.use(authMiddleWare);

bookMarkRouter.get('/', (req,res) => {
    BookMark.find({userId : req.user.id}).then(bookMark => {
        res.status(200).json({
            status: "Success",
            data : {bookMark}
        });
    }).catch(err => {
        res.status(500).json({
            status : "Error",
            message : err.message
        });
    })
});

bookMarkRouter.get('/:id', (req,res) => {
    const bookMarkId = req.params.id;
    BookMark.find({_id : bookMarkId ,userId : req.user.id}).then(bookMark => {
        if(bookMark)
        {
        res.status(200).json({
            status: "Success",
            data : {bookMark}
        });
        }
        else
        {
            res.status(403).json({
                status : "Error",
                message : "Unauthorized accsee"
            });
        }
    }).catch(err => {
        res.status(500).json({
            status : "Error",
            message : err.message
        });
    })
});

bookMarkRouter.post('/', (req, res) => {
    BookMark.create({
        title: req.body.title,
        url: req.body.url,
        category: req.body.category,
        userId: req.user.id
    }).then(bookmark => 
        res.status(201).json({ 
            status: "Success",
            data: {bookmark} 
        }))
    .catch(err => 
        res.status(500).json({
            status: "Error",
            message: err.message
        }))
});

bookMarkRouter.patch('/:id', (req, res) => {
    const bookmarkId = req.params.id;
    const updates = req.body;
    BookMark.findOneAndUpdate({ _id: bookmarkId, userId: req.user.id }, updates, { new: true })
    .then(updatedBookmark => {
        if (!updatedBookmark) {
            return res.status(403).json({
                status: "Error",
                message: "Unauthorized Access"
            });
        }
        res.status(200).json({
            status: "Success",
            data: {updatedBookmark}
        });
    })
    .catch(err => {
        res.status(500).json({
            status: "Error",
            message: err.message
        });
    });
});

bookMarkRouter.delete('/:id', (req, res) => {
    BookMark.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
    .then(result => {
        if (!result) 
            {
                res.status(403).json({ 
                    status : "Error",
                    message: "Unauthorized access" 
                });
            }
            else
            {
                res.status(200).json({
                    status: "Success", 
                    message: "Deleted successfully" 
                });
            }
    })
    .catch(err => 
        res.status(500).json({
            status: "Error", 
            message: err.message 
        }));
});

module.exports = bookMarkRouter;