export type Product = {
  id: string
  nameDarija: string
  price: number
  descriptionDarija: string
  featuresDarija: string[]
  image: string
  videoUrl?: string
  categoryDarija: string
  statNumber: string
  statLabel: string
  tagline: string
}

export const PACK_SHIPPING_FEE = 120

export const products: Product[] = [
  {
    id: "car-vacuum",
    nameDarija: "مكنسة سيارة قوية 4 فـ 1",
    price: 55,
    descriptionDarija:
      "مع هاد المكنسة غادي تنقي طوموبيلك فدقائق بلا تعب. الغبرة، الوسخ، بقايا الماكلة… كلشي كيتحيد بسهولة حتى من أصعب البلايص. صغيرة وخفيفة، ديما معاك فالكار.",
    featuresDarija: [
      "تنظيف سريع بلا مجهود",
      "كتوصل حتى للزوايا الضيقة",
      "خفيفة وسهلة التخزين",
      "مثالية للاستعمال اليومي",
      "كتخلي طوموبيلك ديما نقية",
    ],
    image: "/products/cleaner-4-in-1.webp",
    videoUrl: "/products/vacuum-4in-1.mp4",
    categoryDarija: "تنظيف",
    statNumber: "9000 Pa",
    statLabel: "قوة شفط عالية",
    tagline: "نقاوة ديما معاك فالكار",
  },

  {
    id: "fast-charger",
    nameDarija: "شاحن سيارة سريع 120W",
    price: 40,
    descriptionDarija:
      "عمّر تيليفونك فـ الطريق بلا ما تبقى تقلق. شحن سريع بزاف، وغادي يخليك ديما connecté حتى فالسفر الطويل. فيه شاشة كتوريك حالة البطارية فـ أي وقت.",
    featuresDarija: [
      "شحن سريع فـ وقت قياسي",
      "ما يبقاش تيليفونك يطفى",
      "كابل مدمج وساهل الاستعمال",
      "كيخدم مع جميع الهواتف",
      "مثالي للرحلات والطريق",
    ],
    image: "/products/fast-charger.webp",
    categoryDarija: "شحن",
    statNumber: "120W",
    statLabel: "سرعة خارقة",
    tagline: "ديما شارجي… ديما مرتاح",
  },

  {
    id: "phone-holder",
    nameDarija: "حامل تيليفون مغناطيسي 360°",
    price: 25,
    descriptionDarija:
      "خلي تيليفونك ثابت وبلا خطر وانت كاتسوق. هاد الحامل كيتبت مزيان وما كيطيحش حتى فالطريق الخايبة. تقدر تدورو فـ أي اتجاه باش تشوف GPS بسهولة.",
    featuresDarija: [
      "ثبات قوي حتى فالطريق الخايبة",
      "سهولة فاستعمال GPS",
      "يدور 360° على راحتك",
      "تركيب سريع بلا صداع",
      "كيخلي السياقة أكثر أمان",
    ],
    image: "/products/phone-magnetic-stand.webp",
    categoryDarija: "حامل تيليفون",
    statNumber: "360°",
    statLabel: "مرونة كاملة",
    tagline: "سوق مرتاح وتيليفونك ثابت",
  },

  {
    id: "sun-protection",
    nameDarija: "شمسية سيارة فاخرة",
    price: 40,
    descriptionDarija:
      "الصهد ديال الصيف كيعذب؟ هاد الشمسية غادي تحمي الطابلو وتخلي الطوموبيل باردة حتى فالعز ديال الشمس. كتتحل وتطوى بسهولة وتخبيها بلا ما تاخذ بلاصة.",
    featuresDarija: [
      "تنقص الحرارة داخل الطوموبيل",
      "حماية من الشمس القاصحة",
      "سهلة الطي والتخزين",
      "خفيفة وساهلة الاستعمال",
      "مثالية لفصل الصيف",
    ],
    image: "/products/sun-protection.webp",
    categoryDarija: "حماية",
    statNumber: "100%",
    statLabel: "حماية من الشمس",
    tagline: "ودّع السخونية فالكار",
  },

  {
    id: "sun-door-protection",
    nameDarija: "واقي شمس للنوافذ",
    price: 40,
    descriptionDarija:
      "خلي العائلة مرتاحة فالكار حتى فالصيف. هاد الواقي كيحبس الشمس وكيحافظ على البرودة داخل السيارة، خصوصاً للأطفال فاللور.",
    featuresDarija: [
      "راحة أكبر فالطريق",
      "يحمي من أشعة الشمس",
      "تركيب ساهل وسريع",
      "يناسب بزاف ديال السيارات",
      "مثالي للعائلة",
    ],
    image: "/products/sun-door-protection.webp",
    categoryDarija: "حماية",
    statNumber: "UV",
    statLabel: "حماية كاملة",
    tagline: "راحة ليك ولعائلتك",
  },

  {
    id: "fm-transmitter",
    nameDarija: "بلوتوث سيارة + شاحن",
    price: 75,
    descriptionDarija:
      "سمع الموسيقى ودير المكالمات بلا ما تشد تيليفونك. هاد الجهاز كيحول أي طوموبيل لسيارة ذكية: بلوتوث، شحن، ومكالمات hands-free.",
    featuresDarija: [
      "مكالمات بلا يدين (أمان أكثر)",
      "تشغيل الموسيقى بسهولة",
      "شحن التيليفون فـ نفس الوقت",
      "ساهل التركيب",
      "يناسب كاع السيارات",
    ],
    image: "/products/charger-and-light.webp",
    categoryDarija: "إلكترونيات",
    statNumber: "5.4",
    statLabel: "بلوتوث حديث",
    tagline: "حول كارك لسمارت كار",
  },
]
