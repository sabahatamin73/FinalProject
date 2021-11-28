const express = require('express');
const app = express();
const cors = require('cors');
const port = 5500;
const User = require('./models/user.js');
const mongoose = require('mongoose');

const uri = 'mongodb+srv://sabahat:3453@cluster0.sltaf.mongodb.net/User?retryWrites=true&w=majority'; 

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

(async () => {
await mongoose.connect(uri);
})();


// ======================= index page (read) ==================================
app.get('/', async (req, res) => {
try{
const userData = await User.find();
return res.send(JSON.stringify(userData));
}catch(e){
return res.send(e.message);
}
});


// =========================== create =========================================
app.post('/add', async (req, res) => {
try {
const userData = await User.create(req.body);
return res.send({user:userData});
}catch(e){
return res.send(e.message);
}
});


// ============================== delete ======================================
app.get('/delete/:userId', async (req, res) => {
try{
await User.findByIdAndDelete(req.params.userId);
res.send({deleted:'deleted'})
}catch(e){
res.send(e.message);
}
});


// ============================== update ======================================
app.post('/edit', (req, res) =>{
User.findByIdAndUpdate(req.body._id, {$set: {'name':req.body.name, 'email':req.body.email, 'address':req.body.address, 'phone':req.body.phone}}, (err, result) => {
if (err) throw err;
res.send({updated:'updated'});
});
});
app.listen(port);
