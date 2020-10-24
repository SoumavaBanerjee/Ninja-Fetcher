const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

// Const of conversion
const convertMetric = 1000;




// get list of data from database.
router.get('/ninjas', (req, res, next) => {
    Ninja.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
                },
                distanceField: "dist.calculated",
                maxDistance: (parseInt(req.query.dist)) * 1000,
                spherical: true
            }
        }
    ]).then(function(ninjas){
        res.send(ninjas);
    }).catch(next);
});



// ADD NEW DATA TO DATABASE
router.post('/ninjas', (req,res,next)=>{
    Ninja.create(req.body)
    .then((ninja)=>{
        res.send(ninja);
    })
    .catch(next)
});

// UPDATE A DATA IN A DATABASE
router.put('/ninjas/:id', (req,res,next)=>{
    Ninja.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
    .then((ninja)=>{
        res.send(ninja);
    })
    .catch((err)=>{
        console.log(err.message);
        next();
    });
});

// DELETE A DATA IN A DATABASE
router.delete('/ninjas/:id', (req,res,next)=>{
    Ninja.findByIdAndDelete({_id:req.params.id})
    .then((ninja)=>{
        res.send(ninja);
    })
    .catch((err)=>{
        console.log(err.message);
        next();
    });
    
    // res.send({"type": "DELETE"});
});

module.exports = router;