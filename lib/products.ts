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
    nameDarija: "اسبيراتور سيارة 4 فـ 1",
    price: 55,
    descriptionDarija:
      "هنّي راسك من الفتات والغبرة! مكنسة قوية وعملية كتجبد كاع الوسخ من القنات الصعاب. خفيفة، ساهلة، وديما واجدة تنقي طوموبيلتك فدقيقة بلا ما تمشي للافاج.",
    featuresDarija: [
      "شفط قوي كيحيد الزغب والغبرة",
      "ريوس متعددة للقنات الضيقة",
      "صغيرة وماتاخدش بلاصة فالكوفر",
      "خفيفة وعملية للاستعمال اليومي",
      "تنظيف سريع بلا مجهود",
    ],
    image: "/products/cleaner-4-in-1.webp",
    videoUrl: "/products/vacuum-4in-1.mp4",
    categoryDarija: "تنظيف",
    statNumber: "9000 Pa",
    statLabel: "قوة شفط عالية",
    tagline: "طوموبيلتك ديما كتشعل",
  },

  {
    id: "fast-charger",
    nameDarija: "شاحن سيارة سريع 120W",
    price: 40,
    descriptionDarija:
      "عمّر تيليفونك فالطريق فظرف قياسي! شارجور مجهد كيخليك ديما مكونيكطي، مايسخنش، ومثالي للسفر الطويل والزحام.",
    featuresDarija: [
      "شحن سريع كيطيّر",
      "أمان عالي ضد السخونية",
      "كيخدم مع جميع الهواتف (Android/iOS)",
      "شكل أنيق ومضغوط",
      "مايخليش باتري التيليفون يموت",
    ],
    image: "/products/fast-charger.webp",
    categoryDarija: "شحن",
    statNumber: "120W",
    statLabel: "سرعة شحن خارقة",
    tagline: "شارجيه فالطريق.. وارتاح",
  },

  {
    id: "phone-holder",
    nameDarija: "حامل هاتف مغناطيسي (شفط قوي)",
    price: 25,
    descriptionDarija:
      "ماشي سيبورا عادية! هادي كتخدم بقوة الشفط والمغناطيس (K007). كيلصق مزيان وما كيزعزعش التيليفون واخا فالدودانات والطريق المحفرة. ديرو كيف بغيتي باش تشوف GPS مرتاح.",
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
    statLabel: "دوران ومرونة",
    tagline: "تيليفونك ثابت.. وسياقتك آمنة",
  },

  {
    id: "sun-protection",
    nameDarija: "مظلة حماية الطابلو من الشمس",
    price: 40,
    descriptionDarija:
      "هادي ماشي غير مظلة، هادي حماية حقيقية لطوموبيلتك! كتحل وتجمع فثواني بحال البراصول، كتحبس الشمش القاصحة، وكتحمي الطابلو والكراسة من التشققات والتلف.",
    featuresDarija: [
      "حماية الطابلو والجلد من التلف",
      "كتنقص الحرارة داخل الطوموبيل",
      "كتحل وتطوى فثانية وحدة",
      "سهلة التخزين (بحال مظلة الشتا)",
      "كتغطي الباربريز كامل",
    ],
    image: "/products/sun-protection.webp",
    videoUrl: "/products/sun-front-protection.mp4",
    categoryDarija: "حماية",
    statNumber: "100%",
    statLabel: "حماية للطابلو",
    tagline: "ودّع السخونية وحافظ على طوموبيلتك",
  },

  {
    id: "sun-door-protection",
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
    statNumber: "UV",
    statLabel: "بلوكاج للأشعة",
    tagline: "ظل وراحة لعائلتك",
  },

  {
    id: "4-in-1-retractable-charger",
    nameDarija: "شاحن 4 فـ 1 بكابليات كتتجر",
    price: 75,
    descriptionDarija:
      "نسا الروينة د الكابليات! هاد الشارجور الهربان فيه 2 كابليات مدمجين كيخرجو ويرجعو بوحدهوم، زائد 2 بورتات إضافيين. كيشورجي 4 أجهزة فدقة، وفيه إضاءة نجوم واعرة كتعطي منظر خطير بالليل.",
    featuresDarija: [
      "كابليات كتتجر وتتجمع بوحدها",
      "شحن 4 هواتف فدقة وحدة",
      "شحن سريع جدا فـ 30 دقيقة",
      "إضاءة Starry Sky خيالية بالليل",
      "كيهنيك من ترقاع الكابليات",
    ],
    image: "/products/charger-and-light.webp",
    videoUrl: "/products/charger-and-light.mp4",
    categoryDarija: "إلكترونيات",
    statNumber: "4 in 1",
    statLabel: "كابليات مدمجة",
    tagline: "شارجور واحد.. لكاع العائلة",
  },
  {
    id: "exterior-windshield-cover",
    nameDarija: "غطاء مغناطيسي خارجي للزجاج",
    price: 95,
    descriptionDarija:
      "عكس المظلة العادية، هاد الغطاء كيركب من برا وكيلصق بالمغناطيس باش مايطيرش مع الريح. مصاوب من 5 ديال الطبقات غلاض كيحميو الباربريز من الشمش القاصحة، الغبرة، الشتا، وحتى الوسخ ديال الطيور. طوموبيلتك كتبقى نقية وباردة.",
    featuresDarija: [
      "5 طبقات غليظة لحماية مضاعفة من الحرارة",
      "تثبيت قوي بالمغناطيس (ماكيطيرش مع الريح)",
      "مضاد للماء ومناسب لكاع الفصول (4 seasons)",
      "أشرطة عاكسة للضوء باش تبان الطوموبيل بالليل",
      "تركيب ساهل فثواني بلا عذاب",
    ],
    image: "/products/exterior-windshield-cover_.webp",
    videoUrl: "/products/exterior-windshield-cover.mp4",
    categoryDarija: "حماية",
    statNumber: "5 طبقات",
    statLabel: "متانة وحماية",
    tagline: "حمي الباربريز ديالك من برا",
  },
]