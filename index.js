//require the http module from node 
const http = require("http")
const port = 8080
//require websocket
let WebSocketServer = require('websocket').server;
let connection = null

//create a raw nodejs server
const httpServer = http.createServer((req, res) => {
    console.log("we have received a request")
})

//pass the httpServer object to the websocket library
const websocket = new WebSocketServer({
    "httpServer": httpServer
})

//establish a websocket connection
websocket.on("request", request => {
    //accept the websocket connection
    connection = request.accept(null, request.origin)

    connection.on("message", message => {
        console.log(`received message ${message.utf8Data}`)
        connection.send(`got your message : ${message.utf8Data}`)

        //invoke the function to send data to client
        sendDataEveryTwoSeconds()
    })
})

//function send data to client every 2 seconds
function sendDataEveryTwoSeconds() {
    connection.send(`message: ${Math.random()}`)

    setTimeout(sendDataEveryTwoSeconds, 2000)
}

//running the server on specific port
httpServer.listen(port, () => {
    console.log(`server is running on port ${port}`)
})