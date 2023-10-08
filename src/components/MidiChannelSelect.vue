<template>
    <!--https://open-ui.org/components/selectlist/-->
    <select>
        <option 
            v-for="option in options"
            :value="option.value"
        >
            {{ option.name }}
        </option>
    </select>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { MidiChannel } from '../types/midi'

interface MidiChannelOption {
    name: string,
    value: MidiChannel,
}

const options = computed<MidiChannelOption[]>(() => {
    return Object.keys(MidiChannel)
        .filter(key => isNaN(Number(key)))
        .map(key => {
            return {
                name: key.replace('_', ' '),
                value: MidiChannel[key as keyof typeof MidiChannel],
            }
        })
})
</script>

<style scoped>

</style>