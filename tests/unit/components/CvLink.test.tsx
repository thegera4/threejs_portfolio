import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CvLink from '@/components/CvLink';

// Mock the PDF asset import
vi.mock('@/assets/CV8.pdf', () => ({
    default: 'mock-cv-path.pdf'
}));

describe('CvLink', () => {
    it('renders download link with correct attributes', () => {
        render(<CvLink />);
        const link = screen.getByText('Download my CV');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('download');
        // Since we mock the import, we check if it uses the mocked value
        // Note: The import in the component returns the path. 
        // Vite transforms imports to paths.
    });
});
