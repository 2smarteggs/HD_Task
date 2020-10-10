let express=require('express');
let bodyParser=require("body-parser");
let https=require("https");
let User=require('./dataModel.js');  //User为model name
let mongoose=require('mongoose');
let validator=require('validator');
let url=require("url");
const cors = require('cors');
let fs=require('fs');
let multer=require('multer');
let fetch = require('node-fetch');
let FormData = require('form-data');


let app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

// mongo
mongoose.connect("mongodb+srv://admin_Yuming:Aa56112756@cluster0.sobtl.mongodb.net/myDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/', (req,res) => {
    res.send("8080");
});

app.get('/loadTask', (req,res) => {
    User.find({
    }, function (err, data) {
        if(err) throw err;
        if(data) {
            res.end(JSON.stringify(data));
        }else{
            const returnJSON = {"status": "false"};
            res.end(JSON.stringify(returnJSON));
        }
    });
});

app.post('/filterImage', (req,res) => {

    console.log('processing filter');
    let stringFilter = ['calm','sunny','trip','beautify','wangjiawei','cutie','macaron','new_york','sakura','17_years_old','clight','tea_time','whiten','chaplin','flowers','memory','ice_lady'];

    let formData = new FormData();
    formData.append('api_key', '2N55y7EqGFRKX1xvM7jda1uXMPnsw1cH');
    formData.append('api_secret', 'QeaTWqI_kt98zB4RL3cPsErxEqBfRAW_');
    formData.append('image_base64', req.body.base64);
    formData.append('filter_type', stringFilter[req.body.filter]);

    fetch('https://api-cn.faceplusplus.com/facepp/v2/beautify',{
        method: 'post',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            let image = data;
            console.log(image)
            console.log(image.result);

            if (res.statusCode === 200) {
                const returnJSON = {"status": "true", "image":image.result};
                res.json(returnJSON);
            } else {
                const returnJSON = {"status": "false"};
                res.end(JSON.stringify(returnJSON));
            }
        })
});

app.post('/addTask', (req,res) => {

    console.log('Data received...');
    let taskType=req.body.taskType;
    let title=req.body.title;
    let description=req.body.description;
    let expiryDate=req.body.expiryDate;
    let optionA=req.body.optionA;
    let optionB=req.body.optionB;
    let optionC=req.body.optionC;
    let question=req.body.question;
    let masterWorker=req.body.masterWorker;
    let reward=req.body.reward;
    let numberOfWorker = req.body.numberOfWorker;
    let imageJSON = req.body.imageJSON;
    let imageHash = '';
    if (req.body.taskType === 'D') {
        imageHash = JSON.parse(imageJSON).HASH;
    }
    let imageName = req.body.imageName;

    let image = 'http://node.wanxutao.space/api/download?HASH=' + imageHash + '&' + 'fileName=' + imageName;

    let formData = new FormData();
    formData.append('api_key', '2N55y7EqGFRKX1xvM7jda1uXMPnsw1cH');
    formData.append('api_secret', 'QeaTWqI_kt98zB4RL3cPsErxEqBfRAW_');
    formData.append('image_url', image);

    console.log('Processing Image...');
    fetch('https://api-cn.faceplusplus.com/imagepp/beta/detectsceneandobject',{
        method: 'post',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            let imageLabels = data.objects;
            console.log('yes' + JSON.stringify(imageLabels));

            if (imageLabels === undefined) {
                imageLabels = [{"confidence":0,"value":"Cannot detect"}]
            }

            let user=new User({
                    taskType: taskType,
                    title: title,
                    description: description,
                    expiryDate: expiryDate,
                    optionA: optionA,
                    optionB: optionB,
                    optionC: optionC,
                    question: question,
                    masterWorker: masterWorker,
                    reward: reward,
                    numberOfWorker: numberOfWorker,
                    imageHash: imageHash,
                    imageName: imageName,
                    imageLabels: imageLabels
                }
            );
            user
                .save()
                .catch((err) => console.log(err));

            if (res.statusCode === 200) {
                const returnJSON = {"status": "true", "response":"Picture detected. The data has been saved to database."};
                res.json(returnJSON);
            } else {
                const returnJSON = {"status": "false"};
                res.end(JSON.stringify(returnJSON));
            }
        });



});


let server = app.listen(process.env.PORT || 8080, function () {
    console.log("Server is running successfully");
});



