import './address-book-form.css';

import {useParams,Link,withRouter} from 'react-router-dom';
import AddressBookService from '../../services/AddressBookService';
import addressBookIcon from '../../assets/icons/address_book_icon.jpg';
import cancelIcon from '../../assets/icons/cancel.jpg';
import React, {Component} from 'react'


class AddressBookForm extends Component{
    constructor(props){
        super(props)

        this.state={
            id: this.props.match.params.id,
            fullName: '',
            address: '',
            city: '',
            state: '',
            phoneNumber: '',
            zip: '',
            
        }
        this.changeNameHandler=this.changeNameHandler.bind(this);
        this.changeAddressHandler =this.changeAddressHandler.bind(this);
        this.changeCityHandler =this.changeCityHandler.bind(this);
        this.changeStateHandler=this.changeStateHandler.bind(this);
        this.changePhoneNumberHandler=this.changePhoneNumberHandler.bind(this);
        this.changeZipCodeHandler=this.changeZipCodeHandler.bind(this);
    }
    componentWillMount(){
           
    }
    changeNameHandler =(event)=>{
        this.setState({fullName:event.target.value});
    }
    changeAddressHandler =(event)=>{
        this.setState({address:event.target.value});
    }
    changeCityHandler =(event)=>{
        this.setState({city:event.target.value});
    }
    changeStateHandler =(event)=>{
        this.setState({state: event.target.value});
    }
    changePhoneNumberHandler =(event)=>{
        this.setState({phoneNumber: event.target.value});
    }
    changeZipCodeHandler =(event)=>{
        this.setState({zip: event.target.value});
    }
    saveOrUpdateContact = async(event) => {
        console.log("called saved");
        event.preventDefault();
        
            let contact = {
                fullName: this.state.fullName,
                address: this.state.address,
                city: this.state.city,
                state: this.state.state,
                phoneNumber: this.state.phoneNumber,
                zip: this.state.zip,
            };
            console.log('contact => ' + JSON.stringify(contact));
            AddressBookService.createContact(contact);
            // if(this.state.id === '_add'){
            //     AddressBookService.createContact(contact).then(res =>{
            //         this.props.history.push('/home');
            //     });
            // }
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
                <div class ="form-content">
                    <form class ="form" action="#">
                        <div class ="form-head">
                            <div class="form-header-text">PERSON ADDRESS FORM</div>
                            <div class="cancel-button"><a href="./address_book_home.html"><img src={cancelIcon} alt=""/></a></div>
                        </div>
                        <div class="row-content">
                            <label class="label text" for="fullName">Full Name</label>
                            <input class="input" type="text" id="fullName" onChange={this.changeNameHandler}  name="fullName" placeholder="Enter Your Full Name" required/>
                            <error-output class="text-error" for="text"></error-output>
                        </div>
                        <div class="row-content">
                            <label class="label text" for="address">Address</label>
                            <input class="input address-input" type="text" onChange={this.changeAddressHandler} id="address" placeholder="Address" required/>
                            <error-output class ="address-error" for="text"></error-output>
                        </div>
                        <div class="select-input-fields">
                            <label class="label text" for="city" >City</label>
                            <select id="city" name="city" value={this.state.city} onChange={this.changeCityHandler}>
                                <option value="Patna">Patna</option>
                                <option value="AArah">Aarah</option>
                                <option value="Buxar">Buxar</option>
                                <option value="Kanpur">Kanpur</option>
                                <option value="Lucknow">Lucknow</option>
                                <option value="Allahabad">Allahabad</option>
                            </select>
                            <label class="label-text-select" for="state">State</label>
                            <select id="state" name="state" value={this.state.state} onChange={this.changeStateHandler}>
                                <option value="Bihar">Bihar</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                <option value="Madhya Pradesh">Madhya Pradesh</option>
                                <option value="Jharkhand">Jharkhand</option>
                                <option value="West Bengal">West Bengal</option>
                                <option value="Orissa">Orissa</option>
                            </select>
                            <label class="label-text-select" for="zip">Zip Code</label>
                            <input class="input" type="text" id="zipCode" name="zipCode" onChange={this.changeZipCodeHandler} placeholder="Zip Code" required/>

                        </div>
                        <div class="row-content">
                            <label class="label text" for="phone">Phone Number</label>
                            <input class="input" type="text" id="tel" name="tel" onChange={this.changePhoneNumberHandler}  placeholder="Phone Number" required/>
                            <error-output class ="tel-error" for="text"></error-output>
                        </div>
                        <div class="buttonParent">
                            <div class="submit-reset">
                                <button type="submit" class="button submitButton" id="submitButton" onClick={this.saveOrUpdateContact}>Add</button>
                                <button type="reset" class="button resetButton">Reset</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(AddressBookForm)


