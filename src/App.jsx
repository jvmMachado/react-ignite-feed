import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";

import './global.css';

import styles from './App.module.css';
import { useEffect, useState } from "react";


function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3333/posts')
      .then(response => response.json())
      .then((data) => setPosts(data));

    console.log('renderizou');
  }, []);

  return (
    <div>
      <Header></Header>

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) =>
            <Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
