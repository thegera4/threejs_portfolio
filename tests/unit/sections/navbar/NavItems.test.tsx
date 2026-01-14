import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NavItems from '@/sections/navbar/NavItems';
import { navLinks } from '@/constants';

describe('NavItems', () => {
    it('renders all nav links', () => {
        render(<NavItems toggleMenu={() => { }} />);
        navLinks.forEach(link => {
            expect(screen.getByText(link.name)).toBeInTheDocument();
        });
    });

    it('calls toggleMenu when a link is clicked', () => {
        const toggleMenuMock = vi.fn();
        render(<NavItems toggleMenu={toggleMenuMock} />);

        const firstLink = screen.getByText(navLinks[0].name);
        fireEvent.click(firstLink);

        expect(toggleMenuMock).toHaveBeenCalled();
    });
});
