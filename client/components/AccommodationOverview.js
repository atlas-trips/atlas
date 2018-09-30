import React from 'react';
import {Link} from 'react-router-dom';

const dummyData = [
    {
        id: 1,
        name: 'Motel 6',
        start: "2018-09-01"
    },
    {
        id: 2,
        name: 'The Ritz-Carlton',
        start: '2018-09-04'
    },
    {
        id: 3,
        name: 'Four Seasons',
        start: '2018-09-05'
    },
    {
        id: 4,
        name: 'Best Westin',
        start: '2016-09-08'
    }
]


const tempActivitiesStyles = {
    textAlign: 'center',
    margin: '3px'
  }

const AccommodationOverview = () => {
    return (
        <div style={{
            textAlign: 'center',
            width: '300px',
            border: '1px solid black',
            marginTop: '50px'
        }}>
            <h4>Accommodations:</h4>
            {dummyData.filter((item, idx) => idx < 3).map(accom =>{
                return (
                    <div style={tempActivitiesStyles} key={accom.id}>
                        {accom.name} - {accom.start}
                    </div>
                )
            })}  
        </div>
    )
}

export default AccommodationOverview;