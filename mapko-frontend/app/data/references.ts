export interface Project {
  title: string
  category: string
  amount: string
  year: string
  status: 'En cours' | 'Terminé'
  country: string
  description: string
}

export const projects: Project[] = [
  {
    title: 'Projet Gazier d\'envergure',
    category: 'Énergie',
    amount: '> 30 M€',
    year: '2025',
    status: 'En cours',
    country: 'Sénégal',
    description: 'Structuration financière et levée de fonds pour un complexe gazier majeur.'
  },
  {
    title: 'Plateforme Logistique Régionale',
    category: 'Transport',
    amount: '> 80 M€',
    year: '2025',
    status: 'En cours',
    country: 'Togo',
    description: 'Conseil stratégique pour le développement d\'un hub logistique multimodal.'
  },
  {
    title: 'Complexe Immobilier de standing',
    category: 'Immobilier',
    amount: '> 50 M€',
    year: '2024',
    status: 'En cours',
    country: 'Côte d\'Ivoire',
    description: 'Assistance à la maîtrise d\'ouvrage et structuration de financement.'
  },
  {
    title: 'Modernisation Industrielle',
    category: 'Industrie',
    amount: '> 40 M€',
    year: '2022-2023',
    status: 'Terminé',
    country: 'Bénin',
    description: 'Audit opérationnel et plan de transformation pour un champion industriel local.'
  },
  {
    title: 'Projet Gazier & Pétrolier',
    category: 'Mines',
    amount: '50 M€',
    year: '2025',
    status: 'En cours',
    country: 'Niger',
    description: 'Accompagnement dans la levée de fonds et sécurisation des investissements.'
  },
  {
    title: 'Unité de Soins Pédiatriques',
    category: 'Santé',
    amount: '> 3 M€',
    year: '2021-2022',
    status: 'Terminé',
    country: 'Guinée',
    description: 'Étude de faisabilité et recherche de partenaires financiers.'
  }
]

export const timelineSteps = [
  { year: '2019', task: 'Création de Mapko & Partners' },
  { year: '2021', task: 'Expansion en Côte d\'Ivoire et au Bénin' },
  { year: '2023', task: 'Accompagnement de projets institutionnels majeurs' },
  { year: '2025', task: 'Leader de la structuration de fonds en Afrique de l\'Ouest' },
  { year: '2026', task: 'Vision 2026 : Partenaire de référence panafricain' }
]

export const domains = [
  'Stratégie', 'Finance', 'Risques', 'RH', 'Audit', 'Organisation', 'Gouvernance', 'SI'
]
