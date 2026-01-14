import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CanvasLoader from '@/components/CanvasLoader';

// Mock @react-three/drei
vi.mock('@react-three/drei', () => ({
    Html: ({ children, center, ...props }: any) => <div data-testid="html-mock" {...props}>{children}</div>,
    useProgress: vi.fn(),
}));

import { useProgress } from '@react-three/drei';

describe('CanvasLoader', () => {
    it('renders "Loading..." when progress is 0', () => {
        (useProgress as any).mockReturnValue({ progress: 0 });
        render(<CanvasLoader />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders progress percentage when progress > 0', () => {
        (useProgress as any).mockReturnValue({ progress: 50.5 });
        render(<CanvasLoader />);
        expect(screen.getByText('Loading 50.50%')).toBeInTheDocument();
    });
});
