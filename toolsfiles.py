import os

# =========================
# ALL TOOL LISTS
# =========================

pdf_tools = [
    "merge-pdf","split-pdf","compress-pdf","pdf-page-manager","delete-pdf-pages",
    "extract-pdf-pages","rotate-pdf-pages","reorder-pdf-pages","add-page-numbers",
    "add-watermark-to-pdf","protect-pdf","unlock-pdf","jpg-to-pdf","png-to-pdf",
    "pdf-to-jpg","pdf-to-png","crop-pdf","sign-pdf","edit-pdf-metadata",
    "extract-pdf-text","add-header-footer","add-blank-pages","remove-duplicate-pages",
    "resize-pdf-pages","pdf-thumbnail-generator","pdf-qr-code-inserter",
    "pdf-bookmark-creator","pdf-viewer","pdf-page-counter","pdf-word-counter"
]

image_tools = [
    "image-converter","image-resizer","image-compressor","image-cropper",
    "image-background-remover","image-rotator","image-filter","image-to-pdf",
    "image-to-text","image-upscaler","image-to-base64"
]

calc_tools = [
    "cgpa-to-percentage","age-calculator","bmi-calculator","percentage-calculator",
    "discount-calculator","loan-calculator","simple-interest-calculator",
    "compound-interest-calculator","unit-converter","time-calculator","gst-calculator"
]

text_tools = [
    "word-counter","character-counter","case-converter","plagiarism-checker",
    "text-to-speech","speech-to-text","paraphrasing-tool","grammar-checker",
    "random-text-generator","text-to-base64","remove-extra-spaces"
]
youtube_tools = [
    "youtube-thumbnail-downloader","youtube-to-mp3","youtube-to-mp4","youtube-subtitle-downloader"
]

# =========================
# COMMON HEAD SECTION
# =========================

HEAD = """<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-WRD4WEN56V"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-WRD4WEN56V');
</script>

<link rel="canonical" href="https://techtreasure.sbs">

<meta name="monetag" content="f97b4fff77877e05144c54e14bb24ff4">

<meta name="google-site-verification" content="r_5ZCN2vTRzSmh7S782dYGqic_4dUcEkJUblpc9puQE" />
<meta name="google-site-verification" content="SBSV4mYwxrjl0VRp0lePqk7pVJrP9DeRfgVhkFHU-Rc" />

<link rel="stylesheet" href="/navbar.css">
<link rel="stylesheet" href="/style.css">


<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Tech Treasure SBS | Free Online Tools</title>

<meta name="description" content="Free online tools platform">
<meta name="keywords" content="tools, pdf tools, image tools, calculators, text tools">
<meta name="author" content="Tech Treasure">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#0f172a">

<link rel="manifest" href="/manifest.json">

<meta property="og:type" content="website">
<meta property="og:title" content="Tech Treasure SBS">
<meta property="og:description" content="Free online tools platform">
<meta property="og:url" content="https://techtreasure.sbs">

<meta name="twitter:card" content="summary_large_image">

<script type="application/ld+json">
{
 "@context":"https://schema.org",
 "@type":"WebSite",
 "name":"Tech Treasure",
 "url":"https://techtreasure.sbs",
 "description":"Free online tools website"
}
</script>

<footer>
  © 2026 Tech Treasure — Minimal tools for creators
</footer>
"""

# =========================
# HTML TEMPLATE
# =========================

HTML = """<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">
{head}
  <link rel="stylesheet" href="/components/navbar.css" />
  <link rel="stylesheet" href="/components/footer.css" />

</head>
<body>
<div id="navbar-container"></div>
<h1>{title}</h1>
<p>Tool coming soon...</p>
<div id="footer-container"></div>
<script src="/components/navbar.js"></script>
<script src="/components/footer.js"></script>
</body>
</html>
"""

# =========================
# FUNCTION TO CREATE TOOLS
# =========================

def create_tools(base, tools):
    for t in tools:
        path = os.path.join(base, t)
        os.makedirs(path, exist_ok=True)

        file_path = os.path.join(path, "index.html")

        title = t.replace("-", " ").title()

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(HTML.format(head=HEAD, title=title))

# =========================
# RUN ALL
# =========================

create_tools("pdf", pdf_tools)
create_tools("images", image_tools)
create_tools("calculators", calc_tools)
create_tools("text-tools", text_tools)
create_tools("youtube-tools", youtube_tools)
print("ALL TOOL FOLDERS + HTML FILES CREATED SUCCESSFULLY!")