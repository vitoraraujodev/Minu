// Rua São Clemente, 114

export default function handleEstablishmentAddress(establishment) {
  const complementText = establishment.complement
    ? `, ${establishment.complement}`
    : '';

  return `${establishment.street}, ${establishment.address_number}${complementText}`;
}
