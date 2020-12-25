export const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}([\\s][A-Z]{1}[a-z]{2,})?$');
    if (!nameRegex.test(name)) throw "Name is Incorrect!";
}

export const checkAddress = (address) => {
    let addressRegex = RegExp('^[a-zA-Z0-9@/,\\s]{2,}$');
    if (!addressRegex.test(address)) throw "Address is Incorrect!";
}

export const checkPhoneNumber =(phoneNumber) =>{
    let phoneRegex =RegExp('^[0-9]{1}[0-9]{9}$');
    if(!phoneRegex.test(phoneNumber)) throw "Phone Number is Incorrect!";
}
export const checkZip =(zip) =>{
    let zipRegex =RegExp('^[0-9]{6}$');
    if(!zipRegex.test(zip)) throw "Zip Code is Invalid";
}
