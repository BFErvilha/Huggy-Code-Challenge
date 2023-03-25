<template>
  <div>
    <HToast
      v-if="toast.show"
      :type="toast.type"
      :closeToast="closeToast"
      :duration="5000"
    />
    <div class="container">
      <div class="row">
        <div class="grid-16 section-name">
          <h2>Contatos</h2>
        </div>
        <div class="grid-16">
          <div class="card">
            <div class="row justify-between padding-16-0 width-100">
              <div class="grid-8 text-left">
                <div class="search">
                  <input type="text" placeholder="Buscar Contato" />
                </div>
              </div>
              <div class="grid-8 row justify-end">
                <button class="huggy-button text-right">
                  <img src="@/assets/images/icon/plus.svg" />
                  Adicionar contato
                </button>
              </div>
              <div class="grid-16">
                <HTable
                  :columns="columns"
                  :data="contacts"
                  @viewModal="openModal($event, 'view')"
                  @deleteModal="openModal($event, 'delete')"
                  @editModal="openModal($event, 'editCreate')"
                />
              </div>

              <!-- Modal View -->
              <HModal
                v-if="isModal.view"
                :header-actions="true"
                :contactId="selectedContact.id"
                @closeModal="closeModal('view')"
                @deleteContact="openModal($event, 'delete')"
                @editContact="openModal($event, 'editCreate')"
              >
                <template #header>
                  <div class="title">
                    <img :src="selectedContact.photo" />
                    <h2>{{ selectedContact.name }}</h2>
                  </div>
                </template>

                <template #body>
                  <div class="grid">
                    <small>Email</small>
                    <p>{{ selectedContact.email }}</p>

                    <small>Endereço</small>
                    <p>{{ selectedContact.address }}</p>

                    <small>Bairro</small>
                    <p>{{ selectedContact.district }}</p>

                    <small>Cidade</small>
                    <p>{{ selectedContact.city }}</p>

                    <small>Estado</small>
                    <p>{{ selectedContact.state }}</p>
                  </div>
                </template>
              </HModal>

              <!-- Modal Delete -->
              <HModal v-if="isModal.delete" size="sm">
                <template #header>
                  <div class="title">
                    <h2>Excluir este contato?</h2>
                  </div>
                </template>

                <template #footer>
                  <div class="action-footer">
                    <button class="cancel" @click="closeModal('delete')">
                      Cancelar
                    </button>
                    <button
                      class="delete"
                      @click="HandleDeleteContact(toDeleteContact)"
                    >
                      Excluir
                    </button>
                  </div>
                </template>
              </HModal>

              <!-- Modal Edit-Create -->
              <HModal v-if="isModal.editCreate">
                <template #header>
                  <div class="title">
                    <h2>Editar contato</h2>
                  </div>
                </template>
                <template #body>
                  <div class="grid-10">
                    <HInput
                      label="Nome"
                      :input-value="contactForm.name"
                      @input="contactForm.name = $event.target.value"
                      placeholder="Nome Completo"
                    />
                  </div>
                  <div class="grid-10">
                    <HInput
                      label="Email"
                      :input-value="contactForm.email"
                      @input="contactForm.email = $event.target.value"
                      placeholder="Email"
                    />
                  </div>
                  <div class="grid-8">
                    <HInput
                      label="Telefone"
                      :input-value="contactForm.phone"
                      @input="contactForm.phone = $event.target.value"
                      placeholder="Telefone"
                    />
                  </div>
                  <div class="grid-8">
                    <HInput
                      label="Celular"
                      :input-value="contactForm.mobile"
                      @input="contactForm.mobile = $event.target.value"
                      placeholder="Celular"
                    />
                  </div>
                  <div class="grid-13">
                    <HInput
                      label="Endereço"
                      :input-value="contactForm.address"
                      @input="contactForm.address = $event.target.value"
                      placeholder="Endereço"
                    />
                  </div>
                  <div class="row">
                    <div class="grid-8">
                      <HInput
                        label="Bairro"
                        :input-value="contactForm.district"
                        @input="contactForm.district = $event.target.value"
                        placeholder="Bairro"
                      />
                    </div>
                    <div class="grid-4">
                      <HInput
                        label="Estado"
                        :input-value="contactForm.state"
                        @input="contactForm.state = $event.target.value"
                        placeholder="Estado"
                      />
                    </div>
                  </div>
                </template>
                <template #footer>
                  <div class="action-footer">
                    <button class="cancel" @click="closeModal('editCreate')">
                      Cancelar
                    </button>
                    <button class="save" @click="saveContact()">Salvar</button>
                  </div>
                </template>
              </HModal>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getContacts,
  deleteContact,
} from '@/services/contacts/Contact.service';
import { ref, onMounted } from 'vue';
import HTable from '@/components/HTable/HTable.vue';
import HModal from '@/components/Modal/HModal.vue';
import HToast from '@/components/Toast/HToast.vue';
import HInput from '@/components/HInput/HInput.vue';

export default {
  name: 'AdminHome',
  components: {
    HTable,
    HModal,
    HToast,
    HInput,
  },
  setup() {
    const contacts = ref(undefined);
    const columns = [
      { name: 'name', label: 'Nome' },
      { name: 'email', label: 'E-Mail' },
      { name: 'phone', label: 'Telefone' },
    ];
    const selectedContact = ref(null);
    const contactForm = ref(null);
    const isModal = ref({
      view: false,
      delete: false,
      editCreate: false,
    });
    const toDeleteContact = ref(null);
    const toast = ref({ show: false, type: '' });
    const HandleGetContacts = async () => {
      await getContacts()
        .then((response) => {
          contacts.value = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const HandleDeleteContact = async (id) => {
      await deleteContact(id)
        .then(() => {
          showToast('success');
          HandleGetContacts();
          closeModal('delete');
        })
        .catch((error) => {
          console.log(error);
          showToast('error');
        });
    };

    const showToast = (type) => {
      toast.value.show = true;
      toast.value.type = type;
    };

    const closeToast = () => {
      toast.value.show = false;
    };

    const openModal = (item, type) => {
      if (type === 'view') {
        selectedContact.value = item;
        isModal.value.view = true;
      }
      if (type === 'delete') {
        selectedContact.value = item;
        isModal.value.view = false;
        isModal.value.delete = true;
      }
      if (type === 'editCreate') {
        if (typeof item === 'object') {
          contactForm.value = item;
        } else {
          contactForm.value = contacts.value.filter(
            (element) => element.id === item,
          );
        }
        isModal.value.view = false;
        isModal.value.editCreate = true;
      }
    };

    const closeModal = (type) => {
      if (type === 'view') {
        return (isModal.value.view = false);
      }
      if (type === 'delete') {
        return (isModal.value.delete = false);
      }
      if (type === 'editCreate') {
        return (isModal.value.editCreate = false);
      }
    };

    const saveContact = async () => {
      console.log(contactForm.value.name);
      // await updateContact(contactForm.value)
      //   .then(() => {
      //     showToast('success');
      //     HandleGetContacts();
      //     closeModal('editCreate');
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     showToast('error');
      //   });
    };

    onMounted(() => {
      HandleGetContacts();
    });

    return {
      contacts,
      columns,
      HandleGetContacts,
      openModal,
      closeModal,
      selectedContact,
      toDeleteContact,
      HandleDeleteContact,
      closeToast,
      toast,
      isModal,
      saveContact,
      contactForm,
    };
  },
};
</script>

<style lang="scss" scoped>
.section-name {
  text-align: left;
  margin: 18px 0;

  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    color: #262626;
  }
}

.search {
  position: relative;
  display: inline-block;

  input[type='text'] {
    padding-left: 30px; /* espaço para o ícone */
    background-image: url('../../assets/images/icon/search.svg'); /* caminho para o ícone */
    background-position: 5px 50%; /* posição do ícone */
    background-repeat: no-repeat;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
  }
}
</style>
