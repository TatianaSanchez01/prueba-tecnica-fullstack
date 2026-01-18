import ReactLoading from 'react-loading';

function Loading() {
  return (
    <div className='flex items-center justify-center'>
      <ReactLoading type='bubbles' color='#3B82F6' height='20%' width='20%' />
    </div>
  );
}

export default Loading;
