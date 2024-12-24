<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in tableData" :key="index">
        <td v-for="cell in row" :key="cell">
          {{ cell }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
defineProps<{
  headers: string[]
  tableData: string[][]
}>()
</script>

<style scoped>
.table {
  border: 1px solid #eee;
  table-layout: fixed;
  margin-bottom: 20px;
}
.table th {
  font-weight: bold;
  padding: 5px;
  background: #efefef;
  border: 1px solid #dddddd;
}
.table td {
  padding: 5px 10px;
  border: 1px solid #eee;
  text-align: left;
}
.table tbody tr:nth-child(odd) {
  background: #fff;
}
.table tbody tr:nth-child(even) {
  background: #f7f7f7;
}
</style>
