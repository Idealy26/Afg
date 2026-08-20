import type { Lang } from '@/lib/site-config'

export type Product = {
  id: string
  name: string
  tagline: string
  category: string
  variants?: string[]
  description: string
  origin: string
  characteristics: string
  uses: string
  availability: string
  image: string
}

type Dictionary = {
  nav: {
    about: string
    products: string
    madagascar: string
    process: string
    gallery: string
    faq: string
    contact: string
    quote: string
  }
  hero: {
    eyebrow: string
    title1: string
    title2: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    stats: { value: string; label: string }[]
  }
  about: {
    eyebrow: string
    title: string
    p1: string
    p2: string
    points: string[]
  }
  commitments: {
    eyebrow: string
    title: string
    subtitle: string
    items: { title: string; text: string }[]
  }
  products: {
    eyebrow: string
    title: string
    subtitle: string
    labelOrigin: string
    labelCharacteristics: string
    labelUses: string
    labelAvailability: string
    cta: string
    list: Product[]
  }
  madagascar: {
    eyebrow: string
    title: string
    p1: string
    items: { title: string; text: string }[]
  }
  process: {
    eyebrow: string
    title: string
    subtitle: string
    steps: { title: string; text: string }[]
  }
  certifications: {
    eyebrow: string
    title: string
    subtitle: string
    items: string[]
  }
  gallery: {
    eyebrow: string
    title: string
    subtitle: string
  }
  partners: {
    eyebrow: string
    title: string
    subtitle: string
    testimonials: { quote: string; author: string; role: string }[]
  }
  faq: {
    eyebrow: string
    title: string
    subtitle: string
    items: { q: string; a: string }[]
  }
  contact: {
    eyebrow: string
    title: string
    subtitle: string
    formName: string
    formCompany: string
    formEmail: string
    formCountry: string
    formProduct: string
    formVolume: string
    formMessage: string
    submit: string
    orContact: string
    whatsapp: string
    phone: string
    emailLabel: string
    addressLabel: string
    productPlaceholder: string
    successNote: string
  }
  footer: {
    tagline: string
    navTitle: string
    productsTitle: string
    contactTitle: string
    catalogue: string
    rights: string
    madeIn: string
  }
  floating: {
    whatsapp: string
    call: string
    email: string
  }
}

const fr: Dictionary = {
  nav: {
    about: 'Entreprise',
    products: 'Produits',
    madagascar: 'Madagascar',
    process: 'Qualité & Export',
    gallery: 'Galerie',
    faq: 'FAQ',
    contact: 'Contact',
    quote: 'Demander un devis',
  },
  hero: {
    eyebrow: 'Madagascar · Depuis 2025',
    title1: 'Le terroir malgache,',
    title2: 'exporté avec exigence.',
    subtitle:
      'Agrofrancegasy produit, sélectionne et exporte des produits agricoles d’exception — vanille Bourbon, girofle, cacao, poivre, café, miel et épices — pour les importateurs et distributeurs du monde entier.',
    ctaPrimary: 'Demander un devis',
    ctaSecondary: 'Découvrir nos produits',
    stats: [
      { value: 'Direct', label: 'relation producteurs' },
      { value: 'Sur mesure', label: 'volumes B2B' },
      { value: '8', label: 'filières premium' },
      { value: '100%', label: 'traçabilité' },
    ],
  },
  about: {
    eyebrow: 'L’entreprise',
    title: 'Le savoir-faire agricole de Madagascar, au service des marchés internationaux.',
    p1: 'Agrofrancegasy est une entreprise malgache spécialisée dans la production, la sélection rigoureuse et l’exportation de produits agricoles d’exception. Depuis notre région d’origine jusqu’aux ports internationaux, nous maîtrisons chaque étape de la chaîne de valeur.',
    p2: 'Notre engagement : offrir à nos partenaires importateurs une qualité constante, une traçabilité totale et une relation commerciale durable, fondée sur la confiance et l’authenticité du terroir malgache.',
    points: [
      'Sélection rigoureuse à la source',
      'Traçabilité de la plantation au conteneur',
      'Relations directes avec les producteurs',
      'Conformité aux normes d’export internationales',
    ],
  },
  commitments: {
    eyebrow: 'Nos engagements',
    title: 'Une exigence qui se cultive à chaque étape.',
    subtitle:
      'La qualité, la durabilité et le commerce responsable guident chacune de nos décisions.',
    items: [
      {
        title: 'Qualité premium',
        text: 'Un contrôle qualité strict et un tri manuel garantissent l’excellence de chaque lot exporté.',
      },
      {
        title: 'Traçabilité totale',
        text: 'Chaque produit est suivi de la plantation jusqu’à la livraison, en toute transparence.',
      },
      {
        title: 'Commerce responsable',
        text: 'Nous soutenons des rémunérations justes et des partenariats durables avec les producteurs locaux.',
      },
      {
        title: 'Durabilité',
        text: 'Des pratiques agricoles respectueuses de l’environnement et des écosystèmes malgaches.',
      },
    ],
  },
  products: {
    eyebrow: 'Nos produits',
    title: 'Une sélection d’exception, prête à l’export.',
    subtitle:
      'Des filières emblématiques de Madagascar, disponibles en volumes adaptés aux besoins B2B.',
    labelOrigin: 'Origine',
    labelCharacteristics: 'Caractéristiques',
    labelUses: 'Usages',
    labelAvailability: 'Disponibilité',
    cta: 'Demander un devis',
    list: [
      {
        id: 'vanille',
        name: 'Vanille Bourbon',
        tagline: 'L’or noir de Madagascar',
        category: 'Vanille',
        variants: ['Gousses', 'Poudre', 'Extrait'],
        description:
          'Notre vanille Bourbon est reconnue pour son taux de vanilline élevé et son arôme profond, fruit d’une préparation traditionnelle et d’un affinage patient.',
        origin: 'Région SAVA, Madagascar',
        characteristics: 'Gousses charnues, brillantes, 14–20 cm, taux d’humidité maîtrisé',
        uses: 'Pâtisserie, arômes, cosmétique, distillation',
        availability: 'Toute l’année · gousses, poudre, extrait',
        image: '/images/product-vanilla.png',
      },
      {
        id: 'girofle',
        name: 'Girofle',
        tagline: 'Puissance aromatique',
        category: 'Épices',
        variants: ['Clous entiers', 'Griffes'],
        description:
          'Clous de girofle séchés au soleil, riches en huile essentielle, sélectionnés pour leur intensité et leur régularité.',
        origin: 'Côte Est, Madagascar',
        characteristics: 'Clous entiers, riche en eugénol, calibrage homogène',
        uses: 'Épicerie, huiles essentielles, industrie agroalimentaire',
        availability: 'Récolte saisonnière · clous & griffes',
        image: '/images/product-clove.png',
      },
      {
        id: 'cacao',
        name: 'Cacao',
        tagline: 'Fèves fines et fruitées',
        category: 'Cacao & Café',
        variants: ['Fèves fermentées', 'Fèves séchées'],
        description:
          'Un cacao fin recherché pour ses notes fruitées et acidulées, issu de plantations sélectionnées de la région de l’Ambanja.',
        origin: 'Vallée du Sambirano, Madagascar',
        characteristics: 'Fèves fermentées, notes fruitées, faible amertume',
        uses: 'Chocolaterie fine, couverture, transformation',
        availability: 'Récolte saisonnière · fèves fermentées & séchées',
        image: '/images/product-cocoa.png',
      },
      {
        id: 'poivre',
        name: 'Poivre',
        tagline: 'Caractère et profondeur',
        category: 'Épices',
        variants: ['Noir', 'Blanc', 'Sauvage'],
        description:
          'Poivre noir sélectionné pour sa puissance aromatique et sa fraîcheur, cultivé dans le respect des méthodes traditionnelles.',
        origin: 'Côte Est, Madagascar',
        characteristics: 'Grains denses, calibre régulier, arôme pénétrant',
        uses: 'Épicerie, gastronomie, industrie',
        availability: 'Toute l’année · noir, blanc, sauvage',
        image: '/images/product-pepper.png',
      },
      {
        id: 'cafe',
        name: 'Café',
        tagline: 'Arômes d’altitude',
        category: 'Cacao & Café',
        variants: ['Arabica', 'Robusta'],
        description:
          'Un café cultivé en altitude, aux arômes équilibrés et à la belle acidité, disponible en vert pour la torréfaction.',
        origin: 'Hautes terres, Madagascar',
        characteristics: 'Arabica & Robusta, grains triés, profil équilibré',
        uses: 'Torréfaction, mélanges, spécialité',
        availability: 'Récolte saisonnière · café vert',
        image: '/images/product-coffee.png',
      },
      {
        id: 'miel',
        name: 'Miel naturel',
        tagline: 'Pureté du terroir',
        category: 'Miel',
        variants: ['Pots', 'Fûts'],
        description:
          'Un miel naturel récolté dans des zones préservées, non traité, aux arômes floraux caractéristiques de la flore malgache.',
        origin: 'Forêts & hauts plateaux, Madagascar',
        characteristics: 'Miel brut, non pasteurisé, arômes floraux',
        uses: 'Alimentation, cosmétique, transformation',
        availability: 'Saisonnière · pots & fûts',
        image: '/images/product-honey.png',
      },
      {
        id: 'epices',
        name: 'Épices',
        tagline: 'La palette de Madagascar',
        category: 'Épices',
        variants: ['Cannelle', 'Curcuma', 'Gingembre'],
        description:
          'Une gamme d’épices soigneusement sélectionnées : cannelle, curcuma, gingembre et autres trésors du terroir malgache.',
        origin: 'Diverses régions, Madagascar',
        characteristics: 'Épices entières & moulues, arômes intenses',
        uses: 'Agroalimentaire, épicerie fine, industrie',
        availability: 'Toute l’année · selon variété',
        image: '/images/product-spices.png',
      },
      {
        id: 'agroalimentaire',
        name: 'Produits agroalimentaires',
        tagline: 'Le meilleur du local',
        category: 'Agroalimentaire',
        description:
          'Une sélection de produits agroalimentaires locaux, transformés et conditionnés selon les standards de l’export international.',
        origin: 'Madagascar',
        characteristics: 'Produits sélectionnés, conditionnement export',
        uses: 'Distribution, transformation, retail',
        availability: 'Sur demande · volumes B2B',
        image: '/images/product-agrifood.png',
      },
    ],
  },
  madagascar: {
    eyebrow: 'Pourquoi Madagascar',
    title: 'Une île, un terroir unique au monde.',
    p1: 'Madagascar bénéficie de conditions climatiques et pédologiques rares qui confèrent à ses produits une signature aromatique inimitable. Un patrimoine naturel que nous valorisons avec exigence.',
    items: [
      {
        title: 'Un terroir d’exception',
        text: 'Sols volcaniques, microclimats variés et biodiversité unique au service de la qualité.',
      },
      {
        title: 'Un savoir-faire ancestral',
        text: 'Des générations de producteurs perpétuant des méthodes de culture reconnues mondialement.',
      },
      {
        title: 'Une renommée mondiale',
        text: 'La vanille et les épices de Madagascar figurent parmi les plus recherchées au monde.',
      },
    ],
  },
  process: {
    eyebrow: 'Qualité & Export',
    title: 'De la plantation au conteneur, une chaîne maîtrisée.',
    subtitle:
      'Un processus rigoureux qui garantit qualité, conformité et traçabilité à chaque étape.',
    steps: [
      {
        title: 'Sélection à la source',
        text: 'Partenariats directs avec les producteurs et sélection des meilleurs lots.',
      },
      {
        title: 'Contrôle qualité',
        text: 'Tri manuel, analyses et contrôles rigoureux avant conditionnement.',
      },
      {
        title: 'Conditionnement export',
        text: 'Emballage conforme aux normes internationales, préservant les arômes.',
      },
      {
        title: 'Logistique internationale',
        text: 'Expédition maîtrisée et documentation complète vers plus de 25 pays.',
      },
    ],
  },
  certifications: {
    eyebrow: 'Certifications',
    title: 'Des standards reconnus internationalement.',
    subtitle:
      'Nous travaillons dans le respect des normes de qualité et de sécurité exigées par nos partenaires. Espace réservé à nos certifications en cours et acquises.',
    items: [
      'Qualité & Sécurité alimentaire',
      'Agriculture responsable',
      'Traçabilité certifiée',
      'Conformité export',
    ],
  },
  gallery: {
    eyebrow: 'Galerie',
    title: 'Au cœur des plantations malgaches.',
    subtitle:
      'Immersion dans notre terroir, nos récoltes et notre savoir-faire.',
  },
  partners: {
    eyebrow: 'Ils nous font confiance',
    title: 'Des partenaires internationaux exigeants.',
    subtitle:
      'Importateurs, industriels et distributeurs s’appuient sur notre régularité et notre exigence.',
    testimonials: [
      {
        quote:
          'Une régularité de qualité remarquable et une traçabilité sans faille. Un partenaire de confiance sur le long terme.',
        author: 'Directeur des achats',
        role: 'Importateur · Europe',
      },
      {
        quote:
          'La vanille d’Agrofrancegasy répond parfaitement aux exigences de notre chocolaterie. Un service professionnel et réactif.',
        author: 'Responsable qualité',
        role: 'Industrie agroalimentaire · Amérique du Nord',
      },
      {
        quote:
          'Des volumes fiables et une communication claire à chaque commande. Exactement ce que nous attendons d’un exportateur.',
        author: 'Acheteur international',
        role: 'Distributeur · Asie',
      },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Vos questions, nos réponses.',
    subtitle: 'Tout ce que les importateurs et distributeurs doivent savoir.',
    items: [
      {
        q: 'Quels sont vos volumes minimums de commande ?',
        a: 'Nos volumes s’adaptent aux besoins B2B, de l’échantillon qualifié aux commandes en conteneur complet. Contactez-nous pour une offre sur mesure.',
      },
      {
        q: 'Assurez-vous la logistique et l’export ?',
        a: 'Oui. Nous gérons le conditionnement, la documentation d’export et la logistique internationale vers plus de 25 pays.',
      },
      {
        q: 'Proposez-vous des échantillons ?',
        a: 'Nous fournissons des échantillons qualifiés sur demande afin de valider la qualité avant toute commande.',
      },
      {
        q: 'Comment garantissez-vous la traçabilité ?',
        a: 'Chaque lot est suivi de la plantation au conteneur, avec une documentation complète disponible pour nos partenaires.',
      },
      {
        q: 'Sous quelles formes sont disponibles les produits ?',
        a: 'Selon les filières : gousses, poudres, extraits, fèves, grains verts, entiers ou moulus. Détails communiqués par produit.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Discutons de votre projet d’approvisionnement.',
    subtitle:
      'Demandez un devis ou contactez notre équipe export. Nous répondons sous 48 h ouvrées.',
    formName: 'Nom complet',
    formCompany: 'Entreprise',
    formEmail: 'Email professionnel',
    formCountry: 'Pays',
    formProduct: 'Produit d’intérêt',
    formVolume: 'Volume estimé',
    formMessage: 'Votre message',
    submit: 'Envoyer la demande',
    orContact: 'Ou contactez-nous directement',
    whatsapp: 'WhatsApp',
    phone: 'Téléphone',
    emailLabel: 'Email',
    addressLabel: 'Adresse',
    productPlaceholder: 'Sélectionnez un produit',
    successNote:
      'Votre messagerie va s’ouvrir avec la demande pré-remplie. Vous pouvez aussi nous écrire directement.',
  },
  footer: {
    tagline:
      'Producteur et exportateur de produits agricoles d’exception de Madagascar.',
    navTitle: 'Navigation',
    productsTitle: 'Produits',
    contactTitle: 'Contact',
    catalogue: 'Télécharger le catalogue',
    rights: 'Tous droits réservés.',
    madeIn: '',
  },
  floating: {
    whatsapp: 'Écrire sur WhatsApp',
    call: 'Appeler',
    email: 'Envoyer un email',
  },
}

const en: Dictionary = {
  nav: {
    about: 'Company',
    products: 'Products',
    madagascar: 'Madagascar',
    process: 'Quality & Export',
    gallery: 'Gallery',
    faq: 'FAQ',
    contact: 'Contact',
    quote: 'Request a quote',
  },
  hero: {
    eyebrow: 'Madagascar · Since 2025',
    title1: 'The Malagasy terroir,',
    title2: 'exported with rigour.',
    subtitle:
      'Agrofrancegasy grows, selects and exports exceptional agricultural products — Bourbon vanilla, clove, cocoa, pepper, coffee, honey and spices — for importers and distributors worldwide.',
    ctaPrimary: 'Request a quote',
    ctaSecondary: 'Explore our products',
    stats: [
      { value: 'Direct', label: 'producer relationships' },
      { value: 'Tailored', label: 'B2B volumes' },
      { value: '8', label: 'premium product lines' },
      { value: '100%', label: 'traceability' },
    ],
  },
  about: {
    eyebrow: 'The company',
    title: 'The agricultural know-how of Madagascar, serving international markets.',
    p1: 'Agrofrancegasy is a Malagasy company specialising in the production, rigorous selection and export of exceptional agricultural products. From our home region to international ports, we master every step of the value chain.',
    p2: 'Our commitment: to offer our importing partners consistent quality, full traceability and a lasting commercial relationship built on trust and the authenticity of the Malagasy terroir.',
    points: [
      'Rigorous selection at the source',
      'Traceability from plantation to container',
      'Direct relationships with producers',
      'Compliance with international export standards',
    ],
  },
  commitments: {
    eyebrow: 'Our commitments',
    title: 'A standard cultivated at every step.',
    subtitle:
      'Quality, sustainability and responsible trade guide every decision we make.',
    items: [
      {
        title: 'Premium quality',
        text: 'Strict quality control and manual sorting guarantee the excellence of every exported batch.',
      },
      {
        title: 'Full traceability',
        text: 'Every product is tracked from plantation to delivery, with complete transparency.',
      },
      {
        title: 'Responsible trade',
        text: 'We support fair remuneration and sustainable partnerships with local producers.',
      },
      {
        title: 'Sustainability',
        text: 'Farming practices that respect the environment and Madagascar’s ecosystems.',
      },
    ],
  },
  products: {
    eyebrow: 'Our products',
    title: 'An exceptional selection, export-ready.',
    subtitle:
      'Iconic Malagasy product lines, available in volumes tailored to B2B needs.',
    labelOrigin: 'Origin',
    labelCharacteristics: 'Characteristics',
    labelUses: 'Uses',
    labelAvailability: 'Availability',
    cta: 'Request a quote',
    list: [
      {
        id: 'vanille',
        name: 'Bourbon Vanilla',
        tagline: 'Madagascar’s black gold',
        category: 'Vanilla',
        variants: ['Pods', 'Powder', 'Extract'],
        description:
          'Our Bourbon vanilla is renowned for its high vanillin content and deep aroma, the result of traditional preparation and patient curing.',
        origin: 'SAVA region, Madagascar',
        characteristics: 'Plump, glossy pods, 14–20 cm, controlled moisture',
        uses: 'Pastry, flavourings, cosmetics, distillation',
        availability: 'Year-round · pods, powder, extract',
        image: '/images/product-vanilla.png',
      },
      {
        id: 'girofle',
        name: 'Clove',
        tagline: 'Aromatic intensity',
        category: 'Spices',
        variants: ['Whole cloves', 'Stems'],
        description:
          'Sun-dried cloves, rich in essential oil, selected for their intensity and consistency.',
        origin: 'East Coast, Madagascar',
        characteristics: 'Whole cloves, rich in eugenol, uniform grading',
        uses: 'Spices, essential oils, food industry',
        availability: 'Seasonal harvest · cloves & stems',
        image: '/images/product-clove.png',
      },
      {
        id: 'cacao',
        name: 'Cocoa',
        tagline: 'Fine, fruity beans',
        category: 'Cocoa & Coffee',
        variants: ['Fermented beans', 'Dried beans'],
        description:
          'A fine cocoa sought after for its fruity, tangy notes, from selected plantations of the Ambanja region.',
        origin: 'Sambirano Valley, Madagascar',
        characteristics: 'Fermented beans, fruity notes, low bitterness',
        uses: 'Fine chocolate, couverture, processing',
        availability: 'Seasonal harvest · fermented & dried beans',
        image: '/images/product-cocoa.png',
      },
      {
        id: 'poivre',
        name: 'Pepper',
        tagline: 'Character and depth',
        category: 'Spices',
        variants: ['Black', 'White', 'Wild'],
        description:
          'Black pepper selected for its aromatic power and freshness, grown following traditional methods.',
        origin: 'East Coast, Madagascar',
        characteristics: 'Dense grains, consistent calibre, penetrating aroma',
        uses: 'Spices, gastronomy, industry',
        availability: 'Year-round · black, white, wild',
        image: '/images/product-pepper.png',
      },
      {
        id: 'cafe',
        name: 'Coffee',
        tagline: 'High-altitude aromas',
        category: 'Cocoa & Coffee',
        variants: ['Arabica', 'Robusta'],
        description:
          'A high-altitude coffee with balanced aromas and lively acidity, available green for roasting.',
        origin: 'Highlands, Madagascar',
        characteristics: 'Arabica & Robusta, sorted beans, balanced profile',
        uses: 'Roasting, blends, specialty',
        availability: 'Seasonal harvest · green coffee',
        image: '/images/product-coffee.png',
      },
      {
        id: 'miel',
        name: 'Natural Honey',
        tagline: 'Purity of the terroir',
        category: 'Honey',
        variants: ['Jars', 'Drums'],
        description:
          'A natural honey harvested in preserved areas, untreated, with floral aromas characteristic of Malagasy flora.',
        origin: 'Forests & highlands, Madagascar',
        characteristics: 'Raw honey, unpasteurised, floral aromas',
        uses: 'Food, cosmetics, processing',
        availability: 'Seasonal · jars & drums',
        image: '/images/product-honey.png',
      },
      {
        id: 'epices',
        name: 'Spices',
        tagline: 'Madagascar’s palette',
        category: 'Spices',
        variants: ['Cinnamon', 'Turmeric', 'Ginger'],
        description:
          'A range of carefully selected spices: cinnamon, turmeric, ginger and other treasures of the Malagasy terroir.',
        origin: 'Various regions, Madagascar',
        characteristics: 'Whole & ground spices, intense aromas',
        uses: 'Food industry, fine grocery, industry',
        availability: 'Year-round · by variety',
        image: '/images/product-spices.png',
      },
      {
        id: 'agroalimentaire',
        name: 'Agri-food Products',
        tagline: 'The best of local',
        category: 'Agri-food',
        description:
          'A selection of local agri-food products, processed and packaged to international export standards.',
        origin: 'Madagascar',
        characteristics: 'Selected products, export packaging',
        uses: 'Distribution, processing, retail',
        availability: 'On request · B2B volumes',
        image: '/images/product-agrifood.png',
      },
    ],
  },
  madagascar: {
    eyebrow: 'Why Madagascar',
    title: 'One island, a terroir unlike any other.',
    p1: 'Madagascar enjoys rare climatic and soil conditions that give its products an inimitable aromatic signature — a natural heritage we cultivate with the utmost rigour.',
    items: [
      {
        title: 'An exceptional terroir',
        text: 'Volcanic soils, varied microclimates and unique biodiversity serving quality.',
      },
      {
        title: 'Ancestral know-how',
        text: 'Generations of producers perpetuating cultivation methods recognised worldwide.',
      },
      {
        title: 'Worldwide renown',
        text: 'Madagascar’s vanilla and spices are among the most sought-after in the world.',
      },
    ],
  },
  process: {
    eyebrow: 'Quality & Export',
    title: 'From plantation to container, a mastered chain.',
    subtitle:
      'A rigorous process that guarantees quality, compliance and traceability at every step.',
    steps: [
      {
        title: 'Selection at the source',
        text: 'Direct partnerships with producers and selection of the finest batches.',
      },
      {
        title: 'Quality control',
        text: 'Manual sorting, analysis and rigorous checks before packaging.',
      },
      {
        title: 'Export packaging',
        text: 'Packaging compliant with international standards, preserving the aromas.',
      },
      {
        title: 'International logistics',
        text: 'Mastered shipping and complete documentation to over 25 countries.',
      },
    ],
  },
  certifications: {
    eyebrow: 'Certifications',
    title: 'Internationally recognised standards.',
    subtitle:
      'We operate in compliance with the quality and safety standards required by our partners. Space reserved for our acquired and ongoing certifications.',
    items: [
      'Quality & Food Safety',
      'Responsible Agriculture',
      'Certified Traceability',
      'Export Compliance',
    ],
  },
  gallery: {
    eyebrow: 'Gallery',
    title: 'At the heart of the Malagasy plantations.',
    subtitle: 'An immersion into our terroir, our harvests and our know-how.',
  },
  partners: {
    eyebrow: 'Trusted by',
    title: 'Demanding international partners.',
    subtitle:
      'Importers, manufacturers and distributors rely on our consistency and rigour.',
    testimonials: [
      {
        quote:
          'Remarkable quality consistency and flawless traceability. A trusted long-term partner.',
        author: 'Head of Procurement',
        role: 'Importer · Europe',
      },
      {
        quote:
          'Agrofrancegasy’s vanilla perfectly meets the requirements of our chocolate house. Professional and responsive service.',
        author: 'Quality Manager',
        role: 'Food industry · North America',
      },
      {
        quote:
          'Reliable volumes and clear communication with every order. Exactly what we expect from an exporter.',
        author: 'International Buyer',
        role: 'Distributor · Asia',
      },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Your questions, answered.',
    subtitle: 'Everything importers and distributors need to know.',
    items: [
      {
        q: 'What are your minimum order volumes?',
        a: 'Our volumes adapt to B2B needs, from qualified samples to full-container orders. Contact us for a tailored offer.',
      },
      {
        q: 'Do you handle logistics and export?',
        a: 'Yes. We manage packaging, export documentation and international logistics to over 25 countries.',
      },
      {
        q: 'Do you offer samples?',
        a: 'We provide qualified samples on request so you can validate quality before any order.',
      },
      {
        q: 'How do you guarantee traceability?',
        a: 'Every batch is tracked from plantation to container, with full documentation available to our partners.',
      },
      {
        q: 'In what forms are the products available?',
        a: 'Depending on the line: pods, powders, extracts, beans, green grains, whole or ground. Details provided per product.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Let’s discuss your sourcing project.',
    subtitle:
      'Request a quote or reach our export team. We reply within 48 business hours.',
    formName: 'Full name',
    formCompany: 'Company',
    formEmail: 'Business email',
    formCountry: 'Country',
    formProduct: 'Product of interest',
    formVolume: 'Estimated volume',
    formMessage: 'Your message',
    submit: 'Send request',
    orContact: 'Or contact us directly',
    whatsapp: 'WhatsApp',
    phone: 'Phone',
    emailLabel: 'Email',
    addressLabel: 'Address',
    productPlaceholder: 'Select a product',
    successNote:
      'Your email client will open with the request pre-filled. You can also write to us directly.',
  },
  footer: {
    tagline:
      'Producer and exporter of exceptional agricultural products from Madagascar.',
    navTitle: 'Navigation',
    productsTitle: 'Products',
    contactTitle: 'Contact',
    catalogue: 'Download catalogue',
    rights: 'All rights reserved.',
    madeIn: 'Proudly grown in Madagascar',
  },
  floating: {
    whatsapp: 'Chat on WhatsApp',
    call: 'Call us',
    email: 'Send an email',
  },
}

export const dictionaries: Record<Lang, Dictionary> = { fr, en }
export type { Dictionary }