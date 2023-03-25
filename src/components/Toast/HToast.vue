<template>
  <div :class="toastClasses">
    <div class="toast-message">
      <span v-if="type === 'success'">Requisição realizada com sucesso!</span>
      <span v-else>Oops! A requisição falhou.</span>
    </div>
    <button class="toast-close" @click="closeToast">×</button>
  </div>
</template>
<script>
import { reactive, computed, onMounted } from 'vue';

export default {
  name: 'HToast',
  props: {
    type: {
      type: String,
      required: true,
    },
    closeToast: {
      type: Function,
      required: true,
    },
    duration: {
      type: Number,
      default: 4000,
    },
  },
  setup(props) {
    const state = reactive({
      type: props.type,
    });

    const toastClasses = computed(() => {
      return {
        'custom-toast': true,
        'success-toast': state.type === 'success',
        'error-toast': state.type !== 'success',
      };
    });

    const closeAfterDelay = () => {
      setTimeout(() => {
        closeToast();
      }, props.duration);
    };

    const closeToast = () => {
      state.isClosing = true;
      setTimeout(() => {
        props.closeToast();
      }, 300);
    };

    onMounted(() => {
      setTimeout(() => {
        state.isAppearing = false;
      }, 300);
      closeAfterDelay();
    });

    return {
      state,
      toastClasses,
    };
  },
};
</script>
<style scoped>
.custom-toast {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 300px;
  height: 50px;
  padding: 10px;
  margin-bottom: 10px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  border-radius: 4px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.3s, transform 0.3s;
  animation: fadeIn 0.3s ease-in-out forwards;
  z-index: 1;
  top: 10px;
  right: 0px;
}

.custom-toast.is-appearing {
  opacity: 1;
  transform: translateY(0);
}

.custom-toast.is-closing {
  opacity: 0;
  transform: translateY(-20px);
}

.success-toast {
  background-color: #4caf50;
}

.error-toast {
  background-color: #f44336;
}

.toast-message {
  display: flex;
  align-items: center;
}

.toast-close {
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>
