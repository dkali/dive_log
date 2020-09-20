import firebase from 'firebase';

class DiveLocation{
  constructor(name, loc_id, geopoint) {
    this.name = name;
    this.loc_id = loc_id;
    this.geopoint = geopoint;
  }
}

export default DiveLocation;