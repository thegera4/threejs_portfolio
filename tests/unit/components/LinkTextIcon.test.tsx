import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LinkTextIcon from '@/components/LinkTextIcon';

describe('LinkTextIcon', () => {
    it('renders with correct text', () => {
        render(<LinkTextIcon text="Live Demo" href="#" image="/assets/icon.png" />);
        expect(screen.getByText('Live Demo')).toBeInTheDocument();
    });

    it('renders image with correct src', () => {
        render(<LinkTextIcon text="Live Demo" href="#" image="/assets/icon.png" />);
        const img = screen.getByAltText('check-demo');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/assets/icon.png');
    });

    it('renders link with correct href and attributes', () => {
        render(<LinkTextIcon text="Live Demo" href="https://example.com" image="/assets/icon.png" />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', 'https://example.com');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noreferrer');
    });
});
