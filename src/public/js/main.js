console.log("si esta funcionando");

const socket = io();

// guardo usuario que se conecta
let user;

const chatBox = document.getElementById("chatBox");

Swal.fire({
    title:"identificarse",
    input:"text",
    text:"ingresar nombre de usuario",
    inputValidator:(value) => {
        return !value && "ingresar nombre para continuar"
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
})

// capturo mensaje del chatBox y lo envio al backend
chatBox.addEventListener("keyup", (event) => {
    if(event.key === "Enter"){
        if(chatBox.value.trim().length > 0){
            socket.emit("message", {user: user, message: chatBox.value});
            chatBox.value = "";
        }
    }
})

socket.on("messagesLogs", data => {
    const log = document.getElementById("messagesLogs");
    let messages = "" ;
    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message} <br>`
    })
    log.innerHTML = messages;
})

