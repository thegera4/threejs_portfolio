import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ThreeDModels from '@/sections/hero/ThreeDModels';
import { CalculateSizesReturnType } from '@/types';

vi.mock('@react-three/fiber', () => ({
    Canvas: ({ children }: { children: ReactNode }) => <div data-testid="canvas-mock">{children}</div>,
}));

vi.mock('@react-three/drei', () => ({
    PerspectiveCamera: () => <div data-testid="perspective-camera-mock" />,
}));

vi.mock('@/components/CanvasLoader', () => ({
    default: () => <div data-testid="canvas-loader-mock" />,
}));

vi.mock('@/components/HeroCamera', () => ({
    default: ({ children, isMobile }: { children: ReactNode; isMobile: boolean }) => (
        <div data-testid="hero-camera-mock" data-mobile={String(isMobile)}>
            {children}
        </div>
    ),
}));

vi.mock('@/components/HackerRoom', () => ({
    default: ({
        position,
        rotation,
        scale,
    }: {
        position: number[];
        rotation: number[];
        scale: number;
    }) => (
        <div
            data-testid="hacker-room-mock"
            data-position={JSON.stringify(position)}
            data-rotation={JSON.stringify(rotation)}
            data-scale={String(scale)}
        />
    ),
}));

vi.mock('@/sections/hero/FloatingIcons', () => ({
    default: () => <div data-testid="floating-icons-mock" />,
}));

const mockSizes: CalculateSizesReturnType = {
    deskScale: 0.065,
    deskPosition: [0.25, -6.5, 0],
    pythonLogoPosition: [9, -5.5, 0],
    reactLogoPosition: [9, 3, 0],
    javaLogoPosition: [-10, 3, 0],
    jsLogoPosition: [-13, -11, -10],
};

describe('ThreeDModels', () => {
    it('renders HackerRoom with front-facing rotation, desk props, and FloatingIcons on desktop', () => {
        render(<ThreeDModels sizes={mockSizes} isMobile={false} />);

        const room = screen.getByTestId('hacker-room-mock');
        expect(room).toBeInTheDocument();
        expect(room).toHaveAttribute('data-position', JSON.stringify(mockSizes.deskPosition));
        expect(room).toHaveAttribute('data-rotation', JSON.stringify([0.1, 0, 0]));
        expect(room).toHaveAttribute('data-scale', '0.065');
        expect(screen.getByTestId('floating-icons-mock')).toBeInTheDocument();
    });

    it('hides FloatingIcons when isMobile is true', () => {
        render(<ThreeDModels sizes={mockSizes} isMobile={true} />);

        expect(screen.getByTestId('hacker-room-mock')).toBeInTheDocument();
        expect(screen.queryByTestId('floating-icons-mock')).not.toBeInTheDocument();
    });
});
