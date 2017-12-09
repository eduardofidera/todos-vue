<template>
  <div>
    <input v-model="newTodo.title" v-on:keyup.13="addTodo(newTodo)"/>
    <table class="table table-Striped">
      <thead>
        <th>Id</th><th>Title</th><th>Edit</th><th>Delete</th>
      </thead>
      <tbody>
        <tr v-for="todo, i in todos">
          <td>{{todo._id}}</td>
          <td v-if="editTodo === todo._id">
            <input v-on:keyup.13="updateTodo(todo)" v-model="todo.title"/>
            <button v-on:click="updateTodo(todo)">save</button>
          <td v-else>
            {{todo.title}}
          </td>
          <td v-if="editTodo === todo._id">
            <button v-on:click="editTodo = null">x</button>
          <td v-else>
            <button v-on:click="editTodo = todo._id">edit</button>
          </td>
          <td><button v-on:click="deleteTodo(todo._id, i)">X</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default{
  data(){
    return {
      todos: [],
      editTodo: null,
      newTodo: {
        "title": "",
      },
      url: "https://restful-api-sv.herokuapp.com/api/todos/"
    }
  },
  methods: {
    addTodo(newTodo){
      fetch(this.url, {
        body: JSON.stringify(newTodo),
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      })
      .then(response => response.json())
      .then((res) => {
        this.newTodo.title = '';
        this.todos.push(res.data);
        console.log(res);
      })
    },
    updateTodo(todo){
      fetch(this.url, {
        body: JSON.stringify(todo),
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
      })
      .then(() => {
        console.log(JSON.stringify(todo));
        this.editTodo = null;
        console.log(todo);
      })
    },
    deleteTodo(id, i){
      this.todos.splice(i, 1);
      fetch(this.url + id, {
        method: "DELETE"
      })
    },
  },
  mounted(){
    fetch(this.url)
      .then(response => response.json())
      .then((res) => {
        this.todos = res.data.docs;
        console.log(res);
      })
    console.log("mounted");
  }
}
</script>
<style lang="scss">
$table-line-color: #CCC5B9 !default;
.table {
  thead,
  tbody,
  tfoot {
    tr > th,
    tr > td {
      border-top: 1px solid $table-line-color;
    }
  }
  > thead > tr > th {
    border-bottom-width: 0;
    font-size: 1.25em;
    font-weight: 300;
  }

  .radio,
  .checkbox {
    margin-top: 0;
    margin-bottom: 22px;
    padding: 0;
    width: 15px;
  }
  > thead > tr > th,
  > tbody > tr > th,
  > tfoot > tr > th,
  > thead > tr > td,
  > tbody > tr > td,
  > tfoot > tr > td {
    padding: 12px;
    vertical-align: middle;
  }

  .th-description {
    max-width: 150px;
  }
  .td-price {
    font-size: 26px;
    font-weight: 300;
    margin-top: 5px;
    text-align: right;
  }
  .td-total {
    font-weight: bold;
    font-size: 1.25em;
    padding-top: 20px;
    text-align: right;
  }

  .td-actions .btn {

    &.btn-sm,
    &.btn-xs {
      padding-left: 3px;
      padding-right: 3px;
    }
  }

  > tbody > tr {
    position: relative;
  }
}

.table-striped {
  tbody > tr:nth-of-type(2n+1) {
    background-color: #fff;
  }
  tbody > tr:nth-of-type(2n) {
    background-color: #FFFCF5;
  }
  > thead > tr > th,
  > tbody > tr > th,
  > tfoot > tr > th,
  > thead > tr > td,
  > tbody > tr > td,
  > tfoot > tr > td {
    padding: 15px 8px;
  }
}

</style>
