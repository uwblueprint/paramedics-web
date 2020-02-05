const patientSchema = `
  extend type Query {
    patient(id: Int!): Patient
    patients: [Patient]
  }
  
  type Patient {
    gender: String,
    age: Int,
    runNumber: Float,
    barcodeValue: Float,
    incidentId: Float,
    status: String,
    triageLevel: Int, 
    notes: String,
    transportTime: DateTime,
    createdAt: DateTime,
  }
  `
  ;

exports.patientSchema = patientSchema;

// TODO: Clarify enum for triage level, set up custom Date type