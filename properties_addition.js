window.onload = showTime();

function showTime(){
  let time = new Date().toLocaleTimeString();
  let date = new Date().toLocaleDateString()
  document.getElementById("dateTime").innerHTML = time + " " + date
  setTimeout(showTime, 100);
};

const b3 = document.getElementById('b3');

b3.addEventListener("click", ()=>{
    const address = document.getElementById('property-address').value;
    const neighborhood = document.getElementById('property-neighborhood').value;
    const sqft = document.getElementById('property-square-feet').value;
    const parking = document.getElementById('property-parking').checked;
    const transportation = document.getElementById('property-transportation').checked;
    const visibility = true;
    if (address == '' || neighborhood == '' || sqft == '') {
      alert('Must enter all fields');
    } else {
      var properties = JSON.parse(localStorage.getItem('properties'));
      const email = JSON.parse(localStorage.getItem('user')).email;
      const id = Math.floor(Math.random() * 1000000);
      
        if (properties) {
          properties.push({
            id,
            address,
            neighborhood,
            sqft,
            parking,
            transportation,
            email,
            visibility
          });
      } 
        else {
          var properties = [
            {
              id,
              address,
              neighborhood,
              sqft,
              parking,
              transportation,
              email,
              visibility
            }
          ];
        }
        localStorage.setItem('properties', JSON.stringify(properties));
        alert('Property Added');
       window.location.href = 'properties_main.html';
    }
    });




if (LoggedIn()) {
  if (!asOwner()) {
    window.location.href = 'index_main.html';
  }
} else {
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
  if (JSON.parse(localStorage.getItem('user')).role == 'Co-worker') {
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