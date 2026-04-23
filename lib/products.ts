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
    nameDarija: "مكنسة قوية كهربانية 4 في 1",
    price: 55,
    descriptionDarija: "مكنسة كهربانية قوية بزاف، تنقي طوموبيلك من الغبار والأوساخ بسهولة. جات مع 4 رؤوس مختلفة باش توصل لكاع الزوايا. صغيرة وخفيفة تقدر تديها معاك فين ما مشيتي.",
    featuresDarija: [
      "4 رؤوس مختلفة للتنظيف",
      "قوة شفط عالية",
      "سهلة الاستعمال",
      "خفيفة ومحمولة",
      "كتنظف كاع الزوايا",
    ],
    image: "/products/cleaner-4-in-1.webp",
    videoUrl: "/products/vacuum-4in-1.mp4",
    categoryDarija: "تنظيف",
    statNumber: "9000 Pa",
    statLabel: "قوة شفط",
    tagline: "طوموبيلك نقية بلا جهد",
  },
  {
    id: "fast-charger",
    nameDarija: "شاحن سيارة 120W سريع بزاف",
    price: 40,
    descriptionDarija: "شاحن سيارة قوي 120W مع كابل متمدد Type-C و iOS. كيشحن تيليفونك في رمشة عين، عندو شاشة LED كتبيّن فولتاج البطارية. يدور 180 درجة.",
    featuresDarija: [
      "120W شحن سريع جداً",
      "كابل متمدد 800mm",
      "يناسب Type-C و iOS",
      "شاشة LED للفولتاج",
      "يدور 180 درجة",
    ],
    image: "/products/fast-charger.webp",
    categoryDarija: "شحن",
    statNumber: "120W",
    statLabel: "شحن فائق السرعة",
    tagline: "تيليفونك ما يطفاش أبداً",
  },
  {
    id: "phone-holder",
    nameDarija: "حامل تيليفون مغناطيسي K007",
    price: 25,
    descriptionDarija: "حامل تيليفون بشفط فراغي قوي وبدرع مغناطيسي. كيثبت مزيان على لوح القيادة، يدور في كاع الاتجاهات. من ألومينيوم متين وشيك.",
    featuresDarija: [
      "شفط فراغي قوي",
      "مغناطيس قوي يثبّت مزيان",
      "يدور في كل الاتجاهات",
      "ألومينيوم متين",
      "يناسب جميع الهواتف",
    ],
    image: "/products/phone-magnetic-stand.webp",
    categoryDarija: "حامل تيليفون",
    statNumber: "360°",
    statLabel: "يدور في كل الجهات",
    tagline: "تيليفونك ثابت وبلا خطر",
  },
  {
    id: "sun-protection",
    nameDarija: "شمسية فاخرة مع طيّاتها",
    price: 40,
    descriptionDarija: "شمسية فاخرة صغيرة ومحمولة، تتطوى بسهولة وتتحمل الريح. جات مع كيس جلد أنيق باش تحتفظ بيها فالطوموبيل. مثالية للصيف.",
    featuresDarija: [
      "مقاومة للريح",
      "كيس جلد فاخر",
      "خفيفة ومحمولة",
      "تتطوى بسهولة",
      "مثالية للصيف",
    ],
    image: "/products/sun-protection.webp",
    categoryDarija: "حماية",
    statNumber: "100%",
    statLabel: "حماية من الشمس",
    tagline: "سافر بارد حتى في الصيف",
  },
  {
    id: "sun-door-protection",
    nameDarija: "واقي شمس للنوافذ الجانبية",
    price: 40,
    descriptionDarija: "واقي شمس مغناطيسي للنوافذ الجانبية، كيحمي من الشمس الحارقة ويخلي الطوموبيل باردة. سهل التركيب والنزع، مناسب لأغلب السيارات.",
    featuresDarija: [
      "حماية من الشمس 100%",
      "تركيب مغناطيسي سهل",
      "يناسب أغلب السيارات",
      "خفيف وسهل التخزين",
      "يحافظ على برودة السيارة",
    ],
    image: "/products/sun-door-protection.webp",
    categoryDarija: "حماية",
    statNumber: "UV",
    statLabel: "حماية كاملة من الأشعة",
    tagline: "الطوموبيل باردة والعيلة مرتاحة",
  },
  {
    id: "fm-transmitter",
    nameDarija: "بلوتوث MP3 للسيارة C1",
    price: 75,
    descriptionDarija: "جهاز بلوتوث متعدد الوظائف: كيشغل الموسيقى عبر FM، كيشحن التيليفون، وعندو ميكرو باش تهضر بالهاتف free. يناسب كاع السيارات.",
    featuresDarija: [
      "بلوتوث 5.4",
      "شاحن USB 3.1A",
      "ميكرو مدمج للمكالمات",
      "يشغل الموسيقى FM",
      "يناسب كاع السيارات",
    ],
    image: "/products/charger-and-light.webp",
    categoryDarija: "إلكترونيات",
    statNumber: "5.4",
    statLabel: "بلوتوث الجيل الجديد",
    tagline: "موسيقى ومكالمات بلا سلك",
  },
]
