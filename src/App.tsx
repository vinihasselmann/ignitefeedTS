import { Post } from "./components/Post/Post";
import { Header } from "./components/Header/Header";
import { Sidebar } from "./components/Sidebar/Sidebar";

import "./global.css";
import styles from "./App.module.css";

const posts = [
  {
    id: 1,
    author : {
      avatarUrl: 'https://github.com/vinihasselmann.png',
      name: 'Vinicius Hasselmann',
      role: 'Fullstack developer'
    },
    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋'}, 
      {   type: 'paragraph',
          content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀 '},
      {type: 'link', content: 'vinihasselmann/doctorcare'},        
    ],
    publishedAt: new Date('2022-10-31 11:00:00')
  },
  {
    id: 2,
    author : {
      avatarUrl: 'https://github.com/diego3g.png',
      name: 'Diego Fernantes',
      role: 'CTO rocketseat'
    },
    content: [
      {type: 'paragraph', content: 'eai pessoal 👋'}, 
      {   type: 'paragraph',
          content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis nihil, '},
      {type: 'link', content: 'vinihasselmann/doctorcare'},        
    ],
    publishedAt: new Date('2022-10-20 11:00:00')
  },
]


export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        
        <Sidebar/>

        <main>
          {posts.map(post => {
            return (
            <Post
              key={post.id}
              author = {post.author}
              content = {post.content}
              publishedAt = {post.publishedAt}
              />
            )
          })}
        </main>
      </div>
    </div>
  );
}
