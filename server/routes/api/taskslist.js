const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Tasks
router.get('/',async (req,res)=>{
    const Tasks = await loadTasksCollection();
    res.send(await Tasks.find({}).toArray());
})
//Add Tasks
router.post('/',async(req,res)=>{
    const Tasks = await loadTasksCollection();
    await Tasks.insertOne({
        task:req.body.task,
        dateCreated: new Date()
    });
    res.status(201).send();
});

//Delete Tasks
router.delete('/:id',async(req,res)=>{
    const Tasks = await loadTasksCollection();
    await Tasks.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send()
})
async function loadTasksCollection(){
    const client = await mongodb.MongoClient.connect('mongodb+srv://Thy_Saonan:1234@my-tasklist.gvncn.mongodb.net/my-tasklist?retryWrites=true&w=majority',{
        useNewUrlParser: true
    });
    return client.db('my_tasklist').collection('mytasks')
}

module.exports = router;