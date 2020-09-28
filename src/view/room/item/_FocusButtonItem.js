/*
 * @Author: 
 * @Date: 2020-09-10 11:42:15
 * @LastEditors: your name
 * @LastEditTime: 2020-09-14 11:10:02
 * @Description: file content
 */
'use strict'

import React, { PureComponent } from "react";
import { TouchableOpacity, Image } from "react-native";
import DesignConvert from "../../../utils/DesignConvert";
import { EVT_UPDATE_ROOM_MAIN_MIC } from "../../../hardcode/HGlobalEvent";
import RoomInfoCache from "../../../cache/RoomInfoCache";
import ModelEvent from "../../../utils/ModelEvent";
import UserInfoCache from "../../../cache/UserInfoCache";
import ToastUtil from "../../base/ToastUtil";


export default class _FocusButtonItem extends PureComponent {

    constructor(props) {
        super(props);

        this._isShow = false
    }


    componentDidMount() {
        ModelEvent.addEvent(null, EVT_UPDATE_ROOM_MAIN_MIC, this._onCacheUpdated);
        this._getData();
    }

    componentWillUnmount() {
        ModelEvent.removeEvent(null, EVT_UPDATE_ROOM_MAIN_MIC, this._onCacheUpdated);
    }

    _onCacheUpdated = () => {
        const createUserInfo = RoomInfoCache.createUserInfo;
        if (!createUserInfo) return;

        this._getData();
    }

    _getData() {
        const roomData = RoomInfoCache.roomData;
        if (!roomData) {
            return;
        }

        if (roomData.createId == UserInfoCache.userId) {
            return
        }
        require('../../../model/userinfo/UserInfoModel').default.getPersonPage(roomData.createId)
            .then(data => {
                if (data) {
                    this._isShow = !require('../../../model/userinfo/UserInfoModel').default.isAddLover(data.friendStatus);
                    this.forceUpdate();
                }
            });
    }

    _onPress = () => {
        const roomData = RoomInfoCache.roomData;
        if (!roomData) {
            return;
        }

        require('../../../model/userinfo/UserInfoModel').default.addLover(roomData.createId, true)
            .then(data => {
                if (data) {
                    //关注成功
                    this._isShow = false
                    ToastUtil.showCenter('关注成功')
                    this.forceUpdate()
                    require("../../../model/chat/ChatModel").sendFollow()
                }
            })
    }

    render() {
        if (!this._isShow) {
            return null;
        }

        return (
            <TouchableOpacity
                onPress={this._onPress}
            >
                <Image 
                    source={require('../../../hardcode/skin_imgs/ccc').ttq_room_focus_icon()}
                    style={{
                        width: DesignConvert.getW(42),
                        height: DesignConvert.getH(18),
                        marginLeft: DesignConvert.getW(5),
                        marginTop:DesignConvert.getH(1),
                        resizeMode:'contain',
                    }}
                />
            </TouchableOpacity>
        )
    }
}