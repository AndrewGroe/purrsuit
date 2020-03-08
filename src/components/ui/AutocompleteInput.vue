<template>
  <div class="autocomplete">
    <input
      class="autocomplete__input"
      v-model='input'
      placeholder="ex: Orlando, Florida"
      type="text"
    />
    <div
      v-if="suggestions && showSuggestions"
      class="autocomplete__suggestions"
    >
      <div
        class="suggestions__item"
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
    suggestions: Array,
    location: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      input: this.location,
      showSuggestions: false
    }
  },
  methods: {
    userInput (e) {
      let input = e.target.value

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
  },
  mounted () {
    const textInput = document.querySelector('.autocomplete__input')
    textInput.addEventListener('input', this.userInput)
  }
}
</script>

<style lang="scss" scoped>
.autocomplete {
  position: relative;
  display: inline-block;

  &__suggestions {
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 0;
    right: 0;

    .suggestions__item {
      padding: 10px;
      cursor: pointer;
      background-color: #fff;
      border-bottom: 1px solid #d4d4d4;

      &:hover {
        background-color: #e9e9e9;
      }
    }
  }
}
</style>
