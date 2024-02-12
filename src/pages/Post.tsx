import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Reaction from '../components/Reaction/Reaction.tsx';
import useReactions from '../hooks/useReactions.tsx';

import routes from '../routes.ts';

import './scss/Post.scss';

interface Post {
  userId: number,
  id: number,
  title: string,
  body: string,
}

const Post: React.FC<{ postId: number }> = ({ postId }) => {
  const { reactions } = useReactions();
  
  const [postData, setPostData] = useState<Post>({
    userId: 0,
    id: 0,
    title: '',
    body: '',
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${routes.api()}/${postId}`);
        const data = response.data;
        setPostData(data);
      } catch (error) {
        console.error('Ошибка при запросе данных:', error);
      }
    };

    fetchPosts();
  }, [postId]);

  if (Object.keys(reactions).length === 0) {
    console.log('fkkj');
    return null;
  }

  return (
    <div className='post'>
      <div className="post__header">
        <Link className='post__back-btn' to={routes.mainPage()}>
          <svg className='post__back-icon'>
            <use href='./img/sprites.svg#arrow'/>
          </svg>
          Вернуться к статьям
        </Link>
        <Reaction likesCount={reactions[postId].likes} dislikesCount={reactions[postId].dislikes} postId={postId}/>
      </div>
      <h1 className="post__title">{postData.title}</h1>
      <div className="post__content">
        <img className="post__image" src={routes.img(`article${postId}`)} alt="postImg"/>
        <p className="post__body">{postData.body}</p>
      </div>
    </div>
  );
};

export default Post;