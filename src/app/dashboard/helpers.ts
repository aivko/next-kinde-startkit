export const LABEL_STATUSES = {
  submitted: 'Inviato',
  progress: 'In lavorazione',
  accepted: 'Accettata',
  rejected: 'Rifiutata',
  activate: 'Attiva',
}

export const LABEL_COLORS = {
  submitted: 'default',
  progress: 'primary',
  accepted: 'success',
  rejected: 'error',
  activate: 'secondary',
}

export const LABEL_BG_COLORS = {
  submitted: 'rgba(0, 0, 0, 0.08)',
  progress: '#635bff',
  accepted: '#15b79f',
  rejected: '#f04438',
  activate: '#32383e',
}

export const setStatusLabel = (status: string) => {
  return LABEL_STATUSES[status]
}

export const setStatusColors = (status: string) => {
  return LABEL_COLORS[status]
}

export const setStatusIconsColors = (status: string) => {
  return LABEL_BG_COLORS[status]
}