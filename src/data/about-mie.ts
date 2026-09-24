export type AboutPrinciple = {
  id: string;
  kicker: string;
  title: string;
  description: string;
};

export type AboutDetail = {
  id: string;
  title: string;
  description: string;
};

export type AboutMieContent = {
  eyebrow: string;
  titleLines: [string, string, string];
  intro: string[];
  tags: string[];
  principles: AboutPrinciple[];
  details: AboutDetail[];
  heroImage: {
    src: string;
    alt: string;
    label: string;
  };
  ritualImage: {
    src: string;
    alt: string;
  };
  visit: {
    address: string;
    phone: string;
  };
};

export const aboutMieContent: AboutMieContent = {
  eyebrow: "ABOUT MIE MATCHA",
  titleLines: ["Một góc nhỏ để", "uống chậm,", "cảm trà rõ hơn."],
  intro: [
    "MIE MATCHA là một trong những tiệm chuyên về matcha đầu tiên tại Tây Ninh, bắt đầu từ một tình yêu rất đơn giản: thích matcha, thích những buổi ngồi chậm lại một chút và thích chia sẻ những điều mình yêu với mọi người.",
    "Ở MIE, bạn sẽ tìm thấy những dòng matcha chính gốc từ các nhà trà lớn của Nhật Bản như Marukyu Koyamaen, Shogyokuen và nhiều dòng trà khác được chúng mình chọn lựa kỹ càng.",
    "Mỗi phần matcha đều được đánh thủ công bằng chasen, để bột trà được hòa tan thật mịn và giữ lại trọn vẹn màu xanh, hương thơm cùng vị umami đặc trưng của matcha.",
    "Từ những chén matcha nguyên bản đến những món matcha được biến tấu theo cách riêng của MIE MATCHA, chúng mình luôn cố gắng giữ lại tinh thần của trà Nhật, đồng thời tạo nên một trải nghiệm đủ dễ uống, dễ gần và phù hợp với nhịp sống hiện đại."
  ],
  tags: ["Uji selected", "Hand whisked", "Modern ritual", "Slow experience"],
  principles: [
    {
      id: "01",
      kicker: "Tinh thần",
      title: "Chậm lại để cảm vị rõ hơn",
      description:
        "Một chén matcha ở MIE không chỉ để uống. Đó là một khoảng nghỉ nhỏ, nơi bạn có thể chậm nhịp lại và chú ý hơn đến mùi hương, texture và hậu vị."
    },
    {
      id: "02",
      kicker: "Tuyển chọn",
      title: "Matcha chuẩn Nhật, dễ cảm và dễ gần",
      description:
        "Chúng mình chọn các profile từ những nhà trà uy tín của Nhật Bản để người mới cũng có thể đọc vị matcha, còn người đã quen matcha vẫn thấy đủ chiều sâu để quay lại."
    },
    {
      id: "03",
      kicker: "Trải nghiệm",
      title: "Giữ tinh thần trà Nhật trong đời sống hiện đại",
      description:
        "Từ chén matcha nguyên bản đến những món được biến tấu theo cách riêng của MIE, mọi thứ đều hướng đến sự mượt mà, tinh gọn và gần gũi với nhịp sống hôm nay."
    }
  ],
  details: [
    {
      id: "A",
      title: "Chính gốc từ các nhà trà lớn",
      description:
        "Marukyu Koyamaen, Shogyokuen và nhiều lựa chọn khác được tuyển kỹ để bạn hiểu rõ sự khác nhau giữa floral, umami, creamy hay hậu vị trà đậm."
    },
    {
      id: "B",
      title: "Whisked by hand",
      description:
        "Mỗi chén được đánh bằng chasen để bột trà tan mịn, bề mặt mượt và giữ màu xanh sáng — một chi tiết nhỏ nhưng ảnh hưởng trực tiếp đến trải nghiệm."
    },
    {
      id: "C",
      title: "Một góc nhỏ dành cho người yêu matcha",
      description:
        "MIE MATCHA là một góc nhỏ ở Tây Ninh dành cho những người yêu matcha, muốn hiểu trà rõ hơn và tìm được profile phù hợp với khẩu vị của mình."
    }
  ],
  heroImage: {
    src: "/images/products/marukyu/editorial-01.jpg",
    alt: "Các dòng matcha và dụng cụ trà tại MIE MATCHA",
    label: "Whisked by hand · Chasen · 茶筅"
  },
  ritualImage: {
    src: "/images/products/marukyu/editorial-01.jpg",
    alt: "Không gian và matcha tại MIE MATCHA"
  },
  visit: {
    address: "25 Nguyễn Tri Phương, phường Long Hoa, Tây Ninh",
    phone: "0966204426"
  }
};
