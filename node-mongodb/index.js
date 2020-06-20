const MongoClient =require('mongodb').MongoClient;
const assert = require('assert');
const dbopers = require('./operations')

const url = 'mongodb://localhost:27017/';
const dbname ='confusion';

MongoClient.connect(url,(err,client) =>{

    assert.equal(err,null);
    console.log('\n Connected to the db Succesfully \n');

    const db=client.db(dbname);
    
    dbopers.insertDocument(db,{name:"Vandonut",description:"Test"},'dishes',(result)=>{
        console.log('Insert Document:\n',result.ops);

        dbopers.findDocuments(db,'dishes',(docs)=>{
            console.log('Found Document :\n',docs);

            dbopers.updateDocument(db,{name:'Vandonut'},{description:'Update Test'},'dishes',(result)=>{
                console.log('Updated Document:\n',result.result)

                dbopers.findDocuments(db,'dishes',(docs)=>{
                    console.log('Found Document :\n',docs);

                    db.dropCollection('dishes',(result)=>{
                        console.log('Droped Collection:',result);

                        client.close();
                    })
                });  
            });
        });
    });

});