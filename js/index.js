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
      sortByName();
    });
}

function displayOutPut(data) {
  let contactTable = "<table>";
  for(let i=0;i < data.length; i++) {
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

function sortByName() {
  fetch(rootPath + "controller/get-contacts/")
    .then(response => response.json())
    .then(data => {
      data.sort((a, b) => {
        const nameA = a.firstname.toLowerCase();
        const nameB = b.firstname.toLowerCase();
        return nameA.localeCompare(nameB);
      });
      displayOutPut(data);
    });
}