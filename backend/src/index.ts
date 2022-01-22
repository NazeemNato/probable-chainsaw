// import required modules
import express from "express"
import cors from "cors"
// import routes
import commentRoutes from "./routes/comment_routes"
// initialize express
const app = express()
// set cors
app.use(cors())
// json
app.use(express.json())
// set port
const port = process.env.PORT || 7000
// set routes
app.get("/", (req, res) => {
    return res.send("hello world")
})
app.use("/api", commentRoutes)

// listen
app.listen(port, () => console.log(`Server started on port ${port}`))