/*
 * @Author: 
 * @Date: 2020-09-10 18:06:09
 * @LastEditors: your name
 * @LastEditTime: 2020-09-14 11:20:31
 * @Description: file content
 */

'use strict';

import React, { PureComponent } from "react";
import { View, Image, Text } from "react-native";
import DesignConvert from "../../../utils/DesignConvert";
import ModelEvent from "../../../utils/ModelEvent";
import { EVT_LOGIC_REFRESH_ROOM_MORE } from "../../../hardcode/HLogicEvent";
import RoomInfoCache from "../../../cache/RoomInfoCache";


export default class _RoomNameItem extends PureComponent {

    componentDidMount() {
        ModelEvent.addEvent(null, EVT_LOGIC_REFRESH_ROOM_MORE, this._onRefresh)
    }

    componentWillUnmount() {
        ModelEvent.removeEvent(null, EVT_LOGIC_REFRESH_ROOM_MORE, this._onRefresh)
    }

    _onRefresh = () => {
        this.forceUpdate()
    }


    render() {
        const userInfo = RoomInfoCache.mainMicUserInfo ? RoomInfoCache.mainMicUserInfo : RoomInfoCache.ownerUserInfo ? RoomInfoCache.ownerUserInfo : RoomInfoCache.createUserInfo;

        const userName = userInfo
            ? decodeURIComponent(userInfo.nickName)
            : '';

        const roomName = decodeURIComponent(RoomInfoCache.roomName)
        const dealRoomName = roomName.length<9?roomName:roomName.slice(0,7)+'...';
        // console.warn("111111111", RoomInfoCache.mainMicUserInfo, RoomInfoCache.ownerUserInfo, RoomInfoCache.createUserInfo)
        return (
            <Text
                numberOfLines={1}
                style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: DesignConvert.getF(14),
                }}
                >{dealRoomName}</Text>
            // >{decodeURIComponent(RoomInfoCache.roomName)}:{userName}</Text>
        )
    }
}