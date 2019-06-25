// Register service worker.
if ('serviceWorker' in navigator) {
window.addEventListener('load', () => {
navigator.serviceWorker.register('/service-worker.js')
    .then((reg) => {
      //Service Worker registered successfully
      console.log('Service worker registered.', reg);
      //REGISTERING BACKGROUND SYNC
      return reg.sync.register('formDataSync').then(() =>{
        console.log("sync registered")
      })
      .catch(() =>{
        //sync failed
        console.log("sync error")
      })
    }, function(err){
      //Registration failed
       console.log('ServiceWorker registration failed: ', err);
    }
  );
});
}
//function to post form data to API
document.getElementById('myform').addEventListener("submit",postData);
function postData(event){
  event.preventDefault();

  let Name = document.getElementById('Name').value;
  var name = nameSeperate(Name);
  let FirstName = name.firstName;
  let LastName = name.lastName;
  let Email = document.getElementById('Email').value;
  let PhoneNumber = document.getElementById('Number').value;
  let JobTitle = document.getElementById('JobTitle').value
  let Address = document.getElementById('Address').value
  var data = {
    FirstName:FirstName,
    LastName:LastName,
    JobTitle:JobTitle,
    Email:Email,
    PhoneNumber:PhoneNumber,
    Address:Address
  }
var msg = {
  'form_data': data
}
navigator.serviceWorker.controller.postMessage(msg)

    fetch('https://kt-dev.outsystemscloud.com/PWABack/rest/EmployeeDetail/Create',{
          method:'POST',
          headers :{

            'Content-Type': 'application/json',
          },

          body:JSON.stringify({
            FirstName:FirstName,
            LastName:LastName,
            JobTitle:JobTitle,
            Email:Email,
            PhoneNumber:PhoneNumber,
            Address:Address
          })
  }).then((res) => res.json())
    .then((data) => {console.log(data)
      window.location.href  = ("/details.html")
    })
    .catch((err) => {console.log(err)
      window.location.href  = ("/details.html")
    })
}
//seperating firstname and last name returns object with first name and last name
function nameSeperate(name){
  if(name.charAt(0)=== " "){
    alert('no spaces before name')
    return;
  }
  for(var i =0;i<name.length;i++){
    if(name.charAt(i) === " "){
      var first = name.slice(0,i);
      var last = name.slice(i,name.length);
    }
  }
  var newName = {firstName:first,lastName:last}
  return (newName);

}
/*var myindex = sessionStorage.getItem('index')
  alert(myindex);
  if (typeof myindex !== "undefined" || typeof myindex == null) {
    alert("something is undefined");
    sessionStorage.removeItem('index')
}*/
