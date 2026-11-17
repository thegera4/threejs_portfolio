import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';

const mockNodes = {
    'phone-screen': { geometry: new THREE.BufferGeometry() },
    'phone-frame': { geometry: new THREE.BufferGeometry() },
    'phone-back': { geometry: new THREE.BufferGeometry() },
    'phone-bezel': { geometry: new THREE.BufferGeometry() },
    'camera-visor-frame': { geometry: new THREE.BufferGeometry() },
    'camera-visor-glass': { geometry: new THREE.BufferGeometry() },
    'camera-lenses': { geometry: new THREE.BufferGeometry() },
    'camera-flash': { geometry: new THREE.BufferGeometry() },
    'google-logo': { geometry: new THREE.BufferGeometry() },
};

const mockMaterials = {
    Frame: new THREE.MeshStandardMaterial(),
    BackGlass: new THREE.MeshStandardMaterial(),
    Bezel: new THREE.MeshStandardMaterial(),
    Screen: new THREE.MeshStandardMaterial(),
    VisorGlass: new THREE.MeshStandardMaterial(),
    Lens: new THREE.MeshStandardMaterial(),
    Flash: new THREE.MeshStandardMaterial(),
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

import DemoPhone from '@/components/DemoPhone';

describe('DemoPhone', () => {
    const createMockVideoTexture = (videoWidth: number, videoHeight: number) => ({
        flipY: true,
        needsUpdate: false,
        repeat: { set: vi.fn() },
        offset: { set: vi.fn() },
        image: {
            videoWidth,
            videoHeight,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        },
    });

    beforeEach(() => {
        mockUseGLTF.mockClear();
        mockUseVideoTexture.mockClear();
        mockGsapFrom.mockClear();
        mockUseGLTF.mockReturnValue({ nodes: mockNodes, materials: mockMaterials });
    });

    it('preloads and loads the Google Pixel 10 GLB model and renders all meshes', () => {
        const mockTexture = createMockVideoTexture(1920, 1080);
        mockUseVideoTexture.mockReturnValue(mockTexture);

        const { container } = render(<DemoPhone texture="/textures/project/notudus.mp4" />);

        expect(mockUseGLTF.preload).toHaveBeenCalledWith('/models/google_pixel_10.glb');
        expect(mockUseGLTF).toHaveBeenCalledWith('/models/google_pixel_10.glb');
        expect(mockUseVideoTexture).toHaveBeenCalledWith('/textures/project/notudus.mp4');
        expect(mockGsapFrom).toHaveBeenCalledTimes(1);

        for (const meshName of Object.keys(mockNodes)) {
            expect(container.querySelector(`mesh[name="${meshName}"]`)).toBeInTheDocument();
        }
    });

    it('crops landscape pillarboxed mobile videos and disables flipY', () => {
        const mockTexture = createMockVideoTexture(1920, 1080);
        mockUseVideoTexture.mockReturnValue(mockTexture);

        render(<DemoPhone texture="/textures/project/notudus.mp4" />);

        expect(mockTexture.flipY).toBe(false);
        expect(mockTexture.repeat.set).toHaveBeenCalledWith(0.2594, 1);
        expect(mockTexture.offset.set).toHaveBeenCalledWith(0.3698, 0);
        expect(mockTexture.needsUpdate).toBe(true);
    });

    it('uses full UV coordinates for native portrait videos and cleans up listener', () => {
        const mockTexture = createMockVideoTexture(1080, 1920);
        mockUseVideoTexture.mockReturnValue(mockTexture);

        const { unmount } = render(<DemoPhone texture="" />);

        expect(mockUseVideoTexture).toHaveBeenCalledWith('/textures/project/notudus.mp4');
        expect(mockTexture.repeat.set).toHaveBeenCalledWith(1, 1);
        expect(mockTexture.offset.set).toHaveBeenCalledWith(0, 0);
        expect(mockTexture.image.addEventListener).toHaveBeenCalledWith('loadedmetadata', expect.any(Function));

        unmount();
        expect(mockTexture.image.removeEventListener).toHaveBeenCalledWith('loadedmetadata', expect.any(Function));
    });
});
