import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import logo from './clarin-logo-wide.png'

class Header extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/"><i className="far fa-id-card fa-lg"></i><span className="title">Sign in via the CLARIN Service Provider Federation</span></a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav></Nav>
                <Nav pullRight>
                    <NavItem href="https://www.clarin.eu" className="clarin-logo-item">
                        <img src={logo} alt="logo" className="clarin-logo"></img>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default Header;