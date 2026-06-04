import re
import json

def process_page(input_html, output_tsx, page_name="Page"):
    with open(input_html, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    # Find the body content
    body_match = re.search(r'<body[^>]*>([\s\S]*?)(?:</body>|</html>|\Z)', content, re.IGNORECASE)
    if body_match:
        body_html = body_match.group(1)
        # Also grab the body class
        body_tag_match = re.search(r'<body([^>]*)>', content, re.IGNORECASE)
        body_attrs = body_tag_match.group(1) if body_tag_match else ""
        class_match = re.search(r'class="([^"]+)"', body_attrs)
        body_class = class_match.group(1) if class_match else ""
    else:
        body_html = content
        body_class = ""

    # Replace assets paths
    body_html = body_html.replace('./../assets/', '/assets/')
    
    # We will output a Next.js Client Component that injects this HTML and then manually evaluates scripts
    escaped_html = json.dumps(body_html)

    tsx_content = f'''"use client";
import React, {{ useEffect, useRef }} from 'react';

export default function {page_name}() {{
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {{
    if (!containerRef.current) return;
    
    // Add body classes
    const classes = "{body_class}".split(" ").filter(Boolean);
    document.body.classList.add(...classes);

    // Execute scripts that were injected via innerHTML
    const scripts = containerRef.current.querySelectorAll('script');
    scripts.forEach(oldScript => {{
      const newScript = document.createElement('script');
      // copy attributes
      Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
      // copy content
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    }});

    return () => {{
      document.body.classList.remove(...classes);
    }};
  }}, []);

  return (
    <div ref={{containerRef}} dangerouslySetInnerHTML={{{{ __html: {escaped_html} }}}} />
  );
}}
'''
    with open(output_tsx, 'w', encoding='utf-8') as f:
        f.write(tsx_content)
    print(f"Migrated {input_html} to {output_tsx}")

process_page('homepage/index.html', 'next-website/src/app/page.tsx', 'HomePage')
process_page('about/index.html', 'next-website/src/app/about/page.tsx', 'AboutPage')
