import express from 'express'
import movies from './routes/movieRoute.js'


const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));


// movie routes
app.use('/api/v1/movies', movies);

export default app;