import {ScrollView, View} from "@tarojs/components";
import React, {Component, CSSProperties} from 'react'
import Taro from '@tarojs/taro'
import "./index.scss";
import { SafeAreaProps } from "../../../types";

interface SafeAreaState {
  top: number,
  height: number
}

export default class SafeArea extends Component<SafeAreaProps, SafeAreaState> {
  constructor(props) {
    super(props);

    let rect = Taro.getMenuButtonBoundingClientRect();
    const systemInfo = Taro.getSystemInfoSync();
    const gap = systemInfo.statusBarHeight / 4;
    const top = rect.top + rect.height + gap;

    this.state = {
      top,
      height: systemInfo.windowHeight - top,
    };
  }

  render() {
    const {top, height} = this.state;
    const {customScrollView} = this.props;
    let wrapStyle: CSSProperties = {};

    if (this.props.bottom) {
      wrapStyle.bottom = 0;
      wrapStyle.height = "auto";
    }

    if (this.props.top) {
      wrapStyle.top = 0;
      wrapStyle.paddingTop = top + "px";
      wrapStyle.maxHeight = height + "px";
    }

    const slotStyle: CSSProperties = {
      maxHeight: height + "px",
    };

    return (
      <View className={`safe-area-wrapper ${this.props.className}`} style={wrapStyle}>
        {
          !customScrollView
            ? (
              <ScrollView
                scrollY
                className='slot'
                style={slotStyle}
                lowerThreshold={100}
                refresherTriggered={this.props.refresherTriggered}
                refresherEnabled={this.props.onPullRefresh !== undefined}
                onRefresherRefresh={this.onRefresherRefresh.bind(this)}
                onScrollToLower={this.onScrollToLower.bind(this)}>
                {this.props.children}
              </ScrollView>
            )
            : this.props.children
        }
      </View>
    );
  }

  onRefresherRefresh() {
    this.props.onPullRefresh && this.props.onPullRefresh();
  }

  onScrollToLower() {
    this.props.onReachBottom && this.props.onReachBottom();
  }
}
