
import TopBar from './TopBar';
import AlertDialog from './AlertDialog';

import '../scss/base.scss';

export default function Base(props: { children: any}) {
  return (
    <div className='container-fluid base'>
      <TopBar />       
      <AlertDialog />
      { props.children }
    </div>
  )
}