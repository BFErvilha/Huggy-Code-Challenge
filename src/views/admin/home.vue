<template>
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
              <button class="huggy-button text-right">Adicionar contato</button>
            </div>
            <div class="grid-16">
              <HTable :columns="columns" :data="contacts" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getContacts } from '@/services/contacts/Contact.service';
import { ref, onMounted } from 'vue';
import HTable from '@/components/HTable/HTable.vue';
export default {
  name: 'AdminHome',
  components: {
    HTable,
  },
  setup() {
    const contacts = ref(undefined);
    const columns = [
      { name: 'name', label: 'Nome' },
      { name: 'email', label: 'E-Mail' },
      { name: 'phone', label: 'Telefone' },
    ];
    const HandleGetContacts = async () => {
      await getContacts()
        .then((response) => {
          contacts.value = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    };

    onMounted(() => {
      HandleGetContacts();
    });

    return {
      contacts,
      columns,
      HandleGetContacts,
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
