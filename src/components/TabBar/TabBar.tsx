import React from "react";
import { Box, Button } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";

import { tabBarStyles as styles } from "./TabBarStyles";

type TabContent = string | React.ReactNode;

interface TabBarProps {
    tabs: Record<string, TabContent>;
    activeTab: string;
    onTabChange: (tab: string) => void;
    sx?: SxProps<Theme>;
}

const TabBar: React.FC<TabBarProps> = ({
    tabs,
    activeTab,
    onTabChange,
    sx,
}) => (
    <Box sx={{ ...styles.container, ...sx } as SxProps<Theme>}>
        {Object.entries(tabs).map(([tab, tabContent]) => {
            const isActive = tab === activeTab;

            return (
                <Button
                    key={tab}
                    fullWidth
                    onClick={() => onTabChange(tab)}
                    disableRipple={isActive}
                    sx={{
                        ...styles.tab,
                        ...(isActive && styles.activeTab),
                    } as SxProps<Theme>}
                >
                    {tabContent}
                </Button>
            );
        })}
    </Box>
);

export default TabBar;
