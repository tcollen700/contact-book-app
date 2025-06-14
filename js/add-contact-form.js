document.getElementById("submitForm").addEventListener('click', submitForm);
document.getElementById("homeLink").addEventListener('click', homeLink);

function submitForm(e) {
  e.preventDefault();
  
  const form = new FormData(document.getElementById("editForm"));
  form.append('apiKey', apiKey);
  
  fetch(rootPath + 'controller/insert-contact/', {
    method: 'post',
    headers: {'Accept': 'appliction/json, *.*'},
    body: form
  })
  .then(function(response){
    return response.text();
  })
  .then(function(data){
    if(data == 1) {
      alert("Contact added");
      homeLink();
      console.log(data)
    }else {
      alert(data);
      homeLink();
    }
  })
}

function homeLink() {
  window.open('index.html', '_self');
}