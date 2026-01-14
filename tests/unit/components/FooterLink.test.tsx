import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FooterLink from '@/components/FooterLink';
import { openTab } from '@/utils/footer';

// Mock the openTab function
vi.mock('@/utils/footer', () => ({
    openTab: vi.fn(),
}));

describe('FooterLink', () => {
    it('renders with correct text', () => {
        render(<FooterLink text="Privacy Policy" urlName="privacy" />);
        expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    });

    it('calls openTab with urlName when clicked', () => {
        render(<FooterLink text="Terms" urlName="terms" />);
        const link = screen.getByText('Terms');

        fireEvent.click(link);
        expect(openTab).toHaveBeenCalledWith('terms');
    });
});
