import logo from './logo.svg';
import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  const baseURL = "https://jsonplaceholder.typicode.com/posts/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/1`);
        setPost(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  async function createPost() {
    try {
      const response = await axios.post(baseURL, {
        title: "Hello World!",
        body: "This is a new post by madhav."
      });
      setPost(response.data);
    } catch (error) {
      setError(error);
    }
  }

  async function updatePost() {
    try {
      const response = await axios.put(`${baseURL}/1`, {
        title: "Hello World!",
        body: "This is an updated post by Tech Holding."
      });
      setPost(response.data);
    } catch (error) {
      setError(error);
    }
  }

  async function deletePost() {
    try {
      await axios.delete(`${baseURL}/1`);
      alert("Post deleted!");
      setPost(null);
    } catch (error) {
      setError(error);
    }
  }

  if (error) {
    return (
      <div>
        <p>Error : {error.message}</p>
      </div>
    );
  }

  if (!post) return "No post!"
  
  return (
    <div className="App">
      {post ? (
        <>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <button onClick={createPost}>Create Post</button>
          <button onClick={updatePost} style={{ marginLeft: 5 }}>Update Post</button>
          <button onClick={deletePost} style={{ marginLeft: 5 }}>Delete Post</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
