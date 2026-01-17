export const formatAmount = (amount: number) => {
  const formattedAmount = new Intl.NumberFormat('es-CO', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount); // Aseguramos que sea positivo antes de formatearlo

  // Si el monto es negativo, agregamos el signo "-"
  return `$${formattedAmount}`;
};

// Formatear el monto a pesos colombianos
