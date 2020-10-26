import * as React from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
export interface IValues {
    first_name: string,
    email: string,
    phone: string,
}
export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}
class CreateContact extends React.Component<RouteComponentProps, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            first_name: '',
            email: '',
            phone: '',
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }
    //add new Contact throw Post and back to home page 
    private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        this.setState({ loading: true });
        const formData = {
            first_name: this.state.first_name,
            email: this.state.email,
            phone: this.state.phone,
        }
        this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });
        axios.post(`http://localhost:5000/contacts`, formData).then(data => [
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        ]);
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }
    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <MDBContainer className="CreatePage">
                  <MDBRow className="PageTitle">
                    <p className="font-lg">Add New Contact</p>
                </MDBRow>
                <MDBRow>
                    <MDBCol>

                        <form id={"create-post-form"} onSubmit={this.processFormSubmission}>
                        {submitSuccess && (
                                <div className="alert alert-info" role="alert">
                                    New Contact Add sucssfully
                                </div>
                            )}
                            <div className="form-group col-md-12">

                                <div className="field">
                                    <label htmlFor="first_name">Name</label>
                                    <input type="text" id="first_name" onChange={(e) => this.handleInputChanges(e)} name="first_name" className="form-control" placeholder="Your Name" required />
                                </div>
                                <div className="field">
                                    <label htmlFor="email">E-mail</label>
                                    <input type="email" required id="email" onChange={(e) => this.handleInputChanges(e)} name="email" className="form-control" placeholder="Ex:name@email.com" />
                                </div>
                                <div className="field">
                                    <label htmlFor="phone"> Phone</label>
                                    <input type="tel" pattern="[0-9]{11}" id="phone" onChange={(e) => this.handleInputChanges(e)} name="phone" className="form-control" placeholder="Ex: 010 000 0000" />
                                </div>
                                <button className="btn saveBtn" type="submit">
                                    Add Contact
                        </button>
                            </div>
                        </form>

                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}
export default withRouter(CreateContact)