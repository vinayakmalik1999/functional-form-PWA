
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
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
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
