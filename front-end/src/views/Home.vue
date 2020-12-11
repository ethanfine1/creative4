

<template>
<div>
<h1>Top Tier Tales</h1>
<hr>
<div class="wrapper">
  <div class="books">
    <div class="book" v-for="book in books" :key="book.id">
    <div class = "singleBook">
      <p class="title">{{book.title}}<p>
        <p class = "author">{{book.author}}</p>
      <div class="image">
        <img :src="book.path">
      </div>
      <p class="review">{{book.description}}</p>
    </div>
    </div>
  </div>
</div>
</div>
</template>

<style>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.title{
  margin: 0;
  font-size: 40px;
}
.author {
  margin-top: 0;
  font-size: 30px;
}
.book img {
  border: 2px solid #333;
  height: 250px;
  width: 150px;
  object-fit: cover;
}
.review {
  font-size: 20px;
}
.singleBook {
  border: 3px solid;
  width: 400px;
  background: white;
}
.img {
  width:10px;
  height: 10px;
}
  .books{
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>

<script>
import axios from 'axios';
export default {
  name: 'home',
  data() {
    return{
    books: [],
    }
  },
  created(){
    this.topBooks();
  },
  methods: {
    async topBooks() {
      let response = await axios.get("/api/books");
      this.books = response.data;
    }
  }
}
</script>
