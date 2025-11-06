import React from 'react';
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
                    { window.config.headerUrl ? <a href="/"><TitleAndIcon /></a> : <TitleAndIcon /> }
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

const TitleAndIcon = () => {
    return (
        <>
            <FontAwesomeIcon size="lg" icon={faIdCard} />
            <span className="title">Sign in via the CLARIN Service Provider Federation</span>
        </>
    );
}

export default Header;