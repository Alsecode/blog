import {  useContext } from 'react';

import { ReactionContext, ReactionContextType } from '../context/ReactionProvider';

const useReactions = (): ReactionContextType => {
  const context = useContext(ReactionContext);
  if (!context) {
    throw new Error('Ошибка контекста!');
  }
  return context;
};

export default useReactions;