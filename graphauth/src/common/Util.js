import constants from "./Constants";
var axios = require('axios');

var generateHexString = (length) => {
    var ret = "";
    while (ret.length < length) {
      ret += Math.random().toString(16).substring(2);
    }
    var xstr = ret.substring(0,length);    
    xstr = [xstr.slice(0, 22), String(length)[0], xstr.slice(22)].join('');
    xstr = [xstr.slice(0, 44), String(length)[1], xstr.slice(44)].join('');
    return xstr;
  }
const Utilities = {    
    getImageBg: async (canvas, imgId) => {
    let randomNum = Math.floor(Math.random() * (99 - 50) + 50);    
        var config = {
            method: 'POST',
            url: constants.apiIdentifier + "/getImage/" + imgId + "?x-token=" + generateHexString(randomNum),
            data: JSON.stringify({"x-token": generateHexString(randomNum)}),                        
        };
        await axios(config)
            .then(function (response) {                                           
                canvas.style.background = 'url(' + response['data']['image'] + ') no-repeat center center';                
                canvas.style.backgroundSize= "cover";                
            })
            .catch(function (error) {
                canvas.style.background = 'url(https://firebasestorage.googleapis.com/v0/b/gauth-x.appspot.com/o/imgError.png?alt=media) no-repeat center center';
                canvas.style.backgroundSize= "cover";
            });
    },
    signUp: (data,toggleForm, showSuccessInsertAlert) => {        
        var record = JSON.stringify({"firstName":data.firstName,"lastName":data.lastName,"userName":data.userName,"password":data.password,"imgId":data.imgId,"coordHash":data.coordHash});        
        var config = {
        method: 'post',
        url: constants.apiIdentifier + '/signup',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : record
        };        
        axios(config)
        .then(function (response) {             
            if (response.status === 200){                
                showSuccessInsertAlert();                
            }
        })
        .catch(function (error) {
            if (error.response.status === 409){
                toggleForm("UserName already Exists..");
            }
            if (error.response.status === 500){
                toggleForm("Error while processing your data, please try again later");
            }
        });
    },
    checkIfUserExists: (userName, toggleForm, showUserNotFoundError, updateImage) => {
        var config = {
            method: 'post',
            url: constants.apiIdentifier + '/checkIfUserExists/' + userName            
          };          
          axios(config)
          .then(function (response) {
              let imgId = parseInt(response.data['imgId']);
                updateImage(imgId);                
                toggleForm();
          }).catch(function (error) {
              if(error.response.status === 404){
                showUserNotFoundError();
              }
          });          
    },
    loginByImgCoords: (data, clearPoints) => {
        data = JSON.stringify(data);
        var config = {
        method: 'post',
        url: constants.apiIdentifier + '/login',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };
        axios(config)
        .then(function (response) {
            document.write("<h1>Welcome to NYIT</h1>");        
        })
        .catch(function (error) {
            if (error.response.status === 403){
                alert("Incorrect points selections, please select the points again..");
                clearPoints();
            }else if(error.response.status === 500){
                alert("Unknown error occured, please try again later!");
            }else if(error.response.status === 423){
                alert(constants.errors.MAX_ATTEMPTS);
            }
        });
    },
    loginByPassword: (data, pwdIncorrectError, maxAttemptsError) => {
        data = JSON.stringify(data);
        var config = {
        method: 'post',
        url: constants.apiIdentifier + '/login',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };
        axios(config)
        .then(function (response) {
            document.write("<h1 class='jumbotron'>Welcome to NYIT</h1>");        
        })
        .catch(function (error) {
            if(error.response.status === 423){
                maxAttemptsError();                
                return;
            }
            pwdIncorrectError();
        });
    }
}
export default Utilities