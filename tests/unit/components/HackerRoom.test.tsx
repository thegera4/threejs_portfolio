import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as THREE from 'three';

const mockNodes = {
    'ultrawide-screen': { geometry: new THREE.BufferGeometry() },
    'desk-top': { geometry: new THREE.BufferGeometry() },
    'desk-frame': { geometry: new THREE.BufferGeometry() },
    'desk-mat': { geometry: new THREE.BufferGeometry() },
    'monitor-body': { geometry: new THREE.BufferGeometry() },
    'pc-case': { geometry: new THREE.BufferGeometry() },
    'pc-internals': { geometry: new THREE.BufferGeometry() },
    'pc-glass': { geometry: new THREE.BufferGeometry() },
    peripherals: { geometry: new THREE.BufferGeometry() },
    'rgb-cyan': { geometry: new THREE.BufferGeometry() },
    'rgb-magenta': { geometry: new THREE.BufferGeometry() },
};

const mockMaterials = {
    ScreenMat: new THREE.MeshStandardMaterial(),
    DeskTop: new THREE.MeshStandardMaterial(),
    DeskMetal: new THREE.MeshStandardMaterial(),
    MatFabric: new THREE.MeshStandardMaterial(),
    MonitorChassis: new THREE.MeshStandardMaterial(),
    CaseMetal: new THREE.MeshStandardMaterial(),
    HardwareMetal: new THREE.MeshStandardMaterial(),
    TemperedGlass: new THREE.MeshStandardMaterial(),
    PeripheralMat: new THREE.MeshStandardMaterial(),
    RgbCyan: new THREE.MeshStandardMaterial(),
    RgbMagenta: new THREE.MeshStandardMaterial(),
};

const { mockUseGLTF, mockUseTexture } = vi.hoisted(() => {
    const gltfFn = Object.assign(vi.fn(), { preload: vi.fn() });
    return {
        mockUseGLTF: gltfFn,
        mockUseTexture: vi.fn(),
    };
});

vi.mock('@react-three/drei', () => ({
    useGLTF: mockUseGLTF,
    useTexture: mockUseTexture,
}));

import HackerRoom from '@/components/HackerRoom';

describe('HackerRoom', () => {
    const mockTexture = {
        flipY: true,
        colorSpace: THREE.NoColorSpace,
        needsUpdate: false,
    };

    beforeEach(() => {
        mockUseGLTF.mockClear();
        mockUseTexture.mockClear();
        mockTexture.flipY = true;
        mockTexture.colorSpace = THREE.NoColorSpace;
        mockTexture.needsUpdate = false;
        mockUseGLTF.mockReturnValue({ nodes: mockNodes, materials: mockMaterials });
        mockUseTexture.mockReturnValue(mockTexture);
    });

    it('preloads and loads the gamer_desk GLB model and screen texture', () => {
        render(<HackerRoom position={[0, -5, 0]} rotation={[0.1, 0, 0]} scale={0.065} />);

        expect(mockUseGLTF.preload).toHaveBeenCalledWith('/models/gamer_desk.glb');
        expect(mockUseGLTF).toHaveBeenCalledWith('/models/gamer_desk.glb');
        expect(mockUseTexture).toHaveBeenCalledWith('/textures/desk/screen.png');
    });

    it('configures screenTexture with flipY false and sRGB colorSpace', () => {
        render(<HackerRoom />);

        expect(mockTexture.flipY).toBe(false);
        expect(mockTexture.colorSpace).toBe(THREE.SRGBColorSpace);
        expect(mockTexture.needsUpdate).toBe(true);
    });

    it('renders all 11 modern gamer desk, ultrawide monitor, PC, and RGB meshes', () => {
        const { container } = render(<HackerRoom />);

        for (const meshName of Object.keys(mockNodes)) {
            expect(container.querySelector(`mesh[name="${meshName}"]`)).toBeInTheDocument();
        }
    });
});
