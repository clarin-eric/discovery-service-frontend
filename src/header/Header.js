import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem';
import Container from 'react-bootstrap/Container';
import logo from './clarin-logo-wide.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIdCard } from '@fortawesome/free-regular-svg-icons'

const Header = () => {
    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Brand>
                    <a href="/"><FontAwesomeIcon size="lg" icon={faIdCard} />
                        <span className="title">Sign in via the CLARIN Service Provider Federation</span>
                    </a>
                </Navbar.Brand>
                <Nav></Nav>
                <Nav className="justify-content-end">
                    <NavItem href={window.config.website} className="clarin-logo-item">
                        <img src={logo} alt="logo" className="clarin-logo"></img>
                    </NavItem>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;