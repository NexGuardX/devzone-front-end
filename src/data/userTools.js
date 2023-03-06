const userCategories = {
  categories: [
    {
      id: 1,
      name: 'slack',
      description: 'slack description',
      order: 1,
      createdAt: '2023-03-06T08:05:10.077Z',
      updatedAt: '2023-03-06T08:05:10.077Z',
      tools: [
        {
          id: 1,
          name: 'News',
          description: 'Latest developers news',
          icon: 'icon',
          link: '/app/news',
          order: 1,
          categoryId: 1,
          createdAt: '2023-03-06T09:05:10.077',
          updatedAt: '2023-03-06T09:05:10.077',
        },
      ],
    },

    {
      id: 2,
      name: 'github',
      description: 'github description',
      order: 2,
      createdAt: '2023-03-06T08:05:10.077Z',
      updatedAt: '2023-03-06T08:05:10.077Z',
      tools: [
        {
          id: 2,
          name: 'Search',
          description: 'Search for NPMs, Stackoverflow & Github',
          icon: 'icon',
          link: '/app/search',
          order: 2,
          categoryId: 2,
          createdAt: '2023-03-06T09:05:10.077',
          updatedAt: '2023-03-06T09:05:10.077',
        },
      ],
    },
  ],
};

export default userCategories;
