


<template>
<div>
  <h1>Recommendations!</h1>
  <p class = "intro">If you have a book you love, please don't keep it to yourself! Leave the title author and some reasons why you enjoy the book below!
  (suggestions will be displayed under "My To Read")</p>
  <form v-if="creating" @submit.prevent="addSuggestion">
    <input v-model="title" placeholder="Title">
    <p></p>
    <input v-model="author" placeholder="Author">
    <p></p>
    <textarea v-model="reasoning" placeholder="Why you love this title!"></textarea>
    <br />
    <button type="submit">Recommend!</button>
  </form>
  <div v-else>
    <p>Thank you for the recommendations!</p>
    <p><a @click="toggleForm" href="#">Submit another recommendation</a></p>
  </div>
</div>
</template>

<style>
  .intro {
    font-size: 1.7em;
    margin-right: 100px;
    margin-left: 100px;
  }
  h1 {
    font-size: 2.5em;
  }
  input {
    font-size: 1.2em;
    height: 30px;
    width: 200px;
  }
  textarea {
    font-size: 1.6em;
    width: 100%;
    max-width: 500px;
    height: 100px;
  }
</style>

<script>
import axios from 'axios';
export default {
  name: 'create',
  data() {
    return {
      creating: true,
      title: '',
      author: '',
      reasoning: '',
    }
  },
  methods: {
    toggleForm() {
      this.creating = !this.creating;
    },
    async addSuggestion() {
      try {
        await axios.post('/api/recommendations', {
          title: this.title,
          author: this.author,
          description: this.reasoning,
        });
        this.title = '';
        this.author = '';
        this.reasoning = '';
      } catch (error) {
        //console.log(error);
      }
    },
  }
}
</script>
