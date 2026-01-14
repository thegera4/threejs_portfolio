import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
    testDir: './tests/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:5173',
        trace: 'on-first-retry',
    },
    timeout: 60000,

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'] },
        // },
        // {
        //   name: 'webkit',
        //   use: { ...devices['Desktop Safari'] },
        // },
        // {
        //     name: 'Mobile Chrome',
        //     use: { ...devices['Pixel 5'] },
        // },
    ],

    /* Run your local dev server before starting the tests */
    webServer: {
        command: 'VITE_COVERAGE=true pnpm dev',
        url: 'http://localhost:5173',
        reuseExistingServer: !process.env.CI,
    },
});
