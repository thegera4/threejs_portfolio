import { describe, it, expect, vi, afterEach } from 'vitest';
import { openTab } from '@/utils/footer';
import { STRINGS } from '@/constants/Strings';

describe('openTab', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);

    afterEach(() => {
        openSpy.mockClear();
    });

    it('opens github url', () => {
        openTab(STRINGS.GITHUB);
        expect(openSpy).toHaveBeenCalledWith('https://www.github.com/thegera4', '_blank', 'noreferrer');
    });

    it('opens linkedin url', () => {
        openTab(STRINGS.LINKEDIN);
        expect(openSpy).toHaveBeenCalledWith('https://www.linkedin.com/in/juan-gerardo-medellin-ibarra-8b207058/', '_blank', 'noreferrer');
    });

    it('opens playstore url', () => {
        openTab(STRINGS.PLAYSTORE);
        expect(openSpy).toHaveBeenCalledWith('https://play.google.com/store/apps/developer?id=Juan+Gerardo+Medellin+Ibarra', '_blank', 'noreferrer');
    });

    it('opens privacy policy url', () => {
        openTab('privacy');
        expect(openSpy).toHaveBeenCalledWith('https://app.enzuzo.com/policies/privacy/b69e150c-115f-11ef-be0e-af7e995914ab', '_blank', 'noreferrer');
    });

    it('opens old portfolio url', () => {
        openTab('old');
        expect(openSpy).toHaveBeenCalledWith('https://nextjs-portfolio-thegera4s-projects.vercel.app/', '_blank', 'noreferrer');
    });

    it('does nothing for unknown value', () => {
        openTab('unknown');
        expect(openSpy).not.toHaveBeenCalled();
    });
});
