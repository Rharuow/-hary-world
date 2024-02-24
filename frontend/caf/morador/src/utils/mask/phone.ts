export const phoneMask = (phone: string) => {
  // Remove todos os caracteres não numéricos
  phone = phone.replace(/\D/g, "");

  // Aplica a máscara
  phone = phone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");

  return phone;
};
