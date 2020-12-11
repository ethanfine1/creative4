import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mock from './mock.js'
import mock2 from './mock2.js'

let data = {
  topBooks: mock,
  toRead: mock2,
  currentID: 0,
  suggestions: [],
  getToRead(){
    return this.toRead;
  },
  getTopBooks(){
    return this.topBooks;
  },
  getSuggestions() {
    return this.suggestions;
  },
  addSuggestions(title, author, reasoning) {
    this.suggestions.push({
      id: this.currentID,
      title: title,
      author: author,
      reasoning: reasoning,
    });
    this.currentID += 1;
  }
}

new Vue({
  router,
  data: data,
  render: h => h(App)
}).$mount('#app')
