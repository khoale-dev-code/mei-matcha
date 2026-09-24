export type FlavorProfile = {
  body: number;
  umami: number;
  bitterness: number;
  floral: number;
  creaminess: number;
};

export type MatchaProduct = {
  slug: string;
  name: string;
  japaneseName?: string;
  houseSlug: string;
  image: string;
  summaryVi: string;
  summaryEn: string;
  notes: string[];
  profile: FlavorProfile;
  journey: {
    opening: string;
    middle: string;
    finish: string;
  };
};

export type TeaHouse = {
  slug: string;
  name: string;
  japaneseName?: string;
  region: string;
  description: string;
  image: string;
  products: MatchaProduct[];
};

export const FLAVOR_LABELS: Array<{
  key: keyof FlavorProfile;
  label: string;
  helper: string;
}> = [
  {
    key: "body",
    label: "Body",
    helper: "Độ dày và cảm giác đậm của trà trong miệng.",
  },
  {
    key: "umami",
    label: "Umami",
    helper: "Chiều sâu ngọt-mặn đặc trưng của matcha Nhật.",
  },
  {
    key: "bitterness",
    label: "Đắng / chát",
    helper: "Mức độ sắc, khô hoặc đắng xuất hiện trong hậu vị.",
  },
  {
    key: "floral",
    label: "Floral",
    helper: "Hương hoa, cỏ non và những nốt thơm sáng.",
  },
  {
    key: "creaminess",
    label: "Creamy",
    helper: "Cảm giác béo, bùi và mượt trên vòm miệng.",
  },
];

export const teaHouses: TeaHouse[] = [
  {
    slug: "marukyu-koyamaen",
    name: "Marukyu Koyamaen",
    japaneseName: "丸久小山園",
    region: "Uji · Kyoto",
    description:
      "Một trong những nhà trà xanh và matcha lâu đời, uy tín bậc nhất Nhật Bản, có trụ sở tại Uji, Kyoto — vùng trà nổi tiếng với matcha chất lượng cao.",
    image: "/images/products/marukyu/marukyu-koyamaen.jpg",
    products: [
      {
        slug: "isuzu",
        name: "Isuzu",
        japaneseName: "五十鈴",
        houseSlug: "marukyu-koyamaen",
        image: "/images/products/marukyu/isuzu.jpg",
        summaryVi:
          "Hương hoa thoang thoảng, chát nhẹ, đắng nhẹ, hậu béo ngọt dịu.",
        summaryEn:
          "Light body, light floral aroma, low bitterness and a soft sweet finish.",
        notes: ["floral", "light bitter", "soft sweet", "creamy"],
        profile: { body: 2, umami: 2, bitterness: 2, floral: 3, creaminess: 3 },
        journey: {
          opening: "Mở đầu nhẹ và sáng với hương hoa thoang thoảng.",
          middle: "Chát và đắng ở mức nhẹ, không lấn át phần thơm.",
          finish: "Kết lại bằng cảm giác béo và ngọt dịu.",
        },
      },
      {
        slug: "chigi-no-shiro",
        name: "Chigi no Shiro",
        japaneseName: "千代の白",
        houseSlug: "marukyu-koyamaen",
        image: "/images/products/marukyu/chigi-no-shiro.jpg",
        summaryVi:
          "Đậm trà trung bình, mặn nhẹ, umami đơn giản, béo, hậu ngọt.",
        summaryEn:
          "Medium body, subtle saltiness, simple umami, creamy, grassy sweet aftertaste.",
        notes: ["medium body", "subtle salty", "simple umami", "grassy sweet"],
        profile: { body: 3, umami: 3, bitterness: 2, floral: 1, creaminess: 4 },
        journey: {
          opening: "Cảm giác trà rõ ở mức trung bình, có chút mặn nhẹ.",
          middle: "Umami dễ hiểu, không quá phức tạp, đi cùng độ béo.",
          finish: "Hậu ngọt theo hướng cỏ non, mềm và dễ nhận biết.",
        },
      },
      {
        slug: "yugen",
        name: "Yugen",
        japaneseName: "又玄",
        houseSlug: "marukyu-koyamaen",
        image: "/images/products/marukyu/yugen.jpg",
        summaryVi:
          "Vị đậm vừa phải, đậu hà lan luộc béo bùi, umami trung bình, đắng nhẹ, hậu ngọt.",
        summaryEn:
          "Light tea body, boiled bean nuttiness, medium umami, low bitterness and soft sweet finish.",
        notes: ["bean nuttiness", "medium umami", "low bitter", "soft sweet"],
        profile: { body: 3, umami: 3, bitterness: 2, floral: 1, creaminess: 3 },
        journey: {
          opening: "Vị trà vừa phải, thiên về cảm giác bùi của đậu.",
          middle: "Umami trung bình tạo chiều sâu mà vẫn giữ độ nhẹ.",
          finish: "Đắng nhẹ rồi chuyển sang hậu ngọt mềm.",
        },
      },
      {
        slug: "wako",
        name: "Wako",
        japaneseName: "和光",
        houseSlug: "marukyu-koyamaen",
        image: "/images/products/marukyu/wako.jpg",
        summaryVi:
          "Umami đậm và dày, hương hoa cỏ phong phú, thoáng chocolate đen, béo, hậu vị sâu.",
        summaryEn:
          "Rich and thick umami, layered vegetal notes, hint of dark chocolate, creamy, deep lingering finish.",
        notes: ["rich umami", "vegetal", "dark chocolate", "deep finish"],
        profile: { body: 4, umami: 5, bitterness: 2, floral: 4, creaminess: 4 },
        journey: {
          opening: "Umami dày xuất hiện sớm cùng lớp hương hoa cỏ.",
          middle: "Vegetal phong phú, thoáng nốt chocolate đen và độ béo.",
          finish: "Hậu vị sâu, lưu lâu và có nhiều lớp.",
        },
      },
      {
        slug: "kinrin",
        name: "Kinrin",
        japaneseName: "金輪",
        houseSlug: "marukyu-koyamaen",
        image: "/images/products/marukyu/kinrin.jpg",
        summaryVi:
          "Umami dày, ngọt cỏ, chuối nướng, béo bùi, sánh mịn, hậu vị đậm trà.",
        summaryEn:
          "Thick umami, grassy sweetness, roasted banana, nutty-creamy, strong tea finish.",
        notes: ["thick umami", "grassy sweet", "roasted banana", "nutty creamy"],
        profile: { body: 5, umami: 5, bitterness: 2, floral: 1, creaminess: 5 },
        journey: {
          opening: "Mở bằng umami dày và cảm giác ngọt cỏ rõ.",
          middle: "Béo bùi, sánh mịn với liên tưởng chuối nướng.",
          finish: "Đậm trà và lưu vị rõ ở cuối.",
        },
      },
      {
        slug: "unkaku",
        name: "Unkaku",
        japaneseName: "雲鶴",
        houseSlug: "marukyu-koyamaen",
        image: "/images/products/marukyu/unkaku.jpg",
        summaryVi:
          "Body dày, đậm trà, thơm hoa, béo bùi, umami phức tạp, hậu ngọt ấn tượng.",
        summaryEn:
          "Dense body, bold tea, floral aroma, nutty creamy, complex umami, remarkable sweet finish.",
        notes: ["dense body", "floral", "complex umami", "sweet finish"],
        profile: { body: 5, umami: 5, bitterness: 2, floral: 4, creaminess: 4 },
        journey: {
          opening: "Body dày và đậm trà tạo ấn tượng ngay từ đầu.",
          middle: "Hương hoa đi cùng độ béo bùi và umami nhiều lớp.",
          finish: "Hậu ngọt rõ, dài và nổi bật.",
        },
      },
    ],
  },
  {
    slug: "ishimoto-kawaguchien",
    name: "Ishimoto Kawaguchien",
    japaneseName: "石本川口園",
    region: "Uji · Kyoto / Osaka",
    description:
      "Nhà trà tập trung vào matcha với các cấp độ từ dùng hằng ngày đến phục vụ nghi thức trà đạo cao cấp.",
    image: "/images/ishimoto.jpg",
    products: [
      {
        slug: "wako",
        name: "Wako",
        japaneseName: "和光",
        houseSlug: "ishimoto-kawaguchien",
        image: "/images/ishimoto.jpg",
        summaryVi:
          "Hương trái cây, hoa trắng, vanilla, hậu ngọt, béo, nutty đậm đà, umami dày.",
        summaryEn:
          "Fruity and floral notes, sweet finish, rich nutty character and thick umami.",
        notes: ["fruity", "white floral", "vanilla", "thick umami"],
        profile: { body: 4, umami: 5, bitterness: 1, floral: 4, creaminess: 4 },
        journey: {
          opening: "Trái cây và hoa trắng tạo cảm giác thơm sáng.",
          middle: "Vanilla, độ béo và nutty làm phần giữa dày hơn.",
          finish: "Umami dày và hậu ngọt kéo dài.",
        },
      },
      {
        slug: "nishiki",
        name: "Nishiki",
        japaneseName: "錦",
        houseSlug: "ishimoto-kawaguchien",
        image: "/images/ishimoto.jpg",
        summaryVi:
          "Thơm bùi béo hạnh nhân, hạt phỉ lẫn hoa trắng tinh tế, béo ngậy, đậm trà, umami dày.",
        summaryEn:
          "Aromatic almond and hazelnut layered with delicate white florals, thick umami and creamy sweet finish.",
        notes: ["almond", "hazelnut", "white floral", "creamy"],
        profile: { body: 4, umami: 5, bitterness: 2, floral: 3, creaminess: 5 },
        journey: {
          opening: "Hạnh nhân và hạt phỉ là hai nốt bùi dễ nhận ra.",
          middle: "Hoa trắng tinh tế làm cân bằng cảm giác béo ngậy.",
          finish: "Đậm trà, umami dày và hậu ngọt creamy.",
        },
      },
    ],
  },
  {
    slug: "shogyokuen",
    name: "Shogyokuen",
    japaneseName: "祥玉園製茶",
    region: "Uji / Kyotanabe · Kyoto",
    description:
      "Một nhà sản xuất trà Uji lâu đời tại Kyoto, gắn với truyền thống trà đạo và các dòng matcha có độ cân bằng cao.",
    image: "/images/izumi-no-shiro.jpg",
    products: [
      {
        slug: "izumi-no-shiro",
        name: "Izumi no Shiro",
        japaneseName: "泉の白",
        houseSlug: "shogyokuen",
        image: "/images/izumi-no-shiro.jpg",
        summaryVi:
          "Vị trà nhẹ, đậu trắng luộc, béo bùi, chát và đắng tinh tế, umami trung bình.",
        summaryEn:
          "Light-bodied matcha with white bean notes, gentle nuttiness, refined bitterness and balanced umami.",
        notes: ["light body", "white bean", "gentle nutty", "balanced umami"],
        profile: { body: 2, umami: 3, bitterness: 2, floral: 1, creaminess: 3 },
        journey: {
          opening: "Body nhẹ với liên tưởng đậu trắng luộc.",
          middle: "Béo bùi vừa phải, chát và đắng tinh tế.",
          finish: "Umami trung bình giúp tổng thể cân bằng.",
        },
      },
    ],
  },
  {
    slug: "atami-tea-store",
    name: "Atami Tea Store",
    japaneseName: "熱海青葉舎",
    region: "Japan",
    description:
      "Thương hiệu và quán trà chuyên về matcha cùng các dòng trà Nhật Bản cao cấp.",
    image: "/images/seiyousha.jpg",
    products: [
      {
        slug: "seiyousha",
        name: "Seiyousha",
        houseSlug: "atami-tea-store",
        image: "/images/seiyousha.jpg",
        summaryVi:
          "Đậu nành, hạnh nhân rang, cacao thoảng, berry và floral nhẹ, béo bùi cân bằng, hậu ngọt mượt, gần như không đắng chát.",
        summaryEn:
          "Roasted soybean and almond with hints of cacao, berries and florals; smooth sweet finish with little to no bitterness.",
        notes: ["roasted soy", "almond", "cacao", "berry"],
        profile: { body: 3, umami: 3, bitterness: 1, floral: 2, creaminess: 4 },
        journey: {
          opening: "Đậu nành và hạnh nhân rang cho cảm giác ấm, bùi.",
          middle: "Cacao, berry và floral nhẹ tạo chiều sâu thơm.",
          finish: "Mượt, ngọt và gần như không có đắng chát.",
        },
      },
    ],
  },
  {
    slug: "waba-tea",
    name: "Waba Tea",
    region: "Kagoshima · Yame · Uji",
    description:
      "Thương hiệu tuyển chọn và nhập khẩu matcha, houjicha và sencha từ nhiều vùng trà nổi tiếng của Nhật Bản.",
    image: "/images/waba-hana.jpg",
    products: [
      {
        slug: "tsuki-mh2",
        name: "Tsuki (MH2)",
        houseSlug: "waba-tea",
        image: "/images/waba-hana.jpg",
        summaryVi:
          "Dòng trà ôn hòa, hương vị cân bằng, thoảng mùi hoa cỏ nhẹ nhàng.",
        summaryEn:
          "A gentle, balanced profile with a soft floral and vegetal lift.",
        notes: ["gentle", "balanced", "floral", "vegetal"],
        profile: { body: 2, umami: 3, bitterness: 2, floral: 3, creaminess: 2 },
        journey: {
          opening: "Ôn hòa và dễ tiếp cận.",
          middle: "Cân bằng, không có một nốt nào lấn át.",
          finish: "Hoa cỏ nhẹ nhàng lưu lại ở hậu vị.",
        },
      },
      {
        slug: "hana-mh3",
        name: "Hana (MH3)",
        houseSlug: "waba-tea",
        image: "/images/waba-hana.jpg",
        summaryVi:
          "Béo ngậy, umami ngọt kéo dài, thơm hạt nướng/chocolate nhẹ và ít đắng.",
        summaryEn:
          "Creamy with long sweet umami, subtle roasted nut/chocolate notes and low bitterness.",
        notes: ["creamy", "sweet umami", "roasted nut", "low bitter"],
        profile: { body: 4, umami: 4, bitterness: 1, floral: 1, creaminess: 5 },
        journey: {
          opening: "Béo ngậy và mềm ngay từ đầu.",
          middle: "Umami ngọt đi cùng hạt nướng và chocolate nhẹ.",
          finish: "Ít đắng, hậu vị kéo dài theo hướng creamy.",
        },
      },
    ],
  },
];

export const allMatchaProducts = teaHouses.flatMap((house) => house.products);

export function getTeaHouse(slug: string) {
  return teaHouses.find((house) => house.slug === slug);
}

export function getMatchaProduct(houseSlug: string, productSlug: string) {
  const house = getTeaHouse(houseSlug);
  const product = house?.products.find((item) => item.slug === productSlug);

  return house && product ? { house, product } : null;
}
