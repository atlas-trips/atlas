 import io from 'socket.io-client'
 import {updateAct} from './store/trip'
//import store from './store'
 const socket = io(window.location.origin)

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



 export default socket
