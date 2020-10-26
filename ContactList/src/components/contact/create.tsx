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
class Create extends React.Component<RouteComponentProps, IFormState> {
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
                <MDBRow>
                    <MDBCol>

                        <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                        {submitSuccess && (
                                <div className="alert alert-info" role="alert">
                                    New Contact Add sucssfully
                                </div>
                            )}
                            <div className="form-group col-md-12">

                                <div className="field">
                                    <label htmlFor="first_name">Name</label>
                                    <input type="text" id="first_name" onChange={(e) => this.handleInputChanges(e)} name="first_name" className="form-control" placeholder="Enter name" />
                                </div>
                                <div className="field">
                                    <label htmlFor="email">E-mail</label>
                                    <input type="email" id="email" onChange={(e) => this.handleInputChanges(e)} name="email" className="form-control" placeholder="Enter Email" />
                                </div>
                                <div className="field">
                                    <label htmlFor="phone"> Phone</label>
                                    <input type="text" id="phone" onChange={(e) => this.handleInputChanges(e)} name="phone" className="form-control" placeholder="Enter phone" />
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
export default withRouter(Create)