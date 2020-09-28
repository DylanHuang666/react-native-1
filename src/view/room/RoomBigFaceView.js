/**
 * 房间大表情面板
 */

'use strict';

import React, { PureComponent } from 'react';
import BaseView from "../base/BaseView";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import DesignConvert from '../../utils/DesignConvert';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import RoomInfoCache from '../../cache/RoomInfoCache';
import Config from '../../configs/Config';

const COL_COUNT = 15;

export default class RoomBigFaceView extends BaseView {


    render() {

        return (
            <View
                style={{
                    flex: 1,
                }}
            >

                {/*顶部区域 点击关闭面板*/}
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                    onPress={this.popSelf}
                />

                <_BigFaceList />

            </View>

        );


    }


}

class _BigFaceList extends PureComponent {

    constructor(props) {
        super(props);

        this.initPage = 0;


        // 大表情列表
        //   { isShowScreen: '1',
        //     flashName: 'chouqian',
        //     msg: '',
        //     num: '1',
        //     playType: '3,1,60',
        //     range: '0,8',
        //     name: '抽麦序',
        //     flashVersion: '0',
        //     id: 'R021' },

        this._bigEmojiList = [{ id: 1 }]
    }


    componentDidMount() {
        require('../../model/room/EmojiModel').default.getBigEmoji()
            .then(data => {
                this._bigEmojiList = data
                this.forceUpdate()
            })
    }

    _renderDotIndicator = (pageCount) => {
        return (
            <PagerDotIndicator
                pageCount={pageCount}
                style={{
                    bottom: DesignConvert.getH(5),
                }}
                dotStyle={{
                    width: DesignConvert.getW(7),
                    height: DesignConvert.getH(7),
                    borderRadius: DesignConvert.getW(4),
                    backgroundColor: 'rgba(255,255, 255, 0.3)',
                    marginHorizontal: DesignConvert.getW(6.5),
                }}
                selectedDotStyle={{
                    backgroundColor: '#FFFFFF',
                    height: DesignConvert.getH(7),
                    width: DesignConvert.getW(7),
                    borderRadius: DesignConvert.getW(4),
                    marginHorizontal: DesignConvert.getW(6.5),
                }}
            />
        )
    }

    /**
    * 发送大表情
    */
    _clickFace = (faceItem) => {
        require('../../model/room/RoomModel').default.getRecreations(faceItem.id, RoomInfoCache.roomId)
    }

    _renderFaceItem = (pageIndex) => {
        let nextIndex = (pageIndex + 1) * COL_COUNT;
        if (nextIndex > this._bigEmojiList.length) {
            nextIndex = this._bigEmojiList.length;
        }
        
        const pageGiftViews = [];
        for (let i = pageIndex * COL_COUNT; i < nextIndex; ++i) {
            const faceItem = this._bigEmojiList[i];
            pageGiftViews.push(
                <TouchableOpacity
                    onPress={this._clickFace.bind(this, faceItem)}
                    key={faceItem.id}
                    style={{
                        marginLeft: DesignConvert.getW(15.5),
                        marginRight: (i+1) % 5 == 0 ? 0 : DesignConvert.getW(20.5),
                        marginTop: DesignConvert.getH(10),
                        alignItems: 'center',
                    }}
                >
                    <Image
                        source={{ uri: Config.getRecreationUrl(faceItem.flashName + '.png') }}
                        style={{
                            width: DesignConvert.getW(40),
                            height: DesignConvert.getH(40),
                        }}
                    />
                    <Text
                        style={{
                            fontSize: DesignConvert.getF(11),
                            color: '#FFFFFF',
                            marginTop: DesignConvert.getH(5),
                        }}
                    >
                        {faceItem.name}
                    </Text>
                </TouchableOpacity>
            );
        }
        return (
            <View
                key={pageIndex}
                style={{
                    paddingTop: DesignConvert.getW(5.5),
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                }}
            >
                {pageGiftViews}
            </View>
        )
    }

    _onPageSelected = ({ position, offset }) => {
        this.initPage = position;
    }

    render() {
        const pageCount = Math.ceil(this._bigEmojiList.length / COL_COUNT);

        const items = [];
        for (let pageIndex = 0; pageIndex < pageCount; ++pageIndex) {
            items.push(this._renderFaceItem(pageIndex));
        }

        return (
            <View
                style={{
                    flexDirection: 'row',
                    width: DesignConvert.swidth,
                    height: DesignConvert.getH(235) + DesignConvert.addIpxBottomHeight(34),
                    backgroundColor: 'rgba(0,0,0,0.6)',
                }}
            >

                <IndicatorViewPager
                    keyboardDismissMode={'none'}
                    style={{ 
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(235) 
                    }}
                    indicator={this._renderDotIndicator(pageCount)}
                >
                    
                    {items}

                </IndicatorViewPager>
                
                {/* 滚动条待实现 */}
                {/* <View
                    style={{
                        position: 'absolute',
                        right: 0,
                        color: 'white'
                    }}
                >
                    
                </View> */}
            </View>
        )
    }
}