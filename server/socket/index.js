 module.exports = io => {
   io.on('connection', socket => {
     console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('tripUpdate', (act) => {
      //console.log('new trip: ',trip)
      socket.broadcast.emit('tripBroad', act)
      
    })

     socket.on('disconnect', () => {
       console.log(`Connection ${socket.id} has left the building`)
     })
   })
 }
