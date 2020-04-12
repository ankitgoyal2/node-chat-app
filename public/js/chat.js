var socket = io();

function scrollToBottom(){
    //selectors
    var messages = jQuery("#messages");
    var newMessage = messages.children("li:last-child");
    //heights
    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on("connect", () => {
    console.log("connected to server");
});

socket.on("newMessage", (newMessage) => {
    // var li = jQuery("<li></li>");
    // li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text}`);
    // jQuery("#messages").append(li);
    var formattedTime = moment(newMessage.createAt).format("h:mm a");
    var template = jQuery("#message-template").html();
    var html = Mustache.render(template,{
        text : newMessage.text,
        from : newMessage.from,
        createAt : formattedTime,
    });
    jQuery("#messages").append(html);
    scrollToBottom();

});

// socket.emit("createMessage",{
//     from :"akash",
//     text : "kurknrelilm"
// },(acknoledgement)=>{
//     console.log("got it -->",acknoledgement);
// })

socket.on("newLocationMessage",(message)=>{
    // var li = jQuery("<li></li>");
    // var a = jQuery("<a target=\"_blank\">My Current Location</a>");
    // li.text(`${message.from} ${formattedTime}:`);
    // a.attr("href",message.url);
    // li.append(a);
    // jQuery("#messages").append(li);
     var formattedTime = moment(message.createAt).format("h:mm a");
     var template = jQuery("#location-message-template").html();
     var html = Mustache.render(template,{
         from : message.from,
         url : message.url,
         createAt : formattedTime,
     })
     jQuery("#messages").append(html);
     scrollToBottom();
})

socket.on("disconnect", () => {
    console.log("disconnected from server");
});

jQuery("#message-form").on("submit",(e)=>{
    e.preventDefault();
    var messageTextbox = jQuery("[name = message]");
    socket.emit("createMessage",{
        from : "User",
        text : messageTextbox.val()
    },()=>{
        messageTextbox.val("");
    })
})

var locationButton = jQuery("#send-location");

locationButton.on("click",()=>{
    if(!navigator.geolocation){
        return alert("Geolocation not supported by your browser");
    }

    locationButton.attr("disabled","disabled").text("Sending Location...");
    navigator.geolocation.getCurrentPosition((position)=>{
        locationButton.removeAttr("disabled").text("Send Location");
        socket.emit("createLocationMessage",{
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        })
    },()=>{
        locationButton.removeAttr("disabled").text("Send Location");
        console.log("Unable to fetch location");
    })
})