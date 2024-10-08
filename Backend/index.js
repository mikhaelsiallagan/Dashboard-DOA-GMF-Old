const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
//const local = require('./src/middlewares/local');
const mmRoute = require('./src/routes/mm.routes');
const store = new session.MemoryStore();
const app = express();
const { swaggerUi, swaggerDocs } = require('./src/configs/swagger.config.js');



const corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(session({
    secret: 'secret',
    resave: false,
    cookie: {maxAge: 6000000},
    saveUninitialized: false,
    store
    }));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    if(req.user){
        res.send(req.user);
    }else{
        res.send('Not logged in');
    }
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.use(mmRoute);   
//setupSwagger(app);

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});