import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import ContactItem from './coreComponents/contactItem';
import { MDBContainer, MDBBtn, MDBIcon, MDBRow, MDBInput, } from 'mdbreact';
import { isLet } from '@babel/types';


interface IState {
    contacts: any[];
    data: [],
    searchView: boolean,
    id: number,
    filteredContacts: any[],
    distnictItems: any[],
    searchContacts: any[]
    showAll: boolean,
    searchQuery: string,
    selecteditem: string

}
export default class Home extends React.Component<RouteComponentProps<any>, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            contacts: [],
            searchContacts: [],
            data: [],
            searchQuery: '',
            id: this.props.match.params.id,
            filteredContacts: [],
            distnictItems: [],
            showAll: true,
            searchView: false,
            selecteditem: ''
        }

    }
    //Get All contacts 
    public componentDidMount(): void {
        axios.get(`http://localhost:5000/contacts`).then(data => {

            this.setState({ contacts: data.data })
            //array.filter((item, index) => array.indexOf(item) === index);
            const names = this.state.contacts.map(n => n.first_name[0]).filter((v, i, a) => a.indexOf(v) === i).sort(function (a, b) {
                return a.localeCompare(b);
            });
            this.setState({ distnictItems: names })
        })

    }
    //filter Conatct list based on click on char
    public filterContact(filterstr: string) {
        this.setState({ selecteditem: filterstr })
        const resu = this.state.contacts.filter(contact => contact.first_name[0] == filterstr);
        this.setState({ filteredContacts: resu, showAll: false })


    }
    //change flag of show all to be true to update contactitem to diplay all contacts
    public showAllContact() {
        this.setState({ showAll: true, selecteditem: '' })
    }
    //search func take search value from search box and search on Contact list
    public searchContact(searchvalue: string) {
        let searchCon = this.state.contacts;
        if (searchCon.length > 0) {
            let searchlist = searchCon.filter(item => item.first_name.includes(searchvalue));
            this.setState({ searchContacts: searchlist, searchView: true, showAll: false });
        }
        if (searchvalue == '') {
            this.setState({ showAll: true, searchView: false })
        }

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
                    <MDBRow className="searchBoxContainer">
                        <input className="form-control searchBox" type="text" placeholder="Search" aria-label="Search" onChange={e => this.searchContact(e.target.value)} />
                    </MDBRow>
                    <MDBRow className="PageTitle">
                        <p className="font-lg">Contacts</p>
                    </MDBRow>
                    <MDBRow className="text-center contactFilter">

                        {this.state.distnictItems && this.state.distnictItems.map(name =>
                            <button key={name[0] + '_L'} id={name[0]} className="btn contactFilterItem" onClick={() => this.filterContact(name[0])
                            }>
                                <span className={this.state.selecteditem == name[0] ? 'active' : ''}>{name[0]}</span></button>
                        ,
                        )
                        }
                        {!this.state.showAll &&

                            <button className="btn contactFilterItem " onClick={() => this.showAllContact()}>
                                <span className="font-lg charItemAll">*</span></button>
                        }
                    </MDBRow>

                    <>
                        {this.state.showAll ? contacts.map(contact =>
                            <ContactItem
                                name={contact.first_name}
                                email={contact.email}
                                phone={contact.phone}
                                id={contact.id}
                                key={contact.id}
                            />
                     ,
                        )
                            :
                            <>
                                {this.state.searchView ?
                                    this.state.searchContacts.map(contact =>
                                        <ContactItem
                                            name={contact.first_name}
                                            email={contact.email}
                                            phone={contact.phone}
                                            id={contact.id}
                                            key={contact.id}
                                        />
                                ,)
                                    :
                                    this.state.filteredContacts.map(contact =>
                                        <ContactItem
                                            name={contact.first_name}
                                            email={contact.email}
                                            phone={contact.phone}
                                            id={contact.id}
                                            key={contact.id}
                                        />
                        ,)
                                }
                            </>
                        }
                    </>
                </MDBContainer>

            </div>
        )
    }
}