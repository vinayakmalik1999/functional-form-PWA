let my_db
document.getElementById("offline-notification").style.display = "none";

openDatabase();

function openDatabase () {

  var indexedDBOpenRequest = indexedDB.open('offline-details',
  1)
 indexedDBOpenRequest.onupgradeneeded = function () {
   //executes if there's a need to create/update db.
   this.result.createObjectStore('get_requests', {
    autoIncrement:  true })
    console.log("IndexedDB Object store created")
 }
  //  execute each time the database is opened.
  indexedDBOpenRequest.onsuccess = function () {
    my_db = this.result
    console.log("IndexedDB creation success")
    if(!navigator.onLine){
var cursor
      getObjectStore('get_requests').openCursor().onsuccess = async function (event) {
         cursor = event.target.result
        console.log("cursor",cursor)
        document.getElementById("offline-notification").style.display = "block";

        for(l in cursor.value){

        $("<div class = column> <div class= card> <div class= container> <h2> "+ cursor.value[l].Name + "</h2> <p class= title>"+ cursor.value[l].Id +"</p> <p> (+1)" + cursor.value[l].PhoneNumber +"</p> <p>"+ cursor.value[l].Email+ " </p>  <p><button class = button action = /index.html disabled>Edit Details</button></p> </div>  </div></div>" ).insertAfter(".row")
        }
      

        }
  }
  }
  indexedDBOpenRequest.onerror = function (error) {
    // error creating IndexedDB
    console.error('IndexedDB creation error:', error)
  }
}
console.log(my_db);
function getObjectStore (storeName, mode) {
  // retrieve our object store
  return my_db.transaction(storeName,mode
   ).objectStore(storeName)
}
function savePostRequests (payload) {
  // get object_store and save our payload inside it
  var request = getObjectStore('get_requests','readwrite'
   ).add(payload);
  request.onsuccess = function (event) {
    console.log('a new get request has been added to indexedb')
    my_db.close();
  }
  request.onerror = function (error) {
    console.error(error)
  }
}



$.getJSON("https://kt-dev.outsystemscloud.com/PWABack/rest/EmployeeList/Get", function(data){

  var offlineDataRequests = []

document.body.onload = cardsToCreate();
// function to create a new card
function createNewCard(i) {

$("<div class = column> <div class= card> <div class= container> <h2> "+ data[i].Name + "</h2> <p class= title>"+ data[i].Id +"</p> <p> (+1)" + data[i].PhoneNumber +"</p> <p>"+ data[i].Email+ " </p>  <p><button class = button onClick = editDetails("+ data[i].Id +") action = /index.html >Edit Details</button></p> </div>  </div></div>" ).insertAfter(".row")
  offlineDataRequests.push({
    Name: data[i].Name,
    Id:data[i].Id,
    PhoneNumber:data[i].PhoneNumber,
    Email:data[i].Email
  })

}
savePostRequests(offlineDataRequests);


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

}
