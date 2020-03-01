<template>
  <div class="autocomplete">
    <input
      class="input"
      v-model='input'
      placeholder="ex: Orlando, Florida"
      list="suggestion-list"
      @change="$emit('suggestion-selected', input)"
      @input="userInput(input)"
    />
    <datalist
      id="suggestion-list"
      v-if="suggestions"
    >
      <option
        class="suggestion-item"
        v-for="suggestion in suggestions"
        :key="suggestion.id"
      >
        {{suggestion}}
      </option>
    </datalist>
  </div>
</template>

<script>
export default {
  props: {
    suggestions: Array
  },
  data () {
    return {
      input: ''
    }
  },
  methods: {
    userInput (input) {
      if (input.length > 2) {
        this.$emit('get-suggestions', input)
      }
    }
  }
}
</script>

<style>
</style>
