'use strict';

import React, { PureComponent } from "react";
import { View, Image, Text, TouchableOpacity, ImageBackground } from "react-native";
import DesignConvert from "../../../utils/DesignConvert";
import _BeckoningItem from './_BeckoningItem';
import { ic_fangzhu } from "../../../hardcode/skin_imgs/room";
import Config from "../../../configs/Config";
import RoomInfoCache from "../../../cache/RoomInfoCache";
import UserInfoCache from "../../../cache/UserInfoCache";
import _WaveSoundItem from "./_WaveSoundItem";
import _WaveSoundItem2 from "./_WaveSoundItem2";
import ModelEvent from "../../../utils/ModelEvent";
import { EVT_UPDATE_ROOM_MAIN_MIC, EVT_UPDATE_ROOM_DATA } from "../../../hardcode/HGlobalEvent";
import _RecreationItem from "./recreation/_RecreationItem";
import _NoticeItem from './notice/_NoticeItem'
import ToastUtil from "../../base/ToastUtil";
import { EVT_LOGIC_UPDATE_ROOM_NOTIC } from "../../../hardcode/HLogicEvent";
import _SilentItem from "./_SilentItem";
import _FocusButtonItem from "./_FocusButtonItem";


export default class _MainMicItem extends PureComponent {

    componentDidMount() {
        ModelEvent.addEvent(null, EVT_UPDATE_ROOM_MAIN_MIC, this._onCacheUpdated);
        ModelEvent.addEvent(null, EVT_UPDATE_ROOM_DATA, this._onCacheUpdated);
    }

    componentWillUnmount() {
        ModelEvent.removeEvent(null, EVT_UPDATE_ROOM_MAIN_MIC, this._onCacheUpdated);
        ModelEvent.removeEvent(null, EVT_UPDATE_ROOM_DATA, this._onCacheUpdated);
    }

    _onCacheUpdated = () => {
        this.forceUpdate();
    }

    _getHeadIcon() {
        //UserInfo
        const createUserInfo = RoomInfoCache.createUserInfo;

        if (!createUserInfo) {
            const roomOwnerInfo = RoomInfoCache.ownerUserInfo;
            if (!roomOwnerInfo) {
                return null;
            }

            return { uri: Config.getHeadUrl(roomOwnerInfo.userId, roomOwnerInfo.logoTime, roomOwnerInfo.thirdIconurl) };
        }

        return {
            uri: Config.getHeadUrl(
                createUserInfo.userId,
                createUserInfo.logoTime,
                createUserInfo.thirdIconurl
            )
        }
    }

    _renderOnline() {
        if (RoomInfoCache.roomData.createOnline) {
            return null
        }
        return (
            <View
                style={{
                    position: 'absolute',
                    width: DesignConvert.getW(64),
                    height: DesignConvert.getH(64),
                    backgroundColor: '#00000099',
                    borderRadius: DesignConvert.getW(50),
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Text
                    style={{
                        color: '#FFFFFF',
                        fontSize: DesignConvert.getF(12),
                    }}
                >离开</Text>
            </View>
        )
    }

    _renderLeave() {
        // if (RoomInfoCache.createUserInfo) {
        //     return null;
        // }
        // return (
        //     <Text
        //         style={{
        //             width: DesignConvert.getW(68),
        //             height: DesignConvert.getH(68),

        //             color: '#F5F5F5',
        //             fontSize: DesignConvert.getF(12),
        //             fontStyle: 'bold',
        //             textAlign: 'center',
        //             backgroundColor: '#0000007f',
        //             borderWidth: DesignConvert.getW(1.5),
        //             borderColor: 'white',
        //             borderRadius: DesignConvert.getW(50),
        //             textAlign: 'center',
        //             textAlignVertical: 'center',
        //         }}
        //     >离开一下</Text>
        // )
    }

    _renderSilent() {
        if (RoomInfoCache.roomData.createOpenMic) {
            return null;
        }

        return (
            <_SilentItem />
        );
    }

    _imgLayout = () => {
        this._imgRef && this._imgRef.measure((parentX, parentY, width, height, screenX, screenY) => {
            require('../../../model/room/MicPostionModel').default.setMicPostionWithIndex(
                0,
                { screenX, screenY }
            )
        })
    }

    _onPress = () => {
        require("../../../model/room/RoomSeatModel").pressMainSeat();
    }

    render() {
        if (!RoomInfoCache.roomData) {
            return null;
        }

        const userInfo = RoomInfoCache.mainMicUserInfo;
        const userId = userInfo && userInfo.userId;
        const userSex = userInfo && userInfo.sex

        const headIcon = this._getHeadIcon();

        const userName = userInfo
            ? decodeURIComponent(userInfo.nickName)
            : '';
        const bMale = userInfo && userInfo.sex == 1;
        const beckoningNum = RoomInfoCache.roomData.createHeartValue

        return (
            <View
                style={{
                    // flexDirection: 'column',
                    marginTop:DesignConvert.getH(65)+DesignConvert.statusBarHeight,
                    alignItems: 'center',
                }}
            >

                <TouchableOpacity
                    style={{
                        width: DesignConvert.getW(64),
                        height: DesignConvert.getH(64),
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={this._onPress}
                >
                    <_WaveSoundItem
                        width={DesignConvert.getW(70)}
                        height={DesignConvert.getH(70)}
                        userId={userId}
                    />

                    <Image
                        ref={ref => this._imgRef = ref}
                        style={{
                            // position: 'absolute',
                            width: DesignConvert.getW(64),
                            height: DesignConvert.getH(64),
                            borderRadius: DesignConvert.getW(50),
                            borderWidth:DesignConvert.getW(1),
                            borderColor:'#FFFFFF55',
                        }}
                        source={headIcon}
                        onLayout={this._imgLayout}
                    />

                    {/* <_WaveSoundItem2
                        width={DesignConvert.getW(62)}
                        height={DesignConvert.getH(62)}
                        userId={userId}
                        sex={userSex}
                    /> */}

                    {this._renderSilent()}

                    {this._renderOnline()}



                    <_RecreationItem
                        width={DesignConvert.getW(64)}
                        height={DesignConvert.getH(64)}
                        bMainMic={true}
                        userId={userId}
                    />

                </TouchableOpacity>

                <View
                    style={{
                        position: 'absolute',
                        bottom: -DesignConvert.getH(5),
                    }}
                >

                    <_BeckoningItem
                        bMale={bMale}
                        num={beckoningNum}
                    />
                </View>

                <Text
                    style={{
                        position: 'absolute',
                        // left: DesignConvert.getW(70),
                        bottom: DesignConvert.getH(-20),
                        color: '#FFFFFF',
                        fontSize: DesignConvert.getF(11),
                    }}
                >{userName}</Text>


                {/* <_FocusButtonItem /> */}

            </View >
        );
    }
}