export const formatAmount = (amount: number) => {
  const formattedAmount = new Intl.NumberFormat('es-CO', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  // Agregamos el signo "$" al inicio
  return `$${formattedAmount}`;
};
