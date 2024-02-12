import useReactions from '../../hooks/useReactions';

import './Reaction.scss';

type ReactionProps = {
  likesCount: number,
  dislikesCount: number,
  postId: number,
}

const Reaction = ({ likesCount, dislikesCount, postId }: ReactionProps) => {
  const { reactions, updateReaction } = useReactions();

  return (
    <div className='reactions'>
      <div className='reactions__item'>
        <button className='reactions__button' onClick={() => updateReaction(postId, 'like')}>
          <svg className={`reactions__icon ${reactions[postId].likeClicked ? 'reactions__icon_liked' : ''}`}>
            <use href='../public/img/sprites.svg#like' />
          </svg>
        </button>
        <span>{likesCount}</span>
      </div>
      <div className='reactions__item'>
        <button className='reactions__button' onClick={() => updateReaction(postId, 'dislike')}>
          <svg className={`reactions__icon ${reactions[postId].dislikeClicked ? 'reactions__icon_disliked' : ''}`}>
            <use href='../public/img/sprites.svg#dislike' />
          </svg>
        </button>
        <span>{dislikesCount}</span>
      </div>
    </div>
  );
};

export default Reaction;