import React from 'react';

const ErrorSpanElement = ({errorMessage}) => {
    return (
        <span style={{fontSize: "14px", color: "#00FA9A"}}>
           {errorMessage.name.length > 0 ?
               <div>{errorMessage.name}</div> : <div>{errorMessage.internalError}</div>
           }
        </span>
    );
};

export default ErrorSpanElement;