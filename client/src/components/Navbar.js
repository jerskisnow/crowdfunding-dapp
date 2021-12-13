import { useState } from 'react';

import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

function NavigationBar({ provider }) {
    const [account, setAccount] = useState(null);

    return (
        <>
            <Navbar collapseOnSelect expand="lg" variant="dark" style={{
                backgroundColor: '#121212', boxShadow: 'rgba(160, 170, 180, 0.25) 0px 0px 8px 0px'
            }} sticky="top">
                <Container>
                    <Navbar.Brand>
                        <Link to="/" style={{ textDecoration: 'none', color: '#6163ff' }}>
                            <img alt="" src="https://react-bootstrap.netlify.app/logo.svg" width="30" height="30" className="d-inline-block align-top" />
                            {' '}ProjectName
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Link to="/explore" className="nav-link">Explore</Link>
                            <Link to="/news" className="nav-link">News</Link>
                            <Link to="/learn" className='nav-link'>Learn</Link>
                            <NavDropdown title="Manage" id="collasible-nav-dropdown">
                                <Link to="/fund/create" className="dropdown-item">Create</Link>
                                <Link to="/fund/list" className="dropdown-item">List</Link>
                                <NavDropdown.Divider />
                                <Link to="/fund/docs" className="dropdown-item">Documentation</Link>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            {account === null ?
                                <Button variant="primary" style={{ backgroundColor: '#6163ff' }} onClick={
                                    async () => {
                                        if (provider !== null) {
                                            await provider.send("eth_requestAccounts", []);
                                            
                                            const signer = provider.getSigner();
                                            const account = await signer.getAddress();

                                            setAccount(account);
                                        }
                                    }
                                }>Connect Wallet</Button> : <Nav.Item>{account}</Nav.Item>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default NavigationBar;