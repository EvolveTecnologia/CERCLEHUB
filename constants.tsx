import { Category, Course } from './types';

// URLs de vidéos pour démonstration
const GENERIC_VIDEO = 'https://www.youtube.com/watch?v=p3Qec3Rl_s4';
const TECH_VIDEO = 'https://youtu.be/gHO2AvpyScI';
const ENV_VIDEO = 'https://youtu.be/zKYqE-Zg_78';
const LANG_VIDEO = 'https://www.youtube.com/watch?v=juK8O_IuIcI';

const EJA_PDF_URL = 'https://educapes.capes.gov.br/bitstream/capes/583371/2/produto-caderno-de-alfabetizacao.pdf';

// --- 📘 ÉDUCATION & COMPÉTENCES FONDAMENTALES ---
const EDUCACAO_COURSES: Course[] = [
  {
    id: 'formation-adultes-francais-maths',
    title: 'Formation Continue - Français Professionnel & Mathématiques Pratiques',
    category: Category.Educacao,
    description: 'Renforcement en expression écrite, communication formelle et calculs fondamentaux pour adultes. Développez une autonomie solide pour votre carrière professionnelle.',
    instructor: 'Prof. Sylvie Kalala & Équipe Pédagogique',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop',
    progress: 15,
    duration: '120h',
    modulesCount: 2,
    materials: [
      { id: 'mat-fr-1', title: 'Livret Pédagogique - Expression Écrite & Mathématiques Pratiques', type: 'pdf', url: EJA_PDF_URL, isDownloaded: false }
    ],
    quiz: [
      { id: 1, question: "Quelle est la structure recommandée d'un compte-rendu professionnel ?", options: ["Introduction, faits marquants, recommandations", "Uniquement des chiffres sans texte", "Signature sans mention de date", "Aucune formalité requise"], correctAnswer: 0 },
      { id: 2, question: "Dans le calcul d'un pourcentage commercial (ex: TVA 16%), comment applique-t-on le taux ?", options: ["Multiplication par 0,16", "Division par 16", "Addition de 16 sans unité", "Soustraction directe"], correctAnswer: 0 },
      { id: 3, question: "Quel est l'objectif premier d'une communication professionnelle assertifiée ?", options: ["Éviter tout dialogue", "Transmettre une information claire avec respect et précision", "Imposer un avis unilatéral", "Ignorer les retours d'équipe"], correctAnswer: 1 }
    ],
    modules: [
      { 
        title: 'Module 1 : Maîtrise du Français Professionnel', 
        lessons: [
          { id: 'fr-prof-1', title: 'Communication Écrite & Rédaction de Notes de Service', duration: '15 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=BffHzt-XnWc' },
          { id: 'fr-prof-2', title: 'Vocabulaire Administratif et Synthèse d\'Idées', duration: '18 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=IvhYpvklKx8' },
          { id: 'fr-prof-3', title: 'Prise de Parole Assertive en Réunion d\'Équipe', duration: '12 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=S3vskTw_vqE' },
          { id: 'fr-prof-4', title: 'Conception de Rapports et Procès-Verbaux Clairs', duration: '20 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=I_Wcj3ISIUM' }
        ] 
      },
      { 
        title: 'Module 2 : Mathématiques & Calculs Quotidiens', 
        lessons: [
          { id: 'fr-mat-1', title: 'Opérations Commerciales, Marges et Pourcentages', duration: '22 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=0HqY7Ja5nXM' },
          { id: 'fr-mat-2', title: 'Gestion de Budgets d\'Exploitation Simples', duration: '25 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=DSfFuhzOzQc' },
          { id: 'fr-mat-3', title: 'Statistiques Clés et Tableaux de Bord Visuels', duration: '19 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=8ERcGZWTzlw' }
        ] 
      }
    ]
  },
  {
    id: 'mathematiques-industrie-logistique',
    title: 'Mathématiques Appliquées à l\'Industrie et à la Logistique',
    category: Category.Educacao,
    description: 'Calculs de conversion métrique, gestion des volumes, calcul de charges, lecture de plans et résolution logique dans les opérations de transport et d\'entrepôt.',
    instructor: 'Ing. Gilbert Mwamba',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '60h',
    modulesCount: 3,
    modules: [
      { title: 'Métrologie et Mesures Industrielles', lessons: [{ id: 'mi1', title: 'Unités de Mesure & Étalonnage', duration: '30 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'communication-ethique-travail',
    title: 'Communication Professionnelle et Éthique en Entreprise',
    category: Category.Educacao,
    description: 'Postures déontologiques, esprit d\'équipe, communication bienveillante, résolution pacifique des conflits et culture de sécurité au travail.',
    instructor: 'Dre Chantal Masika',
    thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '40h',
    modulesCount: 2,
    modules: [
      { title: 'Éthique Professionnelle', lessons: [{ id: 'ce1', title: 'Comportement Corporatif & Rigueur', duration: '15 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'lecture-documents-techniques',
    title: 'Lecture et Interprétation de Documents Techniques & Normes',
    category: Category.Educacao,
    description: 'Comprendre et appliquer les modes opératoires standardisés (SOP), fiches de sécurité et cahiers des charges techniques.',
    instructor: 'Ing. Charles Ilunga',
    thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '40h',
    modulesCount: 2,
    modules: [
      { title: 'Normes Techniques', lessons: [{ id: 'lt1', title: 'Normes Internationales & Procédures', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'redaction-excellence',
    title: 'Maîtrise de la Rédaction Stratégique et Argumentative',
    category: Category.Educacao,
    description: 'Structure dissertative, esprit critique, rigueur stylistique, cohérence des idées et techniques de persuasion écrite pour concours et rapports décisionnels.',
    instructor: 'Prof. Alain Pamba',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '40h',
    modulesCount: 3,
    modules: [
      { 
        title: 'Structure Textuelle', 
        lessons: [
          { id: 'red1', title: 'Problématique et Formulation de Thèse', duration: '25 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=bL_ZInyK0bg' },
          { id: 'red2', title: 'Développement Structuré et Démonstration', duration: '30 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=IWSpgkX79oE' },
          { id: 'red3', title: 'Conclusion et Recommandations Pratiques', duration: '25 min', completed: false, videoUrl: 'https://www.youtube.com/watch?v=CkIWaxFtLrM' }
        ] 
      }
    ]
  },
  {
    id: 'prepa-concours-examens',
    title: 'Grand Cycle de Préparation aux Concours et Examens d\'État',
    category: Category.Educacao,
    description: 'Révision intensive pluridisciplinaire : Mathématiques, Sciences physiques, SVT, Économie et Culture générale africaine.',
    instructor: 'Corps Professoral Cercle Hub',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '18h',
    modulesCount: 1,
    modules: [
      { 
        title: 'Masterclass Pluridisciplinaire', 
        lessons: [
          { id: 'rev1', title: 'Biologie & Écosystèmes Tropicaux', duration: '1:22:26', completed: false, videoUrl: 'https://www.youtube.com/watch?v=7LG4D_USSrU' },
          { id: 'rev2', title: 'Physique Appliquée & Mécanique', duration: '1:16:26', completed: false, videoUrl: 'https://www.youtube.com/watch?v=Go4K2QwKWIk' },
          { id: 'rev3', title: 'Mathématiques Supérieures & Fonctions', duration: '1:56:45', completed: false, videoUrl: 'https://www.youtube.com/watch?v=3qRrVvMntok' }
        ] 
      }
    ]
  }
];

// --- 🌎 LANGUES & CULTURES ---
const IDIOMAS_COURSES: Course[] = [
  {
    id: 'anglais-industrie-commerce',
    title: 'Anglais Professionnel pour l\'Industrie & le Commerce International',
    category: Category.Idiomas,
    description: 'Vocabulaire commercial, chaîne logistique, sécurité et échanges avec les partenaires internationaux anglophones.',
    instructor: 'Sarah Jenkins, MBA',
    thumbnail: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '80h',
    modulesCount: 4,
    modules: [
      { title: 'Technical English', lessons: [{ id: 'ii1', title: 'Industrial Safety & Logistics Terms', duration: '20 min', completed: false, videoUrl: LANG_VIDEO }] }
    ]
  },
  {
    id: 'anglais-relations-clients',
    title: 'Anglais pour l\'Accueil, les Services et le Protocole Commercial',
    category: Category.Idiomas,
    description: 'Communication fluide pour l\'hôtellerie, les hubs de transit, les délégations d\'affaires et le service client.',
    instructor: 'Michael O\'Connor',
    thumbnail: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '60h',
    modulesCount: 3,
    modules: [
      { title: 'Customer Excellence', lessons: [{ id: 'ip1', title: 'Greetings, Support & International Etiquette', duration: '15 min', completed: false, videoUrl: LANG_VIDEO }] }
    ]
  },
  {
    id: 'espagnol-affaires',
    title: 'Espagnol des Affaires & Relations Internationales',
    category: Category.Idiomas,
    description: 'Négociation, correspondance commerciale et immersion professionnelle avec les marchés hispanophones.',
    instructor: 'Prof. Javier Morales',
    thumbnail: 'https://images.unsplash.com/photo-1555448248-2571daf6344b?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1555448248-2571daf6344b?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '60h',
    modulesCount: 3,
    modules: [
      { title: 'Negocios Globales', lessons: [{ id: 'en1', title: 'Presentación Profesional y Contratos', duration: '20 min', completed: false, videoUrl: LANG_VIDEO }] }
    ]
  },
  {
    id: 'culture-diversite-entreprise',
    title: 'Culture d\'Entreprise, Inclusion et Leadership Diversifié',
    category: Category.Idiomas,
    description: 'Favoriser l\'inclusion, dépasser les biais culturels et instaurer un climat professionnel harmonieux.',
    instructor: 'Experts RH Amanitech',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&auto=format&fit=crop',
    progress: 0,
    duration: '40h',
    modulesCount: 2,
    modules: [
      { title: 'Diversité et Valeurs', lessons: [{ id: 'cd1', title: 'Collaboration Interservices', duration: '25 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'communication-interculturelle-afrique',
    title: 'Communication Interculturelle et Diplomatie d\'Affaires en Afrique',
    category: Category.Idiomas,
    description: 'Comprendre les codes relationnels, la diplomatie d\'affaires et la négociation dans la zone de libre-échange continentale (ZLECAF).',
    instructor: 'Conseillère Elena Kanku',
    thumbnail: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '40h',
    modulesCount: 2,
    modules: [
      { title: 'Diplomatie Économique', lessons: [{ id: 'ci1', title: 'Protocoles et Négociations Régionales', duration: '30 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  }
];

// --- 🌱 ENVIRONNEMENT & DURABILITÉ ---
const SUSTENTABILIDADE_COURSES: Course[] = [
  {
    id: 'bassin-congo-vr',
    title: 'Le Bassin du Congo en Réalité Virtuelle 360°',
    category: Category.Sustentabilidade,
    description: 'Une immersion inédite au cœur du deuxième poumon vert de la planète. Découvrez la biodiversité, les tourbières et les enjeux cruciaux de conservation en RDC.',
    instructor: 'Équipe Expéditions Cercle Hub',
    thumbnail: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '20 min',
    modulesCount: 1,
    modules: [
      { 
        title: 'Exploration Immersive', 
        lessons: [
          { id: 'amz-vr-1', title: 'Immersion 360º : La Grande Canopée Congolaise', duration: '15 min', completed: false, videoUrl: 'https://youtu.be/nBu7XuYqg78' }
        ] 
      }
    ]
  },
  {
    id: 'gestion-environnementale-industrie',
    title: 'Gestion Environnementale et RSE Appliquée aux Industries',
    category: Category.Sustentabilidade,
    description: 'Évaluation des impacts, bilans carbone, gestion des rejets et normes ISO 14001 appliquées aux unités de transformation.',
    instructor: 'Ing. Marina Mbombo',
    thumbnail: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '60h',
    modulesCount: 3,
    modules: [
      { title: 'Impacts et Gestion', lessons: [{ id: 'ea1', title: 'Cycle de Vie Industriel & Émissions', duration: '25 min', completed: false, videoUrl: ENV_VIDEO }] }
    ]
  },
  {
    id: 'gestion-dechets-economie-circulaire',
    title: 'Gestion des Déchets Industriels et Économie Circulaire',
    category: Category.Sustentabilidade,
    description: 'Tri sélectif, valorisation des sous-produits, recyclage des plastiques et circuits courts de revalorisation à Kinshasa.',
    instructor: 'Dr. Joseph Tshilenge',
    thumbnail: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '60h',
    modulesCount: 3,
    modules: [
      { title: 'Traitement des Déchets', lessons: [{ id: 'gr1', title: 'Valorisation Énergétique & Recyclage', duration: '30 min', completed: false, videoUrl: ENV_VIDEO }] }
    ]
  },
  {
    id: 'surveillance-eau-climat',
    title: 'Surveillance Communautaire de l\'Eau et du Climat',
    category: Category.Sustentabilidade,
    description: 'Lecture d\'indicateurs écologiques, protection des bassins versants du Fleuve Congo et veille citoyenne.',
    instructor: 'Équipe Environnementale RDC',
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '40h',
    modulesCount: 2,
    modules: [
      { title: 'Indicateurs Hydrologiques', lessons: [{ id: 'ma1', title: 'Qualité de l\'Eau et Analyse de Risques', duration: '20 min', completed: false, videoUrl: ENV_VIDEO }] }
    ]
  },
  {
    id: 'criteres-esg-afrique',
    title: 'Normes ESG et Investissement Responsable en Afrique Centrale',
    category: Category.Sustentabilidade,
    description: 'Critères Environnementaux, Sociaux et de Gouvernance pour attirer les investissements éthiques et partenaires institutionnels.',
    instructor: 'Cabinet ESG Amanitech',
    thumbnail: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '40h',
    modulesCount: 2,
    modules: [
      { title: 'Piliers ESG', lessons: [{ id: 'esg1', title: 'Alignement Stratégique & Reporting', duration: '15 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'restauration-terres-agroforesterie',
    title: 'Restauration des Écosystèmes et Agroforesterie Communautaire',
    category: Category.Sustentabilidade,
    description: 'Techniques de régénération des sols érodés, reforestation d\'essences endémiques et création de valeur bioéconomique.',
    instructor: 'Biologiste Marc Ntumba',
    thumbnail: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '60h',
    modulesCount: 3,
    modules: [
      { title: 'Régénération Végétale', lessons: [{ id: 'ra1', title: 'Plantes Pionnières et Fixatrices d\'Azote', duration: '25 min', completed: false, videoUrl: ENV_VIDEO }] }
    ]
  }
];

// --- 💻 TECHNOLOGIE & INNOVATION DIGITALE ---
const TECH_COURSES: Course[] = [
  {
    id: 'informatique-bureautique-digitale',
    title: 'Informatique Professionnelle & Outils Collaboratifs Cloud',
    category: Category.Tecnologia,
    description: 'Traitement de texte, tableurs avancés, messagerie professionnelle et organisation du travail à distance.',
    instructor: 'Anderson Bope, Lead Tech',
    thumbnail: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '80h',
    modulesCount: 4,
    modules: [
      { title: 'Suite Bureautique', lessons: [{ id: 'ib1', title: 'Tableaux Croisés et Formules Avancées', duration: '30 min', completed: false, videoUrl: TECH_VIDEO }] }
    ]
  },
  {
    id: 'industrie-40-iot',
    title: 'Industrie 4.0, Automatisation & Objets Connectés (IoT)',
    category: Category.Tecnologia,
    description: 'Capteurs intelligents, télémesure, maintenance prédictive et automatisation des processus industriels modernes.',
    instructor: 'Alex Rivera, Expert Automatismes',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '60h',
    modulesCount: 3,
    modules: [
      { title: 'Fondements IoT', lessons: [{ id: 'i401', title: 'Réseaux de Capteurs Industriels', duration: '20 min', completed: false, videoUrl: TECH_VIDEO }] }
    ]
  },
  {
    id: 'operateur-systemes-supervision',
    title: 'Supervision Industrielle et Systèmes SCADA',
    category: Category.Tecnologia,
    description: 'Pilotage d\'interfaces homme-machine (IHM), gestion des alarmes opérationnelles et contrôle temps réel.',
    instructor: 'Ing. Fabrice Mutombo',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '80h',
    modulesCount: 4,
    modules: [
      { title: 'Systèmes SCADA', lessons: [{ id: 'os1', title: 'Interfaces de Contrôle et Télésurveillance', duration: '30 min', completed: false, videoUrl: TECH_VIDEO }] }
    ]
  },
  {
    id: 'cybersecurite-protection-donnees',
    title: 'Cybersécurité & Protection des Actifs Numériques',
    category: Category.Tecnologia,
    description: 'Prévention des attaques phishing, sécurisation des mots de passe, conformité légale et hygiène informatique en entreprise.',
    instructor: 'Équipe Cyber Amanitech',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '40h',
    modulesCount: 2,
    modules: [
      { title: 'Sécurité Réseau', lessons: [{ id: 'si1', title: 'Défense contre l\'Ingénierie Sociale', duration: '15 min', completed: false, videoUrl: TECH_VIDEO }] }
    ]
  },
  {
    id: 'algorithmes-programmation-web',
    title: 'Algorithmique & Initiation au Développement Logiciel',
    category: Category.Tecnologia,
    description: 'Principes de base du codage, structure de données, HTML/CSS/JavaScript et réalisation de premières applications.',
    instructor: 'Marcos Codjo, Développeur Fullstack',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '80h',
    modulesCount: 4,
    modules: [
      { title: 'Logique Algorithmique', lessons: [{ id: 'pb1', title: 'Variables, Boucles et Conditions', duration: '25 min', completed: false, videoUrl: TECH_VIDEO }] }
    ]
  }
];

// --- 🌾 AGROALIMENTAIRE & PRODUCTION ---
const ALIMENTOS_COURSES: Course[] = [
  {
    id: 'hygiene-securite-alimentaire-haccp',
    title: 'Normes HACCP et Bonnes Pratiques d\'Hygiène Alimentaire',
    category: Category.Alimentos,
    description: 'Protocoles sanitaires, conservation des denrées, traçabilité et conformité pour l\'hôtellerie et l\'industrie agroalimentaire.',
    instructor: 'Dr. Anne-Marie Lokonda',
    thumbnail: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '40h',
    modulesCount: 2,
    modules: [
      { title: 'Hygiène Fondamentale', lessons: [{ id: 'bp1', title: 'Prévention des Contaminations Croisées', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'agroecologie-cultures-vivrieres',
    title: 'Agroécologie et Cultures Vivrières en Milieu Tropical',
    category: Category.Alimentos,
    description: 'Techniques d\'enrichissement du sol sans engrais chimiques, gestion de l\'arrosage et accès aux coopératives de vente.',
    instructor: 'Ing. Agronome Jean Kasongo',
    thumbnail: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '80h',
    modulesCount: 4,
    modules: [
      { title: 'Pratiques Agricoles', lessons: [{ id: 'af1', title: 'Compostage et Régénération Biologique', duration: '30 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'pisciculture-eau-douce',
    title: 'Pisciculture Continentale & Élevage en Bassin',
    category: Category.Alimentos,
    description: 'Élevage de tilapias et poissons-chats (clarias), alimentation naturelle et gestion de la qualité de l\'eau.',
    instructor: 'Spécialiste Aquacole Cercle Hub',
    thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '60h',
    modulesCount: 3,
    modules: [
      { title: 'Conception des Bassins', lessons: [{ id: 'pb1', title: 'Oxygénation et Densité d\'Alevinage', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'transformation-locale-manioc-fruits',
    title: 'Transformation Locale : Valorisation du Manioc, Maïs et Fruits',
    category: Category.Alimentos,
    description: 'Fabrication de farines panifiables, conserves naturelles, jus pasteurisés et emballages écoresponsables.',
    instructor: 'Chef Émile Nzuzi',
    thumbnail: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?q=80&w=400&auto=format&fit=crop',
    progress: 0,
    duration: '60h',
    modulesCount: 3,
    modules: [
      { title: 'Techniques de Transformation', lessons: [{ id: 'ac1', title: 'Déshydratation et Meunerie Hygiénique', duration: '25 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'securite-nutrition-communautaire',
    title: 'Nutrition Familiale & Sécurité Alimentaire Communautaire',
    category: Category.Alimentos,
    description: 'Équilibre diététique avec les produits locaux du marché et éducation nutritionnelle pour les foyers.',
    instructor: 'Nutritionniste Grâce Banza',
    thumbnail: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '40h',
    modulesCount: 2,
    modules: [
      { title: 'Équilibre Nutritionnel', lessons: [{ id: 'sn1', title: 'Macro et Micronutriments Locaux', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  }
];

// --- 📊 GESTION & ENTREPRENEURIAT ---
const GESTAO_COURSES: Course[] = [
  {
    id: 'entrepreneuriat-business-plan',
    title: 'Création d\'Entreprise & Business Model Innovant',
    category: Category.Gestao,
    description: 'Structurer son projet, valider son étude de marché, bâtir un Business Model Canvas et obtenir ses premiers clients.',
    instructor: 'Patrick Mukendi, Directeur Incubation',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '60h',
    modulesCount: 3,
    modules: [
      { title: 'Plan d\'Affaires', lessons: [{ id: 'el1', title: 'Méthode Lean Startup et Validation Marché', duration: '30 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'gestion-financiere-pme',
    title: 'Gestion Financière et Trésorerie pour TPE & PME',
    category: Category.Gestao,
    description: 'Tenue de caisse, calcul du seuil de rentabilité, fixation des prix de vente et maîtrise du besoin en fonds de roulement.',
    instructor: 'Expert-Comptable Richard Mayala',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '60h',
    modulesCount: 3,
    modules: [
      { title: 'Trésorerie d\'Entreprise', lessons: [{ id: 'gf1', title: 'Plan de Financement et Maîtrise des Dépenses', duration: '25 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'gouvernance-cooperatives',
    title: 'Gouvernance des Coopératives et Associations Solidaires',
    category: Category.Gestao,
    description: 'Statuts juridiques, organisation collégiale des assemblées et gestion transparente des fonds communs.',
    instructor: 'Conseiller Juridique Amanitech',
    thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '40h',
    modulesCount: 2,
    modules: [
      { title: 'Organisation Collective', lessons: [{ id: 'ca1', title: 'Règlements Intérieurs et Vote Équitable', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'fournisseurs-grands-comptes',
    title: 'Accès aux Marchés Publics et Fourniture aux Grands Comptes',
    category: Category.Gestao,
    description: 'Répondre aux appels d\'offres, formaliser les dossiers d\'agrément et respecter les exigences de conformité et d\'éthique.',
    instructor: 'Consultant Achats Stratégiques',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '40h',
    modulesCount: 2,
    modules: [
      { title: 'Dossiers d\'Appel d\'Offres', lessons: [{ id: 'fi1', title: 'Cahier des Charges et Proposition Commerciale', duration: '20 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  },
  {
    id: 'marketing-digital-reseaux-sociaux',
    title: 'Marketing Digital, Vente Sociale et Visibilité en Ligne',
    category: Category.Gestao,
    description: 'Développer sa marque sur les réseaux sociaux, prospection commerciale sur WhatsApp Business et fidélisation client.',
    instructor: 'Vanessa Luboya, Stratège Digitale',
    thumbnail: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=400&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1200&auto=format&fit=crop',
    progress: 0,
    duration: '60h',
    modulesCount: 3,
    modules: [
      { title: 'Stratégie de Contenu', lessons: [{ id: 'md1', title: 'Acquisition Client & WhatsApp Marketing', duration: '30 min', completed: false, videoUrl: GENERIC_VIDEO }] }
    ]
  }
];

export const COURSES: Course[] = [
  ...EDUCACAO_COURSES,
  ...IDIOMAS_COURSES,
  ...TECH_COURSES,
  ...SUSTENTABILIDADE_COURSES,
  ...ALIMENTOS_COURSES,
  ...GESTAO_COURSES
];
