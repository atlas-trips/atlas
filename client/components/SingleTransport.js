import React from 'react';

const SingleTransport = props => {
  const {user, transport} = props;
  return (
    <div key={transport.id}>
      <hr />
      <h3>{transport.method}</h3>
      {!transport.flightNum ? null : (
        <h3>
          <a href={`http://www.google.com/search?q=${transport.flightNum}`}>
            {transport.flightNum}
          </a>
        </h3>
      )}

      <h3>
        {transport.date.replace(/(\d{4})\-(\d{2})\-(\d{2}).*/, '$3-$2-$1')}
      </h3>
      <button
        type="submit"
        onClick={() => props.onDelete(user.id, transport.id)}
      >
        X
      </button>
    </div>
  );
};

export default SingleTransport;
