const MongoClient =require('mongodb').MongoClient;
const assert = require('assert');
const dbopers = require('./operations')

const url = 'mongodb://localhost:27017/';
const dbname ='confusion';

MongoClient.connect(url).then((client) =>{

    console.log('\n Connected to the db Succesfully \n');

    const db=client.db(dbname);
    
    dbopers.insertDocument(db,{name:"Vandonut",description:"Test"},'dishes')
    .then((result)=>{
        console.log('Insert Document:\n',result.ops);

        return dbopers.findDocuments(db,'dishes');
    })
    .then((docs)=>{
        console.log('Found Document :\n',docs);

        return dbopers.updateDocument(db,{name:'Vandonut'},{description:'Update Test'},'dishes')
    })
    .then((result)=>{
        console.log('Updated Document:\n',result.result);

        return dbopers.findDocuments(db,'dishes');
    })
    .then((docs)=>{
        console.log('Found Document :\n',docs);

        return db.dropCollection('dishes');
    })
    .then((result)=>{
        console.log('Droped Collection:',result);

        client.close();
    })
    .catch((err)=>{
        console.log(err);
    });

}).catch((err)=>{
    console.log(err);
});