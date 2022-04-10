const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')


//settings
app.set('port', process.env.PORT || 3000);



//middlewares
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(cors());
//app.engine('html')


//routes
app.use(require('./routes/querys'));
//app.use(require('./routes/product'));


//starting the server

app.listen(app.get('port'), ()=>{
    console.log('Server on Port ',app.get('port'));
});