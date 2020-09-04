import { View, StandardProps } from "@tarojs/components";
import React, { Component, useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import "./index.scss";
import { CSSProperties } from "react";
import { AppBarProps } from "../../../types";

function AppBar(props: AppBarProps) {
  const [rectTop, setRectTop] = useState<number>();
  const [rectHeight, setRectHeight] = useState<number>();
  const [gap, setGap] = useState<number>();
  const { brightness, showLeading, className, tabBar, children } = props;

  useEffect(() => {
    (() => {
      const rect = Taro.getMenuButtonBoundingClientRect();
      const systemInfo = Taro.getSystemInfoSync();
      const gap = systemInfo.statusBarHeight / 4;

      setRectTop(rect.top);
      setGap(gap);
      setRectHeight(rect.height);
    })();
  }, []);

  const navigatorBack = () => {
    Taro.navigateBack({ delta: 1 });
  }

  const wrapStyle: CSSProperties = {
    paddingTop: rectTop + "px",
  };

  const slotStyle: CSSProperties = {
    height: (rectHeight) + "px",
    marginBottom: gap + "px",
  }

  const leadingStyle = {
    fontSize: rectHeight + 'px',
    color: brightness,
  };

  return (
    <View className={`app-bar__wrapper ${className}`} style={wrapStyle}>
      <View className={`app-bar__slot`} style={slotStyle}>
        {showLeading && (<View onClick={navigatorBack} className='leading' style={leadingStyle} />)}
        {children}
      </View>
      {tabBar && (<View className={"app-bar__tab-bar"}>{tabBar}</View>)}
    </View>
  );
}

AppBar.defaultProps = {
  brightness: "black",
  showLeading: false,
}

AppBar.options = {
  addGlobalClass: true,
}

export default AppBar;