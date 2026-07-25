## 1. Project Setup

- [x] 1.1 Initialize project directory and create `package.json`
- [x] 1.2 Install Express as the backend dependency
- [x] 1.3 Create `data/` directory and initialize `data/messages.json` as an empty array
- [x] 1.4 Create `public/` directory for static frontend assets

## 2. Website Pages

- [x] 2.1 Create shared CSS stylesheet in `public/css/style.css` with responsive layout and coffee-themed styling
- [x] 2.2 Create `public/index.html` homepage with brand name, tagline, and navigation
- [x] 2.3 Create `public/about.html` about page with barista/shop background information
- [x] 2.4 Create `public/menu.html` menu page listing coffee items and prices
- [x] 2.5 Create `public/contact.html` contact page with shop details and contact form
- [x] 2.6 Add consistent navigation menu to all HTML pages

## 3. Contact Form Backend

- [x] 3.1 Create `server.js` to set up Express server and serve static files from `public/`
- [x] 3.2 Implement `POST /api/contact` endpoint to receive JSON form data
- [x] 3.3 Add server-side validation for required fields (name, email, message) and email format
- [x] 3.4 Append valid submissions to `data/messages.json` with `submittedAt` timestamp
- [x] 3.5 Return appropriate HTTP status codes and messages for success and error cases

## 4. Frontend Form Handling

- [x] 4.1 Add HTML5 form validation attributes (`required`, `type="email"`) to the contact form
- [x] 4.2 Add JavaScript in `public/js/contact.js` to submit the form via `fetch` to `/api/contact`
- [x] 4.3 Display success message and clear form fields on successful submission
- [x] 4.4 Display error message and preserve form fields on submission failure

## 5. Verification

- [x] 5.1 Start the server with `node server.js` and verify the homepage loads
- [x] 5.2 Navigate through all pages and confirm consistent navigation works
- [x] 5.3 Submit a valid contact form and verify the record appears in `data/messages.json`
- [x] 5.4 Submit invalid form data and verify server returns HTTP 400 with an error message
