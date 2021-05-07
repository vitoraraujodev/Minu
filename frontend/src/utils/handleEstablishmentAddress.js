// Rua São Clemente, 114 702 bloco 1

export default function handleEstablishmentAddress(address = {}) {
  if (!address) return 'Endereço indisponível';

  const complementText = address.complement ? `, ${address.complement}` : '';

  return `${address.street}, ${address.number}${complementText}`;
}
