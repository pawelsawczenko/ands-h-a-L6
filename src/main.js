// -- H / A - L6
//

const API = "https://jsonplaceholder.typicode.com/posts";

class DataHandler {
  _data = null;

  async fetchPost() {
    try {
      let responce = await fetch(API);

      if (!responce.ok) {
        throw new Error(responce.status);
      }

      this._data = await responce.json();
    } catch (error) {
      console.error(error);
    } finally {
      return "Fetching is done.";
    }
  }

  clearPosts() {
    this._data = null;
  }

  listPosts() {
    if (!this._data) return "No data. Fetch posts first";

    return this._data.toSorted((a, b) => a.title.localeCompare(b.title));
  }

  getPosts(id) {
    if (!this._data) return "No data. Fetch posts first";

    const filtered = this._data.find((post) => post.id === id);
    return filtered ? filtered : null;
  }
}

// testing
const dataHandler = new DataHandler();

console.log(dataHandler.listPosts());

try {
  let res = await dataHandler.fetchPost();
  console.log(res);
} catch (error) {
  console.error(error);
}

console.log(dataHandler._data);

console.log(dataHandler.listPosts());

console.log(dataHandler.getPosts(72));
console.log(dataHandler.getPosts("someId"));
