// Completa estos datos cuando Instituto Renacer los confirme.
export const contact = {
  phone: '',
  whatsapp: '',
  email: '',
  address: '',
  instagram: '',
}

export const whatsappUrl = contact.whatsapp
  ? `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hola, me gustaría agendar una visita a Instituto Renacer.')}`
  : null
