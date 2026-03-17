import { useState, useEffect } from 'react';

export function useUTMParams() {
    const [utmParams, setUtmParams] = useState({
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_term: '',
        utm_content: ''
    });

    useEffect(() => {
        // Read from URLSearchParams if available
        const searchParams = new URLSearchParams(window.location.search);
        const params = {
            utm_source: searchParams.get('utm_source') || '',
            utm_medium: searchParams.get('utm_medium') || '',
            utm_campaign: searchParams.get('utm_campaign') || '',
            utm_term: searchParams.get('utm_term') || '',
            utm_content: searchParams.get('utm_content') || ''
        };

        setUtmParams(params);
    }, []);

    return utmParams;
}
