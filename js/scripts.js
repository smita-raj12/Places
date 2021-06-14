function PlacesBeen() {
  this.places = {};
  this.placeId = 0;
}

PlacesBeen.prototype.addPlace = function(place) {
  place.id = this.assignPlaceId();
  this.places[place.id] = place;
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

function Places(fullname,location,landmark,timeofyear,notes){
  this.fullname = fullname;
  this.location = location;
  this.landmark = landmark;
  this.timeofyear = timeofyear;
  this.notes = notes;
}

let placesBeen = new PlacesBeen();

$(document).ready(function() {
  $("form#formplace").submit(function(event) {
    event.preventDefault();
    const FullName = $("input#name").val();
    const Location = $("input#loc").val();
    const Landmark = $("input#land").val();
    const TimeOfYear = $("stime").val();
    const Notes = $("input#note").val();
    let newPlace = new Places(FullName, Location, Landmark,TimeOfYear,Notes);
    placesBeen.addPlace(newPlace);
    console.log(placesBeen.places);
    $("output").html(placesBeen.places);
    $("output").show();
  });
});