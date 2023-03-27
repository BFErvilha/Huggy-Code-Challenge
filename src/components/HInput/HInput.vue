<template>
  <div class="form-group" :class="isInvalid && 'isInvalid'">
    <label>{{ label }}</label>
    <input
      type="text"
      :placeholder="placeholder"
      v-model="maskedInputValue"
      @input="onInput($event, placeholder)"
    />
    <div v-if="isInvalid" class="invalid-feedback">{{ errorMessage }}</div>
  </div>
</template>
<script>
import { reactive, watch, ref } from 'vue';
import { identifyType } from '@/utils/utils';

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
    required: {
      type: Boolean,
      default: false,
    },
    isInvalid: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      maskedInputValue: '',
    });
    const errorMessage = ref('Campo obrigatório');

    const maskInputValue = (value) => {
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
    };

    const onInput = (event, placeholder) => {
      const { value } = event.target;
      if (validateInput(value, placeholder)) {
        // eslint-disable-next-line
        props.isInvalid = false;
        errorMessage.value = '';
        emit('input', value);
        maskInputValue(value);
      } else {
        // eslint-disable-next-line
        props.isInvalid = true;
        errorMessage.value = 'Campo inválido';
      }
    };

    const validateInput = (inputValue, placeholder) => {
      const input = identifyType(inputValue);
      switch (placeholder) {
        case 'Nome Completo':
          return input === 'name';
        case 'Email':
          return input === 'email';
        case 'Telefone':
        case 'Celular':
          // eslint-disable-next-line
          const regex = /^(\d{2})(\d{2})(\d{4,5})(\d{4})$/;
          return input === 'phone' && regex.test(inputValue);
        default:
          return false;
      }
    };

    watch(
      () => props.inputValue,
      (newValue) => {
        emit('input', newValue);
        maskInputValue(newValue);
      },
      {
        immediate: true,
        deep: true,
      },
    );

    maskInputValue(props.inputValue);

    return {
      maskedInputValue: state.maskedInputValue,
      onInput,
      errorMessage,
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

  &.isInvalid {
    input {
      border: 1px solid #ad2213;
      border-radius: 8px;
    }

    .invalid-feedback {
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.4px;
      text-align: left;
      color: #ad2213;
    }
  }
}
</style>
