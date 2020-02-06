const patientSchema = `
enum triageLevel {
  GREEN
  YELLOW
  RED
}
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
    triageLevel: triageLevel, 
    notes: String,
    transportTime: DateTime,
    createdAt: DateTime,
  }
  `
  ;

exports.patientSchema = patientSchema;

// TODO: Clarify enum for triage level