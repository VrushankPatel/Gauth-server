import React, { Component } from "react";

class Login extends Component {
    state = { page: this.props.page };

    getActiveLabelBold = (activeLabel) => {
        return `font-weight-${this.state.page === activeLabel ? "bold" : "normal"}`;
    };

    render() {
        return (
            <div>
                Signin
            </div>
        );
    }
}

export default Login;