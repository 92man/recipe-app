import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tasty-record.com';

  // 모든 레시피 ID (한식, 양식, 중식, 일식)
  const recipes = [
    // 한식
    'kimchi-jjigae',
    'doenjang-jjigae',
    'bulgogi',
    'japchae',
    'bibimbap',
    'samgyeopsal',
    'tteokbokki',
    'sundubu-jjigae',
    'gimbap',
    // 양식
    'carbonara',
    'tomato-pasta',
    'cream-pasta',
    'steak',
    'omurice',
    // 중식
    'fried-rice',
    'jjajangmyeon',
    'jjamppong',
    'tangsuyuk',
    // 일식
    'katsudon',
    'udon',
    'curry-rice',
    'takoyaki',
    'gyudon',
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/recipes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...recipes.map((id) => ({
      url: `${baseUrl}/recipes/${id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tips`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // 카테고리 페이지
    {
      url: `${baseUrl}/recipes/category/korean`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/recipes/category/western`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/recipes/category/chinese`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/recipes/category/japanese`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
