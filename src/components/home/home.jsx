import React, {Component} from 'react'
import './home.scss';
// import logo from '../../assets/images/logo.png';
// import searchIcon from '../../assets/icons/search_icon.svg'

import deleteIcon from '../../assets/icons/delete-black-18dp.svg';
import updateIcon from '../../assets/icons/create-black-18dp.svg'
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
    }

    componentWillMount(){
        console.log("calling");

        AddressBookService.getContacts().then((res) => {
            console.log(res);
            console.log("message : "+res.message);
            console.log(res.data.data);
            this.setState({ contacts: res.data.data});
            this.setState({ allContacts: res.data.data});
        })
        .catch(err => console.log(err));
        console.log("all" +this.state.contacts);
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
                        Person Details <div class="person-count">10</div>
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
                                        <img id={contact._id}  alt="delete"
                                                src={deleteIcon}/>
                                        <img id={contact._id} alt="edit" 
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