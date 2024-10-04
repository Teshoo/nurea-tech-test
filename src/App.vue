<script setup lang="ts">
import Dashboard from '@/pages/Dashboard.vue';
import TheHeader from '@/components/TheHeader.vue';
</script>

<template>
    <div :class="$style.container">
        <TheHeader />
        <Dashboard /> 
    </div>
    
</template>

<style module>
.container {
    display: grid;
    grid-template-rows: auto auto;
    align-content: start;

    height: 100vh;
}
</style>
