import glob
import re

for filepath in glob.glob('*/*.html'):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Remove classes from body
    content = content.replace('lqd-preloader-activated', '')
    content = content.replace('lqd-page-not-loaded', '')
    content = content.replace('lqd-preloader-style-curtain', '')
    
    # Actually, a simpler way is to just hide it with CSS!
    if '<style id="hide-preloader">' not in content:
        content = content.replace('</head>', '<style id="hide-preloader">.lqd-preloader-wrap { display: none !important; }</style>\n</head>')
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
print("Done fixing preloaders.")
