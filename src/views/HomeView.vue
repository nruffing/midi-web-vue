<template>
  <main>
    <ControlSet />
  </main>
</template>

<script lang="ts">
import ControlSet from '@/components/ControlSet.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    ControlSet,
  },
})
</script>

<style scoped></style>
