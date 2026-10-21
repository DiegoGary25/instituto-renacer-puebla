// Datos de contacto confirmados de Instituto Renacer.
export const contact = {
  phone: '+52 222 653 5528',
  whatsapp: '+522226535528',
  email: '',
  address: 'Puebla',
  instagram: '',
}

export const whatsappUrl = contact.whatsapp
  ? `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hola, me gustaría agendar una visita a Instituto Renacer.')}`
  : null
