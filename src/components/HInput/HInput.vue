<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input
      type="text"
      :placeholder="placeholder"
      v-model="maskedInputValue"
      @input="onInput"
    />
  </div>
</template>

<script>
import { reactive, watch } from 'vue';

export default {
  name: 'HInput',
  props: {
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    inputValue: {
      type: [String, Number],
      default: '',
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      maskedInputValue: '',
    });

    function maskInputValue(value) {
      if (typeof value !== 'string') {
        state.maskedInputValue = value;
        return;
      }

      if (!value) {
        state.maskedInputValue = '';
        return;
      }

      const digits = value.replace(/[^0-9]/g, '');
      const match = digits.match(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/);
      if (!match) {
        state.maskedInputValue = value;
        return;
      }

      state.maskedInputValue =
        match[1] + ' (' + match[2] + ') ' + match[3] + '-' + match[4];

      emit('update:inputValue', state.maskedInputValue);
    }

    function onInput(event) {
      const { value } = event.target;
      maskInputValue(value);
    }

    watch(
      () => props.inputValue,
      (newValue) => {
        maskInputValue(newValue);
      },
    );

    maskInputValue(props.inputValue);

    return {
      maskedInputValue: state.maskedInputValue,
      onInput,
    };
  },
};
</script>

<style lang="scss" scoped>
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  label {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    text-align: left;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: #262626;
  }

  input {
    padding: 9px 12px;
    max-width: 100%;
    height: 36px;
    background: #f8f8f8;
    border: 1px solid #e1e1e1;
    border-radius: 8px;

    &::value {
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      letter-spacing: 0.25px;
      color: #262626;
    }
  }
}
</style>
