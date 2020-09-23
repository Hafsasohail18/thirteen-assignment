

var chat = document.getElementById("chat");

firebase.database().ref('chatApp').on('child_added',function(data){
    
    var li = document.createElement("li");
    var liMsg1 = document.createTextNode(data.val().username + " : ");
    var liMsg = document.createTextNode(data.val().value);
    li.setAttribute("class","chatMessages");

    li.appendChild(liMsg1);
    li.appendChild(liMsg);


    var deleteMsg = document.createElement("button");
    var btnText = document.createTextNode("✘");
    deleteMsg.setAttribute("class","deleteMsg");
    deleteMsg.setAttribute("id",data.val().key)
    deleteMsg.setAttribute("onclick","deleteMessage(this)");



    deleteMsg.appendChild(btnText)
    li.appendChild(deleteMsg)
    chat.appendChild(li);
})


let messages = () => {
    var message = document.getElementById("message");
    var database = firebase.database().ref('chatApp')
    var key = Math.random()*211;

    var chat = {
        username : userName.innerText,
        value : message.value,
        key : key.toFixed()
    }

    database.child(key.toFixed()).set(chat)
    message.value = " ";

    
}

 let deleteMessage = (button) => {
    firebase.database().ref('chatApp').child(button.id).remove()
    button.parentNode.remove()
    
}

const facebookLogin = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        var userName = document.querySelector("#userName")
        userName.innerHTML =  user.displayName;
        
        
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
}

const facebookSignout = () => {
  firebase.auth().signOut().then(function() {
    window.location = "logout.html";
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
      console.log(error)
    });
  }