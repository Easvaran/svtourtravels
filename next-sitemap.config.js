/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.svtourandtravels.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: ['https://www.svtourandtravels.com/sitemap.xml'],
  },
};
