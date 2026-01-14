import { describe, it, expect, vi } from 'vitest';
import { handleNavigation } from '@/utils/projects';
import { STRINGS } from '@/constants/Strings';

// Mock projects array
const mockProjects: any[] = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
];

describe('handleNavigation', () => {
    it('should go to previous project correctly', () => {
        const mockSetter = vi.fn((callback) => callback(1)); // Current index 1

        handleNavigation(STRINGS.PREVIOUS, mockSetter, mockProjects);

        // index 1 -> 0
        expect(mockSetter).toHaveBeenCalled();
        const updater = mockSetter.mock.calls[0][0];
        expect(updater(1)).toBe(0);
    });

    it('should loop to last project when going previous from first project', () => {
        const mockSetter = vi.fn((callback) => callback(0)); // Current index 0

        handleNavigation(STRINGS.PREVIOUS, mockSetter, mockProjects);

        // index 0 -> 2 (length - 1)
        expect(mockSetter).toHaveBeenCalled();
        const updater = mockSetter.mock.calls[0][0];
        expect(updater(0)).toBe(2);
    });

    it('should go to next project correctly', () => {
        const mockSetter = vi.fn((callback) => callback(1)); // Current index 1

        handleNavigation('next', mockSetter, mockProjects);

        // index 1 -> 2
        expect(mockSetter).toHaveBeenCalled();
        const updater = mockSetter.mock.calls[0][0];
        expect(updater(1)).toBe(2);
    });

    it('should loop to first project when going next from last project', () => {
        const mockSetter = vi.fn((callback) => callback(2)); // Current index 2

        handleNavigation('next', mockSetter, mockProjects);

        // index 2 -> 0
        expect(mockSetter).toHaveBeenCalled();
        const updater = mockSetter.mock.calls[0][0];
        expect(updater(2)).toBe(0);
    });
});
