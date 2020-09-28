/**
 * 主界面 -> 首页 -> 跑马灯
 */
'use strict';

import React, { PureComponent, Component } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, FlatList, ScrollView, RefreshControl, StatusBar } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator, ViewPager } from 'rn-viewpager';
import LinearGradient from 'react-native-linear-gradient';
import RoomTabs from './RoomTabs';
import BannerSwiper from './BannerSwiper';
import RoomCardView from './RoomCardView';
import DesignConvert from '../../../utils/DesignConvert';
import Config from '../../../configs/Config';
import HomePageModel from '../../../model/main/HomePageModel';
import ModelEvent from "../../../utils/ModelEvent";
import { EVT_LOGIC_ROOM_REFRESH_ROOM, EVT_LOGIC_VOICE_FRIEND_BANNER, } from "../../../hardcode/HLogicEvent";
import HGlobal, { COIN_NAME } from '../../../hardcode/HGLobal';
import { extChangeRankPageIndex } from '../../../cache/RankCache';
import SexAgeWidget from '../../userinfo/SexAgeWidget';
import _PublicScreenMessageBingoItem from '../../room/item/chat/_PublicScreenMessageBingoItem';




//TODO:跑马灯要实现或者用框架，暂时不浪费时间
export default class HorseLamp extends Component {
    constructor(props) {
        super(props);

        this._horseLampList = [];
        this._giftList = [];
        this.state = {
            index: 0,
        }
        this._hadSetTimer = false;
    }

    shouldComponentUpdate(nextProps, nextState) {
        this._horseLampList = nextProps.horseLampList ? nextProps.horseLampList : [];
        this._giftList = nextProps.giftList;
        if (this._horseLampList && this._horseLampList.length > 0 && !this._hadSetTimer) {
            this._hadSetTimer = true;
            this._Timer = setTimeout(() => {
                if (!this._flatList) {
                    this.setState({ index: 0, })
                } else {
                    this._flatList.scrollToIndex({
                        animated: true,
                        index: this.state.index,
                        viewOffset: 0,
                        viewPosition: 0,
                    });
                    let currentIndex = this.state.index + 2 > this._horseLampList.length ? 0 : this.state.index + 1;
                    this._hadSetTimer = false;
                    this.setState({ index: currentIndex, })
                }

            }, 5000);
        }
        return true;
    }

    componentWillUnmount() {
        clearTimeout(this._Timer);
    }

    _getFlatList = (ref) => {
        this._flatList = ref;
    }

    _onScrollToIndexFailed = () => {
        this.setState({
            index: 0,
        })
        this._flatList.scrollToEnd();
    }

    _onHorseLampPress = () => {
        require("../../../router/level2_router").showHeadlinesView();
        // extChangeRankPageIndex(0)
        // require("../../../model/main/MainViewModel").navigateToRankPage();
    }

    _onAvatorPress = (userId) => {
        require("../../../router/level2_router").showUserInfoView(userId);
    }

    _renderHorseLampItem = ({ item }) => {
        let action
        switch (item.action) {
            case 0:
                action = HGlobal.EGG_ACTION
                break;
            case 1:
                action = HGlobal.EGG_A
                break;
            case 10:
                action = HGlobal.EGG_B
                break;
            case 100:
                action = HGlobal.EGG_C
                break;
            default:
                break
        }
        return (
            <TouchableOpacity
                onPress={this._onHorseLampPress}
                style={{
                    width: DesignConvert.getW(253.5),
                    height: DesignConvert.getH(32),
                    // paddingLeft: DesignConvert.getW(8),
                    // paddingRight: DesignConvert.getW(8),
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',

                    paddingLeft: DesignConvert.getW(8),

                }}>

                <Image
                    style={{
                        width: DesignConvert.getW(18),
                        height: DesignConvert.getH(18),
                        marginRight: DesignConvert.getW(5)
                    }}
                    source={require('../../../hardcode/skin_imgs/main.js').ic_headlines()}
                />

                <Text
                    style={{
                        color: '#FFFFFF',
                        fontSize: DesignConvert.getF(11)
                    }}
                >恭喜</Text>

                <TouchableOpacity
                    onPress={() => {
                        this._onAvatorPress(item.userId)
                    }}
                    style={{
                    }}>
                    {/* <Image
                        style={{
                            width: DesignConvert.getW(20),
                            height: DesignConvert.getH(20),
                            borderRadius: DesignConvert.getW(10),
                            marginLeft: DesignConvert.getW(9),
                            marginRight: DesignConvert.getW(7),
                            overflow: 'hidden',
                        }}
                        source={{ uri: Config.getHeadUrl(item.userId, item.logoTime, item.thirdIconurl) }}
                    /> */}

                    <Text
                        numberOfLines={1}
                        style={{
                            maxWidth: DesignConvert.getW(60),
                            color: '#FFFFFF',
                            fontSize: DesignConvert.getH(11)
                        }}>
                        {decodeURI(item.nickName)}
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        // flex: 1,
                        // flexDirection: 'row',
                        // justifyContent: 'flex-start',
                        // alignItems: 'center',
                        // fontSize: DesignConvert.getH(10),
                        // marginLeft: DesignConvert.getW(4)
                    }}>


                    {/* <Text
                        style={{
                            color: 'rgba(33, 33, 33, 1)',
                            fontSize: DesignConvert.getH(12)
                        }}>{`${HGLobal.EGG_ACTION}获得`}</Text> */}
                    <Text
                        style={{
                            color: '#FFFFFF',
                            fontSize: DesignConvert.getH(11)
                        }}>在{action}获得{item.gift.name}</Text>
                    {/* <Text
                        style={{
                            color: '#E04D6F',
                            fontSize: DesignConvert.getH(10)
                        }}>
                        {item.gift.name + "X" + item.gift.amount}
                    </Text> */}
                    {/* 
                    <Image
                        style={{
                            width: DesignConvert.getW(30),
                            height: DesignConvert.getW(30),
                            marginLeft: DesignConvert.getW(7),
                            marginRight: DesignConvert.getW(5),
                            resizeMode: "contain",
                        }}
                        source={{ uri: Config.getGiftUrl(item.gift.giftId) }}
                    />
                    <Text
                        style={{
                            color: 'rgba(196, 94, 236, 1)',
                            fontSize: DesignConvert.getF(12)
                        }}>
                        {`价值${item.gift.price}${COIN_NAME}`}
                    </Text> */}
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View
                style={{
                    width: DesignConvert.getW(253),
                    height: DesignConvert.getH(32),
                }}
            >
                <Image
                    source={require('../../../hardcode/skin_imgs/headline').ic_line_bg()}
                    style={{
                        position: 'absolute',

                        width: DesignConvert.getW(253),
                        height: DesignConvert.getH(32),

                    }}
                />
                <FlatList
                    ref={this._getFlatList}
                    data={this._horseLampList}
                    // data={[]}
                    renderItem={this._renderHorseLampItem}
                    initialNumToRender={1}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    onScrollToIndexFailed={this._onScrollToIndexFailed}
                    style={{
                        width: DesignConvert.getW(253),
                        height: DesignConvert.getH(32),

                    }}
                />
            </View>

        )
    }
}