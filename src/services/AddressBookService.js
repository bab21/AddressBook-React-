import axios from 'axios';

const ADDRESS_API_BASE_URL = "http://localhost:8080/addressbookservice";

class AddressBookService {

    getContacts(){
        console.log("service hit");
        return axios.get(ADDRESS_API_BASE_URL+'/');
    }
    createContact(contact){
        return axios.post(ADDRESS_API_BASE_URL+'/create', contact);
    }
}
export default new AddressBookService()