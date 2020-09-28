/*
 * @Author: 
 * @Date: 2020-09-10 15:46:27
 * @LastEditors: your name
 * @LastEditTime: 2020-09-10 18:53:04
 * @Description: file content
 */
import React, { PureComponent } from 'react';
import { TouchableOpacity } from "react-native";
import DesignConvert from "../../../../utils/DesignConvert";
import { ic_big_emoji, ic_emoji_enter } from "../../../../hardcode/skin_imgs/room_more";
import { Image, Text } from "react-native";


/**
 * 大表情
 */
export default class _BigEmojiItem extends PureComponent {

    _onPress = () => {
        require('../../../../router/level3_router').showRoomBigFaceView()
    }

    render() {
        return (
            <TouchableOpacity
                style={{
                    width: DesignConvert.getW(34),
                    height: DesignConvert.getH(34),
                    marginHorizontal: DesignConvert.getW(7),
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={this._onPress}
            >
                <Image
                    style={{
                        width: DesignConvert.getW(34),
                        height: DesignConvert.getH(34),
                    }}
                    source={ic_emoji_enter()}
                />
                {/* 
                <Text
                    style={{
                        color: 'white',
                        fontSize: DesignConvert.getF(11),
                        marginTop: DesignConvert.getH(5),
                    }}
                >表情</Text> */}

            </TouchableOpacity>
        )
    }
}