const mongoose = require('mongoose');
const Dishes =require('./models/dishes');
const { db } = require('./models/dishes');

const url ='mongodb://localhost:27017/confusion';
const connect = mongoose.connect(url);

connect.then((db) =>{
    console.log("connected to server correctly");
    
    Dishes.create({
        name:'Dhal',
        description:'test'
    })
    .then((dish)=>{
        console.log('Inserted: ');
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id,{$set : {description:'Updated Test'}},{new:true}).exec();
    })
    .then((dish)=>{
        console.log('Updated: ');
        console.log(dish)
        dish.comments.push({
            rating:5,
            comment:'I love this Dish',
            author:'Thilina Liyanage'
        });

        return dish.save();
    })
    .then((dish)=>{
        console.log('Removed: ');
        console.log(dish)
        return Dishes.remove({});
    })
    .then(()=>{
        return mongoose.connection.close();
    })
    .catch((err)=>{
        console.log(err)
    });
})
.catch((err)=>{
    console.log(err)
});
