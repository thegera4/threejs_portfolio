import { test, expect } from '@playwright/test';

test.describe('Hero Section', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should render the main hero text', async ({ page }) => {
        await expect(page.locator('text=Hi, I\'m Gerardo')).toBeVisible();
        await expect(page.locator('.hero_tag', { hasText: 'Full stack developer' })).toBeVisible();
    });

    test('should render the 3D canvas', async ({ page }) => {
        // Wait for canvas to be present
        const canvas = page.locator('canvas').first();
        await expect(canvas).toBeVisible();
    });

    test('should have a working contact button', async ({ page }) => {
        const contactBtn = page.locator('a[href="#contact"]').first();
        await expect(contactBtn).toBeVisible();
        await expect(contactBtn).toHaveAttribute('href', '#contact');
    });
});
