/*
 * @Author: 
 * @Date: 2020-09-10 15:46:27
 * @LastEditors: your name
 * @LastEditTime: 2020-09-10 18:37:07
 * @Description: file content
 */
'use strict';

import React, { PureComponent } from "react";
import { Image, TouchableOpacity } from "react-native";
import DesignConvert from "../../../../utils/DesignConvert";
import { ic_mic_open, ic_mic_close } from "../../../../hardcode/skin_imgs/room";
import { ERoomActionType } from "../../../../hardcode/ERoom";
import UserInfoCache from "../../../../cache/UserInfoCache";
import ModelEvent from "../../../../utils/ModelEvent";
import { EVT_LOGIC_SELF_MIC_CHANGE } from "../../../../hardcode/HLogicEvent";
import ToastUtil from "../../../base/ToastUtil";


export default class _MicItem extends PureComponent {

    componentDidMount() {
        ModelEvent.addEvent(null, EVT_LOGIC_SELF_MIC_CHANGE, this._selfMicChange)
    }

    componentWillUnmount() {
        ModelEvent.removeEvent(null, EVT_LOGIC_SELF_MIC_CHANGE, this._selfMicChange)
    }

    _selfMicChange = () => {
        this.forceUpdate()
    }

    _onPress = async () => {
        const permissStatus = await require('../../../../model/PermissionModel').checkAudioRoomPermission()
        if (permissStatus == 'denied' || permissStatus == 'blocked') {
            //麦克风没打开，默认闭麦状态
            ToastUtil.showCenter('麦克风权限未打开')
            return
        }
        const RoomModel = require("../../../../model/room/RoomModel");
        const bOpen = RoomModel.isOpeMic();
        if (!RoomModel.enableMic(!bOpen)) {
            return;
        }
        require('../../../../model/room/RoomModel').default.action(RoomModel.isOpeMic() ? ERoomActionType.MIC_OPEN : ERoomActionType.MIC_CLOSE, UserInfoCache.userId, 0, '')
        this.forceUpdate();

    }

    render() {
        const bOpen = require("../../../../model/room/RoomModel").isOpeMic();

        return (
            <TouchableOpacity
                style={{
                    marginRight: DesignConvert.getW(7),
                    width: DesignConvert.getW(34),
                    height: DesignConvert.getH(34),
                }}
                onPress={this._onPress}
            >
                <Image
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: DesignConvert.getW(34),
                        height: DesignConvert.getH(34),
                    }}
                    source={bOpen ? ic_mic_open() : ic_mic_close()}
                />
            </TouchableOpacity>
        );
    }
}