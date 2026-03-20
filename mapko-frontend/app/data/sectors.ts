export interface Sector {
  slug: string
  title: string
  tagline: string
  description: string
  image: string
  icon: string
  services: string[]
  details: string
}

export const sectors: Sector[] = [
  {
    slug: 'agro-business',
    title: 'Agro-business',
    tagline: 'Développement de projets et Financement agricole.',
    description: 'Le secteur agro-industriel est vital pour la sécurité alimentaire et la croissance économique durable en Afrique.',
    image: '/images/sector-agro.png',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2 13a10 10 0 0 1 10-10c.85 0 1.66.1 2.45.3a7 7 0 1 0-9.75 9.7A10.04 10.04 0 0 1 2 13Zm18 1a8 8 0 0 1-8 8c-.85 0-1.66-.1-2.45-.3a7 7 0 1 0 9.75-9.7c.45.79.7 1.71.7 2.7V14Z"/></svg>',
    services: ['Études de faisabilité agro-industrielle', 'Structuration de chaînes de valeur', 'Levée de fonds', 'Conseil en investissement durable'],
    details: 'MAPKO & Partners accompagne les investisseurs dans la structuration de projets agro-industriels intégrés.'
  },
  {
    slug: 'banque-finance-fintech',
    title: 'Banque & Finance',
    tagline: 'Due diligence et Conformité réglementaire.',
    description: 'Expertise pointue pour les institutions financières traditionnelles et les nouveaux acteurs du numérique.',
    image: '/images/hero-bg.jpg',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v1h20V7L12 2zm0 18l-10-5v2l10 5 10-5v-2l-10 5zM2 12h20v-2H2v2zm0-3h20V7H2v2z"/></svg>',
    services: ['Due diligence financière', 'Accompagnement BCEAO', 'Transformation digitale', 'Gestion des risques'],
    details: 'Nous aidons les banques et les fintechs à naviguer dans un environnement réglementaire complexe.'
  },
  {
    slug: 'energie-mines',
    title: 'Énergie & Mines',
    tagline: 'Conseil stratégique et Structuration financière.',
    description: 'Optimisation des ressources et transition énergétique pour un impact durable.',
    image: '/images/sector-energy.png',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
    services: ['Conseil en stratégie minière', 'Audit de contrats extractifs', 'Financement de projets', 'Transition renouvelable'],
    details: 'Nous apportons une expertise financière et stratégique pour maximiser la valeur des ressources naturelles.'
  },
  {
    slug: 'infrastructure',
    title: 'Infrastructure',
    tagline: 'PPP et Financement de projets d\'envergure.',
    description: 'Construire les bases du développement continental par des infrastructures résilientes.',
    image: '/images/a-propos.png',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.97 4.44a.99.99 0 0 1-.94 0l-7.97-4.44A1.01 1.01 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.97-4.44c.29-.16.63-.16.94 0l7.97 4.44c.32.17.53.5.53.88v9z"/></svg>',
    services: ['Montage PPP', 'Modélisation financière', 'Audit technique', 'Accompagnement AMO'],
    details: 'Mapko & Partners intervient sur des projets de ports, routes et zones industrielles.'
  },
  {
    slug: 'industrie',
    title: 'Industrie',
    tagline: 'Optimisation opérationnelle et Transformation.',
    description: 'Accélérer l\'industrialisation du continent par l\'excellence opérationnelle.',
    image: '/images/sector-energy.png',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2zm0 3.83L19.17 19H4.83L12 5.83z"/></svg>',
    services: ['Audit industriel', 'Lean Management', 'Développement industriel', 'Accompagnement export'],
    details: 'Nous accompagnons les champions industriels locaux dans leur montée en gamme régionale.'
  },
  {
    slug: 'numerique',
    title: 'Numérique & Tech',
    tagline: 'Accélération de la mutation technologique.',
    description: 'Transformer les défis technologiques en leviers de croissance.',
    image: '/images/a-propos.png',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></svg>',
    services: ['Schémas directeurs SI', 'Cybersécurité', 'Conseil Start-up', 'Gouvernance numérique'],
    details: 'Mapko met son expertise technologique au service de la souveraineté numérique africaine.'
  },
  {
    slug: 'eau-environement',
    title: 'Eau & Environnement',
    tagline: 'Gestion durable des ressources.',
    description: 'L\'accès à l\'eau potable et le traitement des déchets sont des enjeux majeurs.',
    image: '/images/sector-energy.png',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
    services: ['Audit réseaux d\'eau', 'Financement infrastructures hydrauliques', 'Conseil environnemental'],
    details: 'Nous accompagnons l\'optimisation des services de base pour les populations.'
  },
  {
    slug: 'sante',
    title: 'Santé',
    tagline: 'Modernisation des systèmes de soin.',
    description: 'Accompagner la montée en gamme des infrastructures sanitaires africaines.',
    image: '/images/a-propos.png',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/></svg>',
    services: ['PPP en santé', 'Audit hôpitaux', 'Politiques santé publique'],
    details: 'Mapko aide à la structuration de cliniques de référence sur le continent.'
  },
  {
    slug: 'education',
    title: 'Éducation',
    tagline: 'Investir dans le capital humain.',
    description: 'Le futur du continent passe par une éducation de qualité et adaptée.',
    image: '/images/a-propos.png',
    icon: '<svg xmlns="http://www.w3.org/2000/vue" viewBox="0 0 24 24" fill="currentColor"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>',
    services: ['Études éducation', 'Financement établissements', 'Formation professionnelle'],
    details: 'Nous conseillons l\'alignement des curriculums sur les besoins réels de l\'économie.'
  },
  {
    slug: 'transport-logistique',
    title: 'Transport & Logistique',
    tagline: 'Fluidifier les échanges régionaux.',
    description: 'Optimiser la connectivité pour soutenir la ZLECAf.',
    image: '/images/sector-agro.png',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM16 8h1.63L19.39 12h-3.39V8z"/></svg>',
    services: ['Audit logistique', 'Conseil fret', 'Infrastructures multimodales'],
    details: 'Nous couvrons toute la chaîne de valeur du transport continental.'
  },
  {
    slug: 'sport-loisirs',
    title: 'Sport & Loisirs',
    tagline: 'Le sport comme levier économique.',
    description: 'Structurer l\'économie du sport pour en faire un pôle de croissance.',
    image: '/images/a-propos.png',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>',
    services: ['Financement infrastructures', 'Gestion de stades', 'Marketing sportif'],
    details: 'Nous accompagnons la professionnalisation des ligues sportives africaines.'
  }
]
