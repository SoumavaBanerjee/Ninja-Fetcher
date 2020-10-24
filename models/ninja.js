let mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
let schema = mongoose.Schema;

// Location schema for the ninja
const GeoSchema = new schema({
  type:{
    type: String,
    default: "point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere" 
  }
});

const NinjaSchema = new schema({
  name: {
    type: String,
    required: [true, "name is required"]
  },
  rank: {
    type: String
  },
  available: {
    type: Boolean,
    default: false
  },
  geometry: GeoSchema
  // Get the Geo location data.
});

const Ninja = mongoose.model("ninja", NinjaSchema);
module.exports = Ninja;
