var express = require('express');
var router = express.Router();


var UsersModel = require('../models/userschema');


//List Table Data
router.get('/display', function(req, res) {
    UsersModel.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.render('display-table', { users: users });
            console.log(users);
        }
    });
});

//Search 


router.get('/search/:name', function(req, res) {

    var regex = new RegExp(req.params.name);
    UsersModel.find({ name: regex }).then((users) => {
        res.status(200).json(users)
    })
})

//Display Form 
router.get('/add', function(req, res, next) {
    res.render('add-form');
});


/* POST Data. */
router.post('/add', function(req, res, next) {
    console.log(req.body);

    const mybodydata = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        birth_date: req.body.birth_date,
        user_mobile: req.body.user_mobile
    }
    var data = UsersModel(mybodydata);
    //var data = UsersModel(req.body);
    data.save(function(err) {
        if (err) {

            res.render('add-form', { message: 'User registered not successfully!' });
        } else {

            res.render('add-form', { message: 'User registered successfully!' });
        }
    })
});

/* DELETE User BY ID */
router.get('/delete/:id', function(req, res) {
    UsersModel.findByIdAndRemove(req.params.id, function(err, project) {
        if (err) {


            res.redirect('../display');
        } else {


            res.redirect('../display');
        }
    });
});


/* GET SINGLE User BY ID */
router.get('/edit/:id', function(req, res) {
    console.log(req.params.id);
    UsersModel.findById(req.params.id, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            console.log(user);

            res.render('edit-form', { users: user });
        }
    });
});

/* UPDATE User */
router.post('/edit/:id', function(req, res) {
    UsersModel.findByIdAndUpdate(req.params.id, req.body, function(err) {
        if (err) {
            res.redirect('edit/' + req.params.id);
        } else {
            res.redirect('../display');
        }
    });
});

module.exports = router;