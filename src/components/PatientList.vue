<script setup lang="ts">
import type { Patient } from '@/types/types';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Row from 'primevue/row';
import ColumnGroup from 'primevue/columngroup';
import InputText from 'primevue/inputtext';
import { FilterMatchMode } from '@primevue/core/api';
import { ref } from 'vue';

defineProps<{ patientList: Patient[] }>();
const selectedPatient = defineModel<Patient>('selectedPatient', { required: true });

const filters = ref({
    medicalRecordNumber: { value: null, matchMode: FilterMatchMode.CONTAINS },
    firstName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    lastName: { value: null, matchMode: FilterMatchMode.CONTAINS },
    age: { value: null, matchMode: FilterMatchMode.EQUALS }
});

// METHODS //

function getLastValue(array: number[]): number {
    return array.slice(-1)[0];
}
</script>


<template>
    <DataTable 
        :value="patientList"
        v-model:selection="selectedPatient"
        v-model:filters="filters"
        selectionMode="single"
        filterDisplay="row"
        showGridlines
        stripedRows
        removableSort
        :rows="50"
        dataKey="id"
    >
        <ColumnGroup type="header">
            <Row>
                <Column header="MR Number" sortable :rowspan="2"  filterField="medicalRecordNumber">
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" placeholder="Search" />
                    </template>
                </Column>
                <Column field="lastName" header="Last Name" sortable :rowspan="2"/>
                <Column field="firstName" header="First Name" sortable :rowspan="2"/>
                <Column field="age" header="Age" sortable :rowspan="2"/>
                <Column header="Vitals" :colspan="3"/>
            </Row>

            <Row>
                <Column field="vitals.heartRate" header="Heart Rate" />
                <Column field="vitals.temperature[0]" header="Temperature" />
                <Column field="vitals.blood[0]" header="Blood Pressure" />
            </Row>
        </ColumnGroup>
        
        <Column field="medicalRecordNumber"/>
        <Column field="lastName"/>
        <Column field="firstName"/>
        <Column field="age" sortable/>

        <Column field="vitals.heartRate">
            <template #body="{data}">
                {{ getLastValue(data.vitals.heartRate)  }}
            </template>
        </Column>

        <Column field="vitals.temperature">
            <template #body="{data}">
                {{ getLastValue(data.vitals.temperature)  }}
            </template>
        </Column>

        <Column field="vitals.bloodPressure">
            <template #body="{data}">
                {{ data.vitals.bloodPressure.slice(-1)[0].systolic  + ' / ' + data.vitals.bloodPressure.slice(-1)[0].diastolic  }}
            </template>
        </Column>
    </DataTable>
</template>
