# E2E Blog App Testing with Playwright

This project contains end-to-end (E2E) tests for the Blog List application using [Playwright](https://playwright.dev/). It is designed to automate and verify the main user flows of the blog app frontend and backend, ensuring reliability and a optime user experience.

## Features
- Automated browser testing for the Blog List app
- Tests for login, blog creation, liking, and deletion
- Cross-browser support (Chromium, Firefox, WebKit)
- Generates detailed HTML reports and traces for debugging

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn
- The Blog List backend and frontend running locally (see their respective READMEs)

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/Part5-FrontBlogList-Helsinky.git
   cd Part5-FrontBlogList-Helsinky/E2E testing Playwright
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

### Running the Tests
1. Make sure your backend and frontend servers are running locally.
2. Run the Playwright tests:
   ```sh
   npx playwright test
   # or
   npm test
   # or
   npm run test:report
   # or
   npm run test -- --ui
   # or
   yarn test
   ```


### Configuration
- Edit `playwright.config.js` to change base URLs, test settings, or browser options.
- Test files are located in the `tests/` directory.

## Reports & Debugging
- Test results and traces are saved in the `playwright-report/` and `test-results/` folders.
- Open `playwright-report/index.html` for a visual report of your test runs.


