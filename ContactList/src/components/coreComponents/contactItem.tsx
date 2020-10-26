import * as React from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBFooter, MDBIcon, MDBRow } from "mdbreact";
import { Link } from 'react-router-dom';


interface IState {

}

interface IProps {
    name?: string,
    email?: string,
    phone?: number,
    Key?: number,
  
}
class ContactItem extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {

        }
    }
    
    public render() {
        const url =`/view/` + this.props.Key;
      // const url =`/view`;
        return (

            <MDBCol md='4' className="cardBox">
                <Link to={url}>
                <MDBCard>
                    <MDBCardTitle className='elegant-color white-text font-small text-center'>{this.props.name}</MDBCardTitle>
                    <MDBCardBody>

                        <MDBCardText className='text-center'>
                            <p className="font-small">{this.props.email}</p>
                            <p className="font-small">{this.props.phone}</p>
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
                </Link>
            </MDBCol>
        )
    }
}
export default ContactItem