
import TopBar from './TopBar';

import '../scss/base.scss';

export default function Base(props: { children: any}) {
  return (
    <div className='container-fluid base'>
      <TopBar />       
      { props.children }
    </div>
  )
}