import { test, expect } from '@playwright/test';

test.describe('Projects Section', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        // await page.locator('#projects').scrollIntoViewIfNeeded();
    });

    test('should display the first project initially', async ({ page }) => {
        await expect(page.getByText('SQLite Viewer-Browser')).toBeVisible();
    });

    test('should navigate to the next project', async ({ page }) => {
        // Click next arrow
        const nextBtn = page.locator('button img[alt="next-project"]').locator('..');
        // or directly click the button containing the image
        await nextBtn.click();

        // Verify second project is visible
        await expect(page.getByText('Admin Dashboard', { exact: true })).toBeVisible();
    });

    test('should have working links to demo/repo', async ({ page }) => {
        const link = page.locator('#projects a').first();
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute('href', /http/);
    });
});
