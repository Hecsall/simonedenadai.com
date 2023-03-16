function generateRobots() {
  return `
User-agent: *
Disallow: /api/

User-agent: *
Disallow: /studio/

User-agent: *
Allow: /

Sitemap: ${process.env.NEXT_PUBLIC_WEBSITE_URL}/sitemap.xml
  `;
}

function Robots() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const robots = generateRobots();

  res.setHeader('Content-Type', 'text/plain');
  res.write(robots);
  res.end();

  return {
    props: {},
  };
}

export default Robots;
