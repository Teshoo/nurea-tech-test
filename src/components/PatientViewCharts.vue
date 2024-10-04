<script setup lang="ts">
import type { Patient } from '@/types/types';
import Chart from 'primevue/chart';
import { computed } from 'vue';

const props = defineProps<{ patient: Patient }>();
const bloodPressure = computed(() => props.patient.vitals?.bloodPressure);

// CHARTS DATA //

const bloodPressureData = {
    labels: [-2, -1, 'now'],
    datasets: [
        {
            label: 'Systolic',
            data: getSystolicData(bloodPressure.value)
        },
        {
            label: 'Diastolic',
            data: getDiastolicData(bloodPressure.value)
        }
    ]
};

const temperatureData = {
    labels: [-4, -3, -2, -1, 'now'],
    datasets: [{
        label: 'Temperature',
        data: props.patient.vitals?.temperature
    }]
};

const heartRateData = {
    labels: [-4, -3, -2, -1, 'now'],
    datasets: [{
        label: 'Heart Rate',
        data: props.patient.vitals?.heartRate
    }]
};

const temperatureOptions = {
    scales: {
        y: {
            min: 25,
            max: 50
        }
    }
}

const bloodPressureOptions = {
    scales: {
        y: {
            min: 50,
            max: 200
        }
    }
}

const heartRateOptions = {
    scales: {
        y: {
            min: 50,
            max: 130
        }
    }
}

// METHODS //

function getSystolicData(bpData: Array<{systolic: number, diastolic: number}> | any): Array<number> | any {
    if (bpData) {
        let sysValues: Array<number> = [];
        for (let i = 0 ; i < bpData.length ; i++) {
            sysValues.push(bpData[i].systolic);
        }
        return sysValues;
    }
}

function getDiastolicData(bpData: Array<{systolic: number, diastolic: number}> | any): Array<number> | any {
    if (bpData) {
        let diasValues: Array<number> = [];
        for (let i = 0 ; i < bpData.length ; i++) {
            diasValues.push(bpData[i].diastolic);
        }
        return diasValues;
    }
}
</script>

<template>
    <div :class="$style.chartContainer">
        <Chart type="line" :data="bloodPressureData" :options="bloodPressureOptions" class="h-[30rem]" />
        <Chart type="line" :data="temperatureData" :options="temperatureOptions" class="h-[30rem]" />
        <Chart type="line" :data="heartRateData" :options="heartRateOptions" class="h-[30rem]" />
    </div>
</template>

<style module>
.chartContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
</style>
