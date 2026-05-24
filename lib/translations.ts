export type Lang = "en" | "fr";

export type Translation = {
  nav: { home: string; sheet: string; tuto: string; admin: string; cta: string };
  hero: {
    badge: string;
    t1: string;
    t2: string;
    sub: string;
    cta1: string;
    cta2: string;
    note: string;
  };
  stats: [string, string][];
  latest: { t: string; s: string; btn: string };
  sheet: {
    t: string;
    s: string;
    req: string;
    search: string;
    all: string;
    new: string;
    old: string;
    top: string;
    go: string;
    empty: string;
    error: string;
    retry: string;
    count: string;
    available: string;
  };
  tuto: {
    t: string;
    s: string;
    steps: { t: string; d: string }[];
    videoLabel: string;
    cta: string;
    start: string;
  };
  admin: {
    t: string;
    ph: string;
    btn: string;
    wrong: string;
    addT: string;
    fn: string;
    fc: string;
    fr: string;
    fp: string;
    fl: string;
    fi: string;
    sub: string;
    list: string;
    del: string;
    noimg: string;
    saving: string;
    deling: string;
  };
  popup: {
    label: string;
    t1: string;
    t2: string;
    s1: { t: string; s: string };
    s2: { t: string; s: string };
    s3: { t: string; s: string };
    join: string;
    rate: string;
    cta: string;
    skip: string;
    already: string;
  };
  finalCta: { t: string; s: string; btn: string };
  ft: string;
};

export const translations: Record<Lang, Translation> = {
  en: {
    nav: {
      home: "Home",
      sheet: "Spreadsheet",
      tuto: "Tutorial",
      admin: "Admin",
      cta: "Join & Get Coupons",
    },
    hero: {
      badge: "Trusted Reps · Real Prices",
      t1: "The Best Chinese Reps,",
      t2: "Curated For You.",
      sub: "Browse 400+ verified products from trusted sellers. Sign up via our link and unlock 700€ in LoveGoBuy coupons.",
      cta1: "Get 700€ in Coupons",
      cta2: "Browse Spreadsheet",
      note: "Free to join · Instant access",
    },
    stats: [
      ["400+", "Products"],
      ["250K+", "Users"],
      ["700€", "Coupons"],
      ["4.8", "Rating"],
    ] as [string, string][],
    latest: {
      t: "Latest Drops",
      s: "Fresh picks added recently",
      btn: "View All Products",
    },
    sheet: {
      t: "Spreadsheet",
      s: "Curated finds from trusted sellers",
      req: "Request an item",
      search: "Search products, brands...",
      all: "All",
      new: "Newest First",
      old: "Oldest First",
      top: "Top Rated",
      go: "View Product",
      empty: "No products found.",
      error: "Could not load products. Make sure you ran the SQL setup.",
      retry: "Retry",
      count: "products",
      available: "Items Available",
    },
    tuto: {
      t: "How It Works",
      s: "Order from China in 3 simple steps",
      steps: [
        {
          t: "Create your account",
          d: "Sign up on LoveGoBuy via our link to unlock 700€ in welcome coupons instantly.",
        },
        {
          t: "Find your product",
          d: "Browse our spreadsheet, grab the product link, and paste it into the LoveGoBuy search bar.",
        },
        {
          t: "Place your order",
          d: "Select your size, pay, and track your package. Shipping to France takes 7–14 days on average.",
        },
      ],
      videoLabel: "Watch the full tutorial",
      cta: "Open LoveGoBuy",
      start: "Start Tutorial",
    },
    admin: {
      t: "Admin Panel",
      ph: "Password",
      btn: "Unlock",
      wrong: "Wrong password",
      addT: "Add Product",
      fn: "Product name",
      fc: "Category",
      fr: "Rating (0–5)",
      fp: "Price (e.g. ¥299)",
      fl: "LoveGoBuy link",
      fi: "Upload Image",
      sub: "Add Product",
      list: "Products",
      del: "Delete",
      noimg: "No image selected",
      saving: "Saving...",
      deling: "...",
    },
    popup: {
      label: "DVXD × LOVEGOBUY",
      t1: "ORDER FROM CHINA",
      t2: "IN 3 SIMPLE STEPS",
      s1: { t: "Watch the Tutorial", s: "2-min breakdown of how it works" },
      s2: { t: "Create Free Account", s: "Sign up & unlock 700€ in coupons" },
      s3: { t: "Build Your Haul", s: "Browse 400+ verified products" },
      join: "250,000+ people signed up",
      rate: "4.8  Google Play Store",
      cta: "Start Tutorial",
      skip: "Skip to Spreadsheet",
      already: "Skip — I already know how",
    },
    finalCta: {
      t: "Ready to start your haul?",
      s: "Join 250,000+ users already saving with LoveGoBuy. 700€ in welcome coupons drops the second you sign up.",
      btn: "Claim Your 700€",
    },
    ft: "DvxdR3ps — Curated reps for real ones.",
  },
  fr: {
    nav: {
      home: "Accueil",
      sheet: "Spreadsheet",
      tuto: "Tutoriel",
      admin: "Admin",
      cta: "Rejoindre & Coupons",
    },
    hero: {
      badge: "Reps Vérifiées · Vrais Prix",
      t1: "Les Meilleures Reps Chinoises,",
      t2: "Sélectionnées Pour Toi.",
      sub: "Plus de 400 produits vérifiés chez des vendeurs de confiance. Inscris-toi via notre lien et débloque 700€ de coupons LoveGoBuy.",
      cta1: "Obtenir 700€ de Coupons",
      cta2: "Voir la Spreadsheet",
      note: "Gratuit · Accès immédiat",
    },
    stats: [
      ["400+", "Produits"],
      ["250K+", "Utilisateurs"],
      ["700€", "Coupons"],
      ["4.8", "Note"],
    ] as [string, string][],
    latest: {
      t: "Derniers Ajouts",
      s: "Sélection récente",
      btn: "Voir Tous les Produits",
    },
    sheet: {
      t: "Spreadsheet",
      s: "Sélection de vendeurs de confiance",
      req: "Demander un article",
      search: "Rechercher produits, marques...",
      all: "Tout",
      new: "Plus Récents",
      old: "Plus Anciens",
      top: "Mieux Notés",
      go: "Voir le Produit",
      empty: "Aucun produit trouvé.",
      error: "Impossible de charger les produits. Vérifie ta config SQL.",
      retry: "Réessayer",
      count: "produits",
      available: "Articles Disponibles",
    },
    tuto: {
      t: "Comment Ça Marche",
      s: "Commander depuis la Chine en 3 étapes simples",
      steps: [
        {
          t: "Crée ton compte",
          d: "Inscris-toi sur LoveGoBuy via notre lien pour débloquer immédiatement 700€ de coupons de bienvenue.",
        },
        {
          t: "Trouve ton produit",
          d: "Parcours notre spreadsheet, copie le lien du produit et colle-le dans la barre de recherche LoveGoBuy.",
        },
        {
          t: "Passe ta commande",
          d: "Choisis ta taille, paye et suis ton colis. La livraison en France prend en moyenne 7 à 14 jours.",
        },
      ],
      videoLabel: "Regarder le tutoriel complet",
      cta: "Ouvrir LoveGoBuy",
      start: "Commencer le Tutoriel",
    },
    admin: {
      t: "Panneau Admin",
      ph: "Mot de passe",
      btn: "Déverrouiller",
      wrong: "Mot de passe incorrect",
      addT: "Ajouter un Produit",
      fn: "Nom du produit",
      fc: "Catégorie",
      fr: "Note (0–5)",
      fp: "Prix (ex. ¥299)",
      fl: "Lien LoveGoBuy",
      fi: "Importer une Image",
      sub: "Ajouter",
      list: "Produits",
      del: "Supprimer",
      noimg: "Aucune image",
      saving: "Enregistrement...",
      deling: "...",
    },
    popup: {
      label: "DVXD × LOVEGOBUY",
      t1: "COMMANDER DEPUIS LA CHINE",
      t2: "EN 3 ÉTAPES SIMPLES",
      s1: {
        t: "Regarder le Tutoriel",
        s: "2 min pour comprendre comment ça marche",
      },
      s2: {
        t: "Créer un Compte Gratuit",
        s: "Inscris-toi & débloque 700€ de coupons",
      },
      s3: { t: "Construire ton Haul", s: "Parcourir 400+ produits vérifiés" },
      join: "250 000+ inscrits",
      rate: "4.8  Google Play Store",
      cta: "Commencer le Tutoriel",
      skip: "Aller à la Spreadsheet",
      already: "Passer — Je sais déjà",
    },
    finalCta: {
      t: "Prêt à commencer ton haul?",
      s: "Rejoins les 250 000+ utilisateurs qui économisent déjà avec LoveGoBuy. 700€ de coupons dès l'inscription.",
      btn: "Récupérer mes 700€",
    },
    ft: "DvxdR3ps — Reps sélectionnées pour les vrais.",
  },
};
