<template>
  <div class="autocomplete">
    <input
      class="input"
      v-model='input'
      placeholder="ex: Orlando, Florida"
      @input="userInput(input)"
    />
    <div
      v-if="suggestions && showSuggestions"
      class="suggestions"
    >
      <div
        class="suggestion-item"
        v-for="suggestion in suggestions"
        :key="suggestion.id"
        @click="suggestionSelected(suggestion)"
      >
        {{suggestion}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    suggestions: Array
  },
  data () {
    return {
      input: '',
      showSuggestions: false
    }
  },
  methods: {
    userInput (input) {
      if (input.length > 2) {
        this.showSuggestions = true
        this.$emit('get-suggestions', input)
      }
    },
    suggestionSelected (suggestion) {
      this.input = suggestion
      this.showSuggestions = false
      this.$emit('suggestion-selected', suggestion)
    }
  }
}
</script>

<style lang="scss" scoped>
.autocomplete {
  position: relative;
  display: inline-block;
}
.suggestions {
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 0;
  right: 0;
}
.suggestion-item {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;

  &:hover {
    background-color: #e9e9e9;
  }
}
</style>
