<script setup lang="ts">
import { fetchPatients } from '@/services/patient.service';
import { type Patient } from '@/types/types';
import { ref, type Ref } from 'vue';
import PatientList from '@/components/PatientList.vue';
import PatientView from '@/components/PatientView.vue';

const patientList: Ref<Patient[]> = ref([]);
const selectedPatient: Ref<Patient> = ref({
    id: -1,
    firstName: '',
    lastName: '',
    age: 0,
    medicalRecordNumber: ''
});
const isLoading: Ref<boolean> = ref(true);

browsePatientList();

// METHODS //

async function browsePatientList(): Promise<void> {
    patientList.value = await fetchPatients();
    isLoading.value = false;
}
</script>

<template>
    <div 
        v-if="!isLoading"
        :class="$style.container"
    >
        <PatientList :patient-list="patientList" v-model:selectedPatient="selectedPatient"/>
        <PatientView v-model:patient="selectedPatient"/>
    </div>
</template>

<style module>
.container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    width: 100%;
    box-sizing: border-box;

    padding: 25px 50px 50px 50px;
}
</style>
