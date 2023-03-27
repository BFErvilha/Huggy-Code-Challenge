<template>
  <div class="table-responsive">
    <table class="table">
      <thead :class="data.length === 0 ? 'no-data' : ''">
        <tr>
          <th width="30%" v-for="(column, index) in columns" :key="index">
            {{ column.label }}
          </th>
          <th width="10%"></th>
        </tr>
      </thead>
      <tbody>
        <template v-if="data.length > 0">
          <tr v-for="row in data" :key="row.id" style="cursor: pointer">
            <td @click="openModal(row)">
              <div>
                <img :src="row.photo" />
                <div>
                  <span>{{ columns[0].label }}</span>
                  <p>{{ row.name }}</p>
                </div>
              </div>
            </td>
            <td @click="openModal(row)">
              <span>{{ columns[1].label }}</span>
              <p>{{ row.email }}</p>
            </td>
            <td @click="openModal(row)">
              <span>{{ columns[2].label }}</span>
              <p>{{ formatNumber(row.phone) }}</p>
            </td>
            <td>
              <button @click="openModal(row, 'edit')">
                <img class="icon" src="@/assets/images/icon/edit.svg" />
              </button>
              <button @click="openModal(row, 'delete')">
                <img class="icon" src="@/assets/images/icon/delete.svg" />
              </button>
            </td>
          </tr>
        </template>
        <template v-else>
          <slot name="no-data"></slot>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script>
import { ref } from 'vue';
import { formatPhoneNUmber } from '@/utils/utils';
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
  setup(props, { emit }) {
    const sortBy = ref('name');
    const sortDirection = ref('asc');

    const openModal = (item, type) => {
      switch (type) {
        case 'delete':
          emit('deleteModal', item.id);
          break;
        case 'edit':
          emit('editModal', item);
          break;
        case 'create':
          emit('createModal');
          break;
        default:
          emit('viewModal', item);
          break;
      }
    };

    const formatNumber = (value) => {
      return formatPhoneNUmber(value);
    };

    return {
      sortBy,
      sortDirection,
      openModal,
      formatNumber,
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
    tr {
      height: 60px;
    }
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
      white-space: nowrap;
      span {
        display: none;
      }
    }

    tbody {
      tr {
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
    }

    td {
      img {
        height: 32px;
        width: 32px;
        border-radius: 50%;
        margin-right: 16px;
        object-fit: cover;
        object-position: center;
      }
      div {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      &:last-child {
        button {
          display: none;
          margin-right: 8px;

          .icon {
            width: 20px;
            height: 20px;

            object-fit: inherit;
          }
        }
      }
    }

    @media (max-width: 768px) {
      .no-data {
        tr {
          border: none !important;
        }
      }

      th {
        display: none;
      }

      tr {
        margin-bottom: 16px;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
        background-color: #fff;
        border-radius: 8px;
        padding: 16px;

        td {
          display: block;
          span {
            display: block;
            font-size: 13px;
            font-weight: bold;
            margin-right: 10px;
          }
          &:first-child {
            background-color: #f9f9f9;
          }

          &::before {
            content: attr(data-label);
            font-weight: bold;
            margin-bottom: 8px;
            display: block;
          }
        }
      }
    }
  }

  .noData-content {
    position: absolute;
    width: 97%;
    margin: 19% auto;
    padding-right: 15px;
    padding-left: 15px;

    p {
      margin: 16px auto 24px;
    }
    button {
      display: block;
      margin: 10px auto;
    }
  }
}
</style>
