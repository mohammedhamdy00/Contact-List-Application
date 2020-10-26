import * as React from 'react';
import { MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBFormInline, MDBIcon, MDBNavbarNav, MDBRow } from "mdbreact";
// import { Router } from 'react-router-dom';
import { BrowserRouter as Router, Link } from "react-router-dom";
class Header extends React.Component {

    
    public render() {
        return (

            <MDBContainer>
                <div className="headerContainer">
                    <MDBRow>
                        <MDBCol >
                            <Link to={`/`} >
                                <img src={require('../Assets/imgs/logo.svg')} className="logo" alt="logo" />
                            </Link>
                        </MDBCol>
                    </MDBRow>
                </div>
            </MDBContainer>


        )
    }
}
export default Header