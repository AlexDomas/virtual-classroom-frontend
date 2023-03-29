import React from 'react';
import '../../style/header.css';

const HeaderForMembersPage = ({item}) => {

    return (
        <header class="header">
            <nav class="nav">
                <img
                    src="logo/logo.png"
                    alt="Banking System logo"
                    class="nav__logo"
                    id="logo"
                />
                <ul class="nav__links">
                    <details className="dropdown">
                        <summary role="button">
                            <a className="button">{item.name}  &#9660;</a>
                        </summary>
                        <ul>
                            <li><a href="#">Logout</a></li>
                        </ul>
                    </details>
                </ul>
            </nav>
        </header>
    );
};

export default HeaderForMembersPage;