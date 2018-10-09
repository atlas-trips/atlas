import React from 'react';

const SingleTransport = props => {
  const {user, transport} = props;
  return (
    <div>
      <div key={transport.id}>
        <div
          style={{
            marginTrop: '25px',
            backgroundColor: 'gray',
            borderRadius: '5px',
            marginLeft: '25px',
            marginRight: '25px',
            boxShadow: '7px 7px 6px -2px rgba(0, 0, 0, 0.75)',
            width: '200px'
          }}
        >
          <div>
            <h3>
              {transport.method}{' '}
              <button
                type="submit"
                onClick={() => props.onDelete(user.id, transport.id)}
                style={{display: 'inline', right: '10px'}}
              >
                X
              </button>
            </h3>
          </div>
          {!transport.flightNum ? null : (
            <h3>
              <a
                target="_blank"
                href={`http://www.google.com/search?q=${transport.flightNum}`}
              >
                {transport.flightNum}
              </a>
            </h3>
          )}

          <h3>{transport.date.slice(0, 10)} </h3>
        </div>
      </div>
    </div>
  );
};

export default SingleTransport;
