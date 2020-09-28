/**
 * 直播间
 */

'use strict';

import React from 'react';
import BaseView from "../base/BaseView";
import { View, Text, findNodeHandle, PanResponder, Keyboard, TouchableOpacity, Image } from "react-native";
import _BgItem from './item/_BgItem';
import _RoomNameItem from './item/_RoomNameItem';
import _RoomTypeItem from './item/_RoomTypeItem';
import _IDItem from './item/_IDItem';
import _OnlineItem from './item/_OnlineItem';
import _FocusButtonItem from './item/_FocusButtonItem';
import DesignConvert from '../../utils/DesignConvert';
import _SmashEggItem from './item/_SmashEggItem';
import _RankListItem from './item/_RankListItem';
import _MainMicItem from './item/_MainMicItem';
import _OtherMicItem from './item/_OtherMicItem';
import _RoomBannerItem from './item/_RoomBannerItem';
import _RoomChatHistoryList from './item/_RoomChatHistoryList';
import _RoomBottomItem from './item/bottom/_RoomBottomItem';
import RoomInfoCache from '../../cache/RoomInfoCache';
import _RoomCloseItem from './item/_RoomCloseItem';
import _RoomMoreItem from './item/_RoomMoreItem';
import _RoomZadanContainer from './item/smash/_RoomZadanContainer';
import _RoomGiftBannerContainer from './item/gift/_RoomGiftBannerContainer';
import _RoomFullServiceGiftContainer from './item/gift/_RoomFullServiceGiftContainer';
import _RoomContainerKoiFishContainer from './item/gift/_RoomContainerKoiFishContainer';
import _RoomOtherGiftFlyAnimateItem from './item/_RoomOtherGiftFlyAnimateItem';
import _RoomSliderView from './item/_RoomSliderView';
import ModelEvent from '../../utils/ModelEvent';
import { EVT_LOGIC_SELF_BY_KICK } from '../../hardcode/HLogicEvent';
import _RoomFullScreenGiftItem from './item/gift/_RoomFullScreenGiftItem';
import KeyboardAvoidingViewExt from '../base/KeyboardAvoidingViewExt';
import { _playRoomImage } from '../main/MainView';
import _NoticeItem from './item/notice/_NoticeItem';
import { ic_min_room, ic_fangzhu, ic_online } from '../../hardcode/skin_imgs/room';
import _RoomLockItem from './_RoomLockItem';
import _MicQueueItem from './item/bottom/_MicQueueItem';
// import _NoticeWidget from './item/_NoticeWidget';

let LEFT_MAX_WIDTH = DesignConvert.swidth;          // 左边最大宽度

export default class LiveRoomView extends BaseView {

    constructor(props) {
        super(props);
        // this.setSlidePanResponder();
        this._animating = false;
        // this._answerPanResponder = true;//是否响应左滑手势
        this.styleLeft = LEFT_MAX_WIDTH;
        this.isShowSliderView = false;

        this._isShowRankAndOnline = false;

        this.renderRankOrOnline = 0;
    }

    componentDidMount() {
        super.componentDidMount();

        ModelEvent.addEvent(null, EVT_LOGIC_SELF_BY_KICK, this._onKick)

        const roomData = RoomInfoCache.roomData;
        if (!roomData) {
            return;
        }

        require('../../model/room/RoomModel').default.getOwnerData(roomData.createId, roomData.roomOwnerId)
    }

    componentWillUnmount() {
        super.componentWillUnmount();

        ModelEvent.removeEvent(null, EVT_LOGIC_SELF_BY_KICK, this._onKick)
        require('../../model/room/RoomModel').default.setBgRef(null);
    }


    _onCacheUpdated = () => {
        this.forceUpdate();

    }

    onHardwareBackPress() {
        this.popSelf()
    }

    _onKick = () => {
        this.popSelf();
    }


    _getAudioLiveBGRef = (ref) => {
        require('../../model/room/RoomModel').default.setBgRef(ref);

        this._audioLiveBGRef = ref;
        this._roomSliderRef && this._audioLiveBGRef && this._roomSliderRef.setState({ viewRef: findNodeHandle(this._audioLiveBGRef) });
    }

    _onClose = () => {
        require('../../router/level3_router').showExitRoomView(this.popSelf);
        // this.popSelf();
    }

    _onMore = () => {
        require("../../router/level3_router").showRoomMoreView(this.popSelf);
    }

    // _getRoomSliderRef = (ref) => {
    //     this._roomSliderRef = ref;
    //     this._roomSliderRef && this._audioLiveBGRef && this._roomSliderRef.setState({viewRef: findNodeHandle(this._audioLiveBGRef)});
    // }

    // _showSliderView = (show) => {
    //     if (this._animating) {
    //         return;
    //     }
    //     this._animating = true;

    //     this.isShowSliderView = show;
    //     if (show) {
    //         this._recoverPage();
    //     } else {
    //         this._slidePage();
    //     }
    //     this._animating = false;
    // }

    // _recoverPage() {
    //     if (this._sliding) return;
    //     this._sliding = true;
    //     this.__recoverPage();
    // }

    // __recoverPage = () => {
    //     this._recoverTime = requestAnimationFrame(this._onAnimateFrame);
    // }

    // _onAnimateFrame = () => {
    //     this.styleLeft -= 30;
    //     if (this.styleLeft <= 0) {
    //         this.styleLeft = 0;
    //         cancelAnimationFrame(this._recoverTime);
    //         this._recoverTime = null;
    //         this._sliding = false;
    //         //刷新左滑出来的数据

    //     } else {
    //         this.__recoverPage();
    //     }
    //     this._updateStyle();
    // }

    // _slidePage() {
    //     if (this._sliding) return;
    //     this._sliding = true;
    //     this.__slidePage();
    // }

    // __slidePage = () => {
    //     this._slideTimer = requestAnimationFrame(() => {
    //         this.styleLeft += 30;
    //         if (this.styleLeft >= LEFT_MAX_WIDTH) {
    //             this.styleLeft = LEFT_MAX_WIDTH;
    //             cancelAnimationFrame(this._slideTimer);
    //             this._slideTimer = null;
    //             this._sliding = false;
    //         } else {
    //             this.__slidePage();
    //         }
    //         this._updateStyle();
    //     });
    // }

    // _updateStyle() {
    //     this._onlineViewRef && this._onlineViewRef.setNativeProps({
    //         style: {
    //             left: this.styleLeft,
    //         }
    //     });
    // }

    _onShowOnline = (bShowRank) => {
        if (this._isShowRankAndOnline) return;

        this._isShowRankAndOnline = true;
        this.forceUpdate();
    }

    _onShowRank = (num) => {
        if (this._isShowRankAndOnline) return;
        this.renderRankOrOnline = num
        this._isShowRankAndOnline = true;
        this.forceUpdate();
    }

    _onCloseRoomRankAndOnlineView = () => {
        if (!this._isShowRankAndOnline) return;

        this._isShowRankAndOnline = false;
        this.forceUpdate();
    }


    _renderTopItem = () => {

        return (
            <View
                style={{
                    justifyContent: "center",
                    marginStart: DesignConvert.getW(4),
                }}>

                <_playRoomImage
                    width={DesignConvert.getW(28)}
                    height={DesignConvert.getH(28)}
                />
            </View>
        )
    }

    _renderNormal(roomData) {

        return (
            <View
                onLayout={(evt) => {
                    this._roomSliderRef && this._roomSliderRef.setHeight(evt.nativeEvent.layout.height)
                }}
                style={{ flex: 1 }}>
                <KeyboardAvoidingViewExt
                    behavior="height"
                    style={{
                        flex: 1,
                    }}
                >
                    <View style={{ flex: 1 }} ref={this._getAudioLiveBGRef} collapsable={false}>

                        <_BgItem
                            bg={roomData.bg}
                        />

                        <View
                            style={{
                                width: DesignConvert.swidth,
                                height: DesignConvert.getH(44),
                                position: 'absolute',
                                top: DesignConvert.statusBarHeight,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>


                            {/* <TouchableOpacity
                                style={{
                                    width: DesignConvert.getW(34),
                                    height: DesignConvert.getH(34),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={this.popSelf}
                            >

                                <Image
                                    source={ic_min_room()}
                                    style={{
                                        width: DesignConvert.getW(9),
                                        height: DesignConvert.getH(16),
                                    }}
                                />

                            </TouchableOpacity> */}


                            <View
                                style={{
                                    flex: 1,
                                    width: DesignConvert.getW(180),
                                    // height: DesignConvert.getH(45),
                                    borderRadius: DesignConvert.getW(5),
                                    borderWidth: DesignConvert.getW(0.5),
                                    borderColor: '#121212',
                                    backgroundColor: '#121212',
                                    position: 'absolute',
                                    left: DesignConvert.getW(15),
                                    top: DesignConvert.getH(5),
                                    paddingLeft: DesignConvert.getW(8),
                                    paddingVertical: DesignConvert.getH(3),
                                    // alignItems: 'center',
                                }}
                            >
                                <View
                                    style={{
                                        // height: DesignConvert.getH(50),
                                        // justifyContent: 'space-around',
                                        flexDirection: 'row',
                                    }}
                                >

                                    <_RoomNameItem />

                                    <_FocusButtonItem />

                                </View>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: DesignConvert.getH(2),
                                        // alignItems: 'center',
                                    }}
                                >

                                    <_RoomTypeItem
                                        typeId={roomData.type}
                                    />

                                    <_IDItem
                                        id={RoomInfoCache.viewRoomId}
                                    />

                                    <_OnlineItem
                                        onlineNum={roomData.onlineNum}
                                    />
                                </View>

                            </View>

                            {/* {this._renderTopItem()} */}


                            {/* 
                            <_RoomLockItem /> */}

                            <_RoomMoreItem
                                onPress={this._onClose}
                            />



                        </View>

                        <_MainMicItem />

                        <_RankListItem />

                        {/* <_RoomCloseItem
                            onPress={this._onClose}
                        /> */}
                        <_OnlineItem type={2} />
                        <_NoticeItem />

                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                position: 'absolute',
                                top: DesignConvert.getH(160) + DesignConvert.statusBarHeight,
                                paddingStart: DesignConvert.getW(3),
                                paddingEnd: DesignConvert.getW(3),
                            }}
                        >
                            <_OtherMicItem
                                index={1}
                            />
                            <_OtherMicItem
                                index={2}
                            />
                            <_OtherMicItem
                                index={3}
                            />
                            <_OtherMicItem
                                index={4}
                            />


                        </View>

                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                position: 'absolute',
                                top: DesignConvert.getH(254) + DesignConvert.statusBarHeight,
                                paddingStart: DesignConvert.getW(3),
                                paddingEnd: DesignConvert.getW(3),
                            }}
                        >

                            <_OtherMicItem
                                index={5}
                            />
                            <_OtherMicItem
                                index={6}
                            />
                            <_OtherMicItem
                                index={7}
                            />
                            <_OtherMicItem
                                index={8}
                            />
                        </View>


                        {/* 麦位上的人收到礼物时的飞行动画  (不是自己送的 别人送的) */}
                        <_RoomOtherGiftFlyAnimateItem />

                        <View
                            style={{
                                position: 'absolute',
                                right: DesignConvert.getW(20),
                                top: DesignConvert.getH(370) + DesignConvert.statusBarHeight,
                                flexDirection: 'column',
                            }}
                        >
                            <_SmashEggItem
                                onClose={this.popSelf}
                                roomId={roomData.roomId}
                                type={roomData.type}
                            />

                            <_RoomBannerItem />
                        </View>
                        <_MicQueueItem />

                        <_RoomContainerKoiFishContainer />

                        <_RoomChatHistoryList />

                        {/* 底部按钮组 */}
                        <_RoomBottomItem />

                        {/* 砸蛋跑道 */}
                        <_RoomZadanContainer />

                        {/* 送礼跑道 */}
                        <_RoomGiftBannerContainer />

                        {/* 全服送礼跑道 */}
                        <_RoomFullServiceGiftContainer />

                        <_RoomFullScreenGiftItem />

                        {/* <View
                            ref={ref => this._onlineViewRef = ref}
                            style={{
                                position: 'absolute',
                                zIndex: 10,
                                elevation: 10,
                                flex: 1,
                                backgroundColor: '#00000000',
                                top: 0,
                                left: this.styleLeft,
                                overflow: 'hidden'
                            }}>
                            <_RoomSliderView
                                onGetMe={this._getRoomSliderRef}
                                showSliderView={this._showSliderView}/>
                        </View> */}
                    </View>
                </KeyboardAvoidingViewExt>
            </View>
        )
    }


    render() {
        const roomData = RoomInfoCache.roomData;

        //已经退出房间了
        if (!roomData) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text>退出房间</Text>
                </View>
            );
        }

        //排行榜、在线列表
        if (this._isShowRankAndOnline) {
            // return this._renderRankAndOnline(roomData, this.renderRankOrOnline);
        }

        //正常模式
        return this._renderNormal(roomData);
    }

}