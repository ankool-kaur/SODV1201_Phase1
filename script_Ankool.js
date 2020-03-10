window.onload = showTime();

function showTime(){
  let time = new Date().toLocaleTimeString();
  let date = new Date().toLocaleDateString()
  document.getElementById("dateTime").innerHTML = time + " " + date
  setTimeout(showTime, 100);
};

const b1 = document.getElementById("signUp");
const ownerCheck = document.getElementById("ocheck");
const coCheck = document.getElementById("ccheck");
b1.addEventListener("click", () =>{
    const name = document.getElementById('sign-up').value;
    const email = document.getElementById('email-in').value;
    const phoneNumber = document.getElementById('sign-up-number').value;
    const password = document.getElementById('password-in').value;
    if (ownerCheck.checked == true){
      var role = "Owner"
    }
    else if(coCheck.checked == true){
      var role = "Co-Worker"
    }
    else {
      var role = undefined
    };
  
    if (role == undefined || name == '' || email == '' || phoneNumber == '') {
      alert('Must enter all fields');
    } else {
      var users = JSON.parse(localStorage.getItem('users'));
      if (users) {
        let emailExist = false;
        for (a = 0; a < users.length; a++) {
          if (users[a].email == email) {
            emailExist = true;
            break;
          }
        }
        if (emailExist) {
          alert('Email already exists');
        } else {
          users.push({
            name,
            email,
            phoneNumber,
            role,
            password
          });
        }
      } else {
        var users = [{ name, email, phoneNumber, role, password }];
      }
      localStorage.setItem('users', JSON.stringify(users));
      alert('Sign up successfull');
      window.location.href = 'login_main.html';
    }
  
});

if (LoggedIn()) {
    window.location.href = 'index_main.html';
  }

      function LoggedIn() {
  if (localStorage.getItem('user')) {
    return true;
  } else return false;
}

function asOwner() {
  if (JSON.parse(localStorage.getItem('user')).role == 'Owner') {
    return true;
  } else return false;
}

function asCoworker() {
  if (JSON.parse(localStorage.getItem('user')).role == 'Co-Worker') {
    return true;
  } else return false;
}

function navBar(text, page) {
  let navigation = document.getElementById('navbar');
  let a = document.createElement('a');
  a.setAttribute('href', page);
  let link = document.createTextNode(text);
  a.appendChild(link);
  navbar.appendChild(a);
}

window.onload = function() {
  if (LoggedIn()) {
    if (asOwner()) {
      navBar('Home', 'index_main.html');
      navBar('Add New', 'property_addition.html');
      navBar('My Properties', 'properties_main.html');
      navBar('My Workspaces', 'workspace_main.html?name='+ (JSON.parse(localStorage.getItem('user')).name));
    } else {
      navBar('Home', 'index_main.html');
      navBar('All Workspaces', 'workspace02_main.html');
      navBar('search-area', 'find_main.html');
    }
    navBar('Sign Out', 'signOut_main.html');
  } else {
    navBar('Home', 'index_main.html');
    navBar('Signup', 'signIn_main.html');
    navBar('Login', 'login_main.html');

  }
};