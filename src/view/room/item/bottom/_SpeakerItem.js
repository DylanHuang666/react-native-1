/*
 * @Author: 
 * @Date: 2020-09-10 15:46:27
 * @LastEditors: your name
 * @LastEditTime: 2020-09-10 18:51:31
 * @Description: file content
 */
'use strict';

import React, { PureComponent } from "react";
import { Image, TouchableOpacity, NativeModules } from "react-native";
import DesignConvert from "../../../../utils/DesignConvert";
import { ic_speaker_close, ic_speaker_open } from "../../../../hardcode/skin_imgs/room";
import RoomInfoCache from "../../../../cache/RoomInfoCache";
import LinearGradient from "react-native-linear-gradient";



export default class _SpeakerItem extends PureComponent {

    constructor(props) {
        super(props)
        NativeModules.Agora.enableSpeaker(RoomInfoCache.enableSpeaker);
    }

    _onPress = () => {
        if (!require("../../../../model/room/RoomModel").enableSpeaker(!RoomInfoCache.enableSpeaker)) {
            return;
        }
        this.forceUpdate();
    }

    render() {
        const bOpen = RoomInfoCache.enableSpeaker;

        return (
            <TouchableOpacity
                onPress={this._onPress}
                style={{
                    width: DesignConvert.getW(34),
                    height: DesignConvert.getH(34),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: DesignConvert.getW(7),
                }}
            >
                <Image
                    style={{
                        width: DesignConvert.getW(34),
                        height: DesignConvert.getH(34),
                    }}
                    source={bOpen ? ic_speaker_open() : ic_speaker_close()}
                />
            </TouchableOpacity>
        );
    }
}