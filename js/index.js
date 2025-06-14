document.getElementById("refresh")
.addEventListener('click', fetchContacts);
document.getElementById("addContact")
.addEventListener('click', addContact);

function fetchContacts() {
  fetch(rootPath + "controller/get-contacts/")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      displayOutPut(data);
    });
}

function displayOutPut(data) {
  //console.log(data);
  let contactTable = "<table>";
//loop aternative for(a in data)
  for(let i=0;i < data.length; i++) {
    //console.log(data[i]);
    contactTable += `
    <tr onclick="editContact(${data[i].id})">
      <td><img src="${rootPath}/controller/uploads/${data[i].avatar}"></td>
      <td><h5>${data[i].firstname}</h5></td>
      <td><h5>${data[i].lastname}<h5></td>
    </tr>
    `
  }
  contactTable += "</table>";
  document.getElementById('table')
  .innerHTML = contactTable;
}

function addContact() {
  window.open('add-contact-form.html', '_self');
}
function editContact(id) {
  window.open('edit-contact.html?id='+ id, '_self');
}
