const MongoClient =require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname ='confusion';

MongoClient.connect(url,(err,client) =>{

    assert.equal(err,null);
    console.log('\n Connected to the db Succesfully \n');

    const db=client.db(dbname);
    const collection = db.collection('dishes');


    collection.insertOne({"name":"Uthappizza", "description":"test"},(err,result)=>{
        assert.equal(err,null);

        console.log('\n After Insert: \n');
        console.log(result.ops);

        collection.find({}).toArray((err,docs)=>{
            assert.equal(err,null);

            console.log('\nFound:\n');
            console.log(docs);

            db.dropCollection('dishes',(err,result)=>{
                assert.equal(err,null);

                client.close();
            });
        });
    });
});