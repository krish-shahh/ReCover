// Initialize Firebase (ADD YOUR OWN DATA)
var config = {
  apiKey: "AIzaSyBTXau4kL7Z2rz3CcDsaR9ewkM_OkUooL0",
  authDomain: "protestsite.firebaseapp.com",
  databaseURL: "https://protestsite-default-rtdb.firebaseio.com",
  projectId: "protestsite",
  storageBucket: "protestsite.appspot.com",
  messagingSenderId: "610238828062"
};
firebase.initializeApp(config);

document.getElementById('profile').addEventListener('change', (event) => {
  const file = event.target.files[0];
  const storageRef = firebase.storage().ref('images/' + file.name);

  storageRef.put(file).on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(progress);
      const progressBar = document.getElementById('progress_bar');
      progressBar.value = progress;
  });

  storageRef.getDownloadURL().then(function(url){
    const image = document.getElementById('image');
    console.log(url);
    image.src = url
  });
});

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
/*
function uploadFile() {
  const ref = firebase.storage().ref();
  const file = document.querySelector("#profile").files[0];
  const imageName = new Date() + '-' + file.name
  const metadata = {
    contentType: file.type
  }
  const task = ref.child(imageName).put(file,metadata)

  task
    .then(snapshot => snapshot.ref.getDownloadURL())
}
*/

function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var location = getInputVal('location');
  var email = getInputVal('email');
  var years = getInputVal('years');
  var history = getInputVal('history');
  var profile = getInputVal('profile');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, location, email, years, history, profile, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, location, email, years, history, profile, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    location:location,
    email:email,
    years:years,
    history:history,
    profile:profile,
    message:message
  });
}