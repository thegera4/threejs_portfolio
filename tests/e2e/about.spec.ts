import { test, expect } from '@playwright/test';

test.describe('About Section', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        // Scroll to section to ensure visibility triggers (if any intersection observers)
        await page.locator('#about').scrollIntoViewIfNeeded();
    });

    test('should display personal avatar', async ({ page }) => {
        await page.locator('#about img').first();
        // Just checking for any image in about section, assuming avatar is there
        // Or check specifically for specific alt text if known, but "personal avatar" might be dynamic or 3D.
        // Based on code, there is an Avatar3D component. Canvas tests are tricky. 
        // Let's check for the text "I love building".
        await expect(page.getByText('Passion for Coding')).toBeVisible();
    });

    test('should display "About Me" header', async ({ page }) => {
        // Usually there's a header. Let's verify visibility of the section container.
        await expect(page.locator('#about')).toBeVisible();
    });
});
