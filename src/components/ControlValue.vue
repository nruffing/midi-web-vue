<template>
  <div
    class="control control-value"
    :class="{ dragging: isDragging }"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
  >
    <div class="control-container">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        xml:space="preserve"
        width="64px"
        height="64px"
      >
        <g>
          <rect
            class="step"
            :class="{ highlighted: stepsHighlighted >= 1 }"
            x="46.847"
            y="385.725"
            transform="matrix(-0.5 -0.866 0.866 -0.5 -268.9947 679.0363)"
            width="29.373"
            height="62.898"
          ></rect>
          <rect
            class="step"
            :class="{ highlighted: stepsHighlighted >= 2 }"
            y="290.213"
            width="62.899"
            height="29.372"
          ></rect>
          <rect
            class="step"
            :class="{ highlighted: stepsHighlighted >= 3 }"
            x="30.084"
            y="177.937"
            transform="matrix(0.866 0.5 -0.5 0.866 104.5574 -4.9598)"
            width="62.898"
            height="29.373"
          ></rect>
          <rect
            class="step"
            :class="{ highlighted: stepsHighlighted >= 4 }"
            x="112.276"
            y="95.746"
            transform="matrix(0.5 0.866 -0.866 0.5 167.4981 -69.2538)"
            width="62.898"
            height="29.372"
          ></rect>
          <rect
            class="step"
            :class="{ highlighted: stepsHighlighted >= 5 }"
            x="241.315"
            y="48.899"
            width="29.37"
            height="62.899"
          ></rect>
          <rect
            class="step"
            :class="{ highlighted: stepsHighlighted >= 6 }"
            x="353.59"
            y="78.983"
            width="29.372"
            height="62.898"
          ></rect>
          <rect
            class="step"
            :class="{ highlighted: stepsHighlighted >= 7 }"
            x="435.78"
            y="161.174"
            transform="matrix(0.5 0.866 -0.866 0.5 392.072 -293.8063)"
            width="29.373"
            height="62.899"
          ></rect>
          <rect
            class="step"
            :class="{ highlighted: stepsHighlighted >= 8 }"
            x="449.101"
            y="290.213"
            width="62.899"
            height="29.372"
          ></rect>
          <rect
            class="step"
            :class="{ highlighted: stepsHighlighted >= 9 }"
            x="419.017"
            y="402.487"
            transform="matrix(-0.866 -0.5 0.5 -0.866 631.9987 1003.6898)"
            width="62.899"
            height="29.373"
          ></rect>
          <g
            class="knob"
            :style="{ transform: `rotate(${rotateDegrees})` }"
          >
            <circle
              cx="260"
              cy="310"
              r="150"
            ></circle>
            <circle
              class="dimple"
              cx="200"
              cy="370"
              r="30"
            ></circle>
          </g>
        </g>
      </svg>
    </div>
    <span class="control-label">{{ label }}</span>
    <div
      v-if="isDragging"
      class="drag-overlay"
    >
      <div class="overlay-value">{{ value }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { debounce } from 'debounce'

interface Data {
  value: number
  isDragging: boolean
  updateValueDebounce: any
}

export default defineComponent({
  name: 'ControlValue',
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    minValue: {
      type: Number,
      required: true,
    },
    maxValue: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
  },
  data(): Data {
    return {
      value: 1,
      isDragging: false,
      updateValueDebounce: debounce(this.updateModelValue, 300),
    }
  },
  computed: {
    stepsHighlighted(): number {
      if (!this.value) {
        return 0
      }
      const step = (this.maxValue - this.minValue) / 9
      const raw = this.value / step
      return raw + 1
    },
    rotateDegrees(): string {
      if (!this.value) {
        return '0deg'
      }
      const startDeg = 10
      const endDeg = 260
      const raw = ((endDeg - startDeg) * this.value) / (this.maxValue - this.minValue)
      return `${Math.ceil(raw + startDeg)}deg`
    },
    midPoint(): number {
      return Math.ceil((this.maxValue - this.minValue) / 2)
    },
  },
  methods: {
    onMouseDown(event: MouseEvent) {
      this.isDragging = true
    },
    onMouseUp() {
      this.isDragging = false
    },
    onMouseMove(event: MouseEvent) {
      if (!this.isDragging) {
        return
      }
      const deltaX = event.movementX
      const deltaY = -1 * event.movementY
      const delta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY

      const pxPerIncrement = 1
      const midPointLockRange = 1.5
      let rawValue = Math.ceil(delta / pxPerIncrement) + this.value
      if (rawValue < this.minValue) {
        rawValue = this.minValue
      } else if (rawValue > this.maxValue) {
        rawValue = this.maxValue
      } else if (rawValue > this.midPoint - midPointLockRange && rawValue < this.midPoint + midPointLockRange) {
        rawValue = this.midPoint
      }

      if (rawValue !== this.value) {
        this.value = rawValue
        this.updateValueDebounce()
      }
    },
    updateModelValue() {
      this.$emit('update:model-value', this.value)
    },
  },
})
</script>

<style scoped>
.control-value {
  align-items: center;
  fill: var(--control-value-knob-color);
  cursor: grab;
}

.control-value.dragging {
  cursor: grabbing;
}

.control-value-label {
  user-select: none;
  text-align: center;
}

.knob {
  transform-box: fill-box;
  transform-origin: center;
}

.step {
  fill: var(--control-value-step-color);
}

.highlighted {
  fill: var(--control-value-highlight-color);
}

.dimple {
  fill: var(--control-value-dimple-color);
}

.drag-overlay {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
}
</style>
