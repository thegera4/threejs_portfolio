import { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProjectsComputer from '@/sections/projects/ProjectsComputer';
import { Project } from '@/types';

vi.mock('@react-three/fiber', () => ({
    Canvas: ({ children }: { children: ReactNode }) => <div data-testid="canvas-mock">{children}</div>,
}));

vi.mock('@react-three/drei', () => ({
    Center: ({ children }: { children: ReactNode }) => <div data-testid="center-mock">{children}</div>,
    OrbitControls: () => <div data-testid="orbit-controls-mock" />,
}));

vi.mock('@/components/CanvasLoader', () => ({
    default: () => <div data-testid="canvas-loader-mock" />,
}));

vi.mock('@/components/DemoComputer', () => ({
    default: ({ texture }: { texture: string }) => (
        <div data-testid="demo-computer-mock" data-texture={texture} />
    ),
}));

vi.mock('@/components/DemoPhone', () => ({
    default: ({ texture }: { texture: string }) => (
        <div data-testid="demo-phone-mock" data-texture={texture} />
    ),
}));

vi.mock('@/components/GithubLogo', () => ({
    default: () => <div data-testid="github-logo-mock" />,
}));

const baseProject: Project = {
    title: 'Sample Project',
    desc: 'Description',
    subdesc: 'Subdescription',
    href: 'https://example.com',
    texture: '/textures/project/sqlite-browser.mp4',
    logo: '/assets/sqlite_viewer_logo.png',
    logoStyle: {
        backgroundColor: '#13202F',
        border: '0.2px solid #17293E',
        boxShadow: '0px 0px 60px 0px #2F6DB54D',
    },
    spotlight: '/assets/spotlight2.png',
    tags: [],
    mobile: false,
};

describe('ProjectsComputer', () => {
    it('renders DemoComputer and OrbitControls for desktop projects', () => {
        render(<ProjectsComputer currentProject={baseProject} />);

        const computer = screen.getByTestId('demo-computer-mock');
        expect(computer).toBeInTheDocument();
        expect(computer).toHaveAttribute('data-texture', '/textures/project/sqlite-browser.mp4');
        expect(screen.queryByTestId('demo-phone-mock')).not.toBeInTheDocument();
        expect(screen.queryByTestId('github-logo-mock')).not.toBeInTheDocument();
        expect(screen.getByTestId('orbit-controls-mock')).toBeInTheDocument();
    });

    it('renders DemoPhone and OrbitControls for mobile projects', () => {
        const mobileProject: Project = {
            ...baseProject,
            title: 'Notudus',
            texture: '/textures/project/notudus.mp4',
            mobile: true,
        };

        render(<ProjectsComputer currentProject={mobileProject} />);

        const phone = screen.getByTestId('demo-phone-mock');
        expect(phone).toBeInTheDocument();
        expect(phone).toHaveAttribute('data-texture', '/textures/project/notudus.mp4');
        expect(screen.queryByTestId('demo-computer-mock')).not.toBeInTheDocument();
        expect(screen.queryByTestId('github-logo-mock')).not.toBeInTheDocument();
        expect(screen.getByTestId('orbit-controls-mock')).toBeInTheDocument();
    });

    it('renders GithubLogo without OrbitControls when texture is empty', () => {
        const githubProject: Project = {
            ...baseProject,
            title: 'More Projects',
            texture: '',
            mobile: false,
        };

        render(<ProjectsComputer currentProject={githubProject} />);

        expect(screen.getByTestId('github-logo-mock')).toBeInTheDocument();
        expect(screen.queryByTestId('demo-computer-mock')).not.toBeInTheDocument();
        expect(screen.queryByTestId('demo-phone-mock')).not.toBeInTheDocument();
        expect(screen.queryByTestId('orbit-controls-mock')).not.toBeInTheDocument();
    });
});
