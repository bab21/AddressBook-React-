import './address-book-form.css';

import {useParams,Link,withRouter} from 'react-router-dom';
import AddressBookService from '../../services/AddressBookService';
import addressBookIcon from '../../assets/icons/address_book_icon.jpg';
import cancelIcon from '../../assets/icons/cancel.jpg';
import React, {Component} from 'react'
import { checkName,checkAddress,checkPhoneNumber,checkZip } from "./utility.js";



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
            nameError: '',
            addressError: '',
            phoneError: '',
            zipError: '',
            
        }
        this.changeNameHandler=this.changeNameHandler.bind(this);
        this.changeAddressHandler =this.changeAddressHandler.bind(this);
        this.changeCityHandler =this.changeCityHandler.bind(this);
        this.changeStateHandler=this.changeStateHandler.bind(this);
        this.changePhoneNumberHandler=this.changePhoneNumberHandler.bind(this);
        this.changeZipCodeHandler=this.changeZipCodeHandler.bind(this);
    }
    componentWillMount(){
        if(this.state.id === '_add'){
            return
        }else{
            AddressBookService.getContactById(this.state.id).then( (res) =>{
                let contact = res.data.data;
                console.log(contact);
                let OfullName= contact.fullName;
                let Oaddress= contact.address;
                let Ocity= contact.city;
                let Ostate= contact.state;
                let OphoneNumber=contact.phoneNumber;
                let Ozip= contact.zip;


                this.setState({fullName: OfullName,
                    address: Oaddress,
                    city: Ocity,
                    state: Ostate,
                    phoneNumber: OphoneNumber,
                    zip: Ozip
                });
            });
        } 
           
    }
    changeNameHandler =(event)=>{
        this.setState({fullName:event.target.value});
        try {
            checkName(event.target.value);
            this.setState({ nameError: "" });
        } catch (error) {
            this.setState({ nameError: error });
        }
    }
    changeAddressHandler =(event)=>{
        this.setState({address:event.target.value});
        try {
            checkAddress(event.target.value);
            this.setState({ addressError: "" });
        } catch (error) {
            this.setState({ addressError: error });
        }
    }
    changeCityHandler =(event)=>{
        this.setState({city:event.target.value});
    }
    changeStateHandler =(event)=>{
        this.setState({state: event.target.value});
    }
    changePhoneNumberHandler =(event)=>{
        this.setState({phoneNumber: event.target.value});
        try {
            checkPhoneNumber(event.target.value);
            this.setState({ phoneError: "" });
        } catch (error) {
            this.setState({ phoneError: error });
        }
    }
    changeZipCodeHandler =(event)=>{
        this.setState({zip: event.target.value});
        try {
            checkZip(event.target.value);
            this.setState({ zipError: "" });
        } catch (error) {
            this.setState({ zipError: error });
        }
    }
    allFieldCorrect =()=>{
        console.log(this.state);
        if(this.state.nameError!="")
        return false;
        if(this.state.addressError!="")
        return false;
        if(this.state.phoneError!="")
        return false;
        if(this.state.zipError!="")
        return false;
        if(this.state.fullName=="")
        return false;
        if(this.state.address=="")
        return false;
        if(this.state.phoneNumber=="")
        return false;
        if(this.state.city=="")
        return false;
        if(this.state.state=="")
        return false;
        if(this.state.zip=="")
        return false;


        return true;
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
            if(this.state.id === '_add'){
                AddressBookService.createContact(contact).then(res =>{
                    this.props.history.push('/home');
                });
            }else{
                AddressBookService.updateContact(contact, this.state.id).then( res => {
                    this.props.history.push('/home');
                });
            }

    }
    reset = (event) => {
        this.setState({
          fullName: "",
          address: "",
          city: "",
          state: "",
          phoneNumber:"",
          zip: "",
          nameError: "",
          addressError: "",
          phoneError: "",
          zipError: "",
        });
    };
    
    
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
                            <div class="cancel-button"><Link to="/home"><img src={cancelIcon} alt=""/></Link></div>
                        </div>
                        <div class="row-content">
                            <label class="label text" for="fullName">Full Name</label>
                            <input class="input" type="text" id="fullName" value={this.state.fullName} onChange={this.changeNameHandler}  name="fullName" placeholder="Enter Your Full Name" required/>
                            <error-output class="text-error" for="text">{this.state.nameError}</error-output>
                        </div>
                        <div class="row-content">
                            <label class="label text" for="address">Address</label>
                            <input class="input address-input" value={this.state.address} type="text" onChange={this.changeAddressHandler} id="address" placeholder="Address" required/>
                            <error-output class ="address-error" for="text">{this.state.addressError}</error-output>
                        </div>
                        <div class="select-input-fields">
                            <label class="label text" for="city" >City</label>
                            <select id="city" name="city" value={this.state.city}  onChange={this.changeCityHandler}>
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
                            <input class="input" type="text" id="zipCode" name="zipCode" value={this.state.zip} onChange={this.changeZipCodeHandler} placeholder="Zip Code" required/>
                            <error-output class ="zip-error" for="text">{this.state.zipError}</error-output>
                        </div>
                        <div class="row-content">
                            <label class="label text" for="phone">Phone Number</label>
                            <input class="input" type="text" id="tel" value={this.state.phoneNumber} name="tel" onChange={this.changePhoneNumberHandler}  placeholder="Phone Number" required/>
                            <error-output class ="tel-error" for="text">{this.state.phoneError}</error-output>
                        </div>
                        <div class="buttonParent">
                            <div class="submit-reset">
                                <button type="submit" class="button submitButton" id="submitButton" disabled={!this.allFieldCorrect()} onClick={this.saveOrUpdateContact}>Add</button>
                                <button type="reset" class="button resetButton" onClick={this.reset}>Reset</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(AddressBookForm)


