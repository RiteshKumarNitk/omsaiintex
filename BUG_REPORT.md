# Bug Report - Om Sai Intex Manufacturing Unit Website

## Project Status
✅ **Successfully Running** - HTTP server running on port 8000  
📄 **Page Loading** - HTML loads and renders without 404 errors  
⚠️ **Visual Issue** - Page displays with black/dark preloader overlay  

---

## Identified Bugs

### 1. **Malformed JSON - Incorrect URL Escaping in Contact Form 7 Configuration**
- **Location**: Line 4381-4383 in `manufacturing-unit/index.html`
- **Issue**: Incorrect escaping of forward slashes in JSON string
- **Current Code**:
  ```javascript
  var wpcf7 = {
      "api": {
          "root": ".\/\/wp-json\/",
          "namespace": "contact-form-7\/v1"
      }
  };
  ```
- **Problem**: The `\/` escaping is unnecessary in JSON strings and creates an invalid path `.//wp-json/`
- **Should Be**:
  ```javascript
  var wpcf7 = {
      "api": {
          "root": "./wp-json/",
          "namespace": "contact-form-7/v1"
      }
  };
  ```
- **Impact**: Contact Form 7 AJAX calls may fail because the API root path is malformed
- **Severity**: ⚠️ HIGH - Affects form functionality

---

### 2. **Malformed JSON - Unnecessary Escaping in Liquid Theme Configuration**
- **Location**: Line 4401-4405 in `manufacturing-unit/index.html`
- **Issue**: Unnecessary escaping of forward slashes
- **Current Code**:
  ```javascript
  var liquidTheme = {
      "uris": {
          "ajax": "\/wp-admin\/admin-ajax.php"
      }
  };
  ```
- **Should Be**:
  ```javascript
  var liquidTheme = {
      "uris": {
          "ajax": "/wp-admin/admin-ajax.php"
      }
  };
  ```
- **Impact**: AJAX calls to WordPress admin will try to access `/\/wp-admin\/admin-ajax.php` instead of `/wp-admin/admin-ajax.php`
- **Severity**: ⚠️ HIGH - Breaks AJAX functionality

---

### 3. **Invalid API Endpoint Path**
- **Location**: Line 4381-4383
- **Issue**: API root is relative path `./wp-json/` which won't work for AJAX requests from static HTML
- **Current Code**: `"root": ".\/\/wp-json\/"`
- **Problem**: 
  - Relative paths don't work for AJAX/XMLHttpRequest in modern browsers from static HTML files
  - This is a WordPress REST API endpoint that requires proper configuration
- **Severity**: ⚠️ CRITICAL - Breaks contact form and theme AJAX functionality

---

### 4. **Page Appearance Issue**
- **Location**: HTML body and CSS
- **Issue**: Page appears completely black despite loading successfully
- **Cause**: 
  - The page has class `lqd-preloader-activated` on body (line 1714)
  - Preloader overlay is covering content (`lqd-preloader-wrap lqd-preloader-curtain`)
  - Page requires JavaScript to hide preloader after loading
  - Without WordPress backend and proper AJAX responses, preloader never completes
- **Visual Result**: Black screen on page load
- **Severity**: 🔴 CRITICAL - Page is non-functional visually

---

### 5. **Mixed Absolute and Relative Paths**
- **Location**: Throughout the HTML file
- **Issue**: All asset paths use relative paths with `./..` which only work from specific directory structures
- **Current Pattern**: `./../assets/css/style.css`, `./../assets/js/jquery/jquery.min.js`
- **Impact**: 
  - If HTML file is moved or accessed differently, all assets break
  - Not ideal for deployment
- **Severity**: ⚠️ MEDIUM - Works in current structure but fragile

---

## Test Results

### Network Testing
- ✅ All CSS files load successfully
- ✅ All JavaScript files load successfully  
- ✅ No 404 errors for asset files
- ❌ **Cannot verify AJAX endpoints** (WordPress-dependent)

### Console Errors
- ✅ Page loads without JavaScript errors
- ⚠️ But AJAX calls will fail due to malformed endpoints

---

## Recommendations

### Critical Fixes (Do First)
1. **Fix JSON Configuration** - Remove unnecessary `\/` escaping in lines 4381-4383 and 4401-4405
2. **Fix API Endpoints** - Change relative paths to proper WordPress REST API endpoints
3. **Add Fallback for Preloader** - Add timeout to hide preloader if AJAX calls don't complete

### High Priority Fixes
1. Use absolute paths `/assets/` instead of relative paths `./../assets/`
2. Add proper CORS headers for AJAX requests
3. Update API endpoints configuration for proper WordPress integration

### Testing Needed
- Test Contact Form 7 submissions
- Test AJAX functionality
- Verify all dynamic content loads
- Test on different browsers
- Check mobile responsiveness

---

## How to Reproduce Issues

1. **See Black Screen**: Open http://localhost:8000/manufacturing-unit/index.html
2. **Verify AJAX Failure**: Open browser DevTools → Network tab → Try form submission
3. **Check JSON Issues**: Open browser DevTools → Console → Check API calls

