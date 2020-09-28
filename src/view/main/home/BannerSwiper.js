/**
 * 主界面 -> 首页 -> banner
 */
'use strict';

import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import Config from '../../../configs/Config';
import DesignConvert from '../../../utils/DesignConvert';


class ImageTouchableBox extends Component {
    constructor(props) {
        super(props);

        this._url = props.url;
        this._width = props.width;
        this._height = props.height;
        this._onPress = props.onPress;
        this._item = props.item;

    }

    _onItemPress = () => {
        if (!this._item) {
            this._onPress();
            return
        }
        this._onPress(this._item);
    }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={this._onItemPress}
                style={{
                    width: DesignConvert.getW(this._width),
                    height: DesignConvert.getH(this._height),
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Image
                    style={{
                        width: DesignConvert.getW(this._width),
                        height: DesignConvert.getH(this._height),
                        borderRadius: DesignConvert.getW(10)
                        // resizeMode: 'contain'
                    }}
                    resizeMethod="auto"
                    source={
                        this._url
                            ? { uri: Config.getBannerUrl(this._url) }
                            : require('../../../hardcode/skin_imgs/main.js').banner_demo()
                    }
                />
            </TouchableOpacity>
        )
    }
}

export default class BannerSwiper extends Component {

    constructor(props) {
        super(props);

        this._bannerList = [];
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log('刷新banner============', nextProps)
        this._bannerList = nextProps.bannerList;
        return true;
    }

    _renderDotIndicator = count => <PagerDotIndicator pageCount={count} />;

    _onBannnerPress = (item) => {
        switch (item.type) {
            case 2:

                break;
            case 3:
                require('../../../router/level3_router').openActivityWebView(item.targetobject)
                break;
            default:
                require("../../../router/level2_router").showMyWebView(item.title, item.targetobject);
                break
        }
    }

    render() {
        if (this._bannerList.length == 0) {
            return (
                <View>
                    {/* <TouchableOpacity
                        onPress={this._onBannnerPress}
                        style={{
                            width: DesignConvert.getW(335),
                            height: DesignConvert.getH(90),
                            marginTop: DesignConvert.getH(11),
                        }}>
                        <ImageTouchableBox
                                width={335}
                                height={90}
                                onPress={() => { }}
                            />
                    </TouchableOpacity> */}
                </View>
            )
        }
        return (
            <TouchableOpacity
                activeOpacity={1}
                // onPress={this._onBannnerPress}
                style={{
                    width: DesignConvert.getW(260),
                    height: DesignConvert.getH(80),
                    borderRadius: DesignConvert.getW(10),
                    // backgroundColor: 'white',
                    overflow: 'hidden',
                }}>
                <IndicatorViewPager
                    keyboardDismissMode={'none'}
                    autoPlayEnable
                    style={{ height: DesignConvert.getH(80) }}
                    indicator={this._renderDotIndicator(this._bannerList.length)}>
                    {this._bannerList.map(item => (
                        <View
                            key={item.id}>
                            <ImageTouchableBox
                                width={DesignConvert.getW(260)}
                                height={DesignConvert.getH(80)}
                                url={item.bannerurl}
                                onPress={this._onBannnerPress}
                                item={item}
                            />
                        </View>
                    ))}
                </IndicatorViewPager>
            </TouchableOpacity>
        )
    }
}