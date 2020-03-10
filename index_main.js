window.onload = showTime();

function showTime(){
  let time = new Date().toLocaleTimeString();
  let date = new Date().toLocaleDateString()
  document.getElementById("dateTime").innerHTML = time + " " + date
  setTimeout(showTime, 100);
};

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
