// Hardcoded fake data for the demo

export const PERSONAS = {
  shelf: { name: "Andrea", context: "is at his local Carrefour. He picks up a jar of pasta sauce." },
  weekly: { name: "Andrea", context: "is planning the weekly shop. He has flyers from 4 supermarkets near him." },
  considered: { name: "Andrea", context: "is buying his first 4K TV. He's been researching for two weeks." },
};

// Stable image placeholders (Unsplash source URLs)
const img = (q, w = 320) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=${w}&q=70`;

export const SHELF = {
  product: {
    name: "Casa Verdi — Tomato & Basil Pasta Sauce",
    size: "400g",
    price: "€2.20",
    retailer: "Carrefour (this store)",
    image: img("photo-1757844742481-2213600e8d30"), // hand-held pasta sauce jar
  },
  score: {
    value: 42,
    label: "Mediocre",
    summary:
      "High sodium and contains additives flagged for limited evidence of safety.",
    reasons: [
      { text: "High sodium — 1.8g/100g", flag: "flagged" },
      { text: "Contains E471, E412", flag: "limited risk additives" },
      { text: "No organic certification", flag: null },
      { text: "Decent protein from tomatoes", flag: "positive" },
    ],
  },
  alternatives: [
    {
      name: "Mutti Pomodoro & Basilico",
      score: 84,
      label: "Excellent",
      tone: "green",
      price: "€2.40",
      retailer: "Carrefour (this store)",
      tag: "Lower sodium · No flagged additives",
      image: img("photo-1757844744408-35c93dccc738"),
    },
    {
      name: "Barilla Sugo Naturale",
      score: 76,
      label: "Good",
      tone: "lightgreen",
      price: "€1.95",
      retailer: "Conad, 800m away",
      tag: "Best price · Good profile",
      image: img("photo-1757844743623-b9dd9c2c03a5"),
    },
    {
      name: "Cirio Rustica",
      score: 71,
      label: "Good",
      tone: "lightgreen",
      price: "€2.10",
      retailer: "Esselunga, 1.2km away",
      tag: "Organic · No additives",
      image: img("photo-1757844743241-131209121009"),
    },
  ],
};

export const WEEKLY = {
  total: "€29.25",
  saving: "€5.20",
  items: [
    { name: "Pasta — Barilla 500g", retailer: "Conad", price: "€0.99", tagTone: "green", tag: "On promo — save €0.40", image: img("photo-1551462147-37885acc36f1") },
    { name: "Olive oil — 1L", retailer: "Carrefour", price: "€5.90", tagTone: "green", tag: "Lowest price this week", image: img("photo-1474979266404-7eaacbcd87c5") },
    { name: "Coffee beans — 500g", retailer: "Carrefour", price: "€4.20", tagTone: "gray", tag: "Your usual", image: img("photo-1559056199-641a0ac8b55e") },
    { name: "Greek yogurt — 4-pack", retailer: "Conad", price: "€2.49", tagTone: "green", tag: "On promo — save €0.80", image: img("photo-1571212515416-fef01fc43637") },
    { name: "Bananas — 1kg", retailer: "Lidl", price: "€1.20", tagTone: "gray", tag: "Cheapest", image: img("photo-1603833665858-e61d17a86224") },
    { name: "Toilet paper — 12-pack", retailer: "Conad", price: "€4.99", tagTone: "green", tag: "On promo — save €1.50", image: img("photo-1584556812952-905ffd0c611a") },
    { name: "Laundry detergent — 1.5L", retailer: "Carrefour", price: "€6.49", tagTone: "gray", tag: "Your usual brand on promo", image: img("photo-1610557892470-55d9e80c0bce") },
    { name: "Children's cereal — 500g", retailer: "Conad", price: "€2.99", tagTone: "amber", tag: "Lower-sugar alt suggested", image: img("photo-1521483451569-e33803c0330c") },
  ],
  plan:
    "Split between Conad (5 items, mostly the promos) and Carrefour (3 items, including your usual coffee). Skip Lidl this week — only bananas are meaningfully cheaper there, not worth the detour.",
};

export const TVS = [
  {
    name: "Hisense U7N 55\" QLED",
    score: 88,
    label: "Excellent",
    tone: "green",
    prices: "€749 at MediaMarkt · €779 at Unieuro · €799 at Amazon",
    tag: "Best picture quality in this price band",
    detail:
      "Full-array local dimming, 144Hz, Dolby Vision IQ. Reviewers consistently rank it above Samsung's Q60 at this price.",
    image: img("photo-1593359677879-a4bb92f829d1"),
  },
  {
    name: "TCL C805 55\"",
    score: 82,
    label: "Good",
    tone: "lightgreen",
    prices: "€699 at Trony · €729 at Mediaworld",
    tag: "Best value if brand isn't a priority",
    detail:
      "Mini-LED panel — usually a €1000+ feature. Slight weakness in motion handling, matters less for movies than gaming.",
    image: img("photo-1461151304267-38535e780c79"),
  },
  {
    name: "Samsung Q60D 55\"",
    score: 74,
    label: "Decent",
    tone: "amber",
    prices: "€779 at Unieuro · €799 at Euronics",
    tag: "Brand-name choice, but you can do better at this price",
    detail:
      "Edge-lit (not full array). Good app ecosystem. Hisense U7N outperforms it for €30 less.",
    image: img("photo-1571415060716-baff5f717068"),
  },
];
