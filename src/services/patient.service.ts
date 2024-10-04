export {};

import axios from 'axios';
import type { Patient } from '@/types/types';

export async function fetchPatients(): Promise<any> {
    try {
        const response = await axios.get('/src/data/patients.json');
        const patients: Patient[] = response.data.patients;
        return patients;
    } catch (error) {
        console.log('Could not retrieve patients: ' + error);
    }
}

export function clonePatient(patient: Patient): Patient {
    return {
        id: patient.id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        age: patient.age,
        medicalRecordNumber: patient.medicalRecordNumber,
        vitals: patient.vitals
    }
}