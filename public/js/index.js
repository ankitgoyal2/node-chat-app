var socket = io();

socket.on("connect", () => {
    console.log("connected to server");
});

socket.on("newMessage", (newMessage) => {
    console.log("newMessage", newMessage);

    var li = jQuery("<li></li>");
    li.text(`${newMessage.from} : ${newMessage.text}`);
    jQuery("#messages").append(li);
});

// socket.emit("createMessage",{
//     from :"akash",
//     text : "kurknrelilm"
// },(acknoledgement)=>{
//     console.log("got it -->",acknoledgement);
// })

socket.on("newLocationMessage",(message)=>{
    var li = jQuery("<li></li>");
    var a = jQuery("<a target=\"_blank\">My Current Location</a>");
    li.text(`${message.from} :`);
    a.attr("href",message.url);
    li.append(a);
    jQuery("#messages").append(li);
})

socket.on("disconnect", () => {
    console.log("disconnected from server");
});

jQuery("#message-form").on("submit",(e)=>{
    e.preventDefault();

    socket.emit("createMessage",{
        from : "User",
        text : jQuery("[name = message]").val()
    },(message)=>{
        console.log(message);
    })
})

var locationButton = jQuery("#send-location");

locationButton.on("click",()=>{
    if(!navigator.geolocation){
        return alert("Geolocation not supported by your browser");
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit("createLocationMessage",{
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        })
    },()=>{
        console.log("Unable to fetch location");
    })
})