import Reaction from '../Reaction/Reaction';
import ReadMoreBtn from '../ReadMoreBtn/ReadMoreBtn';

import './PostCard.scss';

type PostProps = {
  title: string,
  likesCount: number,
  dislikesCount: number,
  imagePath: string,
  id: number,
}

const PostCard = ({ title, likesCount, dislikesCount, imagePath, id }: PostProps) => {
  return (
    <div className='post-card'>
      <img className='post-card__image' src={imagePath} alt='postImage'/>
      <div className="post-card__content">
        <div className="post-card__header">
          <p className="post-card__title">{title}</p>
        </div>
        <div className="post-card__footer">
          <Reaction likesCount={likesCount} dislikesCount={dislikesCount} postId={id} />
          <ReadMoreBtn postLink='#'/>
        </div>
      </div>
    </div>
  );
};

export default PostCard;