$(document).ready(function(){
    console.log("jquery is ready!");
    
    //ajax to get the array of existing rooms
    $.ajax({
        url:"/roomCRUD",
        type:"post",
        data:{
            type:"read" //because index.js is configured to detect "read"
        },
        success:function(resp){
            //should send an array back if successful
            if(resp.status == "success"){
                var rooms = resp.arr;
                var names = resp.name;
                var categories = resp.category;
                var descriptions = resp.description;
                
                for(var i = 0; i<rooms.length; i++){
                    var ndiv = document.createElement("div");
                    ndiv.className = "room";
                    
                    var nImg = document.createElement("img");
                    nImg.className = "roomPic";
                    nImg.src = categories[i];
                    
                    var roomName = document.createElement("div");
                    roomName.className = "roomName"
                    roomName.innerHTML = names[i];
                    
                    var roomDesc = document.createElement("div");
                    roomDesc.className = "roomDesc";
                    roomDesc.innerHTML = descriptions[i];
                    

                    document.body.appendChild(ndiv);
                    ndiv.appendChild(nImg);
                    ndiv.appendChild(roomName);
                    ndiv.appendChild(roomDesc);
                    
                    //store the index of the array into the div using a custom property
                    ndiv.myindex = i;
                    ndiv.addEventListener("click", function(){
                        //change the loaction to this new link with the index as the parameter
                        location.href = "/room/"+this.myindex;
                    });
                }
            }
        }
    });
    
    document.getElementById("create").addEventListener("click", function(){
        $.ajax({
            url:"/roomCRUD",
            type:"post",
            data:{
                room: document.getElementById("room").value,
                topic: document.getElementById("topic").value,
                desc: document.getElementById("desc").value,
                type: "create"
            },
            success:function(resp){
                console.log(resp);
                
                if(resp.status == "success"){
                    //if the server responds with a success message
                    var ndiv = document.createElement("div");
                    ndiv.className = "room";
                    
                    var nImg = document.createElement("img");
                    nImg.className = "roomPic";
                    nImg.src = resp.category;
                    
                    var roomName = document.createElement("div");
                    roomName.className = "roomName"
                    roomName.innerHTML = resp.name;
                    
                    var roomDesc = document.createElement("div");
                    roomDesc.className = "roomDesc";
                    roomDesc.innerHTML = resp.description;
                    
                    //ndiv.innerHTML = resp.name + " - " + resp.description; //using server info for the sake of being different

                    document.body.appendChild(ndiv);
                    ndiv.appendChild(nImg);
                    ndiv.appendChild(roomName);
                    ndiv.appendChild(roomDesc);
                    
                    ndiv.myindex = resp.index;
                    ndiv.addEventListener("click", function(){
                        //change the location to this new link with the index as the parameter
                        location.href = "/room/"+this.myindex;
                    });
                }
            }
        })
    });
    
    document.getElementById("logo").addEventListener("click", function(){
        location.href = "/";
    });
    
});