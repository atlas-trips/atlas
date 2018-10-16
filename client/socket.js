 import io from 'socket.io-client'
 import {updateAct} from './store/trip'
//import store from './store'
 const socket = typeof window !== 'undefined' ? io(window.location.origin) : null


 //travis why do you make me do this
if(socket){
  socket.on('connect', () => {
    console.log('Connected!')
    
    //on broadcast listen
    socket.on('tripBroad', (trip) => {
     console.log('activity added!, new trip: ',trip)
     //console.log('update: ',updateAct)
     updateAct(trip);
     //console.log('called thunk')
   })
  })
} 



 export default socket
