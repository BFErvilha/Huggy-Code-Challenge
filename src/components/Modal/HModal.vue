<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <slot name="header"></slot>
        <div class="header-actions" v-if="headerActions">
          <img
            @click="deleteContact(contactId)"
            src="@/assets/images/icon/delete.svg"
          />
          <img src="@/assets/images/icon/edit.svg" />
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
    contactId: { type: String, required: true },
  },
  setup(props, { emit }) {
    const deleteContact = (id) => {
      emit('deleteContact', id);
    };
    const closeModal = () => {
      emit('closeModal', true);
    };
    return {
      closeModal,
      deleteContact,
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
    /* padding: 20px; */
    max-width: 610px;
    border: 1px solid #e1e1e1;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    animation: fadeIn 0.3s ease-in-out forwards;
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
