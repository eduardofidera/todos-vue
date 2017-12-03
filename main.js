const app = new Vue({
  el: "#app",
  data: {
    todos: [],
    editTodo: null,
    url: "https://restful-api-sv.herokuapp.com/api/todos/"
  },
  methods: {
    updateTodo(todo){
      fetch(this.url, {
        body: JSON.stringify(todo),
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
      })
      .then(() => {
        this.editTodo = null;
        console.log(todo);
      })
    },
    deleteTodo(id, i){
      fetch(this.url + id, {
        method: "DELETE"
      })
      .then(() => {
        this.todos.splice(i, 1);
        console.log(id);
      })
    }
  },
  mounted(){
    fetch(this.url)
      .then(response => response.json())
      .then((res) => {
        this.todos = res.data.docs;
        console.log(res);
      })
    console.log("mounted");
    console.log(this.editTodo);
  },
  template:`
  <div>
    <li v-for="todo, i in todos">

    <div v-if="editTodo === todo._id">
      <input v-on:keyup.13="updateTodo(todo)" v-model="todo.title"/>
      <button v-on:click="editTodo = null">x</button>
      <button v-on:click="updateTodo(todo)">save</button>
    </div>

    <div v-else>
      <button v-on:click="editTodo = todo._id">edit</button>
      <button v-on:click="deleteTodo(todo._id, i)">X</button>
      {{todo.title}}
    </div>

    </li>
  </div>
  `,

});
