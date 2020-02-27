const patientSchema = `
  enum triageLevel {
    GREEN
    YELLOW
    RED
    BLACK
    WHITE
  }

  enum status {
    ON_SITE
    RELEASED
    TRANSPORTED
  }

  extend type Query {
    patient(id: Int!): Patient
    patients: [Patient]
  }
  
  type Patient {
    id: ID!,
    gender: String,
    age: Int,
    runNumber: Int,
    barcodeValue: Int!,
    incidentId: Int!,
    status: status,
    triageCategory: Int,
    triageLevel: triageLevel, 
    notes: String,
    transportTime: DateTime,
    createdAt: DateTime,
    updatedAt: DateTime,
  }
  `
  ;

exports.patientSchema = patientSchema;

// TODO: incidentId should be a foreign key