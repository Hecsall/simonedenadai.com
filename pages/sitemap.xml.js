import { getAllPosts } from '@/lib/sanity.client'

const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${WEBSITE_URL}</loc>
      </url>
      <url>
        <loc>${WEBSITE_URL}/blog</loc>
      </url>

      ${posts
        .map(({ slug }) => {
          return `
          <url>
            <loc>${`${WEBSITE_URL}/blog/${encodeURIComponent(slug)}`}</loc>
          </url>
          `;
        })
      .join('')}
    </urlset>
  `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const posts = await getAllPosts()
  console.log(posts)
  // Generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  // Send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
