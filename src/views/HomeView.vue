<template>
  <main>
    <ControlSetList />
  </main>
</template>

<script lang="ts">
import ControlSetList from '@/components/ControlSetList.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    ControlSetList,
  },
})
</script>

<style scoped></style>
