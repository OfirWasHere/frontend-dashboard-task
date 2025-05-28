// import { useTheme, useMediaQuery } from "@mui/material";

// function IsMobile(): boolean {
//   const theme = useTheme();
//   return useMediaQuery(theme.breakpoints.down("sm"));
// }

// export default IsMobile;

import { useEffect, useState } from 'react';

const useIsMobile = (breakpoint: number = 768) => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Attach event listener
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
