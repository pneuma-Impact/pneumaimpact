const { Schema } = require("mongoose");

const auditSchema = new Schema({
  businessName: string,
  buisnessPlan: string,
  meanOfIdentification: string,
});
