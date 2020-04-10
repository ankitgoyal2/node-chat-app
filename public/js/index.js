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