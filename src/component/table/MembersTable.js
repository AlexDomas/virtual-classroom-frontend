import React from 'react';
import '../../style/table.css';
import imageHand from "../../images/hand.gif";

const MembersTable = ({item}) => {

    return (
        <div className="members__row">
            <div className="members__student">{item.name}</div>
            <div className="members__hand">
                <img src={imageHand} style={{visibility: (item.hand === true) ? "visible" : "hidden"}}/>
            </div>
        </div>
    );
};

export default MembersTable;