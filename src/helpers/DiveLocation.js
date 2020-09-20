import firebase from 'firebase';

class DiveLocation{
  constructor(name, loc_id, geopoint) {
    this.site = name;
    this.loc_id = loc_id;
    this.geopoint = geopoint;
    // this.geopoint = new firebase.firestore.GeoPoint(latitude, longitude);
  }
}

export default DiveLocation;