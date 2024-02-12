import { Link } from 'react-router-dom';

import './ReadMoreBtn.scss';

type ReadMoreBtnProps = {
  postLink: string,
}

const ReadMoreBtn = ({postLink}: ReadMoreBtnProps) => <Link className='read-more' to={postLink}>Читать далее</Link>;

export default ReadMoreBtn;