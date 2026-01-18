export const formatDate = (isoString: string) => {
  const date = new Date(isoString)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}
