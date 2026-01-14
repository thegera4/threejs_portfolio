import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Toast from '@/components/Toast';

describe('Toast', () => {
    it('renders with correct text', () => {
        render(<Toast type="success" text="Operation successful" />);
        expect(screen.getByText('Operation successful')).toBeInTheDocument();
    });

    it('applies success styling', () => {
        const { container } = render(<Toast type="success" text="Success" />);
        expect(container.firstChild).toHaveClass('bg-green-700');
    });

    it('applies error styling', () => {
        const { container } = render(<Toast type="error" text="Error" />);
        expect(container.firstChild).toHaveClass('bg-red-700');
    });
});
