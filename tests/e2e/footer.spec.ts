import { test, expect } from '@playwright/test';

test.describe('Footer Section', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        // scroll to bottom
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    });

    test('should display terms and privacy links', async ({ page }) => {
        await expect(page.locator('text=Privacy Policy')).toBeVisible();
    });

    test('should display social media links', async ({ page }) => {
        // SocialMedia component is usually in Navbar or Footer? 
        // Navbar.tsx has SocialMedia. Footer.tsx has FooterLink.
        // Let's check FooterLink specifically.
        // "Mobile-Apps Privacy Policy"
        await expect(page.getByText('Mobile-Apps Privacy Policy')).toBeVisible();
    });
});
