import type { TeaHouse } from "@/types/tea";

export const teaHouses: TeaHouse[] = [
  {
    id: "marukyu-koyamaen",
    name: "Marukyu Koyamaen",
    japanese: "丸久小山園",
    region: "Uji · Kyoto",
    description:
      "Một trong những nhà sản xuất trà xanh và matcha lâu đời, uy tín tại Uji — vùng trà nổi tiếng của Kyoto.",
    image: "/images/marukyu.jpg",
    imageAlt: "Matcha Marukyu Koyamaen",
    teas: [
      {
        name: "Isuzu",
        japanese: "五十鈴",
        vietnamese: "Hương hoa thoang thoảng, chát nhẹ, đắng nhẹ, hậu béo ngọt dịu.",
        english: "Light body, light floral aroma, low bitterness and a soft, sweet finish.",
        notes: ["floral", "soft sweet", "light body"],
      },
      {
        name: "Chigi no Shiro",
        japanese: "千代の白",
        vietnamese: "Đậm trà trung bình, mặn nhẹ, umami đơn giản, béo, hậu ngọt.",
        english: "Medium body, subtle saltiness, simple umami, creamy with a grassy-sweet aftertaste.",
        notes: ["medium body", "creamy", "grassy"],
      },
      {
        name: "Yugen",
        japanese: "又玄",
        vietnamese: "Vị đậm vừa phải, đậu luộc béo bùi, umami trung bình, đắng nhẹ, hậu ngọt.",
        english: "Light tea body, boiled-bean nuttiness, medium umami, low bitterness and a soft sweet finish.",
        notes: ["nutty", "umami", "soft bitter"],
      },
      {
        name: "Wako",
        japanese: "和光",
        vietnamese: "Umami đậm và dày, hương hoa cỏ phong phú, thoáng chocolate đen, béo, hậu vị sâu.",
        english: "Rich, thick umami, layered vegetal notes, a hint of dark chocolate, creamy with a deep finish.",
        notes: ["rich umami", "dark chocolate", "deep finish"],
      },
      {
        name: "Kinrin",
        japanese: "金輪",
        vietnamese: "Umami dày, ngọt cỏ, chuối nướng, béo bùi, sánh mịn, hậu vị đậm trà.",
        english: "Thick umami, grassy sweetness, roasted banana, nutty-creamy texture and a strong tea finish.",
        notes: ["roasted banana", "silky", "bold tea"],
      },
      {
        name: "Unkaku",
        japanese: "雲鶴",
        vietnamese: "Body dày, đậm trà, thơm hoa, béo bùi, umami phức tạp, hậu ngọt ấn tượng.",
        english: "Dense body, bold tea, floral aroma, nutty creaminess, complex umami and a remarkable sweet finish.",
        notes: ["dense body", "complex umami", "floral"],
      },
    ],
  },
  {
    id: "ishimoto",
    name: "Ishimoto Kawaguchien",
    japanese: "石本川口園",
    region: "Uji / Osaka",
    description:
      "Nhà trà tập trung vào matcha từ dòng uống hằng ngày đến các cấp độ cao cấp dành cho trà đạo.",
    image: "/images/ishimoto.jpg",
    imageAlt: "Matcha Ishimoto Kawaguchien",
    teas: [
      {
        name: "Wako",
        japanese: "和光",
        vietnamese: "Hương trái cây, hoa trắng, vanilla, hậu ngọt, béo, nutty đậm đà, umami dày.",
        english: "Fruity and white-floral notes, vanilla, a sweet finish, rich nuttiness and thick umami.",
        notes: ["fruity", "white floral", "thick umami"],
      },
      {
        name: "Nishiki",
        japanese: "錦",
        vietnamese: "Thơm bùi hạnh nhân, hạt phỉ và hoa trắng; béo ngậy, đậm trà, umami dày.",
        english: "Almond and hazelnut layered with delicate white florals, thick umami and a creamy-sweet finish.",
        notes: ["almond", "hazelnut", "creamy"],
      },
    ],
  },
  {
    id: "shogyokuen",
    name: "Shogyokuen",
    japanese: "祥玉園製茶",
    region: "Uji / Kyotanabe · Kyoto",
    description:
      "Nhà sản xuất trà Uji lâu đời tại Kyoto, nổi tiếng với các dòng trà đạo cân bằng và tinh tế.",
    image: "/images/izumi-no-shiro.jpg",
    imageAlt: "Izumi no Shiro của Shogyokuen",
    teas: [
      {
        name: "Izumi no Shiro",
        japanese: "泉の白",
        vietnamese: "Vị trà nhẹ, đậu trắng luộc, béo bùi, chát và đắng tinh tế, umami trung bình.",
        english: "Light-bodied matcha with white-bean notes, gentle nuttiness, refined bitterness and balanced umami.",
        notes: ["white bean", "balanced", "refined bitter"],
      },
    ],
  },
  {
    id: "atami",
    name: "Atami Tea Store",
    japanese: "熱海青葉舎",
    region: "Japan",
    description:
      "Một thương hiệu/quán trà tập trung vào matcha và các dòng trà Nhật cao cấp với profile mềm, dễ tiếp cận.",
    image: "/images/seiyousha.jpg",
    imageAlt: "Matcha Seiyousha của Atami Tea Store",
    teas: [
      {
        name: "Seiyousha",
        vietnamese: "Đậu nành, hạnh nhân rang, cacao thoảng, berry và floral nhẹ; béo bùi, hậu ngọt mượt, gần như không đắng chát.",
        english: "Roasted soy and almond, hints of cacao, berries and florals, with a smooth sweet finish and very low bitterness.",
        notes: ["roasted soy", "cacao", "smooth sweet"],
      },
    ],
  },
  {
    id: "waba",
    name: "Waba Tea",
    region: "Kagoshima · Yame · Uji",
    description:
      "Các dòng matcha, houjicha và sencha tuyển chọn trực tiếp từ những vùng trà nổi tiếng của Nhật Bản.",
    image: "/images/waba-hana.jpg",
    imageAlt: "Hana MH3 của Waba Tea",
    teas: [
      {
        name: "Tsuki (MH2)",
        vietnamese: "Dòng trà ôn hòa, hương vị cân bằng, thoảng mùi hoa cỏ nhẹ nhàng.",
        english: "A gentle, balanced profile with a light floral and vegetal aroma.",
        notes: ["balanced", "gentle", "floral"],
      },
      {
        name: "Hana (MH3)",
        vietnamese: "Béo ngậy, umami ngọt kéo dài, thơm hạt nướng/chocolate nhẹ và ít đắng.",
        english: "Creamy with lingering sweet umami, soft roasted-nut/chocolate notes and low bitterness.",
        notes: ["creamy", "sweet umami", "roasted nut"],
      },
    ],
  },
];

export const hojicha = {
  title: "Hojicha",
  japanese: "焙じ茶",
  description:
    "Trà xanh Nhật được rang ở nhiệt độ cao đến khi lá chuyển nâu đỏ, tạo nên hương thơm ấm, khói nhẹ, gỗ và caramel; vị êm dịu, ít đắng chát hơn matcha.",
  english:
    "Japanese green tea roasted at high heat until reddish-brown, creating warm toasted aromas with hints of smoke, wood and caramel, and a mellow taste with little bitterness.",
  featured: {
    name: "Hojicha Type A · Marukyu Koyamaen",
    vietnamese: "Hương trà nhẹ, không đắng chát, gợi trà sữa gạo rang, hàm lượng caffeine thấp.",
    english: "Light tea aroma, smooth and mellow, reminiscent of roasted-rice milk tea, with lower caffeine.",
  },
};

export const tasteGuide = [
  { term: "Body", description: "Độ dày và độ đậm của matcha khi ở trong miệng. Body nhẹ thường thanh hơn, body dày cho cảm giác đầy vị hơn." },
  { term: "Umami", description: "Vị ngọt-mặn đặc trưng của trà, tạo cảm giác tròn và có chiều sâu. Umami không phải vị ngọt của đường." },
  { term: "Floral", description: "Những nốt hương gợi hoa. Hãy thử ngửi trà trước khi uống và để ý hương còn lại sau mỗi ngụm." },
  { term: "Creamy", description: "Cảm giác béo, bùi và mượt trên vòm miệng. Đây là cách mô tả cảm giác của trà, không nhất thiết có thêm sữa." },
] as const;
