export type { Patient, PatientVitals };

interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    medicalRecordNumber: string;
    vitals?: PatientVitals;
}

interface PatientVitals {
    heartRate?: Array<number>;
    temperature?: Array<number>;
    bloodPressure?: Array<{systolic: number, diastolic: number}>;
    oxygenSaturation?: Array<number>;
}
