import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { showToast } from '@/utils/contact';

describe('showToast', () => {
    const mockSetToast = vi.fn();

    beforeEach(() => {
        vi.useFakeTimers();
        mockSetToast.mockClear();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should set toast with provided type and text', () => {
        const type = 'success';
        const text = 'Message sent!';

        showToast(type, text, mockSetToast);

        expect(mockSetToast).toHaveBeenCalledWith({ type, text });
    });

    it('should clear toast after 4 seconds', () => {
        showToast('error', 'Something went wrong', mockSetToast);

        expect(mockSetToast).toHaveBeenCalledWith({ type: 'error', text: 'Something went wrong' });

        // Fast-forward 4 seconds
        vi.advanceTimersByTime(4000);

        expect(mockSetToast).toHaveBeenCalledWith(null);
    });
});
