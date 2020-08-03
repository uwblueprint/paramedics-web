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
    DELETED
  }

  extend type Query {
    patient(id: ID!): Patient
    patients: [Patient]
    patientsByCcp(collectionPointId: ID!): [Patient]
  }

  extend type Mutation {
    addPatient(
      gender: String,
      age: Int,
      runNumber: Int,
      barcodeValue: String!,
      collectionPointId: ID!,
      status: status,
      triageCategory: Int,
      triageLevel: triageLevel!, 
      notes: String,
      transportTime: DateTime,
      hospitalId: ID,
      ambulanceId: ID
    ): Patient!
    
    updatePatient(
      id: ID!,
      gender: String,
      age: Int,
      runNumber: Int,
      barcodeValue: String,
      collectionPointId: ID,
      status: status,
      triageCategory: Int,
      triageLevel: triageLevel, 
      notes: String,
      transportTime: DateTime,
      hospitalId: ID,
      ambulanceId: ID
    ): Patient!

    restorePatient(id: ID!): Patient!

    deletePatient(id: ID!): Int!
  }
  
  type Patient {
    id: ID!,
    gender: String,
    age: Int,
    runNumber: Int,
    barcodeValue: String,
    collectionPointId: collectionPoint!,
    status: status,
    triageCategory: Int,
    triageLevel: triageLevel, 
    notes: String,
    transportTime: DateTime,
    createdAt: DateTime,
    updatedAt: DateTime,
    hospitalId: Hospital,
    ambulanceId: Ambulance
  }
  `;
exports.patientSchema = patientSchema;
