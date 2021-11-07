const socket = io();

const btn = document.querySelector(".btn-add-note")

btn.addEventListener("click", ()=>{
    socket.emit('note:new', ()=>{})
})
