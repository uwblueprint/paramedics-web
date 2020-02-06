const patientSchema = `
  extend type Query {
    patient(id: Int!): Patient
    patients: [Patient]
  }
  
  type Patient {
    gender: String,
    age: Int,
    runNumber: Int,
    barcodeValue: Int!,
    incidentId: Int!,
    status: String,
    triageLevel: Int, 
    notes: String,
    transportTime: DateTime,
    createdAt: DateTime,
  }
  `
  ;

exports.patientSchema = patientSchema;

// TODO: Clarify enum for triage level