import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navbar from '@/sections/navbar/Navbar';

// Mock dependencies
vi.mock('@/components/SocialMedia', () => ({
    default: () => <div data-testid="social-media-mock">SocialMedia</div>
}));

vi.mock('./NavItems', () => ({
    default: ({ toggleMenu }: any) => (
        <div data-testid="nav-items-mock">
            NavItems <button onClick={toggleMenu}>Toggle</button>
        </div>
    )
}));

describe('Navbar', () => {
    it('renders social media component', () => {
        render(<Navbar />);
        expect(screen.getByTestId('social-media-mock')).toBeInTheDocument();
    });

    it('toggles menu state when button clicked', () => {
        render(<Navbar />);
        const toggleBtn = screen.getByLabelText('Toggle menu');


        // Initial state: closed / hidden
        // Since we can't easily check state directly, we check the class or image src
        const img = toggleBtn.querySelector('img');
        expect(img).toHaveAttribute('src', 'assets/menu.svg');

        // Click to open
        fireEvent.click(toggleBtn);
        expect(img).toHaveAttribute('src', 'assets/close.svg');

        // Click to close
        fireEvent.click(toggleBtn);
        expect(img).toHaveAttribute('src', 'assets/menu.svg');
    });
});
