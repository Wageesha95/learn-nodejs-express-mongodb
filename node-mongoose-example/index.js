const mongose = require('mongoose');
const Dishes =require('./models/dishes');
const { db } = require('./models/dishes');

const url ='mongodb://localhost:27017/confusion';
const connect = mongose.connect(url);

connect.then((db) =>{
    console.log("connected to server correctly");
    
    var newDish=Dishes({
        name:'Dhal',
        description:'test'
    });

    var newDish1=Dishes({
        name:'Dhal Currys',
        description:'test'
    });

    newDish1.save()

    newDish.save()
        .then((dish)=>{
            console.log(dish);

            return Dishes.find({}).exec();
        })
        .then((dishes)=>{
            console.log(dishes)

           return Dishes.remove({});
        })
        .then(()=>{
            return mongose.connection.close();
        })
        .catch((err)=>{
            console.log(err)
        });
})
.catch((err)=>{
    console.log(err)
});
