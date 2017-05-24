$(document).ready(function(){
    $.ajax({
        url:"/room/roomId",
        type:"post",
        success:function(resp){
            //the resp should have roomId and roomName
            document.getElementById("status").innerHTML = "You are in room "+resp.roomId+": "+resp.roomName;
            
            //start sockets and pass the roomID over
            initSockets(resp.roomId, resp.profileName, resp.profileClass, resp.profileRace, resp.profileAvatar);
        }
    });
    
})

//transfer all socket stuff into this function
function initSockets(roomId, profileName, profileClass, profileRace, profileAvatar){
    //connect to the io opened tunnel in the server
    var socket = io();
        
    //send a message to join a room
    socket.emit("join room", roomId);

    document.getElementById("send").addEventListener("click", function(){
        //when clicked, use your socket to send a message
        console.log("making a new room")
        //create an obj to send over
        var obj = {
            name: profileName,
            race: profileRace,
            class: profileClass,
            avatar: profileAvatar,
            msg: document.getElementById("msg").value
        };

        //use your socket to send a message over and pass long the object
        //emit function means send a message
        socket.emit("send message", obj);
    });

    //what to do if server sents teh message "create room" over
    socket.on("create message", function(obj){
        //the function(obj) obj argument holds information of what was sent over
        console.log(obj);

        //create a new div, put hte msg sent from other people/yourself inside
        var ndiv = document.createElement("div");
        ndiv.className = "chat";
        
        var nAva = document.createElement("img");
        nAva.className = "avatar";
        nAva.src = obj.avatar;
        
        var nName = document.createElement("div");
        nName.className = "name";
        nName.innerHTML = obj.name;
        
        var nRace = document.createElement("div");
        nRace.className = "race";
        nRace.innerHTML = "'"+obj.race + ": " + obj.class+"'";
        
        var nMsg = document.createElement("div");
        nMsg.className = "msg";
        nMsg.innerHTML = obj.msg;

        ndiv.appendChild(nAva);
        ndiv.appendChild(nName);
        ndiv.appendChild(nRace);
        ndiv.appendChild(nMsg);
        //append it
        document.getElementById("display").appendChild(ndiv);

    });
    
        
    document.getElementById("logo").addEventListener("click", function(){
        location.href = "/";

    });    
    
    document.getElementById("back").addEventListener("click", function(){
    
        $.ajax({
            url:"/topics",
            type:"get",
            success:function(resp){
                location.href = "/topics";
                console.log("You did it!")
            }
        });
    });
    
}