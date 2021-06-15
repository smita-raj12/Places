function PlacesBeen() {
  this.places = {};
  this.placeId = 0;
}

PlacesBeen.prototype.addPlace = function(place) {
  console.log('addPlace',place)
  place.id = this.assignPlaceId();
  this.places[place.id] = place;
  console.log('this.places',this.places)
};

PlacesBeen.prototype.assignPlaceId = function() {
  this.placeId += 1;
  return this.placeId;
};

PlacesBeen.prototype.findPlace = function(id) {
  if (this.places[id] != undefined) {
    return this.places[id] ;
  }
  return false;
};

PlacesBeen.prototype.deletePlace = function(id) {
  if (this.Places[id] === undefined) {
    return false;
  }
  delete this.Places[id];
  return true;
};

function Places(fullname,location,landmark,startTime,endTime,notes){
  this.fullname = fullname;
  this.location = location;
  this.landmark = landmark;
  this.startTime = startTime;
  this.endTime = endTime;
  this.notes = notes;
}
Places.prototype.TimeofYear = function() {
  return this.startTime + " " + this.endTime;
};
let placesBeen = new PlacesBeen();

function displayPlaceDetails(DisplayPlace) {
  let placeList = $("ul#places");
  let htmlForPlaceInfo = "";
  Object.keys(DisplayPlace.places).forEach(function(key) {
    const place = DisplayPlace.findPlace(key);
    htmlForPlaceInfo += "<li id=" + place.id + ">" + place.fullname + "</li>";
  });
  placeList.html(htmlForPlaceInfo);
}
function showPlace(placeId) {
  
  const place = placesBeen.findPlace(placeId);
  console.log("showPlace",place)
  $("#show-place").show();
  $(".fname").html(place.fullname);
  $(".locat").html(place.location);
  $(".landm").html(place.landmark);
  $(".stdtime").html(place.startTime);
  $(".entime").html(place.endTime);
  $(".notes").html(place.notes);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + place.id + ">Delete</button>");
}

function attachplaceListeners() {
  console.log("attachplaceListeners")
  $("ul#places").on("click", "li", function() {
    showPlace(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    placesBeen.deleteplace(this.id);
    $("#show-place").hide();
    displayplaceDetails(placesBeen);
  });
}
$(document).ready(function() {
  $("form#formplace").submit(function(event) {
    attachplaceListeners();
    event.preventDefault();
    const FullName = $("input#name").val();
    const Location = $("input#loc").val();
    const Landmark = $("input#land").val();
    const StratedTime = $("input#stime").val();
    const EndedTime = $("input#etime").val();
    const Notes = $("input#note").val();
    
    let newPlace = new Places(FullName, Location, Landmark,StratedTime,EndedTime,Notes);
    console.log("newPlace",newPlace)
    placesBeen.addPlace(newPlace);
    displayPlaceDetails(placesBeen)
  });
});