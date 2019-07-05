//Usercontroller.JS

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

var User = require('./User');

//Create a new user
/* 
 the router object has a .post method that takes two parameters. The first is the route which will be linked to a function. This function is the second parameter. It takes another two parameters which represent the request to the server and the response from the server. Inside the function you will use the user model you required above. The user model has a create method which also takes two parameters. The first being an object and the second a function. The object contains the values to be inserted into the database. You see, they are structured like the schema you created above. After it is created the callback function is called with another two parameters, an error value and a success value. You will check if there was an error during the creation of the new user, and respond accordingly, or if all was well, respond with the data of the newly created user.
*/
router.post('/', function(req, res){
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    },
    function(err, user){
        if(err) return res.status(500).send("There was a problem adding the information to the database.");
        return res.status(200).send(user);
    });
});

//Returns all the users in the database
/*
    The router object also has a .get method which also takes two parameters. Within the function you now call the find() method on the user model which also takes two parameters. Find is a method which returns values from the database. Its first parameter, an object, defines the requirements which must be fulfilled in order to return values. As in this example the object is empty, all users from the database will be returned.
*/
router.get('/', function(req, res){
    User.find({}, function(err, user){
        if (err){
            return res.status(500).send("There was a problem finding thhe users.");
        }
        return res.status(200).send(user);
    });
});


//Gets a single User from the database
/*This notation means that it’s a placeholder for a query parameter, a simple value, which will be sent along with the request. The value passed to '/:id' will be accessible through the req.params object. Where the name of the query parameter will get mapped to a property with the same name on the req.params object.

Moving on, Mongoose has an awesome method called .findById which will only want the ID by which it will return a user. The ID is the first parameter and the callback function is the second. Can you see a pattern emerging? All of the Mongoose methods want a value as a first parameter and a callback function as the last. This callback will be called after the database has returned the queried value. */
router.get('/:id', function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err) return res.status(500).send("There was a problem finding the user with id ");
        if(!user)return res.status(404).send("No user found");
        res.status(200).send(user);
    });
});


//Delete a user from the database
router.delete("/:id", function(req, res){
    User.findByIdAndRemove(req.params.id, function(err,user){
        if(err) return res.status(500).send("There was a problem deleting the user");
        res.status(200).send("User " + user.name + " was deleted");
    });
});

//updating an existing user in the database
//https://hackernoon.com/restful-api-design-with-node-js-26ccf66eab09 the update section.
router.put('/:id', function(req, res){
    User.findByIdAndUpdate(req.param.id, req.body, {new:true}, function(err, user){
        if(err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
        console.log(user)
    });
});

module.exports = router;