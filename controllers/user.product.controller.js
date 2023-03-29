const User = require('../models/user.model');

exports.findOne = function (req, res) {
    const username = req.params.username;

    //User = το μοντέλο που έχω δημιουργήσει στο mongoose
    //έτσι το έχω ονομάσει
    User.findOne({username: username}, {_id:0, username:1, products:1}, (err, result)=>{
        if (err) {
            res.json({status: false, data: err});
        } else {
            res.json({status: true, data: result});
        }
    })
}

exports.create = function (req, res) {
    const username = req.body.username;
    const products = req.body.products;

    User.updateOne(
        {username: username},
        {
            $push: {
                products: products
            }
        },
        (err, result)=>{
            if (err) {
                res.json({status: false, data: err});
            } else {
                res.json({status: true, data: result});
            }
        }
    )

}

exports.update = function (req, res) {
    const username = req.body.username;
    const product = req.body.products.product;
    const quantity = req.body.products.quantity;

    User.updateOne(
        {
            username: username,
            "products.product": product
        },
        {
            $set: {
                "products.$.quantity": quantity
            }
        },
        (err, result)=>{
            if (err) {
                res.json({status: false, data: err});
            } else {
                res.json({status: true, data: result});
            }
        }
    )
}

exports.delete = function (req, res) {
    const username = req.params.username;
    const product = req.params.product;

    //ουσιαστικά κάνουμε update γιατί διαβράφουμε ένα product από τα πολλά που έχει ο :username
    //το delete είναι να διαγράψω όλο το document φηλ όλον τον :username

    User.updateOne = (
        {username: username},
        {
            $pull:{
                products: {product: product} //products = είναι array -> αφαίρεσε το product με την τιμή product
            }
        },
        (err, result)=>{
            if (err) {
                res.json({status: false, data: err});
            } else {
                res.json({status: true, data: result});
            }
        }
    )
}

exports.stats1 = function (req, res) {
    const username = req.params.username;

    //το aggregation είναι ένα array από φίλτρα, οπότε και βάζουμε []
    User.aggregate([
        {
            $match: {
                username: username
            }
        },
        {
            $unwind: "$products"
        },
        {
            $project: {
                _id: 1,
                username: 1,
                products: 1
            }
        },
        {
            $group: {
                _id: {
                    username: "$username",
                    product: "$products.product"
                },
                totalAmound: {
                    $sum: {
                        $multiply: ["$products.cost", "$products.quantity"]
                    } 
                },                
                count: {
                    $sum:1
                }
            }
        },
        {
            $sort: {
                "_id.product": 1
            }
        }
    ]),
    (err, result)=>{
        if (err) {
            res.json({status: false, data: err});
        } else {
            res.json({status: true, data: result});
        }
    }
    

    //άλλο ένα aggregation:
    /*
    {
        $unwind:"$products"
    },
    {
        $project: {
                _id: 1,
                products: 1
        }
    },
    {
        $group:{
            _id: {
                     product: "$products.product"
             },
             totalAmount: {
                    $sum: {
                        $multiply: [ "$products.cost", "$products.quantity"]
                    }
             },
             count: { $sum:1 }
        }
    },
    {
     $sort:{"_id.product":1}
    }*/
}

