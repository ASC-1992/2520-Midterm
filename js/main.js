$(document).ready(function(){
    console.log("jquery is ready!");
    
    
    document.getElementById("editProfile").addEventListener("click", function(){
    
        $.ajax({
            url:"/character",
            type:"get",
            success:function(resp){
                location.href = "/character";
                console.log("You did it!")
            }
        });
    });
    
    document.getElementById("topic").addEventListener("click", function(){
    
        $.ajax({
            url:"/topics",
            type:"get",
            success:function(resp){
                location.href = "/topics";
                console.log("You did it!")
            }
        });
    });
});