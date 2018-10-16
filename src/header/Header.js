import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import logo from './clarin-logo-wide.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCard } from '@fortawesome/free-regular-svg-icons'


class Header extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/"><FontAwesomeIcon size="lg" icon={faIdCard} /><span className="title">Sign in via the CLARIN Service Provider Federation</span></a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav></Nav>
                <Nav pullRight>
                    <NavItem href={window.config.website} className="clarin-logo-item">
                        <img src={logo} alt="logo" className="clarin-logo"></img>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default Header;