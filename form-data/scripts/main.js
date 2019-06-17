$.getJSON("https://kt-dev.outsystemscloud.com/PWABack/rest/EmployeeList/Get", function(data){

// function to create a new card
document.body.onload = cardsToCreate();

function createNewCard(i) {

$("<div class = column> <div class= card> <div class= container> <h2> "+ data[i].Name + "</h2> <p class= title>"+ data[i].Id +"</p> <p> (+1)" + data[i].PhoneNumber +"</p> <p>"+ data[i].Email+ " </p>  <p><button class= button>Edit Details</button></p> </div>  </div></div>" ).insertAfter(".row")

}

function cardsToCreate(){
  var length = data.length;
  for(var i = length -1;i>-1;i--){
      createNewCard(i);
  }
}
});
