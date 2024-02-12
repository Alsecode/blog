import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ReactionProvider } from './context/ReactionProvider.tsx';

import routes from './routes';

import Main from './pages/Main.tsx';
import Post from './pages/Post.tsx';

const App = () => {
  return (
    <ReactionProvider postsCount={5}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.mainPage()} element={<Main />} />
          <Route path={routes.postPage()} element={<Post postId={1} />} />
        </Routes>
      </BrowserRouter>
    </ReactionProvider>
  );
};

export default App
