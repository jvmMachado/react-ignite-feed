import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";

import './global.css';

import styles from './App.module.css';
import { useEffect, useState } from "react";
import { IPost } from "./interfaces/IPost";


function App() {
  const [posts, setPosts] = useState([] as IPost[]);

  useEffect(() => {
    fetch('http://localhost:3333/posts')
      .then(response => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      <Header></Header>

      <div className={styles.wrapper}>
        <div className={styles.sidebarWrapper}>
          <Sidebar />
        </div>
        <main>
          {posts.map((post) =>
            <Post
              key={post.id}
              id={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
              comments={post.comments}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
