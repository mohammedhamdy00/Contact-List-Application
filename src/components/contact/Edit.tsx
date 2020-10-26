import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
export interface IValues {
    [key: string]: any;
}
export interface IFormState {
    id: number,
    contact: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}
class EditContact extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            contact: {},
            values: [],
            loading: false,
            submitSuccess: false,
        }
    }
    public componentDidMount(): void {
        axios.get(`http://localhost:5000/contacts/${this.state.id}`).then(data => {
            this.setState({ contact: data.data });
        })
    }
 //Edit Contact with Contact id
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
    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <MDBContainer className="EditPage">
                <MDBRow className="PageTitle">
                    <p className="font-lg">Edit {this.state.contact.first_name}'s Profile</p>
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
                                            <input type="text" id="first_name" defaultValue={this.state.contact.first_name} onChange={(e) => this.handleInputChanges(e)} name="first_name" className="form-control" placeholder="Enter Contact name" required/>
                                        </div>
                                        <div className="field">
                                            <label htmlFor="email">E-mail:</label>
                                            <input type="email" required  id="email" defaultValue={this.state.contact.email} onChange={(e) => this.handleInputChanges(e)} name="email" className="form-control" placeholder="Enter Contact's email " />
                                        </div>
                                        <div className="field">
                                            <label htmlFor="phone"> Phone:</label>
                                            <input type="tel" pattern="[0-9]{11}" id="phone" defaultValue={this.state.contact.phone} onChange={(e) => this.handleInputChanges(e)} name="phone" className="form-control" placeholder="Enter Contact phone " />
                                        </div>
                                        <button className="btn saveBtn" type="submit">
                                            Save Contact </button>
                                          
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
export default withRouter(EditContact)