$.getJSON("https://kt-dev.outsystemscloud.com/PWABack/rest/EmployeeList/Get", function(data){

// function to create a new card
document.body.onload = cardsToCreate();

function createNewCard(i) {

$("<div class = column> <div class= card> <div class= container> <h2> "+ data[i].Name + "</h2> <p class= title>"+ data[i].Id +"</p> <p> (+1)" + data[i].PhoneNumber +"</p> <p>"+ data[i].Email+ " </p>  <p><button class= button>Edit Details</button></p> </div>  </div></div>" ).insertAfter(".row")

}
//function for number of cards to create
function cardsToCreate(){
  var length = data.length;
  for(var i = length -1;i>-1;i--){
      createNewCard(i);
  }
}
});
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



    fetch('https://kt-dev.outsystemscloud.com/PWABack/rest/EmployeeDetail/Create',{
          method:'POST',
          headers :{

            'Content-Type': 'application/json',
          },

          body:JSON.stringify({
            FirstName:FirstName,
            LastName:LastName,
            JobTitle:"Employee",
            Email:Email,
            PhoneNumber:PhoneNumber,
            Address:"Undefined"
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
