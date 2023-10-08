<template>
    <!--https://open-ui.org/components/selectlist/-->
    <select>
        <option v-for="device in devicesStore.outputs">{{ device.name }}</option>
    </select>
</template>

<script lang="ts" setup>
import { useDevicesStore } from '@/stores/devicesStore';

const devicesStore = useDevicesStore();
</script>

<style scoped>

</style>