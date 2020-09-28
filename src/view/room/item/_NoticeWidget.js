'use strict';
import React, { PureComponent } from "react";
import { View, Image, Text, TouchableOpacity, ImageBackground } from "react-native";
import DesignConvert from "../../../utils/DesignConvert";
import RoomInfoCache from "../../../cache/RoomInfoCache";
import ModelEvent from "../../../utils/ModelEvent";
import { EVT_LOGIC_UPDATE_ROOM_NOTIC } from "../../../hardcode/HLogicEvent";
import UserInfoCache from "../../../cache/UserInfoCache";


export default class _NoticeWidget extends PureComponent {

    constructor(props) {
        super(props)

        // this._notice = '公告：' + RoomInfoCache.roomData.notic || '公告：暂无';
    }

    componentDidMount() {
        // ModelEvent.addEvent(null, EVT_LOGIC_UPDATE_ROOM_NOTIC, this._onRefreshNotice)
    }

    componentWillUnmount() {
        // ModelEvent.removeEvent(null, EVT_LOGIC_UPDATE_ROOM_NOTIC, this._onRefreshNotice)
    }

    //更新房间公告
    _onRefreshNotice = (data) => {
        this._notice = '公告：' + RoomInfoCache.roomData.notic || '公告：暂无';
        this.forceUpdate()
    }

    _onNotice = () => {
        if (!RoomInfoCache.roomData) return;

        if (UserInfoCache.userId == RoomInfoCache.roomData.createId || RoomInfoCache.roomData.jobId <= 3) {
            require("../../../router/level3_router").showRoomEditNoticeView();
        } else {
            require("../../../router/level3_router").showRoomNoticeView();
        }
    }


    render() {
        return (

            <TouchableOpacity
                style={{
                    width: DesignConvert.getW(61),
                    height: DesignConvert.getH(21),
                    backgroundColor: '#000000',
                    borderTopLeftRadius: DesignConvert.getW(16),
                    borderBottomLeftRadius: DesignConvert.getW(16),
                    position: 'absolute',
                    top: DesignConvert.getH(120),
                    right: 0,
                    alignItems: 'center',
                    justifyContent: 'center',

                }}
                onPress={this._onNotice}
            >
                <Text
                    numberOfLines={1}
                    style={{
                        color: '#ffffff',
                        fontSize: DesignConvert.getF(12),
                    }}
                >公告</Text>
            </TouchableOpacity >

        )
    }
}