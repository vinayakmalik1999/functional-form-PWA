$.getJSON("https://kt-dev.outsystemscloud.com/PWABack/rest/EmployeeList/Get", function(data){


document.body.onload = cardsToCreate();
// function to create a new card
function createNewCard(i) {

$("<div class = column> <div class= card> <div class= container> <h2> "+ data[i].Name + "</h2> <p class= title>"+ data[i].Id +"</p> <p> (+1)" + data[i].PhoneNumber +"</p> <p>"+ data[i].Email+ " </p>  <p><button class = button onClick = editDetails("+ data[i].Id +") action = /index.html >Edit Details</button></p> </div>  </div></div>" ).insertAfter(".row")

}

//function for number of cards to create
function cardsToCreate(){
  var length = data.length;
  for(var i = length -1;i>-1;i--){
      createNewCard(i);
  }
}

});
//function to edit employee details using POST method
function editDetails(index){
//sessionStorage.setItem ('index', index);


window.location.href = ("form/" + index);
document.getElementById('Name').innerHTML = "works";

}
