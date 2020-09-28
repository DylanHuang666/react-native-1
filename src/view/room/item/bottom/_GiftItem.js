/*
 * @Author: 
 * @Date: 2020-09-10 15:46:27
 * @LastEditors: your name
 * @LastEditTime: 2020-09-10 18:36:11
 * @Description: file content
 */
'use strict';

import React, { PureComponent } from "react";
import { View, Image, Text, TouchableOpacity, ImageBackground } from "react-native";
import DesignConvert from "../../../../utils/DesignConvert";
import { ic_gift } from "../../../../hardcode/skin_imgs/room";


export default class _GiftItem extends PureComponent {

    _onPress = () => {
        require("../../../../router/level3_router").showRoomGiftPanelView();
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
                        width: DesignConvert.getW(34),
                        height: DesignConvert.getH(34),
                    }}
                    source={ic_gift()}
                />
            </TouchableOpacity>
        )
    }
}