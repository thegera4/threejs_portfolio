import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Hero from '@/sections/hero/Hero';

// Mock dependencies
vi.mock('@/sections/hero/Texts', () => ({
    default: () => <div data-testid="texts-mock">Texts Component</div>
}));

vi.mock('@/sections/hero/ThreeDModels', () => ({
    default: ({ isMobile }: any) => <div data-testid="3d-models-mock">3D Models {isMobile ? 'Mobile' : 'Desktop'}</div>
}));

// Mock react-responsive
vi.mock('react-responsive', () => ({
    useMediaQuery: ({ maxWidth }: any) => {
        // Simple mock: if maxWidth is small, assume it matches for testing mobile
        if (maxWidth === 768) return false; // Default to desktop
        return false;
    }
}));

vi.mock('@/constants', () => ({
    calculateSizes: () => ({ size: 'mocked' })
}));

vi.mock('@/components/ContactButton', () => ({
    default: () => <div data-testid="contact-button-mock">Contact Button</div>
}));

describe('Hero', () => {
    it('renders all main components', () => {
        render(<Hero />);
        expect(screen.getByTestId('texts-mock')).toBeInTheDocument();
        expect(screen.getByTestId('3d-models-mock')).toBeInTheDocument();
        expect(screen.getByTestId('contact-button-mock')).toBeInTheDocument();
    });
});
