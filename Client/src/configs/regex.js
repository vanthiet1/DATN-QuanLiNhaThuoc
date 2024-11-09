const regexPhoneNumber = (number)=>{
    const phoneRegex = /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$/;
    return phoneRegex.test(number);
}

export {
    regexPhoneNumber
}