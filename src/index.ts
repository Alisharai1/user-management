import express from 'express'

const app = express()

const port = 3000

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