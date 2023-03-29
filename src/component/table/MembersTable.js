import React from 'react';
import '../../style/table.css';

const MembersTable = ({item}) => {

    return (
        
            <div className="members__row">
                <div className="members__student">{item.name}</div>
                <div className="members__value">4 000€</div>
            </div>
        
    );
};

export default MembersTable;