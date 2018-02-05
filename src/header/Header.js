import React, { Component } from 'react';
import './Header.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import logo from './clarin-logo-wide.png'

class Header extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/"><i class="far fa-id-card fa-lg"></i>CLARIN Discovery Service</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav></Nav>
                <Nav>
                    <Navbar.Text >
                        <a href="https://www.clarin.eu" className="hidden-xs"><img src={logo} alt="logo" className="clarin-logo"></img></a>
                    </Navbar.Text>
                </Nav>
            </Navbar>
        );
    }
}

export default Header;