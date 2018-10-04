// import React from 'react';

// const CalendarDay = (props) => {
//   const { details } = props;
//   console.log('DEETS', details.activities.length)
//   return (

//       // return (
//         <div key={day.id} style={{display: 'flex', border: '1px solid red'}}>
//           <div style={{border: '1px solid black'}}>
//             <h3>{day.date}</h3>
//           </div>
//           {day.hasOwnProperty('activities') ? (
//             <div style={{border: '1px solid black'}}>
//               <h4>Activities:</h4>
//               {day.activities.map(act => {
//                 return (
//                 <div key={act.id} >
//                   <h5>{act.name}</h5>
//                   {act.users.map((user,i) => <h6 key={i}>{user}</h6>)}
//                 </div>)
//               })}
//             </div> )
//           : null}
//         </div>
//       // )

//   );
// };

// export default CalendarDay;
