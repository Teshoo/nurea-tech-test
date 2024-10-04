<script setup lang="ts">
import { computed, ref, watch, type Ref } from 'vue';
import type { Patient } from '@/types/types';
import { clonePatient } from '@/services/patient.service';
import PatientViewCharts from '@/components/PatientViewCharts.vue';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';


const patient = defineModel<Patient>('patient', { required: true });

const patientToEdit: Ref<Patient> = ref(clonePatient(patient.value));
const noPatientLabel: string = 'Select a patient in the list';
const isPatientEditing: Ref<boolean> = ref(false);
const isPatientSelected = computed<boolean>(() => patient.value ? patient.value.id !== -1 : false); 
const isPatientModified = computed<boolean>(() => JSON.stringify(patient.value) !== JSON.stringify(patientToEdit.value));
const nameRegex = new RegExp('/^[a-z ,.\'-]$/i', 'g');
const isAgeValid = computed<boolean>(() => patientToEdit.value.age >= 0 && patientToEdit.value.age < 130);
const isFirstNameValid = computed<boolean>(() => nameRegex.test(patientToEdit.value.firstName));

// METHODS

function initPatientToEdit(): void {
    patientToEdit.value = clonePatient(patient.value);
}

function updatePatient(): void {
    patient.value = patientToEdit.value;
}

watch(
    () => patient.value.id,
    () => isPatientEditing.value = false
)
</script>

<template>
    <div :class="$style.container">
        <div v-if="isPatientSelected" 
            :class="$style.patientContainer"
        >
            <div :class="$style.patientHeader">
                <div :class="$style.patientNameLabel">
                    <div v-if="!isPatientEditing">
                        {{ patient.firstName + ' ' + patient.lastName + ', ' + patient.age}}
                        
                        <Button 
                            icon="pi pi-pencil" 
                            severity="secondary" 
                            aria-label="Edit" 
                            size="small"
                            @click="isPatientEditing = true, initPatientToEdit()"
                        />
                    </div>
                    
                    <div v-else-if="isPatientEditing"
                        :class="$style.inputsContainer"
                    >
                        <InputText
                            type="text"
                            v-model="patientToEdit.firstName"
                            :invalid="!isFirstNameValid"/>
                        <InputText type="text" v-model="patientToEdit.lastName" />
                        
                        <InputNumber 
                            v-model="patientToEdit.age" 
                            inputId="minmax-buttons"
                            mode="decimal" 
                            showButtons 
                            :min="0" 
                            :max="130" 
                            fluid 
                            :invalid="!isAgeValid"
                        />
                        
                        <Button 
                            label="Save" 
                            icon="pi pi-check"
                            iconPos="right"
                            :disabled="!isPatientModified"
                            @click="updatePatient(), isPatientEditing = false"
                        />
                    </div>
                </div>

                <div :class="$style.patientMRNumberLabel">
                    {{ patient.medicalRecordNumber }}
                </div>
            </div>
            <PatientViewCharts :patient="patient" :key="patient.id"/>
        </div>

        <div v-else
            :class="$style.noPatientContainer"
        >
            <span>{{ noPatientLabel }}</span>
        </div>
    </div>
</template>

<style module>
.container {
    border: solid 1px;
    border-radius: 5px;
}
.patientContainer {
    display: grid;
    grid-template-rows: 1fr auto;
}
.patientHeader {
    display: grid;
    grid-template-rows: auto auto;
    gap: 5px;

    padding: 10px 0 10px 10px;

    border-bottom: solid 1px;
}
.patientNameLabel {
    font-size: 21px;
}
.patientMRNumberLabel {
    font-size: 15px;
    letter-spacing: 1px;
}
.inputsContainer {
    display: grid;
    grid-template-columns: auto auto auto auto;
    justify-content: flex-start;
    gap: 10px;
}
.noPatientContainer {
    display: grid;
    align-content: center;
    justify-content: center;

    height: 100%;

    font-size: 21px;
    color:rgb(138, 138, 138);
}
</style>