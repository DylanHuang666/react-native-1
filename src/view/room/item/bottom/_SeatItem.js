'use strict';

import React, { PureComponent } from "react";
import { Image, TouchableOpacity } from "react-native";
import { EVT_UPDATE_ROOM_DATA } from "../../../../hardcode/HGlobalEvent";
import { ic_pai_mic, ic_pai_micing } from "../../../../hardcode/skin_imgs/room";
import MicQueModel from "../../../../model/room/MicQueModel";
import DesignConvert from "../../../../utils/DesignConvert";
import ModelEvent from "../../../../utils/ModelEvent";

export default class _SeatItem extends PureComponent {

    constructor(props) {
        super(props)

        this._selfInMicQue = MicQueModel.selfInMicQue()//自己是否在排麦列表

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

    _onRefresh = () => {
        this._selfInMicQue = MicQueModel.selfInMicQue()//自己是否在排麦列表
        this.forceUpdate()
    }

    _onPress = () => {
        // //1.查询自己是否在麦上
        // let actionIndex = -1
        // RoomInfoCache.roomData.infos.forEach((element, index) => {
        //     if (element.base && element.base.userId == UserInfoCache.userId) {
        //         actionIndex = index
        //     }
        // });

        // let vo
        // RoomInfoCache.MicQues.forEach(element => {
        //     if (element && element.userId == UserInfoCache.userId) {
        //         vo = element
        //     }
        // })

        // //判断自己是否有权限或者在排麦列表中
        // if (RoomInfoCache.haveRoomPermiss || vo) {
        //     //打开排麦面板
        //     require('../../../../router/level3_router').showMicQueView()
        // } else {
        //     //上麦
        //     require('../../../../model/room/MicQueModel').default.joinMicQue()
        // }

        require('../../../../router/level3_router').showMicQueView()

    }

    render() {

        // if (!this._show) {
        //     return null
        // }

        return (
            <TouchableOpacity
                style={{
                    marginRight: DesignConvert.getW(5),
                    width: DesignConvert.getW(40),
                    height: DesignConvert.getH(40),
                }}
                onPress={this._onPress}
            >
                <Image
                    style={{
                        width: DesignConvert.getW(40),
                        height: DesignConvert.getH(40),
                    }}
                    source={this._selfInMicQue ? ic_pai_micing() : ic_pai_mic()}
                />
            </TouchableOpacity>
        );
    }
}