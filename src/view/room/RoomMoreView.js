/**
 * 房间更多界面
 */

'use strict';

import React,
{ PureComponent } from 'react';
import BaseView from "../base/BaseView";
import { View, ImageBackground, Image, Text, TouchableOpacity, TextInput } from "react-native";
import DesignConvert from '../../utils/DesignConvert';
import {
    ic_lock,
    ic_unlock,
    ic_change_bg,
    ic_bgm,
    ic_manager,
    ic_big_emoji,
    ic_ear_back_open,
    ic_ear_back_close,
    ic_movie_open,
    ic_movie_close,
    ic_room_movie_open,
    ic_room_movie_close,
    ic_clear_chat,
    ic_black,
    ic_offline_close,
    ic_offline_open,
    ic_pack_up,
    ic_room_set,
    ic_exit_room,
    ic_min_room,
    ic_bg_comm,
    ic_bg_per,
} from '../../hardcode/skin_imgs/room_more';
import { ERoomModify, ERoomActionType } from '../../hardcode/ERoom';
import RoomInfoCache from '../../cache/RoomInfoCache';
import ModelEvent from '../../utils/ModelEvent';
import { SOCK_BRO_RoomResultRoomActionBroadcast } from '../../hardcode/HSocketBroadcastEvent';
import { EVT_LOGIC_REFRESH_ROOM_MORE } from '../../hardcode/HLogicEvent';
import HResultStatus from '../../hardcode/HResultStatus';
import ToastUtil from '../base/ToastUtil';
import Config from '../../configs/Config';
import _BigEmojiItem from './item/bottom/_BigEmojiItem';

class _Item extends PureComponent {

    render() {
        return (
            <TouchableOpacity
                style={{
                    // width: DesignConvert.getW(56),
                    // marginHorizontal:DesignConvert.getW(14),
                    alignItems: 'center',
                    marginTop: DesignConvert.getH(6),
                    marginBottom: DesignConvert.getH(6),
                }}
                onPress={this.props.onPress}
            >
                <Image
                    style={{
                        width: DesignConvert.getW(28),
                        height: DesignConvert.getH(28),
                    }}
                    source={this.props.icon}
                />
                <Text
                    style={{
                        marginTop: DesignConvert.getH(3),
                        color: '#FFFFFF',
                        fontSize: DesignConvert.getF(10)
                    }}
                >{this.props.name}</Text>
            </TouchableOpacity>
        );
    }
}

export default class RoomMoreView extends BaseView {


    constructor(props) {
        super(props)

        this._inRoomFunRobotManua = false//是否在机器人配置协议里，用于是否显示离线模式
        if (RoomInfoCache.haveRoomPermiss) {
            require('../../model/staticdata/StaticDataModel').getFunRobotManual(RoomInfoCache.createUserInfo.userId)
                .then(data => {
                    this._inRoomFunRobotManua = data
                    this.forceUpdate()
                })
        }
    }

    componentDidMount() {
        super.componentDidMount()
        ModelEvent.addEvent(null, EVT_LOGIC_REFRESH_ROOM_MORE, this._refresh)

    }

    componentWillUnmount() {
        super.componentWillUnmount()
        ModelEvent.removeEvent(null, EVT_LOGIC_REFRESH_ROOM_MORE, this._refresh)
    }

    _refresh = () => {
        this.forceUpdate()
    }


    _onLock = () => {
        if (RoomInfoCache.isNeedPassword) {
            //解锁
            require('../../router/level3_router').showCanclePassword();
        } else {
            //上锁
            require('../../router/level3_router').showSetPassword(0, RoomInfoCache.roomId);
        }
    }

    _onChangeBg = () => {
        //todo
        alert('todo: 更换背景图');
    }

    _onBgm = () => {
        //todo
        alert('todo: 背景音乐');
    }

    _onManager = () => {
        this.popSelf();
        require("../../router/level3_router").showRoomManagerView(RoomInfoCache.roomId);
    }

    _onBigEmoji = () => {
        this.popSelf();
        require('../../router/level3_router').showRoomBigFaceView()
    }

    _onEarBack = () => {
        //todo
        alert('todo: 耳返');
    }

    _onOpenMovie = () => {
        RoomInfoCache.setSelfAnimation(!RoomInfoCache.isSelfAnimation)
        RoomInfoCache.isSelfAnimation ? ToastUtil.showCenter('礼物特效已开启') : ToastUtil.showCenter('礼物特效已关闭')
        this.forceUpdate()
    }

    _onOpenRoomMovie = () => {
        if (RoomInfoCache.isGiftAnimation) {
            //关闭
            require("../../router/level2_router").showNormInfoDialog("关闭后将看不到礼物特效，运作更加流畅，是否确认关闭礼物特效。",
                "确定", this._onCloseRoomMovie,
                "取消", undefined);
        } else {
            //打开
            require('../../model/room/RoomModel').default.action(ERoomActionType.OPEN_GIFT_ANIMATION, 0, '')
        }
    }

    _onCloseRoomMovie = () => {
        require('../../model/room/RoomModel').default.action(ERoomActionType.CLOSE_GIFT_ANIMATION, 0, '')
    }

    _onClearChat = () => {
        //清空公屏
        require('../../model/room/RoomModel').default.action(ERoomActionType.CLEAR_ROOM_MSG, 0, '')
            .then(data => {

            })
    }

    _onRoomSet = () => {
        this.popSelf()
        require('../../router/level3_router').oepnRoomSetView()
    }

    _onBlack = () => {
        this.popSelf();
        require('../../router/level3_router').showRoomBlackListView();
    }

    _onOffline = () => {
        const roomData = RoomInfoCache.roomData;
        this._bOffline = roomData && roomData.offlineMode;
        require('../../model/room/RoomModel').default.action(this._bOffline ? ERoomActionType.CLOSE_OFFLINEMODE : ERoomActionType.OPEN_OFFLINEMODE, 0, '')
            .then(bSuc => {
                if (!bSuc) {
                    return;
                }
                if (!roomData) return;
                roomData.offlineMode = !this._bOffline;
                this.forceUpdate();
            })
    }

    _onExit = () => {
        this.popSelf();

        const fnCloseCallerView = this.props.params.fnCloseCallerView;
        require('../../model/room/RoomModel').default.leave();
        fnCloseCallerView && fnCloseCallerView();
    }

    _onMinify = () => {
        this.popSelf();

        const fnCloseCallerView = this.props.params.fnCloseCallerView;
        fnCloseCallerView && fnCloseCallerView();
    }

    render() {
        const roomData = RoomInfoCache.roomData;

        //是否上锁
        this._bEar = RoomInfoCache.isNeedPassword;
        this._bOffline = roomData && roomData.offlineMode;




        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >

                <TouchableOpacity
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.sheight,
                    }}
                    onPress={this.popSelf}
                />

                {/* <View
                    style={{
                        position: 'absolute',
                        width: DesignConvert.swidth,
                        bottom: DesignConvert.addIpxBottomHeight(),
                        borderTopLeftRadius: DesignConvert.getW(15),
                        borderTopRightRadius: DesignConvert.getW(15),
                        paddingTop: DesignConvert.getH(13),
                        paddingBottom: DesignConvert.getH(13),
                        backgroundColor: '#F6F6F6',
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                    }}
                > */}
                <ImageBackground
                    source={RoomInfoCache.haveRoomPermiss ? ic_bg_per() : ic_bg_comm()}
                    style={{
                        position: 'absolute',
                        width: DesignConvert.getW(RoomInfoCache.haveRoomPermiss ? 346.5 : 69.5),
                        height: DesignConvert.getH(77.5),
                        bottom: DesignConvert.getH(53),
                        right: DesignConvert.getW(RoomInfoCache.haveRoomPermiss ? 13.5 : 39),
                        // borderTopLeftRadius: DesignConvert.getW(15),
                        // borderTopRightRadius: DesignConvert.getW(15),
                        paddingTop: DesignConvert.getH(10),
                        paddingBottom: DesignConvert.getH(22),
                        // backgroundColor: '#F6F6F6',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}>

                    <_Item
                        icon={RoomInfoCache.isSelfAnimation ? ic_movie_open() : ic_movie_close()}
                        name={RoomInfoCache.isSelfAnimation ? '关闭特效' : '开启特效'}
                        onPress={this._onOpenMovie}
                    />

                    {/* {(RoomInfoCache.jobId == 1 || RoomInfoCache.jobId == 2) && this._inRoomFunRobotManua && */}
                    {RoomInfoCache.haveRoomPermiss &&
                        <_Item
                            icon={this._bOffline ? ic_offline_open() : ic_offline_close()}
                            name={this._bOffline ? '离线模式' : '离线模式'}
                            onPress={this._onOffline}
                        />
                    }

                    {(RoomInfoCache.jobId == 0 || RoomInfoCache.jobId == 1 || RoomInfoCache.jobId == 2) &&
                        <_Item
                            icon={ic_manager()}
                            name={'管理员'}
                            onPress={this._onManager}
                        />
                    }


                    {RoomInfoCache.haveRoomPermiss &&
                        <_Item
                            icon={ic_black()}
                            name={'黑名单'}
                            onPress={this._onBlack}
                        />
                    }

                    {/* {RoomInfoCache.haveRoomPermiss &&
                        <_Item
                            icon={ic_room_set()}
                            name={'房间设置'}
                            onPress={this._onRoomSet}
                        />
                    } */}

                    {/* {RoomInfoCache.haveRoomPermiss &&
                        <_Item
                            icon={ic_clear_chat()}
                            name={'清空公屏'}
                            onPress={this._onClearChat}
                        />
                    } */}


                    {RoomInfoCache.haveRoomPermiss &&
                        <_Item
                            icon={RoomInfoCache.isGiftAnimation ? ic_room_movie_open() : ic_room_movie_close()}
                            name={RoomInfoCache.isGiftAnimation ? '关闭房间动效' : '开启房间动效'}
                            onPress={this._onOpenRoomMovie}
                        />

                    }

                    {RoomInfoCache.haveRoomPermiss &&
                        <_Item
                            icon={ic_lock()}
                            name={'房间上锁'}
                            onPress={this._onLock}
                        />

                    }








                    {/* <_Item
                        icon={ic_min_room()}
                        name={'最小化'}
                        onPress={this._onMinify}
                    />


                    <_Item
                        icon={ic_exit_room()}
                        name={'退出房间'}
                        onPress={this._onExit}
                    /> */}


                </ImageBackground>
                {/* </View> */}
            </View >

        );
    }

}