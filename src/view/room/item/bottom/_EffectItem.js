'use strict';

import React, { PureComponent } from "react";
import { TouchableOpacity, Image } from "react-native";
import DesignConvert from "../../../../utils/DesignConvert";
import RoomInfoCache from "../../../../cache/RoomInfoCache";
import { ic_movie_close, ic_movie_open } from "../../../../hardcode/skin_imgs/room_more";
import ModelEvent from "../../../../utils/ModelEvent";
import { EVT_LOGIC_REFRESH_ROOM_MORE } from "../../../../hardcode/HLogicEvent";
import ToastUtil from "../../../base/ToastUtil";
import { ic_anim_open, ic_anim_close } from "../../../../hardcode/skin_imgs/room";

export default class _EffectItem extends PureComponent {


    componentDidMount() {
        ModelEvent.addEvent(null, EVT_LOGIC_REFRESH_ROOM_MORE, this._refresh)
    }

    componentWillUnmount() {
        ModelEvent.removeEvent(null, EVT_LOGIC_REFRESH_ROOM_MORE, this._refresh)
    }

    _refresh = () => {
        this.forceUpdate();
    }

    _onPress = () => {
        RoomInfoCache.setSelfAnimation(!RoomInfoCache.isSelfAnimation)
        RoomInfoCache.isSelfAnimation ? ToastUtil.showCenter('礼物特效已开启') : ToastUtil.showCenter('礼物特效已关闭')
        this.forceUpdate()
    }

    render() {
        return (
            <TouchableOpacity
                style={{
                    marginRight: DesignConvert.getW(15),
                }}
                onPress={this._onPress}
            >
                <Image
                    style={{
                        width: DesignConvert.getW(33),
                        height: DesignConvert.getH(33),
                    }}
                    source={RoomInfoCache.isSelfAnimation ? ic_anim_open() : ic_anim_close()}
                />
            </TouchableOpacity>
        );
    }
}