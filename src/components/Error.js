import React from 'react';

const Error = ({ mensaje }) => {
    return (
        <p className="my-3 p-4 tex-center  alert alert-primary">{mensaje}</p>
    );
}

export default Error;