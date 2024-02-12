import { createContext, useState, useEffect, FC, ReactNode } from 'react';

import getRandom from  '../helpers/getRandom';

type SettedReaction = 'like' | 'dislike';

interface Reaction {
  likes: number,
  dislikes: number,
  likeClicked: boolean,
  dislikeClicked: boolean,
}

interface ReactionContextType {
  reactions: { [postId: number]: Reaction };
  updateReaction: (postId: number, reactionType: 'like' | 'dislike') => void;
}

const ReactionContext = createContext<ReactionContextType | undefined>(undefined);

interface ReactionProviderProps {
  postsCount: number;
  children: ReactNode;
}

const ReactionProvider: FC<ReactionProviderProps> = ({ children, postsCount }) => {
  const [reactions, setReactions] = useState<{ [postId: number]: Reaction }>({});

  useEffect(() => {
    const initialReactions: { [postId: number]: Reaction } = {};
    for (let i = 1; i <= postsCount; i++) {
      initialReactions[i] = {
        likes: getRandom(),
        dislikes: getRandom(),
        likeClicked: false,
        dislikeClicked: false,
      };
    }
    setReactions(initialReactions);
  }, [postsCount]);

  const handleLikeClick = ({likes, dislikes, likeClicked, dislikeClicked}: Reaction) => {
    let result: Reaction = { likes, dislikes, likeClicked, dislikeClicked }
    if (!likeClicked) {
      result = { likes: likes + 1, dislikes, likeClicked: true, dislikeClicked }
      if (dislikeClicked) {
        result = { likes: likes + 1, dislikes: dislikes - 1, likeClicked: true, dislikeClicked: false }
      }
    } else {
      result = { likes: likes - 1, dislikes, likeClicked: false, dislikeClicked }
    }
    return result;
  };

  const handleDislikeClick = ({likes, dislikes, likeClicked, dislikeClicked}: Reaction) => {
    let result: Reaction = { likes, dislikes, likeClicked, dislikeClicked }
    if (!dislikeClicked) {
      result = { likes, dislikes: dislikes + 1, likeClicked, dislikeClicked: true }
      if (likeClicked) {
        result = { likes: likes - 1, dislikes: dislikes + 1, likeClicked: false, dislikeClicked: true }
      }
    } else {
      result = { likes, dislikes: dislikes - 1, likeClicked, dislikeClicked: false }
    }
    return result;
  };

  const updateReaction = (postId: number, reactionType: SettedReaction) => {
    setReactions(prevState => ({
      ...prevState,
      [postId]: {
        ...(reactionType === 'like' ? handleLikeClick(prevState[postId]) : handleDislikeClick(prevState[postId])),
      },
    }));
  };

  const contextValue: ReactionContextType = {
    reactions,
    updateReaction,
  };

  return (
    <ReactionContext.Provider value={contextValue}>
      {children}
    </ReactionContext.Provider>
  );
};

export { ReactionProvider, ReactionContext };
export type { ReactionContextType };


