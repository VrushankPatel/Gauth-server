import urllib
import pyrebase

print("vrushank")

# setting up firebase
firebaseConfig = {"apiKey": "AIzaSyDVMwQaCF_oTnoVIltZNuN3NjV4ruiRdEk",
                  "authDomain": "gauth-x.firebaseapp.com",
                  "projectId": "gauth-x",
                  "storageBucket": "gauth-x.appspot.com",
                  "messagingSenderId": "447576731299",
                  "appId": "1:447576731299:web:d2a89198ba748d57fed916",
                  "measurementId": "G-B508ECM10L",
                  "databaseURL": ""}

firebase = pyrebase.initialize_app(firebaseConfig)

# define storage
storage = firebase.storage()

# upload a file
file = input("Enter the name of the file you want to upload to storage")
cloudfilename = input("Enter the name for the file in storage")
storage.child(cloudfilename).put(file)

# get url of the file we just uploaded
print(storage.child(cloudfilename).get_url(None))

# download a file
storage.child(cloudfilename).download("images/", "downloaded.txt")


# to read from the file
path = storage.child(cloudfilename).get_url(None)
f = urllib.request.urlopen(path).read()
print(f)
