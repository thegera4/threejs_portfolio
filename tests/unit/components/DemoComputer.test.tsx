import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';

const mockNodes = {
    'monitor-screen': { geometry: new THREE.BufferGeometry() },
    'macbook-body': { geometry: new THREE.BufferGeometry() },
    'macbook-trackpad': { geometry: new THREE.BufferGeometry() },
    'macbook-keyboard-well': { geometry: new THREE.BufferGeometry() },
    'macbook-keys': { geometry: new THREE.BufferGeometry() },
    'macbook-bezel': { geometry: new THREE.BufferGeometry() },
    'macbook-webcam': { geometry: new THREE.BufferGeometry() },
    'apple-logo': { geometry: new THREE.BufferGeometry() },
};

const mockMaterials = {
    Aluminum: new THREE.MeshStandardMaterial(),
    Trackpad: new THREE.MeshStandardMaterial(),
    DarkMetal: new THREE.MeshStandardMaterial(),
    Keys: new THREE.MeshStandardMaterial(),
    Bezel: new THREE.MeshStandardMaterial(),
    Screen: new THREE.MeshStandardMaterial(),
    Lens: new THREE.MeshStandardMaterial(),
    Logo: new THREE.MeshStandardMaterial(),
};

const { mockUseGLTF, mockUseVideoTexture, mockGsapFrom } = vi.hoisted(() => {
    const gltfFn = Object.assign(vi.fn(), { preload: vi.fn() });
    return {
        mockUseGLTF: gltfFn,
        mockUseVideoTexture: vi.fn(),
        mockGsapFrom: vi.fn(),
    };
});

vi.mock('@react-three/drei', () => ({
    useGLTF: mockUseGLTF,
    useVideoTexture: mockUseVideoTexture,
}));

vi.mock('@gsap/react', async () => {
    const { useLayoutEffect } = await import('react');
    return {
        useGSAP: (cb: () => void) => {
            useLayoutEffect(() => {
                cb();
            });
        },
    };
});

vi.mock('gsap', () => ({
    default: {
        from: mockGsapFrom,
    },
}));

import DemoComputer from '@/components/DemoComputer';

describe('DemoComputer', () => {
    const mockTexture = { flipY: true };

    beforeEach(() => {
        mockUseGLTF.mockClear();
        mockUseVideoTexture.mockClear();
        mockGsapFrom.mockClear();
        mockTexture.flipY = true;
        mockUseGLTF.mockReturnValue({ nodes: mockNodes, materials: mockMaterials });
        mockUseVideoTexture.mockReturnValue(mockTexture);
    });

    it('preloads and loads the MacBook Air GLB model', () => {
        render(<DemoComputer texture="/textures/project/cenas.mp4" />);
        expect(mockUseGLTF.preload).toHaveBeenCalledWith('/models/macbook_air.glb');
        expect(mockUseGLTF).toHaveBeenCalledWith('/models/macbook_air.glb');
    });

    it('renders the MacBook Air screen and chassis meshes', () => {
        const { container } = render(<DemoComputer texture="/textures/project/cenas.mp4" />);
        const expectedMeshes = [
            'monitor-screen',
            'macbook-body',
            'macbook-trackpad',
            'macbook-keyboard-well',
            'macbook-keys',
            'macbook-bezel',
            'macbook-webcam',
            'apple-logo',
        ];

        for (const meshName of expectedMeshes) {
            expect(container.querySelector(`mesh[name="${meshName}"]`)).toBeInTheDocument();
        }
    });

    it('passes the provided video texture and disables flipY', () => {
        render(<DemoComputer texture="/textures/project/admin-dashboard.mp4" />);
        expect(mockUseVideoTexture).toHaveBeenCalledWith('/textures/project/admin-dashboard.mp4');
        expect(mockTexture.flipY).toBe(false);
    });

    it('falls back to sqlite-browser.mp4 when texture prop is empty and runs entry animation', () => {
        render(<DemoComputer texture="" />);
        expect(mockUseVideoTexture).toHaveBeenCalledWith('/textures/project/sqlite-browser.mp4');
        expect(mockGsapFrom).toHaveBeenCalledTimes(1);
    });
});
