'use strict';

import React, { PureComponent } from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import { EVT_UPDATE_ROOM_DATA } from "../../../../hardcode/HGlobalEvent";
import { ic_pai_mic, ic_pai_micing } from "../../../../hardcode/skin_imgs/room";
import DesignConvert from "../../../../utils/DesignConvert";
import ModelEvent from "../../../../utils/ModelEvent";
import RoomInfoCache from "../../../../cache/RoomInfoCache";


/**
 * 打开排麦界面
 */
export default class _MicQueueItem extends PureComponent {

    constructor(props) {
        super(props)

        this._selfInMicQue = require("../../../../model/room/MicQueModel").default.selfInMicQue()//自己是否在排麦列表

        this._show = false//是否排麦权限

        require('../../../../model/room/RoomModel').default.getRoomConfigData()
            .then(data => {
                this._show = data
                this.forceUpdate()
            })
    }

    componentDidMount() {
        //监听房间数据变化，因为排麦数据是在房间数据里的
        ModelEvent.addEvent(null, EVT_UPDATE_ROOM_DATA, this._onRefresh)
    }

    componentWillUnmount() {
        ModelEvent.removeEvent(null, EVT_UPDATE_ROOM_DATA, this._onRefresh)
    }

    _onPress = () => {
        require('../../../../router/level3_router').showMicQueView()
    }

    _onRefresh = () => {
        this._selfInMicQue = require("../../../../model/room/MicQueModel").default.selfInMicQue()//自己是否在排麦列表
        this.forceUpdate()
    }

    render() {

        if (!this._show) {
            return null
        }
        const RoomModel = require("../../../../model/room/RoomModel");

        const num = RoomInfoCache.MicQues.length;
        const isRoomLiver = RoomModel.isSelfOnMainSeat()
        const dec = this._selfInMicQue ? '下麦' : '上麦'

        const txt = isRoomLiver ? '排麦' : dec


        return (
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: DesignConvert.getW(15),
                    bottom: DesignConvert.getH(61) + DesignConvert.addIpxBottomHeight(),

                    backgroundColor: '#F8D66F',

                    width: DesignConvert.getW(50),
                    height: DesignConvert.getH(29),
                    borderRadius: DesignConvert.getW(20),

                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={this._onPress}
            >

                {isRoomLiver && <View
                    style={{
                        position: 'absolute',
                        top: DesignConvert.getH(-6.5),
                        right: DesignConvert.getW(0),

                        height: DesignConvert.getH(13),
                        width: DesignConvert.getW(13),
                        borderRadius: DesignConvert.getW(10),

                        backgroundColor: '#FF5D5D',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            fontSize: DesignConvert.getF(10),
                            color: 'white',
                        }}
                    >{num}</Text>
                </View>
                }

                {/* <Image
                    style={{
                        position: 'absolute',
                        width: DesignConvert.getW(40),
                        height: DesignConvert.getH(40),
                    }}
                    source={this._selfInMicQue ? ic_pai_micing() : ic_pai_mic()}
                /> */}
                <Text
                    style={{
                        color: '#121212',
                        fontSize: DesignConvert.getF(12)
                    }}
                >{txt}</Text>

            </TouchableOpacity>
        );
    }
}