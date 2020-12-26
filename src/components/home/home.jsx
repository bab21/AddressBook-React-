import React, {Component} from 'react'
import './home.scss';
import deleteIcon from '../../assets/icons/delete-black-18dp.svg';
import updateIcon from '../../assets/icons/create-black-18dp.svg'
import searchIcon from '../../assets/icons/search_icon_1.svg'
import addressBookIcon from '../../assets/icons/address_book_icon.jpg';
import {useParams,Link,withRouter} from 'react-router-dom';
import AddressBookService from '../../services/AddressBookService'

class Home extends Component{
    constructor(props) {
        super(props)

        this.state = {
                contacts: [],
                allContacts: [],
        }
        this.deleteContact = this.deleteContact.bind(this);
        this.updateContact = this.updateContact.bind(this);
    }

    componentWillMount(){
        AddressBookService.getContacts().then((res) => {
            console.log(res);
            console.log("message : "+res.message);
            console.log(res.data.data);
            this.setState({ contacts: res.data.data});
            this.setState({ allContacts: res.data.data});
        })
        .catch(err => console.log(err));
    }
    search = async (event) => {
        let searchName = event.target.value;
        await this.setState({contacts: this.state.allContacts});
        let contactList = this.state.contacts;
        if (searchName.trim().length > 0)
        contactList = contactList.filter((contact) => 
              contact.fullName.toLowerCase().indexOf(searchName.toLowerCase()) > -1 );
        this.setState({ contacts: contactList });
    }

    deleteContact(id){
        AddressBookService.deleteContact(id).then( res => {
            let deletedContact =this.state.contacts.filter(contact => contact.id==id);
            this.setState({contacts: this.state.contacts.filter(contact => contact.id !== id)});
            alert("Contact Deleted :"+JSON.stringify(deletedContact));
        });
    }
    updateContact(id){
        this.props.history.push(`/add-contact/${id}`);
    }
    render(){
        return(
            <div>
                <header class="header-content header">
                    <div class="logo-content">
                        <img src={addressBookIcon} alt=""/>
                        <div>
                            <span class="address-text"> ADDRESS</span><br/>
                            <span class="address-text address-book"> BOOK</span>
                        </div>
                    </div>
                </header>
                <div class="main-content">
                <div class="header-content">
                    <div class="person-detail-text">
                        Person Details <div class="person-count">{this.state.contacts.length}</div>
                    </div>
                    <div class="search-box">
                             <input type="text" placeholder="Search Name" class="search-input" onChange={this.search} />
                             <img className="search-icon" src={searchIcon} alt="Search Icon" />
                    </div>
                    <Link to="/add-contact/_add" class="add-button">
                    <img src="../../assets/icons/add-24px.svg" alt=""/>Add Person</Link>
                </div>
                <div className="table-main">
                <table id="table-display" class="table">
                    <th>Fullname</th><th>Address</th><th>City</th><th>State</th><th>Zip Code</th><th>Phone Number</th><th>Actions</th>
                    {
                        this.state.contacts.map(
                            (contact,id) =>(
                                <tr>
                                    <td>{contact.fullName}</td>
                                    <td>{contact.address}</td>
                                    <td>{contact.city}</td>
                                    <td>{contact.state}</td>
                                    <td>{contact.zip}</td>
                                    <td>{contact.phoneNumber}</td>
                                    <td>
                                        <img class="clickableImage" id={contact.id}  alt="delete"  onClick={()=>this.deleteContact(contact.id)}
                                                src={deleteIcon}/>
                                        <img class="clickableImage" id={contact.id} alt="edit" onClick={()=>this.updateContact(contact.id)}
                                                src={updateIcon}/>   
                                    </td>
                                </tr>
                            )
                        )
                    }
                </table>
                </div>
            </div>
            </div>
        )
    }
}
export default withRouter(Home)