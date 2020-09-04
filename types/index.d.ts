import { StandardProps } from "@tarojs/components/types/common";

export interface SafeAreaProps extends StandardProps {
    top?: boolean,
    bottom?: boolean,
    onReachBottom?: () => any,
    onPullRefresh?: () => any,
    refresherTriggered?: boolean,
    customScrollView?: boolean
}

export interface AppBarProps extends StandardProps {
    brightness?: "white" | "black",
    showLeading?: boolean,
    tabBar?: any,
    children: any,
}