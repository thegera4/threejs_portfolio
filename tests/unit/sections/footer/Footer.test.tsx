import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Footer from '@/sections/footer/Footer';

// Mock child components
vi.mock('@/components/FooterLink', () => ({
    default: ({ text, urlName }: any) => <div data-testid="footer-link">{text} - {urlName}</div>
}));

vi.mock('@/components/CvLink', () => ({
    default: () => <div data-testid="cv-link">CV Link</div>
}));

describe('Footer', () => {
    it('renders FooterLinks and CvLink', () => {
        render(<Footer />);
        expect(screen.getAllByTestId('footer-link').length).toBeGreaterThan(0);
        expect(screen.getByTestId('cv-link')).toBeInTheDocument();
        expect(screen.getByText('Mobile-Apps Privacy Policy - privacy')).toBeInTheDocument();
        expect(screen.getByText('Alternative Portfolio - old')).toBeInTheDocument();
    });
});
