const routes = {
  mainPage: (): string => '/',
  postPage: (): string => '/post',
  api: (): string => 'https://jsonplaceholder.typicode.com/posts',
  img: (name: string): string => `/public/img/${name}.webp`,
};

export default routes;