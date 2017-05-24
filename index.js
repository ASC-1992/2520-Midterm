const express = require("express");
const port = process.env.PORT || 10000;
const path = require("path");
const bodyParser = require("body-parser");

//require session
const session = require("express-session");

var pF = path.resolve(__dirname, "public");
var app = express();

//create a new server for socket, but combine it with express functions
const server = require("http").createServer(app);

//create a socket server with the new server
var io = require("socket.io")(server);

app.use("/scripts", express.static("build"));
app.use("/pictures", express.static("pics"));
app.use(bodyParser.urlencoded({
    extended: true
}));

//use sessions
app.use(session({
    secret:"asc123456", //for cookie handling, type whatever you want
    resave:true,
    saveUninitialized: true
}));

var allRooms = [];
var allRoomNames = [];
var allRoomPics = [];
var allRoomDescs = [];

//using : in the url will notify express that this part after / is not a solid link
app.get("/room/:roomindex", function(req, resp){
    
    /*since :roomindex is used, you can grab what was used as the parameter with req.params.roomindex
    FOR EXAMPLE if I use "/room/15" in my client file, then req.params.roomindex will return the number 15
    You can anme it anything you want.
    FOR EXAMPLE "/room/:myownname" in index.js, and in the client side (html), you can use "/room/Alex/" as a link path
    Then in the index.js, req.params.myownname will give you "Alex"
    */
    console.log(req.params.roomindex);
    var index = req.params.roomindex;
    
    //store the room id to teh sessions
    req.session.roomId = index;
    
    //resp.end("You are in Room "+index+". Room name "+allRooms[index]);
    resp.sendFile(pF+"/room.html")
});

//get the room for the user
app.post("/room/roomId", function(req, resp){
    //console.log(req.session.roomId);

    
    if(req.body.type == "create"){
        req.session.userName = req.body.name;
        req.session.userRace = req.body.race;
        req.session.userClass = req.body.class;
        req.session.userAvatar = req.body.avatar;
    }
    
    //get it from the session variable
    var obj = {
        roomId: req.session.roomId,
        roomName: allRooms[req.session.roomId],
        profileName: req.session.userName,
        profileClass: req.session.userClass,
        profileRace: req.session.userRace,
        profileAvatar: req.session.userAvatar
    }
    console.log(obj);

    resp.send(obj);
});

app.post("/roomCRUD", function(req, resp){
    console.log(req.body);
    //if create
    if(req.body.type == "create"){
        //when we have a database put this new room data in there
        allRooms.push(req.body.room);
        allRoomNames.push(req.body.room);
        allRoomPics.push(req.body.topic);
        allRoomDescs.push(req.body.desc);
        
        //send data back for good practice so there's an indication that it works
        resp.send({
            status:"success",
            name:req.body.room,
            category:req.body.topic,
            description:req.body.desc,
            index:allRooms.length-1
        });
    } else if(req.body.type == "read"){
        resp.send({
            status:"success",
            arr:allRooms,
            name:allRoomNames,
            category:allRoomPics,
            description:allRoomDescs,
            index:allRooms.length-1            
        });
    }
});

app.get("/character", function(req, resp){
    console.log("You are on the Character Page");
    resp.sendFile(pF+"/character.html");
});

app.get("/topics", function(req, resp){
    console.log("You are on the Topic Page");
    resp.sendFile(pF+"/topics.html");
});

app.get("/", function(req, resp){
    
    resp.sendFile(pF+"/main.html");
});

app.post("/", function(req, resp){
    req.session.userName = "Name";
    req.session.userClass = "Class";
    req.session.userRace = "Race";
    req.session.userAvatar = "/pictures/question.jpg";
    
})

io.on("connection", function(socket){
    //when a user goes to my html they will be in "connection" with my server via the port
    
    //what to do when a user sends "join room"
    socket.on("join room", function(roomId){
        socket.roomId = "room"+roomId;
        socket.join(socket.roomId);
    });
    
    //what to do when a user sends the message "send message" over
    socket.on("send message", function(obj){
        //function(obj) the obj argument is the obj that was sent over
        
        //tell the server to send a message "create message" to everybody
        io.to(socket.roomId).emit("create message", obj);
    });
    
    socket.on("disconnect", function(){
        //when the user leaves my html, they "disconnect" by closing the connection
    });
});

//not app.listen because we want to use the socket sever, but we can keep all the express stuff above
server.listen(port, function(err){
    if(err){
        console.log(err);
        return false;
    }
    
    console.log(port+" is running");
});