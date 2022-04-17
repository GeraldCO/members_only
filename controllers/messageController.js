const Message = require('../models/Message');
const { body, validationResult } = require('express-validator');
const { escapeRegExpChars } = require('ejs/lib/utils');
const res = require('express/lib/response');

exports.createMessageGet = (req, res, next)=>{
    res.render('message-form', { title: 'Create a new message' });
};

exports.createMessagePost = [
    body('title').trim().isLength({ min: 3 }).escape().withMessage("Title must be at least 3 chars long"),
    body('message').trim().isLength({ min: 3 }).escape().withMessage("Message must be at least 3 chars long"), 
    (req, res, next )=>{
        const errors = validationResult(req);

        var message = new Message({
            title: req.body.title,
            message: req.body.message,
            user: req.user._id
        });

        if(!errors.isEmpty()){
            res.render('message-form',{
                title: 'Create message',
                errors: errors.array()
            });
        }else{
            message.save(function(err){
                if(err) return next(err);
            });
            res.redirect('/');
        }
    }
];

exports.index = async (req, res, next )=>{
    const allMessages = await Message.find({}).populate('user');
    res.render('index', { 
        title: 'Express',
        user: req.user,
        allMessages: allMessages
       });
}