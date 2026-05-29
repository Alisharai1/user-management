import express, { json } from 'express'
import { router as userRouter } from './controller/user.router' 

export const app = express()

const port = 3000

app.use(json())

app.use('/users',userRouter)

app.get('/liveCheck', (_req, res) => {
    res.status(200).json({ message: "I'm alive, I can help myself!!" })
})

app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.log("app is up!")
    }
})