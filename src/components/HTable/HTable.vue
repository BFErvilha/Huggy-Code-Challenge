<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th width="30%" v-for="(column, index) in columns" :key="index">
            {{ column.label }}
          </th>
          <th width="10%"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in filteredData"
          :key="index"
          @click="openModal(row)"
          style="cursor: pointer"
        >
          <td>
            <span>{{ columns[0].label }}</span>
            <img :src="row.photo" />
            <p>{{ row.name }}</p>
          </td>
          <td>
            <span>{{ columns[1].label }}</span>
            <p>{{ row.email }}</p>
          </td>
          <td>
            <span>{{ columns[2].label }}</span>
            <p>{{ row.phone }}</p>
          </td>
          <td>
            <button @click="editRow(row)">
              <img class="icon" src="@/assets/images/icon/edit.svg" />
            </button>
            <button @click="deleteRow(row)">
              <img class="icon" src="@/assets/images/icon/delete.svg" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">
        Previous
      </button>

      <span>{{ currentPage }} De {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Next
      </button>
    </div>
    <HModal
      v-if="isModalOpen"
      :header-actions="true"
      :contactId="selectedContact.id"
      @closeModal="closeModal"
      @deleteContact="deleteRow($event)"
    >
      <template #header>
        <div class="title">
          <img :src="selectedContact.photo" />
          <h2>{{ selectedContact.name }}</h2>
        </div>
      </template>

      <template #body> {{ selectedContact }}</template>
    </HModal>
  </div>
</template>
<script>
import { ref, computed, toRefs } from 'vue';
import HModal from '@/components/Modal/HModal.vue';

export default {
  // eslint-disable-next-line
  name: 'Htable',
  props: {
    columns: {
      type: Array,
      required: true,
      default: () => ['Name', 'Phone', 'Email'],
    },
    data: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  components: {
    HModal,
  },
  setup(props) {
    const currentPage = ref(1);
    const pageSize = ref(10);
    const searchQuery = ref('');
    const sortBy = ref('name');
    const sortDirection = ref('asc');
    const selectedContact = ref(null);
    const isModalOpen = ref(false);
    const { data } = toRefs(props);

    const filteredData = computed(() => {
      let filtered = data.value;
      if (searchQuery.value) {
        console.log('bateu');
        filtered = filtered.filter((row) => {
          return Object.values(row).some((value) => {
            return String(value)
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase());
          });
        });
      }

      const startIndex = (currentPage.value - 1) * pageSize.value;
      const endIndex = startIndex + pageSize.value;

      const sorted = filtered.sort((a, b) => {
        const sortA = a[sortBy.value];
        const sortB = b[sortBy.value];

        if (sortDirection.value === 'asc') {
          if (sortA < sortB) return -1;
          if (sortA > sortB) return 1;
          return 0;
        } else {
          if (sortA > sortB) return -1;
          if (sortA < sortB) return 1;
          return 0;
        }
      });
      return sorted.slice(startIndex, endIndex);
    });

    const totalPages = computed(() => {
      return Math.ceil(data.value.length / pageSize.value);
    });

    function previousPage() {
      currentPage.value -= 1;
    }

    function nextPage() {
      currentPage.value += 1;
    }
    // eslint-disable-next-line
    function editRow(row) {
      // TODO: Implement edit functionality
    }
    // eslint-disable-next-line
    function deleteRow(row) {
      alert(row);
    }

    function openModal(item) {
      selectedContact.value = item;
      isModalOpen.value = true;
    }

    function closeModal() {
      isModalOpen.value = false;
    }
    return {
      currentPage,
      pageSize,
      searchQuery,
      sortBy,
      sortDirection,
      filteredData,
      totalPages,
      previousPage,
      nextPage,
      editRow,
      deleteRow,
      openModal,
      closeModal,
      isModalOpen,
      selectedContact,
    };
  },
};
</script>
<style lang="scss" scoped>
.table-responsive {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    thead {
      tr {
        border-bottom: 1px solid #e1e1e1;
        th {
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
          letter-spacing: 0.4px;
          color: #505050;
        }
      }
    }
    th,
    td {
      text-align: left;
      padding: 8px;
      white-space: nowrap; // evita que o texto seja quebrado em telas menores
      span {
        display: none;
      }
    }

    tr {
      height: 56px;
      &:hover {
        background-color: #f2f2f2;

        td {
          &:last-child {
            button {
              display: inline;
            }
          }
        }
      }
    }

    th {
      font-weight: bold;
    }

    td {
      img {
        height: 32px;
        width: 32px;
        border-radius: 50%;
        margin-right: 16px;
      }
      &:first-child {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      &:last-child {
        display: flex;
        justify-content: center;
        align-items: center;

        button {
          display: none;
          margin-right: 8px;

          .icon {
            width: 20px;
            height: 20px;
          }
        }
      }
    }

    @media (max-width: 768px) {
      th {
        display: none; // esconde o cabeçalho em telas menores
      }

      tr {
        margin-bottom: 16px;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1); // adiciona sombra aos cartões
        background-color: #fff;
        border-radius: 8px;
        padding: 16px;

        td {
          display: block;
          span {
            display: block;
            font-size: 13px;
            font-weight: bold;
          }
          &:first-child {
            background-color: #f9f9f9; // destaca a primeira coluna em telas maiores
          }

          &::before {
            content: attr(
              data-label
            ); // exibe o nome da coluna acima do valor em telas menores
            font-weight: bold;
            margin-bottom: 8px;
            display: block;
          }
        }
      }
    }
  }

  .pagination {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      padding: 8px;
      border: 1px solid #ddd;
      background-color: #fff;
      cursor: pointer;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    span {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>