<template>
  <div class='container'>
    <h1>Latest Task</h1>
    <div class="create-post">
      <label for="create-post">Say Something...</label>
      <input type="text" id="create-post" v-model="task" placeholder="Create a Task">
      <button v-on:click="createTask">Post!</button>
    </div>
    <hr>
    <p class='error' v-if='error'>{{error}}</p>
    <div class="posts-container">
      <div class="post"
      v-for="(post,index) in posts"
      v-bind:item = "post"
      v-bind:index="index"
      v-bind:key="post._id"
      v-on:dblclick="deleteTask(post._id)">
        {{`${post.dateCreated.getDate()}/${post.dateCreated.getMonth()}/
        ${post.dateCreated.getFullYear()}`}}
        <p class="text">{{post.task}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import TaskService from '../TaskService'
export default {
  name:"TaskComponent",
  data(){
    return{
      posts:[],
      error:'',
      task:''
    }
  },
  async created(){
    try{
      this.posts = await TaskService.getTasks();
    }catch(err){
      this.error = err.message
    }
  },
  methods:{
    async createTask(){
      await TaskService.insertTask(this.task);
      this.posts = await TaskService.getTasks();
    },
    async deleteTask(id){
      console.log("task deleted")
      await TaskService.deleteTask(id);
      this.posts = await TaskService.getTasks();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container{
  max-width: 800px;
  margin:0 auto;

}
p.error{
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}
div.post{
  position: relative;
  border:1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}
div.created-at{
  position: absolute;
  top: 0;
  left:0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color:white;
  font-size: 13px;
}
p.text{
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
