import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should display desktop navigation links correctly', async ({ page, isMobile }) => {
        if (isMobile) test.skip();

        const nav = page.locator('header');
        await expect(nav).toBeVisible();

        const links = ['Home', 'About', 'Work', 'Contact'];
        for (const linkText of links) {
            const link = nav.locator(`.sm\\:flex a:has-text("${linkText}")`);
            await expect(link).toBeVisible();
        }
    });

    test('should navigate to sections on click', async ({ page, isMobile }) => {
        if (isMobile) test.skip();

        const aboutLink = page.locator('header .sm\\:flex a[href="#about"]');
        await aboutLink.click();
        await expect(page.url()).toContain('#about');

        // Check if About section is in view or focused (basic check)
        const aboutSection = page.locator('#about');
        await expect(aboutSection).toBeInViewport();
    });

    test('should toggle mobile menu', async ({ page, isMobile }) => {
        // Force mobile viewport for this test if not running on mobile device project
        if (!isMobile) {
            await page.setViewportSize({ width: 375, height: 667 });
        }

        // Check for hamburger menu
        // Ensure your button has this aria-label or use another selector
        // If aria-label doesn't exist, we might need a more generic selector like 'button img[alt="toggle"]'
        const toggleIcon = page.locator('header img[alt="toggle"]');

        await expect(toggleIcon).toBeVisible();
        await toggleIcon.click();

        // Check if sidebar/dropdown content appears
        // Based on typical implementation in this project (NavItems inside a mobile container)
        // Let's assume the mobile menu container becomes visible. 
        // Checking for a link in the mobile menu that was likely hidden or checking the NavItems container visibility.

        // Check for state change - verify link inside the mobile sidebar is visible
        const mobileHomeParams = page.locator('.nav-sidebar a', { hasText: 'Home' });
        await expect(mobileHomeParams).toBeVisible();
    });
});
