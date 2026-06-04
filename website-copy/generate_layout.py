import re
import os

def generate_layout():
    with open('homepage/index.html', 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Get head
    head_match = re.search(r'<head[^>]*>([\s\S]*?)</head>', content, re.IGNORECASE)
    head_html = head_match.group(1) if head_match else ''
    head_html = head_html.replace('./../assets/', '/assets/')

    # Find all stylesheets
    links = re.findall(r'<link[^>]+rel=[\"\']stylesheet[\"\'][^>]*>', head_html, re.IGNORECASE)
    jsx_links = []
    for link in links:
        link = re.sub(r'/$', '', link) # remove trailing slash if any
        link = link.replace('>', '/>')
        link = link.replace('//>', '/>')
        link = link.replace(' crossorigin', ' crossOrigin="anonymous"')
        # ensure it's self-closing exactly once
        if not link.endswith('/>'):
            link = link[:-1] + ' />'
        jsx_links.append(link)
    
    # Also grab stylesheets from the body!
    # Sometimes Elementor puts stylesheets at the end of the body
    body_links = re.findall(r'<link[^>]+rel=[\"\']stylesheet[\"\'][^>]*>', content, re.IGNORECASE)
    for link in body_links:
        if link not in head_html:
            link = link.replace('./../assets/', '/assets/')
            link = link.replace('>', '/>')
            link = link.replace('//>', '/>')
            link = link.replace(' crossorigin', ' crossOrigin="anonymous"')
            if not link.endswith('/>'):
                link = link[:-1] + ' />'
            if link not in jsx_links:
                jsx_links.append(link)

    links_str = "\n        ".join(jsx_links)

    layout_tsx = f'''import type {{ Metadata }} from "next";
import "./globals.css";

export const metadata: Metadata = {{
  title: "Om Sai Intex",
  description: "Building future-forward offices",
}};

export default function RootLayout({{
  children,
}}: Readonly<{{
  children: React.ReactNode;
}}>) {{
  return (
    <html lang="en">
      <head>
        {{/* Global Stylesheets */}}
        {links_str}
      </head>
      <body>
        {{children}}
      </body>
    </html>
  );
}}
'''
    with open('next-website/src/app/layout.tsx', 'w', encoding='utf-8') as f:
        f.write(layout_tsx)
    print("Generated layout.tsx")

generate_layout()
