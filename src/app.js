import express from 'express'


const app = express()

app.get('/home', (req, res)  =>{
    res.status(200).json({message : 'the error message'});
})


app.use(express.json())
app.use(express.urlencoded({extended: false}))

export default app;