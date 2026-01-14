import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from '@/components/Button';

describe('Button', () => {
    it('renders with correct name', () => {
        render(<Button name="Click me" isBeam={false} href="#" containerClass="" />);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('renders beam elements when isBeam is true', () => {
        const { container } = render(<Button name="Beam Button" isBeam={true} href="#" containerClass="" />);
        expect(container.querySelector('.btn-ping')).toBeInTheDocument();
        expect(container.querySelector('.btn-ping_dot')).toBeInTheDocument();
    });

    it('does not render beam elements when isBeam is false', () => {
        const { container } = render(<Button name="No Beam" isBeam={false} href="#" containerClass="" />);
        expect(container.querySelector('.btn-ping')).not.toBeInTheDocument();
    });

    it('applies container class', () => {
        render(<Button name="Classy" isBeam={false} containerClass="custom-class" href="#" />);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('custom-class');
    });

    it('renders link with correct href', () => {
        render(<Button name="Link" isBeam={false} href="https://example.com" containerClass="" />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', 'https://example.com');
    });
});
