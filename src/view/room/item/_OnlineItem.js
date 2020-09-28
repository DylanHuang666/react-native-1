'use strict';

import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import DesignConvert from "../../../utils/DesignConvert";
import ModelEvent from "../../../utils/ModelEvent";
import RoomInfoCache from '../../../cache/RoomInfoCache';
import { EVT_LOGIC_UPDATE_ROOM_ONLINE } from "../../../hardcode/HLogicEvent";
import { ic_online, ic_online2,ic_rank_cup } from "../../../hardcode/skin_imgs/room";

export default class _OnlineItem extends PureComponent {

    constructor(props) {
        super(props);

        this._onlineNum = this.props.onlineNum

        this._headUrl1 = undefined
        this._headUrl3 = undefined
        this._headUrl3 = undefined
        this._initData()
    }

    componentDidMount() {
        //更新房间人数
        ModelEvent.addEvent(null, EVT_LOGIC_UPDATE_ROOM_ONLINE, this._onRefreshOnline)
    }


    componentWillUnmount() {
        ModelEvent.removeEvent(null, EVT_LOGIC_UPDATE_ROOM_ONLINE, this._onRefreshOnline)
    }


    _onRefreshOnline = (data) => {
        this._onlineNum = data
        this._initData()
    }

    _initData() {
        // require("../../../model/room/RoomManagerModel").default.getOnlineMembers(RoomInfoCache.roomId, 1)
        //     .then(data => {
        //         data.forEach((item, index) => {
        //             switch (index) {
        //                 case 0:
        //                     this._headUrl1 = require("../../../configs/Config").default.getHeadUrl(item.base.userId, item.base.logoTime, item.base.thirdIconurl)
        //                     break;
        //                 case 1:
        //                     this._headUrl2 = require("../../../configs/Config").default.getHeadUrl(item.base.userId, item.base.logoTime, item.base.thirdIconurl)
        //                     break;
        //                 case 2:
        //                     this._headUrl3 = require("../../../configs/Config").default.getHeadUrl(item.base.userId, item.base.logoTime, item.base.thirdIconurl)
        //                     break;
        //             }
        //         });

        //         this.forceUpdate();
        //     })
    }

    //用户进入房间通知
    // message EnterRoomBroadcast {
    // 	required string roomId = 1;//房间ID
    // 	required int32 mainType = 2;//房间类型
    // 	required UserResult.UserBase base = 3;//用户基本信息
    // 	optional int32 onlineNum = 4;//在线成员数	
    // 	required int32 index = 5;//位置
    // 	optional string carId = 6;//坐驾ID
    // 	optional int32 charmLv = 7;//魅力等级
    // 	optional int32 contributeLv = 8;// 财富等级	
    // 	optional bool openMirror = 9;//是否开启镜像
    // 	optional int32 identity = 10;// 1-普通用户，2-vip，3-富豪
    // 	optional int32 source = 11;//来源 1：寻友 
    // 	optional int64 loginTime = 12;//登陆房间时间
    // 	optional bool showCar = 13;// 是否播放座驾动画
    // 	optional int32 jobId = 14;//职位
    // 	optional bool isGuardian = 15;// 是否是守护团成员，true是，false不是
    // 	optional int32 guardianLv = 17;// 用户在守护团的等级
    // 	optional int32 cardType = 18;//用户贵宾卡类型	
    // }

    _showRoomOnlineView = () => {
        require("../../../router/level3_router").showOnlineMemberPage(RoomInfoCache.roomId);
        // this.props.onPress();
    }

    render() {
        if (this.props.type == 2) {
            return (
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        width: DesignConvert.getW(80),
                        height: DesignConvert.getH(28),
                        borderTopLeftRadius: DesignConvert.getW(20),
                        borderBottomLeftRadius: DesignConvert.getW(20),
                        borderWidth: DesignConvert.getW(1.5),
                        borderColor: '#121212',
                        backgroundColor: '#12121255',
                        top: DesignConvert.getH(102) + DesignConvert.statusBarHeight,
                        right: DesignConvert.getW(-1),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: DesignConvert.getW(3),
                    }}
                    onPress={this._showRoomOnlineView}
                >


                    <Image
                        style={{
                            width: DesignConvert.getW(16),
                            height: DesignConvert.getH(16),
                        }}
                        source={ic_online2()}
                    >

                    </Image>

                    <Text
                        style={{
                            color: '#D5CEFF',
                            fontSize: DesignConvert.getF(11),
                            marginStart: DesignConvert.getW(5),
                        }}
                        numberOfLines={1}
                    >在线的人</Text>

                    {/* 
                        <Image
                            style={{
                                marginLeft: DesignConvert.getW(5),
                                width: DesignConvert.getW(13),
                                height: DesignConvert.getH(13),
                            }}
                            source={ic_edit_notice()}
                        /> */}
                </TouchableOpacity>
            )
        }

        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: DesignConvert.getW(5),
                }}
                onPress={this._showRoomOnlineView}
            >

                {/* {this._headUrl3 &&
                    <Image
                        style={{
                            position: 'absolute',
                            width: DesignConvert.getW(30),
                            height: DesignConvert.getH(30),
                            right: DesignConvert.getW(70),
                            borderRadius: DesignConvert.getW(50),
                        }}
                        source={{ uri: this._headUrl3 }}
                    />
                }

                {this._headUrl2 &&
                    <Image
                        style={{
                            position: 'absolute',
                            right: DesignConvert.getW(55),
                            width: DesignConvert.getW(30),
                            height: DesignConvert.getH(30),
                            borderRadius: DesignConvert.getW(50),
                        }}
                        source={{ uri: this._headUrl2 }}
                    />
                }

                {this._headUrl1 &&
                    <Image
                        style={{
                            position: 'absolute',
                            right: DesignConvert.getW(35),
                            width: DesignConvert.getW(30),
                            height: DesignConvert.getH(30),
                            borderRadius: DesignConvert.getW(50),
                        }}
                        source={{ uri: this._headUrl1 }}
                    />
                } */}
                <Image
                    source={ic_online()}
                    style={{
                        width: DesignConvert.getW(10),
                        height: DesignConvert.getH(10),
                        resizeMode: 'contain',
                        marginRight: DesignConvert.getW(3),
                    }} />
                <Text
                    style={{
                        color: '#FFFFFF80',
                        fontSize: DesignConvert.getF(10),
                        textAlign: 'center',
                    }}
                    multiline={true}
                >{`${this._onlineNum}`}</Text>
            </TouchableOpacity>
        )
    }
}