import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ContactButton from '@/components/ContactButton';

describe('ContactButton', () => {
    it('renders correctly', () => {
        render(<ContactButton />);
        expect(screen.getByText("Let's work together")).toBeInTheDocument();

        // Check if it wraps the button in the specific container
        const container = screen.getByText("Let's work together").closest('div.absolute');
        expect(container).toHaveClass('absolute bottom-7 left-0 right-0 w-full z-10 c-space');
    });
});
