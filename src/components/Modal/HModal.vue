<template>
  <div class="modal">
    <div class="modal-content" :class="size ? size : ''">
      <div class="modal-header">
        <slot name="header"></slot>
        <div class="header-actions" v-if="headerActions">
          <img
            @click="doAction('delete', contactId)"
            src="@/assets/images/icon/delete.svg"
          />
          <img
            @click="doAction('edit', contactId)"
            src="@/assets/images/icon/edit.svg"
          />
          <img @click="closeModal" src="@/assets/images/icon/close.svg" />
        </div>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HModal',
  props: {
    headerActions: { type: Boolean, default: false },
    contactId: { type: String, default: '' },
    size: { type: String, default: '' },
  },
  setup(props, { emit }) {
    const doAction = (type, id) => {
      if (type === 'delete') {
        emit('deleteContact', id);
      }
      if (type === 'edit') {
        emit('editContact', id);
      }
    };

    const closeModal = () => {
      emit('closeModal', true);
    };
    return {
      closeModal,
      doAction,
    };
  },
};
</script>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  &-content {
    background-color: #fff;
    width: 100%;
    max-width: 610px;
    border: 1px solid #e1e1e1;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    animation: fadeIn 0.3s ease-in-out forwards;
    transition: all 0.2s;

    &.sm {
      max-width: 360px;

      .modal-header {
        border-bottom: none !important;
      }
    }
  }
  &-header {
    border-bottom: 1px solid #e1e1e1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 22px 24px;

    .title {
      display: flex;
      align-items: center;
      img {
        border-radius: 50%;
        width: 32px;
        height: 32px;
        margin-right: 16px;
      }
      h2 {
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
        letter-spacing: 0.15px;
        color: #262626;
      }
    }

    .header-actions {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;

      img {
        padding: 10px 16px;
        cursor: pointer;
        &:hover {
          filter: grayscale(1);
        }
      }
    }
  }

  &-body {
    padding: 20px;

    .grid {
      display: grid;
      grid-template-columns: 1fr 4fr;
      gap: 16px;

      small {
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        text-align: right;
        letter-spacing: 0.4px;
        color: #757575;
      }
      p {
        text-align: left;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        display: flex;
        align-items: center;
        letter-spacing: 0.25px;
        color: #262626;
      }
    }
  }

  &-footer {
    padding: 0px 16px 16px 16px;
    .action-footer {
      display: flex;
      justify-content: flex-end;

      button {
        padding: 9px 12px;
        margin: auto 8px;
        font-size: 14px;
        &.cancel {
          color: #505050;
        }
        &.delete {
          color: #de321b;
        }

        &.save {
          padding: 9px 12px;
          width: 70px;
          height: 36px;
          background: #321bde;
          color: #ffffff;
          border-radius: 8px;
        }

        &:hover {
          filter: brightness(1.75);
        }
      }
    }
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
}
</style>
