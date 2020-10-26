import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import ContactItem from './coreComponents/contactItem';
import { MDBContainer, MDBBtn, MDBIcon, MDBRow } from 'mdbreact';
import { Icon } from 'semantic-ui-react';

interface IState {
    contacts: any[];
    query: '',
    data: [],
    id: number,
    res: any[]
}
export default class Home extends React.Component<RouteComponentProps<any>, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            contacts: [],
            query: '',
            data: [],
            id: this.props.match.params.id,
            res: []
        }
    }

    public componentDidMount(): void {
        axios.get(`http://localhost:5000/contacts`).then(data => {
            this.setState({ contacts: data.data })
        })
    }
    public filterContact() {

    }
    public render() {
        const contacts = this.state.contacts;
        return (
            <div>
                <MDBContainer className="HomePage">

                    <Link to={`create`} >
                        <button className="btn AddContactBtn">
                            <span>+</span>
                        </button>
                    </Link>
                    <MDBRow className="text-center contactFilter">
                        <button className="btn contactFilterItem" onClick={() => this.filterContact()}>
                            <span className="font-lg">A</span></button>
                        <button className="btn contactFilterItem" onClick={() => this.filterContact()}>
                            <span className="font-lg">N</span></button>
                        <button className="btn contactFilterItem" onClick={() => this.filterContact()}>
                            <span className="font-lg">B</span></button>
                    </MDBRow>
                    {contacts && contacts.map(contact =>
                        <ContactItem
                            name={contact.first_name}
                            email={contact.email}
                            phone={contact.phone}
                            Key={contact.id}
                        />,
                    )}
                </MDBContainer>

            </div>
        )
    }
}