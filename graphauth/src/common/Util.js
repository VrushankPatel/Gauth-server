import constants from "./Constants";
var axios = require('axios');

const Utilities = {
    getImageBg: async (canvas, imgId) => {
        var config = {
            method: 'POST',
            url: constants.apiIdentifier + "/getImage/" + imgId
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
    }
}
export default Utilities