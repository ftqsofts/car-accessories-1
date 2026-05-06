export type Product = {
  id: string
  sku: string
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
  badge: string
  microCopy: string
}

export type Pack = {
  id: string
  nameDarija: string
  descriptionDarija: string
  price: number
  productIds: string[]
}

export const PACK_SHIPPING_FEE = 120

export const packs: Pack[] = [
  {
    id: "cpa",
    nameDarija: "باك الذكاء — Pack Premium",
    descriptionDarija: "باك كامل ديال التكنولوجيا: اسبيراتور قوي، حامل هاتف مغناطيسي، وشاحن 4 في 1 بإضاءة نجوم",
    price: 275,
    productIds: ["176TSC", "phone-holder", "4-in-1-retractable-charger"]
  },
  {
    id: "cpb",
    nameDarija: "باك الحماية — Pack Protection",
    descriptionDarija: "باك الحماية الكاملة: اسبيراتور قوي، مظلة حماية الطابلو، وواقي شمس للنوافذ",
    price: 249,
    productIds: ["sun-door-protection", "sun-protection", "176TSC"]
  },
  {
    id: "cpc",
    nameDarija: "باك الأساسي — Pack Essentiel",
    descriptionDarija: "باك أساسي ومتكامل: بلوتوث ذكي، حامل هاتف مغناطيسي، واسبيراتور 3 في 1",
    price: 249,
    productIds: ["fast-charger", "phone-holder", "vacuum-3in1"]
  }
]

export const products: Product[] = [
  // ── PRE-SELECTED 3 ──
  {
    id: "176TSC",
    sku: "176TSC",
    nameDarija: "اسبيراتور 4 فـ 1",
    price: 55,
    descriptionDarija:
      "هنّي راسك من الغبرة! مكنسة قوية وعملية كتجبد كاع الوسخ من القنات الصعاب. خفيفة، ساهلة، وديما واجدة تنقي طوموبيلتك فدقيقة بلا ما تمشي للافاج.",
    featuresDarija: [
      "9000 باسكال — ماشي بحال الرخيصة اللي كتسخن فجوج دقايق",
      "شفط قوي كيحيد الزغب والغبرة من أضيق القنات",
      "ريوس متعددة للبلايص الصعبة",
      "صغيرة وخفيفة — ماتاخدش بلاصة فالكوفر",
      "تنظيف سريع بلا مجهود",
    ],
    image: "/products/cleaner-4-in-1-package.jpg",
    videoUrl: "/products/vacuum-4in-1.mp4",
    categoryDarija: "تنظيف",
    statNumber: "9000",
    statLabel: "باسكال — قوة شفط عالية",
    tagline: "9000 باسكال",
    badge: "🔥 الأكثر طلباً",
    microCopy: "كينفعك يومياً بلا صداع",
  },

  {
    id: "phone-holder",
    sku: "CMBC-CCR-6E9",
    nameDarija: "حامل هاتف مغناطيسي بشفط قوي",
    price: 25,
    descriptionDarija:
      "ماشي سيبورا عادية! هادي كتخدم بقوة الشفط والمغناطيس. كيلصق مزيان وما كيزعزعش التيليفون واخا فالدودانات والطريق المحفرة. ديرو كيف بغيتي باش تشوف الخريطة مرتاح.",
    featuresDarija: [
      "مغناطيس قوي ماكيطيحش التيليفون",
      "دوران 360 درجة لراحة العين",
      "تثبيت ساهل بيد وحدة",
      "جودة ألومنيوم صحيحة",
      "سياقة آمنة ومريحة",
    ],
    image: "/products/phone-magnetic-stand.webp",
    videoUrl: "/products/phone-magnetic-stand.mp4",
    categoryDarija: "حامل تيليفون",
    statNumber: "360°",
    statLabel: "دوران كامل",
    tagline: "تيليفونك ثابت.. وسياقتك آمنة",
    badge: "🔥 الأكثر طلباً",
    microCopy: "أمان أكثر وانت كاتسوق",
  },

  {
    id: "4-in-1-retractable-charger",
    sku: "414H-CCR-98A",
    nameDarija: "شاحن 4 فـ 1 بكابليات كتتجر",
    price: 75,
    descriptionDarija:
      "نسا الروينة د الكابليات! هاد الشارجور الهربان فيه 2 كابليات مدمجين كيخرجو ويرجعو بوحدهوم، زائد 2 بورتات إضافيين. كيشارجي 4 أجهزة فدقة، وفيه إضاءة نجوم واعرة كتعطي منظر خطير بالليل.",
    featuresDarija: [
      "كابليات كتتجر وتتجمع بوحدها",
      "شحن 4 هواتف فدقة وحدة",
      "شحن سريع جدا فـ 30 دقيقة",
      "إضاءة نجوم خيالية بالليل",
      "كيهنيك من ترقاع الكابليات",
    ],
    image: "/products/charger-and-light_v2.webp",
    videoUrl: "/products/charger-and-light.mp4",
    categoryDarija: "إلكترونيات",
    statNumber: "4 في 1",
    statLabel: "شاحن + كابليات مدمجة",
    tagline: "شارجور واحد.. لكاع العائلة",
    badge: "⭐ اختيار الزبناء",
    microCopy: "حول سيارتك لسيارة ذكية فثواني",
  },

  {
    id: "vacuum-3in1",
    sku: "16ZJX1",
    nameDarija: "اسبيراتور سيارة 3 فـ 1",
    price: 40,
    descriptionDarija:
      "اسبيراتور خفيف وعملي، مصمم خصيصاً للسيارة. كيجبد الغبرة والزغب من الكراسا والزرابي بسهولة. أصغر من 4 فـ 1 ومناسب للاستعمال اليومي.",
    featuresDarija: [
      "6000 باسكال",
      "3 ريوس للقنات الضيقة والبلايص الصعبة",
      "خفيف وصغير — سهل تخزينو فالكوفر",
      "تنظيف سريع بلا مجهود",
      "مناسب للاستعمال اليومي",
    ],
    image: "/products/cleaner-3-in-1.jpg",
    videoUrl: "/products/cleaner-3-in-1.mp4",
    categoryDarija: "تنظيف",
    statNumber: "9000",
    statLabel: "باسكال — قوة شفط عالية",
    tagline: "طوموبيلتك ديما نقية",
    badge: "🔥 الأكثر طلباً",
    microCopy: "كينفعك يومياً بلا صداع",
  },

  // ── OPTIONAL ADD-ONS ──
  {
    id: "fast-charger",
    sku: "45KI-FFS-980",
    nameDarija: "بلوتوث سيارة — حوّل أي طوموبيل لسيارة ذكية",
    price: 40,
    descriptionDarija:
      "عندك طوموبيل قديمة وبغيتي تسمع موسيقى من تيليفونك أو تجاوب المكالمات بيديك؟ هاد الجهاز كيحل ليك كل هاد المشاكل فثانية! كيوصل بالبلوتوث ويبث الصوت على راديو طوموبيلتك، وكيشارجي جوج هواتف فنفس الوقت.",
    featuresDarija: [
      "بلوتوث 5.0 — كيوصل فثانية مع أي تيليفون",
      "كيبث الموسيقى على راديو الطوموبيل مباشرة",
      "مكالمات حر اليدين — بلا ما تلمس تيليفونك",
      "شحن جوج هواتف فنفس الوقت",
      "شاشة كتبين باطري الطوموبيل — تعرف وقتاش دير الكاربور",
    ],
    image: "/products/fast-charger.webp",
    videoUrl: "/products/smart-car-kit-2.mp4",
    categoryDarija: "إلكترونيات",
    statNumber: "5.0",
    statLabel: "بلوتوث جيل خامس",
    tagline: "حتى الطوموبيل القديمة كتولي ذكية",
    badge: "⭐ اختيار الزبناء",
    microCopy: "موسيقى ومكالمات بلا ما تلمس تيليفونك",
  },

  {
    id: "sun-protection",
    sku: "SPG5-SSN-5F3",
    nameDarija: "مظلة حماية الطابلو من الشمس",
    price: 40,
    descriptionDarija:
      "هادي ماشي غير مظلة، هادي حماية حقيقية لطوموبيلتك! كتحل وتجمع فثواني بحال البراصول، كتحبس الشمش القاصحة، وكتحمي الطابلو والكراسة من التشققات والتلف.",
    featuresDarija: [
      "حماية الطابلو والجلد من التلف",
      "كتنقص الحرارة داخل الطوموبيل",
      "كتحل وتطوى فثانية وحدة",
      "سهلة التخزين بحال مظلة الشتا",
      "كتغطي الزجاج كامل",
    ],
    image: "/products/sun-protection_v2.jpg",
    videoUrl: "/products/sun-front-protection.mp4",
    categoryDarija: "حماية",
    statNumber: "100%",
    statLabel: "حماية للطابلو",
    tagline: "ودّع السخونية وحافظ على طوموبيلتك",
    badge: "☀️ ضروري فالصيف",
    microCopy: "خلي سيارتك باردة حتى فالعز",
  },

  {
    id: "sun-door-protection",
    sku: "9DX3-WWN-7C8",
    nameDarija: "واقي شمس للنوافذ الجانبية",
    price: 40,
    descriptionDarija:
      "خلي العائلة والوليدات مرتاحين اللور بعاد على الشمش. واقي كيحبس الأشعة وكينقص الصهد، ساهل فالتركيب وكيخلي الطوموبيل باردة.",
    featuresDarija: [
      "كيحبس أشعة الشمس القاصحة",
      "راحة تامة للركاب فاللور",
      "تركيب ساهل فالباب",
      "تهوية مزيانة مع الظل",
      "ضروري للسفر فالصيف",
    ],
    image: "/products/sun-door-protection.webp",
    videoUrl: "/products/window-sun-protection.mp4",
    categoryDarija: "حماية",
    statNumber: "99%",
    statLabel: "حجب أشعة الشمس",
    tagline: "ظل وراحة لعائلتك",
    badge: "مثالي للعائلة",
    microCopy: "راحة ليك ولولادك فالطريق",
  },

  // {
  //   id: "exterior-windshield-cover",
  //   sku: "L399-EXT-405",
  //   nameDarija: "غطاء مغناطيسي خارجي للزجاج",
  //   price: 95,
  //   descriptionDarija:
  //     "عكس المظلة العادية، هاد الغطاء كيركب من برا وكيلصق بالمغناطيس باش مايطيرش مع الريح. مصاوب من 5 طبقات غلاض كيحميو الزجاج من الشمش القاصحة، الغبرة، الشتا، وحتى الوسخ ديال الطيور. طوموبيلتك كتبقى نقية وباردة.",
  //   featuresDarija: [
  //     "5 طبقات غليظة لحماية مضاعفة من الحرارة",
  //     "تثبيت قوي بالمغناطيس ماكيطيرش مع الريح",
  //     "مضاد للما ومناسب لكاع الفصول",
  //     "أشرطة عاكسة للضوء باش تبان الطوموبيل بالليل",
  //     "تركيب ساهل فثواني بلا عذاب",
  //   ],
  //   image: "/products/exterior-windshield-cover_.webp",
  //   videoUrl: "/products/exterior-windshield-cover.mp4",
  //   categoryDarija: "حماية",
  //   statNumber: "5 طبقات",
  //   statLabel: "متانة وحماية",
  //   tagline: "حمي الزجاج ديالك من برا",
  //   badge: "🔥 الأكثر طلباً",
  //   microCopy: "حمي الزجاج ديالك من برا",
  // },
]