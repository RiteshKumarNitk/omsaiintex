import os
import re

directories = [
    "homepage",
    "contact",
    "careers",
    "about",
    "manufacturing-unit",
    "projects"
]

base_dir = r"c:\Users\RiteshKumar\Downloads\omsaiintex.com\omsaiintex.com"

footer_html = """
<footer class="custom-footer bg-grid-dark">
    <div class="footer-top">
        <div class="footer-left">
            <h2>Building future-forward offices for pioneers in making.</h2>
            <p>Discover top notch office design building solution & general contracting services today</p>
        </div>
        <div class="footer-right">
            <div class="footer-col">
                <h5>Head Office</h5>
                <p class="contact-info">#9, 2nd floor, 10th main road,<br>Bangalore - 560075, Karnataka,<br>India</p>
            </div>
            <div class="footer-col">
                <h5>Send a Message</h5>
                <p class="contact-info"><a href="mailto:mail@omsaiintex.com" style="color:var(--custom-text-muted);">mail@omsaiintex.com</a></p>
            </div>
            <div class="footer-col">
                <h5>Company</h5>
                <ul>
                    <li><a href="./../homepage/index.html">Home</a></li>
                    <li><a href="./../about/index.html">About Us</a></li>
                    <li><a href="./../manufacturing-unit/index.html">Manufacturing Unit</a></li>
                    <li><a href="./../projects/index.html">Projects</a></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">CSR</a></li>
                    <li><a href="./../careers/index.html">Careers</a></li>
                    <li><a href="./../contact/index.html">Contact Us</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h5>Follow Us</h5>
                <ul>
                    <li><a href="#">Linkedin</a></li>
                    <li><a href="#">Facebook</a></li>
                    <li><a href="#">Youtube</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <div>Copyright &copy; 2023 Om Sai Intex Pvt. Ltd.</div>
        <a href="#" class="back-to-top" id="custom-back-to-top">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
        </a>
    </div>
</footer>
"""

modal_html = """
<div class="custom-modal-wrap bg-grid-light" id="custom-nav-modal">
    <button class="modal-close-btn" id="custom-modal-close">&times;</button>
    <div class="custom-modal-content">
        <div class="custom-modal-left">
            <ul class="main-nav">
                <li><a href="./../about/index.html">About Us</a></li>
                <li><a href="./../manufacturing-unit/index.html">Manufacturing Unit</a></li>
                <li><a href="./../projects/index.html">Projects</a></li>
                <li><a href="#">Products</a></li>
                <li><a href="#">CSR</a></li>
                <li><a href="./../careers/index.html">Careers</a></li>
                <li><a href="./../contact/index.html">Contact Us</a></li>
            </ul>
            <div class="modal-contact-info">
                <div>
                    <h6>Call Our Office</h6>
                    <p>080 - 41154454, 41256666, 25272579.</p>
                </div>
                <div>
                    <h6>Send a Message</h6>
                    <p>mail@omsaiintex.com</p>
                </div>
            </div>
        </div>
        <div class="custom-modal-right">
            <img src="./../assets/custom/office_sketch.png" alt="Office Sketch" class="sketch-image">
            <div class="cta-section">
                <h3>Have a project in mind?</h3>
                <a href="./../contact/index.html" class="btn-talk">Lets Talk</a>
            </div>
            <div class="social-icons">
                <a href="#" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                <a href="#" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                <a href="#" aria-label="YouTube"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></a>
            </div>
        </div>
    </div>
</div>
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const modal = document.getElementById("custom-nav-modal");
        const closeBtn = document.getElementById("custom-modal-close");
        const triggers = document.querySelectorAll("[data-target='#fullscreen-header-collapse'], .ld-module-trigger");
        
        triggers.forEach(trigger => {
            trigger.addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                modal.classList.add("is-active");
                // Attempt to close existing lqd modal if any
                const lqdModal = document.querySelector(".lqd-modal-wrap");
                if(lqdModal) lqdModal.classList.remove("is-active");
            });
        });

        closeBtn.addEventListener("click", function(e) {
            e.preventDefault();
            modal.classList.remove("is-active");
        });

        // Back to top smooth scroll
        const backToTop = document.getElementById("custom-back-to-top");
        if(backToTop) {
            backToTop.addEventListener("click", function(e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }
    });
</script>
"""

for directory in directories:
    file_path = os.path.join(base_dir, directory, "index.html")
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()

        # Insert CSS
        if "custom-theme.css" not in content:
            content = content.replace("</head>", '<link rel="stylesheet" href="./../assets/custom/custom-theme.css">\n</head>')

        # Replace footer
        content = re.sub(r"(?s)<footer.*?</footer>", footer_html, content)

        # Inject Modal before </html>
        if "custom-nav-modal" not in content:
            content = content.replace("</html>", f"{modal_html}\n</html>")

        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        
        print(f"Processed {file_path}")
    else:
        print(f"File not found: {file_path}")
