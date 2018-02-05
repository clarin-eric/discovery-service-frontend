import React, { Component } from 'react';
import './Header.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#home"><i class="far fa-id-card fa-lg"></i>CLARIN Discovery Service</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="#">
                        Link
                    </NavItem>
                </Nav>
                <Nav>
                    <Navbar.Text >
                        <a href="www.clarin.eu" className="clarin-logo hidden-xs"><span>CLARIN</span></a>
                    </Navbar.Text>
                </Nav>
            </Navbar>
        );
    }
}

export default Header;