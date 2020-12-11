<template>
<div class="all">
<div>
    <h1>Add to my To reads here</h1>
    <p></p>
    <input v-model="title" placeholder="Title">
    <p></p>
    <input v-model="author" placeholder="author">
    <p></p>
    <textarea v-model="description" placeholder="review"></textarea>
    <br />
    <fieldset>
          <div class="photoInput" @click="choosePhoto">
            <img v-if="url" :src="url" />
            <div v-if="!url" class="placeholder">
              Choose a cover photo
            </div>
            <input class="fileInput" ref="fileInput" type="file" @input="fileChanged">
          </div>
          <p v-if="error" class="error">{{error}}</p>
        </fieldset>
    <fieldset class="buttons">
        <button type="submit" @click="upload" class="pure-button pure-button-primary right">Upload</button>
      </fieldset>
</div>
<div>
    <h1>Edit my to reads here</h1>
    <p></p>
    <div class="form">
      <input v-model="findTitle" @click="show()" placeholder="Search">
      <div class="suggestions" id="1" v-if="suggestions.length > 0">
        <div  class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
        </div>
      </div>
    </div>
    <div class="upload" v-if="findItem">
      <input v-model="findItem.title">
      <p></p>
      <input v-model="findItem.author">
      <p></p>
      <textarea v-model="findItem.description"></textarea>
      <p></p>
      <img :src="findItem.path" />
    </div>
    <div class="actions" v-if="findItem">
      <button @click="deleteItem(findItem)">Delete</button>
      <button @click="editItem(findItem)">Edit</button>
      <button @click="close()">Close</button>
    </div>
</div>

</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Myadmin',
  data() {
    return {
      findTitle: '',
      findItem: null,
      title: '',
      author: '',
      description: '',
      url: '',
      file: null,
      error: '',
      items: [],
      books: [],
    }
  },
  created(){
    this.topBooks();
  },
  computed: {
    suggestions() {
      let items = this.books.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return items.sort((a, b) => a.title > b.title);
    }
  },
  methods: {
    async editItem(item) {
      try {
        await axios.put("/api/toRead/" + item._id, {
          title: this.findItem.title,
          description: this.findItem.description,
          author: this.findItem.author,
        });
        this.findItem = null;
        this.topBooks();
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    async deleteItem(item) {
      try {
      await axios.delete("/api/toRead/" + item._id);
      this.findItem = null;
      this.topBooks();
      return true;
    } catch (error) {
      console.log(error);
    }
    },
    close() {
      this.findItem = null;
    },
    show() {
      var e = document.getElementById("1");
      if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
      var e = document.getElementById("1");
      if(e.style.display == 'none')
          e.style.display = 'block';
       else
          e.style.display = 'none';
    },
    async topBooks() {
      let response = await axios.get("/api/toRead");
      this.books = response.data;
  },
    fileChanged(event) {
      this.file = event.target.files[0];
      this.url = URL.createObjectURL(this.file);
    },
    toggleForm() {
      this.creating = !this.creating;
    },
    choosePhoto() {
        this.$refs.fileInput.click()
      },
      async upload() {
        try {
          const formData = new FormData();
          formData.append('photo', this.file, this.file.name);
          formData.append('title', this.title);
          formData.append('author', this.author);
          formData.append('description', this.description);
          await axios.post("/api/toRead", formData);
          this.file = null;

          this.url = "";
          this.title = "";
          this.author = "";
          this.description = "";
          this.topBooks();
          this.$emit('uploadFinished');
        } catch (error) {
          this.error = "Error: " + error.response.data.message;
        }
      }
  }
}
</script>

<style scoped>
.form {
  margin-bottom: 50px;
}
.suggestions {
  width: 200px;
  margin: auto;
}

.suggestion {
  font-size: 1.2em;
  height: 30px;
  width: 200px;
  min-height: 20px;
  border: .10px solid #ccc;
}
.upload img {
  border: 2px solid #333;
  height: 250px;
  width: 150px;
  object-fit: cover;
}
.photoInput img {
  border: 2px solid #333;
  height: 250px;
  width: 150px;
  object-fit: cover;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
.all {
  display: flex;
}
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
