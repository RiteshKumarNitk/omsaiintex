from html.parser import HTMLParser
import glob

class MyHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.errors = []
    def handle_starttag(self, tag, attrs):
        if tag not in ['img', 'br', 'hr', 'input', 'link', 'meta', 'source', 'path', 'rect', 'circle', 'polygon', 'polyline', 'base', 'col', 'embed', 'param', 'track', 'wbr']:
            self.stack.append(tag)
    def handle_endtag(self, tag):
        if tag not in ['img', 'br', 'hr', 'input', 'link', 'meta', 'source', 'path', 'rect', 'circle', 'polygon', 'polyline', 'base', 'col', 'embed', 'param', 'track', 'wbr']:
            if self.stack and self.stack[-1] == tag:
                self.stack.pop()
            else:
                self.errors.append(f'Mismatched tag: expected </{self.stack[-1] if self.stack else "none"}> but got </{tag}>')

files = glob.glob('*/*.html')
for f in files:
    parser = MyHTMLParser()
    content = open(f, encoding='utf-8', errors='ignore').read()
    parser.feed(content)
    print(f'{f}: {len(parser.errors)} errors, {len(parser.stack)} unclosed tags remaining')
