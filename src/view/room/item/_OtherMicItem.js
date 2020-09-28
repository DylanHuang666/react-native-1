'use strict';

import React, { PureComponent } from "react";
import { View, Image, Text, TouchableOpacity, NativeModules } from "react-native";
import DesignConvert from "../../../utils/DesignConvert";
import _BeckoningItem from './_BeckoningItem';
import { ic_boss, ic_empty, ic_lock, ic_silent, ic_girl_cover, ic_boy_cover, ic_mic_lock } from "../../../hardcode/skin_imgs/room";
import RoomInfoCache from "../../../cache/RoomInfoCache";
import Config from "../../../configs/Config";
import _WaveSoundItem from "./_WaveSoundItem";
import _WaveSoundItem2 from "./_WaveSoundItem2";
import ModelEvent from "../../../utils/ModelEvent";
import { SOCK_BRO_RoomResultRoomActionBroadcast } from "../../../hardcode/HSocketBroadcastEvent";
import ToastUtil from "../../base/ToastUtil";
import { ERoomActionType } from "../../../hardcode/ERoom";
import UserInfoCache from "../../../cache/UserInfoCache";
import _RecreationItem from "./recreation/_RecreationItem";
import { EVT_UPDATE_ROOM_OTHER_MIC } from "../../../hardcode/HGlobalEvent";
import _SilentItem from "./_SilentItem";


export default class _OtherMicItem extends PureComponent {

    constructor(props) {
        super(props)
        this._micUserId = ''
    }

    componentDidMount() {
        ModelEvent.addEvent(null, EVT_UPDATE_ROOM_OTHER_MIC, this._onCacheUpdate)
    }

    componentWillUnmount() {
        ModelEvent.removeEvent(null, EVT_UPDATE_ROOM_OTHER_MIC, this._onCacheUpdate)
    }

    _onCacheUpdate = () => {
        this.forceUpdate()
    }


    _getMicInfo() {
        //Mic位数据
        // message MicInfo {
        //     optional UserResult.UserBase base = 1;//用户(空为没有人)
        // 	optional int32 position = 2;//麦位1-N
        // 	optional bool lock = 3;//是否上锁
        // 	optional bool forbidMic = 4;//被禁麦
        // 	optional string friendRemark = 5;//好友备注名
        // 	optional bool openMic = 6;//是否开麦中
        // 	optional int64 forbidTime = 7;//被禁麦过期时间(时间戳) 0为没有禁麦
        // 	optional int64 heartValue = 8; //交友房(或抢帽子玩法或相亲视频房)此mic位上用户的心动值
        // 	optional string chooseId = 9; //交友房此mic位上用户选择的对象Id(空为没有选择)
        // 	optional int32 jobId = 10;// 身份id 0-官方人员 1-房主 2-嘉宾 3-管理员
        // 	optional string hatId = 11;// 抢帽子玩法的帽子id
        // 	optional bool isHatBuff = 12;// 是否在抢帽子玩法buff状态
        // 	repeated int32 dragonBalls = 13;// 黑8结果:为空未开结果,0值为?
        // 	repeated UserResult.UserBase contributeUser = 14;// 相亲视频房心动值贡献者信息
        // 	optional string banners = 15;// mic位上用户的banner图
        // 	optional bool openVideo = 16;// 是否开启了视频
        // 	optional int64 micOverTime = 17;//视频房男嘉宾mic位倒计时过期时间(-1为没限制)
        // 	optional int32 cardType = 18; //用户贵宾卡类型(3:星耀 2:钻石 1:白银 0:无卡)
        // }
        return RoomInfoCache.roomData.infos && RoomInfoCache.roomData.infos[this.props.index - 1];
    }

    _onPress = async () => {

        const micInfo = this._getMicInfo()
        if (micInfo) {
            if (RoomInfoCache.haveRoomPermiss || micInfo.base || require("../../../model/room/RoomModel").isSelfOnMainSeat()) {
                //有房间权限 or 麦位上有人 or 自己是主麦
                require("../../../model/room/RoomSeatModel").pressOtherSeat(this._getMicInfo());
            } else {
                if (!micInfo.lock) {
                    //权限处理
                    const permissStatus = await require("../../../model/PermissionModel").checkAudioRoomPermission();
                    if (permissStatus == 'denied' || permissStatus == 'blocked') {
                        ToastUtil.showCenter('麦克风权限未打开')
                        return
                    }
                    //麦位未上锁，直接上麦
                    //1,检测麦克风权限
                    //2,上麦
                    require('../../../model/room/RoomModel').default.action(ERoomActionType.MIC_UP, UserInfoCache.userId, this._position, 'true');
                }
            }
        }

    }

    _imgLayout = () => {
        this._imgRef && this._imgRef.measure((parentX, parentY, width, height, screenX, screenY) => {
            require('../../../model/room/MicPostionModel').default.setMicPostionWithIndex(
                this.props.index,
                { screenX, screenY }
            )
        })
    }

    _renderLock() {
        const left = this.props.left;
        const top = this.props.top;

        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: DesignConvert.getH(91),
                    // justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
                onPress={this._onPress}
            >
                <Image
                    ref={ref => this._imgRef = ref}
                    onLayout={this._imgLayout}
                    style={{
                        width: DesignConvert.getW(64),
                        height: DesignConvert.getH(64),
                    }}
                    source={ic_lock()}
                />
                <Text
                    style={{
                        marginTop: DesignConvert.getH(5),
                        color: '#FFFFFF',
                        fontSize: DesignConvert.getF(11),
                    }}
                >{this.props.index}</Text>
            </TouchableOpacity>
        );
    }

    _renderEmpty() {
        const left = this.props.left;
        const top = this.props.top;
        const bBoss = this.props.index == 8;

        if (bBoss) {
            return (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        // position: 'absolute',
                        // top: top,
                        // left: left,
                        // width: DesignConvert.getW(80),
                        // height: DesignConvert.getH(103),

                        // justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                    onPress={this._onPress}
                >
                    <Image
                        ref={ref => this._imgRef = ref}
                        onLayout={this._imgLayout}
                        style={{
                            width: DesignConvert.getW(64),
                            height: DesignConvert.getH(64),
                        }}
                        source={ic_boss()}
                    />
                    <Text
                        style={{
                            marginTop: DesignConvert.getH(5),
                            color: '#FFFFFF',
                            fontSize: DesignConvert.getF(11),
                        }}
                    >老板位</Text>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    // height: DesignConvert.getH(91),

                    // justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
                onPress={this._onPress}
            >
                <Image
                    ref={ref => this._imgRef = ref}
                    onLayout={this._imgLayout}
                    style={{
                        width: DesignConvert.getW(64),
                        height: DesignConvert.getH(64),
                    }}
                    source={ic_empty()}
                />
                <Text
                    style={{
                        marginTop: DesignConvert.getH(5),
                        color: '#FFFFFF',
                        fontSize: DesignConvert.getF(11),
                    }}
                >{this.props.index}</Text>
            </TouchableOpacity>
        );
    }

    render() {

        if (!RoomInfoCache.roomData) {
            return null;
        }

        const micInfo = this._getMicInfo();
        if (micInfo && micInfo.base) {
            this._micUserId = micInfo.base.userId
        }

        if (!micInfo) {
            return null
        }

        this._position = micInfo.position

        if (!micInfo) {
            return this._renderEmpty();
        }
        if (micInfo.lock) {
            return this._renderLock();
        }
        if (!micInfo.base) {
            return this._renderEmpty();
        }


        const headUrl = { uri: Config.getHeadUrl(micInfo.base.userId, micInfo.base.logoTime, micInfo.base.thirdIconurl) };
        const name = decodeURIComponent(micInfo.base.nickName);
        const bMale = micInfo.base.sex == 1;

        const left = this.props.left;
        const top = this.props.top;

        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    // height: DesignConvert.getH(91),
                    // justifyContent: 'flex-start',
                    width: DesignConvert.getW(64),
                        height: DesignConvert.getH(64),
                    alignItems: 'center',
                    // zIndex: 999
                }}
                onPress={this._onPress}
            >
                <View
                    style={{
                        width: DesignConvert.getW(64),
                        height: DesignConvert.getH(64),
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >

                    <_WaveSoundItem
                        // style={{
                        //     position:'absolute',
                        //     top: -DesignConvert.getH(3),
                        //     left: -DesignConvert.getW(3),
                        // }}
                        width={DesignConvert.getW(70)}
                        height={DesignConvert.getH(70)}
                        userId={micInfo.base.userId}
                        sex={micInfo.base.sex}
                    />

                    <Image
                        ref={ref => this._imgRef = ref}
                        onLayout={this._imgLayout}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: DesignConvert.getW(64),
                            height: DesignConvert.getH(64),
                            borderRadius: DesignConvert.getW(50),
                        }}
                        source={headUrl}
                    />

                    {/* <_WaveSoundItem2
                        width={DesignConvert.getW(77)}
                        height={DesignConvert.getH(77)}
                        userId={micInfo.base.userId}
                        sex={micInfo.base.sex}
                    /> */}

                    {!(micInfo.openMic && !micInfo.forbidMic) &&
                        <_SilentItem />
                    }


                    <_RecreationItem
                        width={DesignConvert.getW(64)}
                        height={DesignConvert.getH(64)}
                        bMainMic={false}
                        userId={this._micUserId}
                    />

                </View>

                <Text
                    numberOfLines={1}
                    style={{
                        position: 'absolute',
                        // left: DesignConvert.getW(70),
                        bottom: DesignConvert.getH(-20),
                        color: '#FFFFFF',
                        fontSize: DesignConvert.getF(11),
                    }}
                >{name}</Text>

                <View
                    style={{
                        position: 'absolute',
                        bottom: -DesignConvert.getH(5),
                    }}
                >
                    <_BeckoningItem
                        bMale={bMale}
                        num={micInfo.heartValue}
                    />
                </View>

            </TouchableOpacity>
        );
    }
}