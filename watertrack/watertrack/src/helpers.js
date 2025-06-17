// Pure Function
export const calculateTotal = (logs) =>
  logs.reduce((acc, log) => acc + log.amount, 0)
