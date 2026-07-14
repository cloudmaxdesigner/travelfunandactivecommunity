import faithImg from "@/assets/faith-oloruntoba.png.asset.json";
import fejiroImg from "@/assets/fejiro-ikpeni.png.asset.json";
import adaoraImg from "@/assets/adaora-igbo.png.asset.json";
import abigailImg from "@/assets/abigail-olusola-omisore.png.asset.json";

export interface Leader {
  slug: string;
  firstName: string;
  lastName: string;
  role: string;
  imageUrl: string;
  imageClassName?: string;
  shortBio: string;
  fullBio: string[];
}

export const LEADERS: Leader[] = [
  {
    slug: "faith-oloruntoba",
    firstName: "Faith",
    lastName: "Oloruntoba",
    role: "Founder and Executive Director",
    imageUrl: faithImg.url,
    shortBio:
      "Canadian entrepreneur, community builder, and travel professional leading TFAC's programs across travel, cultural exchange, wellness, and leadership development...",
    fullBio: [
      "Faith Oloruntoba is a Canadian entrepreneur, community builder, travel professional, and advocate for inclusive economic and community development. She is the Founder and Executive Director of Travel Fun and Active Community (TFAC), where she leads initiatives that bring people together through travel, cultural exchange, outdoor recreation, leadership development, wellness programming, and community engagement.",
      "With over a decade of experience in communications, user experience design, business development, and community building, Faith has dedicated her career to creating opportunities that foster connection, belonging, personal growth, and social impact. She is also the founder of multiple ventures, including Ivory Luxe Journeys, a travel consultancy that has coordinated experiences for thousands of travelers across more than 200 destinations worldwide, and Cotriply, an AI-powered platform designed to simplify group travel coordination for organizations and communities.",
      "Through her work across the nonprofit, corporate, and entrepreneurial sectors, Faith has helped create opportunities for thousands of individuals to participate in travel, leadership programs, skills development initiatives, and community-building activities. Her programs emphasize inclusion, cultural understanding, active living, and economic empowerment, particularly for women, youth, newcomers, and underserved communities.",
      "Faith is passionate about using travel, education, technology, and community engagement as tools for social change. She believes that exposure to new experiences, cultures, and opportunities can help individuals build confidence, expand their networks, strengthen their skills, and unlock pathways to greater economic participation and community leadership.",
      "She holds academic and professional credentials in communications, business leadership, and design, and has received recognition for her contributions to entrepreneurship, innovation, and community impact in Canada.",
    ],
  },
  {
    slug: "fejiro-ikpeni",
    firstName: "Fejiro",
    lastName: "Ikpeni",
    role: "Director, Community Wellness and Membership Engagement",
    imageUrl: fejiroImg.url,
    imageClassName: "scale-150 object-top",
    shortBio:
      "Pharmacist and health researcher with a Master's in International Health, making fitness and wellness feel simple, realistic, and fun...",
    fullBio: [
      "Fejiro is a pharmacist and health researcher with a Master's degree in International Health.",
      "She is passionate about making fitness and wellness feel simple, realistic, and fun.",
      "As a published author of both academic work and weight loss guide Weight Loss As Simple As ABC, she loves helping women feel more confident in their bodies without the overwhelm.",
      "Outside of work, she's a proud wife and mom of two, balancing family life with showing up for herself and inspiring others to do the same.",
      "Fejiro is committed to TFAC community engagement, inclusion, and creating spaces where everyone feels seen and valued.",
    ],
  },
  {
    slug: "adaora-igbo",
    firstName: "Adaora",
    lastName: "Igbo",
    role: "Director, Programming and Content Strategy",
    imageUrl: adaoraImg.url,
    shortBio:
      "Lifestyle and beauty entrepreneur with 10 years of experience — a content strategist and advocate helping women grow in Canada...",
    fullBio: [
      "Adaora is a lifestyle and beauty entrepreneur with 10 years of experience. A content strategist, content creator, and an advocate who is passionate about helping women navigate life and growth opportunities in Canada.",
      "She is also the founder of Women in Canada Empowerment Initiative, a platform dedicated to supporting and empowering immigrant women through information, networking, opportunities, and community support.",
    ],
  },
  {
    slug: "abigail-olusola-omisore",
    firstName: "Abigail",
    lastName: "Olusola-Omisore",
    role: "Director, Planning and Resource Development",
    imageUrl: abigailImg.url,
    shortBio:
      "Senior Business Analyst and digital transformation professional with 7+ years across Salesforce CRM, process optimization, and stakeholder engagement...",
    fullBio: [
      "Abigail is a Senior Business Analyst and digital transformation professional with over seven years of experience delivering business and technology solutions across Salesforce CRM, process optimization, and stakeholder engagement.",
      "She is passionate about using technology, innovation, and education to create opportunities that empower individuals and communities.",
      "Beyond her corporate career, Abigail is a tech mentor and BA coach, passionate about helping and continuously inspiring transitioning professionals define their career plan and build the confidence to pursue growth, purpose, and excellence.",
    ],
  },
];

export function getLeader(slug: string): Leader | undefined {
  return LEADERS.find((l) => l.slug === slug);
}
