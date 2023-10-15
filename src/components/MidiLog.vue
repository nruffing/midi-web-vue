<template>
  <DataGridVue
    v-if="dataService"
    :custom-data-service="dataService"
    :columns="columns"
    :initial-page-size="10"
    :page-sizes="[5, 10, 20]"
  >
  </DataGridVue>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue'
import { mapStores } from 'pinia'
import { DataGridVue, type Column, Field, DataType, type DataService, type Sort, type Filter, type PageData } from 'data-grid-vue'
import { useMidiStore } from '@/stores/midiStore'
import type { MidiCommandLog } from '@/midi/controlChange'

interface Data {
  columns: Column[]
  dataService: MidiLogDataService | undefined
}

class MidiLogDataService implements DataService {
  data: MidiCommandLog[]

  constructor(data: MidiCommandLog[]) {
    this.data = data
  }

  getPage(pageNum: number, pageSize: number, sort: Sort[], filter: Filter | undefined): Promise<PageData> {
    const startIndex = pageSize * (pageNum - 1)
    const endIndex = startIndex + pageSize
    return Promise.resolve({
      totalItems: this.data.length,
      dataItems: this.data.slice(startIndex, endIndex),
    })
  }
}

export default defineComponent({
  name: 'MidiLog',
  components: {
    DataGridVue,
  },
  data(): Data {
    return {
      columns: [
        {
          field: new Field('output'),
          dataType: DataType.alphanumeric,
        },
        {
          field: new Field('config'),
          dataType: DataType.alphanumeric,
        },
        {
          field: new Field('channel'),
          dataType: DataType.number,
        },
        {
          field: new Field('value'),
          dataType: DataType.number,
        },
        {
          field: new Field('bytes'),
          dataType: DataType.alphanumeric,
        },
        {
          field: new Field('controlChangeCommand'),
          dataType: DataType.number,
        },
        {
          field: new Field('timestamp', log => log.timestamp.toLocaleTimeString()),
          dataType: DataType.dateTime,
          isKey: true,
        },
      ],
      dataService: undefined,
    }
  },
  computed: {
    ...mapStores(useMidiStore),
    logs() {
      return this.midiStore.commandHistory
    },
  },
  mounted() {
    this.dataService = new MidiLogDataService(this.midiStore.commandHistory)
    this.$watch(
      'midiStore.commandHistory',
      () => {
        this.dataService = undefined
        nextTick(() => {
          this.dataService = new MidiLogDataService(this.midiStore.commandHistory)
        })
      },
      { deep: true },
    )
  },
})
</script>

<style scoped>
.dgv-data-grid-container {
  flex: 1;
  --dgv-header-font-size: 1.2rem;
  --dgv-cell-font-size: 1.6rem;
  --dgv-cell-padding: 0.2rem 1rem;
}
</style>
