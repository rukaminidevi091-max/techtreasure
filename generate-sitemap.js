const fs = require("fs");

const posts = JSON.parse(
    fs.readFileSync("./posts/posts.json", "utf8")
);

const domain = "https://techtreasure.sbs";

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<url>
<loc>${domain}/</loc>
<priority>1.0</priority>
</url>

<url>
<loc>${domain}/posts/</loc>
</url>

<url>
<loc>${domain}/tools/</loc>
</url>
`;

posts.forEach(post => {
    sitemap += `
<url>
<loc>${domain}/posts/articles/?id=${post.id}</loc>
<lastmod>${post.date}</lastmod>
<priority>0.9</priority>
</url>
`;
});

sitemap += `
</urlset>
`;

fs.writeFileSync("sitemap.xml", sitemap);

console.log("✅ sitemap.xml generated");