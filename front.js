
const  Socket  = io(`http://localhost:8000`)

const form = document.getElementById(`form`)
const input = document.getElementById(`input`)
const container = document.querySelector(".container")
const name = prompt(`Enter your name`)
Socket.emit('user-joined', name);

form.addEventListener('submit' , (e)=>{
    e.preventDefault()
    const inp = input.value;
    append (`you: ${inp}`,`right`)
    Socket.emit(`inp` , inp)
    input.value = ""
})

let msgaudio = new Audio("msg.mp3")

const append = (msg,position)=>{
    const msgbox = document.createElement(`div`)
    msgbox.innerText=msg
    msgbox.classList.add(position)
    msgbox.classList.add(`msg`)
    container.append(msgbox)
    if(position == 'left'){
        msgaudio.play()
    }
   
}


Socket.on(`joined`, name =>{
    append(`${name}:  joined the chat`  ,`left`)
})
Socket.on(`leave`, name =>{
    append(`${name}:  leaves the chat`  ,`right`)
})
Socket.on(`get`, text =>{
    append(`${text.name}: ${text.text}`  ,`left`)
})
