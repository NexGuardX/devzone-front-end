const categories = [
  {
    id: 1,
    name: 'General',
    description: 'General Category Description',
    order: 1,
    tools: [
      {
        id: 1,
        name: 'News',
        order: 1,
        description: 'Latest developers news',
        icon: 'icon',
        link: '/app/news',
      },
      {
        id: 2,
        name: 'Search',
        order: 2,
        description: 'Search for NPMs, Stackoverflow & Github',
        icon: 'icon',
        link: '/app/search',
      },
    ],
  },
  {
    id: 2,
    name: 'Playground',
    description: 'Playground Category Description',
    order: 1,
    tools: [
      {
        id: 3,
        name: 'HTML',
        order: 1,
        description: 'HTML, CSS and Javascript playground',
        icon: 'icon',
        link: '/app/playground-html',
      },
      {
        id: 4,
        name: 'Javascript',
        order: 2,
        description: 'Pure Javascript playground',
        icon: 'icon',
        link: '/app/playground-js',
      },
    ],
  },
];

export default categories;
