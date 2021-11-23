import React, { Component } from "react";
import { Form, Row, InputGroup, Button, Card, Alert, ProgressBar } from "react-bootstrap";
import constants from "../common/Constants";
import DrawUtil from "../common/DrawUtil";
import Utilities from "../common/Util";
var CryptoJS = require("crypto-js");

class Login extends Component {
    state = {
        page: this.props.page,        
        userName: "",
        pwd: "",        
        errorShow: false,
        errorMessage: "",
        toggleForm: false,
        showGrids: false,
        progress: 0,
        progressvariant: "secondary",
        imgRetrieved: false,
        isReadyForSubmit: false,
        pointsErrorShow: false,
        logInByPassword: false
    };
    regex = constants.regex;
    imgId = 0;
    coordinates = [];    
    progressVariants = {
        20 : "danger",
        40 : "warning",
        60 : "secondary",
        80 : "info",
        100 : "success"
    }
    componentDidMount = () => {        
        const canvas = document.querySelector('canvas');
        Utilities.getImageBg(canvas, this.imgId);
        this.getPointerEvents(canvas);
    }

    getPointerEvents = (canvas) => {
        function preventDefault(e) {
            e.preventDefault();
        }        
        var gridX = 0;
        var gridY = 0;
        if (window.PointerEvent) {            
            canvas.addEventListener('touchstart', preventDefault, { passive: false });
            canvas.addEventListener('touchmove', preventDefault, { passive: false });
            canvas.addEventListener('click', (e) => {
                // if (toggle === 0) {
                //     toggle = 1;
                //     gridX = Math.floor(e.layerX / 50) + 1;
                //     gridY = Math.floor(e.layerY / 50) + 1;
                // } else {
                //     toggle = 0;
                //     console.log(gridX, gridY);
                //     console.log(gridX === Math.floor(e.layerX / 50) + 1 && gridY === Math.floor(e.layerY / 50) + 1);
                // }
                if(this.coordinates.length >= 5){
                    this.showPointsError();
                    return;
                }
                gridX = Math.floor(e.layerX / 50) + 1;
                gridY = Math.floor(e.layerY / 50) + 1;
                this.coordinates.push([gridX, gridY]);
                this.setState({progress: this.state.progress+20, progressvariant: this.progressVariants[this.state.progress+20]});
                if(this.coordinates.length === 5){
                    this.setState({isReadyForSubmit: true})
                }                                                
            });
            canvas.addEventListener('mousedown', (e) => {                
                DrawUtil.drawPoints(e, this.coordinates.length);                    
            });
        } else {
            canvas.addEventListener('mousemove', this.draw);
            canvas.addEventListener('mousedown', preventDefault);
        }
    }    

    updateImage = (imgId) => {
        this.imgId = imgId;
        this.clearGrids();
        this.setState({progress: 0, isReadyForSubmit: false});
        this.coordinates = [];
        const canvas = document.querySelector('canvas');
        canvas.style.background = 'url(https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif) no-repeat center'; 
        Utilities.getImageBg(canvas, this.imgId);
    }
    
    handleImageSubmit = () => { 
        let coordArray = [];
        this.coordinates.forEach(subArray => subArray.forEach(element => coordArray.push(element)));
        let salt = CryptoJS.HmacSHA1(this.state.userName, this.imgId.toString()).toString();        
        let hashedCoordinates = CryptoJS.HmacSHA1(coordArray.toString(), salt).toString();        
        let data = {
            userName: this.state.userName,            
            coordHash: hashedCoordinates
        }                
        Utilities.loginByImgCoords(data, this.clearPoints);
    }    

    toggleGrids = (color) => {        
        if(this.state.showGrids) this.clearGrids();
        else this.drawGrids(color);
    }

    clearGrids = () => {
        const canvas = document.querySelector('canvas');
        DrawUtil.clearGrids(canvas);
        this.setState({showGrids: false});
    }

    clearPoints = () => {
        this.setState({progress: 0, isReadyForSubmit: false});
        this.coordinates=[];
    }    

    drawGrids = (color) => {
        const canvas = document.querySelector('canvas');
        DrawUtil.drawGrids(canvas, color);
        this.setState({showGrids: true});
    }

    handleSubmit = () => {        
        if (!this.regex.test(this.state.userName)) {
            this.showError(constants.errors.INVALID_USERNAME);
            return;
        }
        if (this.state.logInByPassword && !this.regex.test(this.state.pwd)){
            this.showError(constants.errors.INVALID_USERNAME_OR_PASSWORD);
            return;
        }
        Utilities.checkIfUserExists(this.state.userName, () => {
            this.setState({toggleForm: true})
        }, () => {
            this.showError(constants.errors.USER_NOT_FOUND);
        }, this.updateImage);
    };
    
    handleSubmitWithPassword = () => {        
        if (!this.regex.test(this.state.userName)) {
            this.showError(constants.errors.INVALID_USERNAME);
            return;
        }
        if (this.state.logInByPassword && !this.regex.test(this.state.pwd)){
            this.showError(constants.errors.INVALID_USERNAME_OR_PASSWORD);
            return;
        }        
        let data = {
            userName: this.state.userName,            
            password: CryptoJS.HmacSHA1(this.state.pwd, this.state.userName).toString()
        }                
        Utilities.loginByPassword(data, () => {
            this.showError(constants.errors.INCORRECT_USERNAME_OR_PASSWORD)
        }, () => {
            this.showError(constants.errors.MAX_ATTEMPTS)
        });
    };
    
    showError = (errorMessage) => {
        this.setState({ errorMessage: errorMessage, errorShow: true }, () => {
            setTimeout(() => {
                this.setState({ errorShow: false });
            }, constants.errorMessageTimeout)
        });
    }

    showPointsError = () => {
        this.setState({ pointsErrorShow: true }, () => {
            setTimeout(() => {
                this.setState({ pointsErrorShow: false });
            }, constants.errorMessageTimeout)
        });
    }

    render() {
        return (
            <div className="container pt-4 pb-5">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 col-12" style={{ display: this.state.toggleForm ? "none" : "block" }}>
                        <Card>                        
                            <Alert
                                style={{ display: this.state.errorShow ? "block" : "none" }}
                                variant={"danger"}>
                                {this.state.errorMessage}
                            </Alert>
                            <Form onSubmit={this.handleSubmit} >
                                <Row className="mb-3 p-xl-5 p-lg-5 p-md-5 p-sm-5 p-0">                                    
                                    <Form.Group className="pb-3" controlId="validationCustomUsername">
                                        <Form.Label>Username</Form.Label>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                placeholder="John@123"
                                                aria-describedby="inputGroupPrepend"
                                                onChange={(e) => {
                                                    this.setState({ userName: e.target.value })
                                                }}
                                                minLength="10"
                                                required
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className="pb-3" controlId="validationPassword" style={{ display: this.state.logInByPassword ? "block" : "none"}}>
                                        <Form.Label>Password</Form.Label>
                                        <InputGroup hasValidation>
                                            <Form.Control
                                                type="password"
                                                placeholder="Password"
                                                aria-describedby="inputGroupPrepend"
                                                onChange={(e) => {
                                                    this.setState({ pwd: e.target.value })
                                                }}
                                                minLength={10}
                                                required
                                            />
                                        </InputGroup>
                                    </Form.Group>                                    
                                </Row>
                                <Row>
                                <div className="float-left col-6">
                                <Button className="mb-5" onClick={() => {this.setState({logInByPassword: !this.state.logInByPassword})}}>
                                    {this.state.logInByPassword ? "Use Image" : "Use Password"}
                                </Button>
                                </div>
                                <div className="float-right col-6">
                                    {this.state.logInByPassword ? 
                                    <Button className="mb-5" variant="success" onClick={this.handleSubmitWithPassword}>Submit</Button> : 
                                    <Button className="mb-5" variant="success" onClick={this.handleSubmit}>Submit</Button>}      
                                </div></Row>
                            </Form>
                        </Card>
                    </div>
                </div>                                
                <center style={{display: this.state.toggleForm ? "block" : "none"}}>
                    <Alert
                        style={{ display: this.state.pointsErrorShow ? "block" : "none" }}
                        variant={"danger"}>
                        Only 5 points can be selected, you've selected 5 points already, please submit to continue.
                    </Alert>                    
                    <canvas className="row justify-content-center" style={{                    
                        width: "1001px",
                        background: 'url(https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif) no-repeat center center',
                        height: "601px",                        
                        border: "1px solid black"                        
                    }}></canvas>
                    <div className="row pt-4 justify-content-center">
                        <div className="col-2 pt-1">
                            <Button variant="primary" onClick={() => {this.toggleGrids("grey")}}>
                                {this.state.showGrids ? "Hide" : "Show"} Grids
                            </Button>                            
                            <div className="pt-2" style={{display: this.state.showGrids ? "block" : "none"}}>
                                <input onChange={(e) => {this.drawGrids(e.target.value)}} title="Grid Color" type="color"></input>                            
                            </div>
                        </div>     
                        <div className="col-2 pt-1">
                            <Button variant="secondary" onClick={() => {this.setState({toggleForm: false, logInByPassword: true})}}>
                                Use Password
                            </Button>
                        </div>                          
                        <div className="col-2 pb-2">
                            Points Selection {this.state.progress}%
                            <ProgressBar animated variant={this.state.progressvariant} now={this.state.progress} />                            
                        </div>
                        <div className="col-2 pt-1">
                            <Button variant="warning" onClick={this.clearPoints}>
                                Clear
                            </Button>
                        </div>                        
                        <div className="col-2 pt-1">
                            <Button variant="success" onClick={this.handleImageSubmit} disabled={!this.state.isReadyForSubmit}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </center>                               
            </div>
        );
    }
}

export default Login;