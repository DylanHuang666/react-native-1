/*
 * @Author: 
 * @Date: 2020-09-10 15:46:27
 * @LastEditors: your name
 * @LastEditTime: 2020-09-10 18:26:48
 * @Description: file content
 */
'use strict';

import React, { PureComponent } from "react";
import { Image, TouchableOpacity, Text, View } from "react-native";
import DesignConvert from "../../../../utils/DesignConvert";
import { ic_bottom_talk, ic_pack_up } from "../../../../hardcode/skin_imgs/room_more";

export default class _RoomTalkItem extends PureComponent {

    _onChat = () => {
        require('../../../../utils/ModelEvent').default.dispatchEntity(
            null,
            require('../../../../hardcode/HLogicEvent').EVT_LOGIC_UPDATE_ROOM_KEYBOARD_CHANGE,
            true
        )
    }

    render() {
        return (

            <TouchableOpacity
                style={{
                    width: DesignConvert.getW(96.5),
                    height: DesignConvert.getH(34),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginStart: DesignConvert.getW(15),
                    borderRadius: DesignConvert.getW(17),
                    borderWidth: DesignConvert.getW(1.5),
                    borderColor: '#121212',
                    paddingHorizontal:DesignConvert.getW(8),
                    flexDirection:'row',
                }}
                onPress={this._onChat}
            >

                <Text
                    style={{
                        color: '#FFFFFF',
                        fontSize: DesignConvert.getF(12),
                    }}
                >说点什么...</Text>
                <Image
                    style={{
                        width: DesignConvert.getW(18),
                        height: DesignConvert.getF(18),
                        marginLeft:DesignConvert.getW(5),
                    }}
                    source={ic_bottom_talk()}
                >
                </Image>

            </TouchableOpacity>
        );
    }
}