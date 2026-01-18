function ForbiddenMessage() {
  return (
    <div className='flex items-center justify-center'>
      <h1 className='text-4xl text-gray-500'>
        No tienes permisos para acceder a esta página. Redirigiendo...
      </h1>
    </div>
  );
}

export default ForbiddenMessage;
