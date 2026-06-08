module.exports = {
  siteUrl: 'https://www.svtourandtravels.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/admin', '/admin/**', '/api/**', '/login', '/forgot-password', '/payment-failed', '/payment-success', '/payment-options'],
  outDir: 'public',
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    additionalSitemaps: [
      'https://www.svtourandtravels.com/sitemap.xml',
    ],
  },
};
