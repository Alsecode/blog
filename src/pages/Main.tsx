import { useEffect, useState } from 'react';
import axios from 'axios';

import routes from '../routes.ts';
import useReactions from '../hooks/useReactions.tsx';

import PostCard from '../components/PostCard/PostCard';
import MainPost from '../components/PostCard/MainPost';

import './scss/Main.scss';

interface Post {
  userId: number,
  id: number,
  title: string,
  body: string,
}

const Main = () => {
  const { reactions } = useReactions();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const postsQuantity = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url = routes.api();
        if (searchValue) {
          url += `?title=${encodeURIComponent(searchValue)}`;
        }
        const response = await axios.get(url);
        const data = response.data.slice(0, postsQuantity);
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error('Ошибка при запросе данных:', error);
      }
    };

    fetchPosts();
  }, [searchValue]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchValue(event.target.value);
    const filtered = posts.filter(post => post.title === event.target.value);
    setFilteredPosts(filtered);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return (
    <div className="main">
      <h1 className="main__title">Блог</h1>
      <p className="main__paragraph">
        Здесь мы делимся интересными кейсами из наших проектов, пишем про IT, а
        также переводим зарубежные статьи
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <svg className="form__icon">
          <use href="./img/sprites.svg#search" />
        </svg>
        <input
          value={searchValue}
          onChange={handleSearchChange}
          className="form__search"
          placeholder="Поиск по названию статьи"
        ></input>
      </form>
      
      <div className="cards main__cards">
      {filteredPosts.map((post, index) => {
        if (index === 0) {
          return (
            <MainPost
              title={post.title}
              likesCount={reactions[post.id].likes}
              dislikesCount={reactions[post.id].dislikes}
              imagePath={routes.img(`article${post.id}`)}
              body={post.body}
              id={post.id}
              key={post.id}
          /> 
          )
        }
        return (
          <PostCard
            title={post.title}
            likesCount={reactions[post.id].likes}
            dislikesCount={reactions[post.id].dislikes}
            imagePath={routes.img(`article${post.id}`)}
            id={post.id}
            key={post.id}
          />
        )
      })}
      </div>
    </div>
  );
};

export default Main;
