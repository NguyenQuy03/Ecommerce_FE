import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const useResponsiveSlider = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getSlidesToShow = () => {
        if (isMobile) {
            return 2;
        } else if (isTablet) {
            return 4;
        } else if (isDesktop) {
            return 6;
        }
    };

    return { windowWidth, getSlidesToShow };
};

export default useResponsiveSlider;