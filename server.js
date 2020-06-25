// var Db = require('mongodb').Db;
var MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const port = 3000;
const uri = "mongodb+srv://juancarbajal-txt:JUAN1998@cluster0-ru3hp.mongodb.net/test?retryWrites=true";
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(express.static('post'))
app.use(express.static('retrieve'))
app.use(express.static('retrievebyId'))


enteredTitle = '';
enteredContent = '';
// ID var only used for ID lookup
enteredID = '';

let db;

MongoClient.connect(uri, {useNewUrlParser: true}, (err,client) => {
    if (err) throw err;
    console.log("connected to DB");
    db = client.db('mongo');
    console.log(db);
})

app.post('/addBlog', (req, res)=>{
    // if collection does not exist, insertOne ensures that it gets created
    db.collection('blogs').insertOne({
        title: 'hello world',
        content: 'hello world content',
    }, (err, result) => {
        if  (err) throw err;
        res.send(result);
    })
});
app.get('/getBlog', (req,res) => {
    // console.log('entered firsrt get ');
    // res.sendFile('/server.js',{root:__dirname});
    // res.sendFile('./post.html', {root:__dirname});
    // // res.sendFile('server.js', {root:__dirname});
    db.collection('blogs').findOne({
        title:'hello world',
    }, (err,result) => {
        if(err) {
            console.log(err);
            throw err;
        }

        console.log(result);
        res.send(result);

    })
});
// app.get('/retreive',function(req,res){
//     res.sendFile('./retrieve.html', {root:__dirname});
//     res.sendFile('server.js', {root:__dirname});
// });

function onAddPost(){
    console.log('on add post entered');
    app.post('/post.html', (req, res)=>{
        db.collection('blogs').insertOne({
            title: this.enteredTitle,
            content: this.enteredContent
        }, (err, result) => {
            if  (err) throw err;
            res.send(result);
        })
    })
};


function onRetrieve(){
    app.get('/retrieve.html', (req, res)=>{
        // pass in empty document to retreat ALL documents 
        db.collection('blogs').find({}, (err,result) => {
            if (err) throw err;
            res.send(result);
        })
    })
};

function onRetrievebyID(){
    id = this.enteredID;
    app.get('retrieveById.html', (req,res) => {
        db.collection('blogs').findById({id}, (err,result) => {
            if (err) throw err;
            res.send(result);
        })
    })
}