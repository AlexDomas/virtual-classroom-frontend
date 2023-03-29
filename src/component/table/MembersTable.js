import React from 'react';

const MembersTable = ({item}) => {

    return (
        <div className="row-content">
            <div className="content-name">
                {item.name}
            </div>
            <div className="content-action">
            </div>
        </div>
    );
};

export default MembersTable;