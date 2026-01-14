import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SocialMedia from '@/components/SocialMedia';
import { openTab } from '@/utils/footer';
import { STRINGS } from '@/constants/Strings';

// Mock the openTab function
vi.mock('@/utils/footer', () => ({
    openTab: vi.fn(),
}));

describe('SocialMedia', () => {
    it('renders all social icons', () => {
        render(<SocialMedia />);
        expect(screen.getByAltText('github')).toBeInTheDocument();
        expect(screen.getByAltText('linkedin')).toBeInTheDocument();
        expect(screen.getByAltText('playstore')).toBeInTheDocument();
    });

    it('navigates to github when github icon clicked', () => {
        render(<SocialMedia />);
        const githubIcon = screen.getByAltText('github');
        fireEvent.click(githubIcon);
        expect(openTab).toHaveBeenCalledWith(STRINGS.GITHUB);
    });

    it('navigates to linkedin when linkedin icon clicked', () => {
        render(<SocialMedia />);
        const linkedinIcon = screen.getByAltText('linkedin');
        fireEvent.click(linkedinIcon);
        expect(openTab).toHaveBeenCalledWith(STRINGS.LINKEDIN);
    });

    it('navigates to playstore when playstore icon clicked', () => {
        render(<SocialMedia />);
        const playstoreIcon = screen.getByAltText('playstore');
        fireEvent.click(playstoreIcon);
        expect(openTab).toHaveBeenCalledWith(STRINGS.PLAYSTORE);
    });
});
