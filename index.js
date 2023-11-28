const io = require (`socket.io`)(8000);

const username = {};

io.on(`connection`, socket =>{
    socket.on(`user-joined`, name =>{
        console.log(`new user`, name)
        username[socket.id]= name;
        socket.broadcast.emit(`joined`, name)
    })
    socket.on(`user-left`, text =>{
        socket.broadcast.emit(`leave`, username[socket.id])
        delete username[socket.id];
    })
    socket.on(`inp`, text =>{
        socket.broadcast.emit(`get`, {text: text, name:username[socket.id]})
    })
})

