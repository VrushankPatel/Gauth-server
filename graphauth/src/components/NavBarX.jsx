import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../assets/imgs/logo.png";

class NavBarX extends Component {
    state = { page: this.props.page };

    getActiveLabelBold = (activeLabel) => {
        return `font-weight-${this.state.page === activeLabel ? "bold" : "normal"}`;
    };

    render() {
        return (
            <div>
                <Navbar bg="light" expand="md">
                    <img src={logo} width="80" height="50" alt="" />
                    <Navbar.Brand
                        href="/"
                        style={{
                            fontFamily: "Exo",
                            fontSize: "XX-Large",
                            color: "#2b2b2a",
                        }}
                    >
                        GAuth
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link
                                className={this.getActiveLabelBold("Home")}
                                href="/"
                            >
                                Home
                            </Nav.Link>
                            <Nav.Link
                                href="/login"
                                className={this.getActiveLabelBold("Api")}
                            >
                                LogIn
                            </Nav.Link>

                            <Nav.Link
                                href="/signup"
                                className={this.getActiveLabelBold("SignUp")}
                            >
                                SignUp
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavBarX;