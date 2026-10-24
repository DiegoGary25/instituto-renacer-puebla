// Datos de contacto confirmados de Instituto Renacer.
export const contact = {
  phone: '+52 222 172 5326',
  whatsapp: '+522221725326',
  email: 'institutorenacerpuebla@gmail.com',
  address: 'Puebla',
  instagram: '',
}

export const whatsappUrl = contact.whatsapp
  ? `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Hola, me gustaría agendar una visita a Instituto Renacer.')}`
  : null
