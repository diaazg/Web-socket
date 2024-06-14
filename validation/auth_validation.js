
isValidUserData =(userData)=>{
    if (!userData || typeof userData !== 'object') {
      return false;
    }
  
    const { username, password ,email} = userData;
    if (typeof username !== 'string' || typeof password !== 'string' || !isValidEmail(email)) {
      return false;
    }
  
    return true;
  }

function isValidEmail(email) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }  

module.exports={
    isValidUserData
}  