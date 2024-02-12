import Reaction from '../Reaction/Reaction.tsx';
import ReadMoreBtn from '../ReadMoreBtn/ReadMoreBtn.tsx';

import routes from '../../routes.ts';

import './PostCard.scss';

type PostProps = {
  title: string,
  likesCount: number,
  dislikesCount: number,
  imagePath: string,
  body: string,
  id: number,
}

const PostCard = ({ title, likesCount, dislikesCount, imagePath, body, id }: PostProps) => {
  return (
    <div className='post-card post-card_first'>
      <img className='post-card__image' src={imagePath} alt='postImage'/>
      <div className="post-card__content">
        <div className="post-card__header">
          <p className="post-card__title">{title}</p>
          <Reaction likesCount={likesCount} dislikesCount={dislikesCount} postId={id}/>
        </div>
        <p className='post-card__body'>{body}</p>
        <div className="post-card__footer post-card__footer_end">
          <ReadMoreBtn postLink={routes.postPage()}/>
        </div>
      </div>
    </div>
  );
};

export default PostCard;