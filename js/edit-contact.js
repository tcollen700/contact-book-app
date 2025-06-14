const id = getId();
getContact(id);

document.getElementById("homeLink").addEventListener('click', homeLink);
getContact(id);
document.getElementById("editContant").addEventListener('click', editContact);
document.getElementById("deleteContact").addEventListener('click', deleteContact);

document.getElementById("submitForm").addEventListener('click', submitForm);


function getId() {
  const url = window.location.href;
  const pos = url.search("=");
  const id = url.slice(pos + 1);
  return id;
}

function getContact() {
  fetch(rootPath + 'controller/get-contacts/?id=' + id)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    displayContactInfo(data);
  })
}

function displayContactInfo(data) {
  document.getElementById("avatarImage").innerHTML = `
  <img src="${rootPath}controller/uploads/${data[0].avatar}">
  `
  document.getElementById("firstname").value = data[0].firstname;
  document.getElementById("lastname").value = data[0].lastname;
  document.getElementById("mobile").value = data[0].mobile;
  document.getElementById("email").value = data[0].email;
}

function editContact() {
  document.getElementById("firstname").readOnly = false;
  document.getElementById("lastname").readOnly = false;
  document.getElementById("mobile").readOnly = false;
  document.getElementById("email").readOnly = false;
  document.getElementById("SelectAvatar").hidden = false;
  document.getElementById("avatar").hidden = false;
  document.getElementById("submitForm").hidden = false;
  document.getElementById("deleteContact").hidden = true;
  document.getElementById("editContant").hidden = true;
  document.querySelector("h2").innerHTML = 'Edit contact';
}

function homeLink() {
  window.open('index.html', '_self');
}

function submitForm(e) {
  e.preventDefault();
  const form = new FormData(document.getElementById("editForm"));
  form.append('apiKey', apiKey);
  form.append('id', id);
   fetch(rootPath + 'controller/edit-contact/', {
    method: 'post',
    headers: {'Accept': 'appliction/json, *.*'},
    body: form
  })
  .then(function(response){
    return response.text();
  })
  .then(function(data){
    if(data == 1) {
      alert("contact edited");
      homeLink();
    }else {
      alert(data);
      homeLink();
    }
  })
}

function deleteContact() {
  var confirmDelete = confirm("Are you sure?");
  
  if(confirmDelete == true) {
    fetch(rootPath + 'controller/delete-contact/?id=' + id)
    .then(function(response){
      return response.text();
    })
    .then(function(data){
      if(data == 1) {
        alert("contact deleted");
        homeLink();
      }else {
        alert(data);
        homeLink();
      }
    })
  }
}