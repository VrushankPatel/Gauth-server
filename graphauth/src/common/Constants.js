const constants = {
    regex: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"),
    errors: {
        INVALID_FIRSTNAME_LASTNAME: "FirstName and LastName can't be empty",
        INVALID_USERNAME_OR_PASSWORD: "Username and Password should be atlest 8 to 20 characters long and must contain one uppercase, lowercase, digit and a special character",
        INVALID_USERNAME: "Invalid Username",
        PASSWORD_MATCH: "Passwords doesn't match",
        USER_NOT_FOUND: "User not found.",
        INCORRECT_USERNAME_OR_PASSWORD: "Incorrect Username or Password."
    },
    errorMessageTimeout: 3000,
    fireStore: "https://firebasestorage.googleapis.com/v0/b/gauth-x.appspot.com/o/image.jpg?alt=media",
    apiIdentifier: "http://localhost:5000/api",
    // apiIdentifier: "https://gauth-server.herokuapp.com/api"
}
export default constants