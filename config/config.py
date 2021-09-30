def getFirebaseConfig(pyrebase):
    firebaseConfig = {"apiKey": "AIzaSyDVMwQaCF_oTnoVIltZNuN3NjV4ruiRdEk",
                      "authDomain": "gauth-x.firebaseapp.com",
                      "projectId": "gauth-x",
                      "storageBucket": "gauth-x.appspot.com",
                      "messagingSenderId": "447576731299",
                      "appId": "1:447576731299:web:d2a89198ba748d57fed916",
                      "measurementId": "G-B508ECM10L",
                      "databaseURL": ""}

    firebase = pyrebase.initialize_app(firebaseConfig)

    return firebase
