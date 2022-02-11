import express from 'express';
import log from "./logger";
import connect from './db/connect';
import routes from './routes';



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('port', process.env.PORT || 4000);


app.listen(app.get('port'), () => {
    console.log('Server listening on port '+app.get('port')+'...')
    connect();
    routes(app);
});