import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
export interface IValues {
    [key: string]: any;
}
export interface IFormState {
    id: number,
    contact: any;
    contacts: any[],
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}
class ViewContact extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            contact: {},
            contacts: [],
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }
    //get contact by id 
    public componentDidMount(): void {
        axios.get(`http://localhost:5000/contacts/${this.state.id}`).then(data => {
            this.setState({ contact: data.data });
        })
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        axios.patch(`http://localhost:5000/contacts/${this.state.id}`, this.state.values).then(data => {
            this.setState({ submitSuccess: true, loading: false })
            setTimeout(() => {
                this.props.history.push('/');
            }, 1500)
        })
    }

    private setValues = (values: IValues) => {
        this.setState({ values: { ...this.state.values, ...values } });
    }
    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
    }
    //get contact id to delete Contact
    public deleteCustomer(id: number) {
        axios.delete(`http://localhost:5000/contacts/${id}`).then(data => {
            const index = this.state.contacts.findIndex(contact => contact.id === id);
            this.state.contacts.splice(index, 1);
            this.props.history.push('/');
        })
    }
    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <MDBContainer className="ViewPage">
                <MDBRow className="PageTitle">
                    <p className="font-lg">{this.state.contact.first_name}'s Profile</p>
                </MDBRow>
                <MDBRow>
                    <MDBCol >
                        <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                            {this.state.contact &&
                                <div>

                                    {submitSuccess && (
                                        <div className="alert alert-info" role="alert">
                                            Contacts details has been edited successfully </div>
                                    )}

                                    <div className="form-group">
                                        <div className="field">
                                            <label htmlFor="first_name">Name:</label>
                                            <p className="fieldValue">{this.state.contact.first_name}</p>
                                        </div>
                                        <div className="field">
                                            <label htmlFor="email">E-mail:</label>
                                            <p className="fieldValue">{this.state.contact.email}</p>
                                        </div>
                                        <div className="field">
                                            <label htmlFor="phone"> Phone:</label>
                                            <p className="fieldValue">{this.state.contact.phone}</p>
                                        </div>

                                        <button className="btn deleteBtn" onClick={() => this.deleteCustomer(this.state.id)}>Delete contact</button>
                                        <Link to={`edit/${this.state.id}`}>
                                            <button className="btn editBtn" > Edit contact </button></Link>

                                    </div>
                                </div>

                            }
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}
export default withRouter(ViewContact)