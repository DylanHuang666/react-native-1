/*
 * @Author: 
 * @Date: 2020-09-10 15:46:27
 * @LastEditors: your name
 * @LastEditTime: 2020-09-10 19:10:22
 * @Description: file content
 */
'use strict';

import React, { PureComponent } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import DesignConvert from "../../../../utils/DesignConvert";
import { ic_more } from "../../../../hardcode/skin_imgs/room";

/**
 * 打开直播间更多功能
 */
export default class _HostMoreItem extends PureComponent {

    _onMore = () => {
        if (this.props.onPress) {
            this.props.onPress()
        } else {
            require("../../../../router/level3_router").showRoomMoreView();
        }
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this._onMore}
            >
                <Image
                    style={{
                        width: DesignConvert.getW(34),
                        height: DesignConvert.getH(34),
                        marginRight:DesignConvert.getW(7),
                    }}
                    source={ic_more()}
                />

                {this.props.onPress &&
                    <View
                        style={{
                            position: 'absolute',
                            width: DesignConvert.getW(32),
                            height: DesignConvert.getH(32),
                            borderRadius: DesignConvert.getW(50),
                            borderWidth: DesignConvert.getW(1),
                            borderColor: '#7A61FF',
                        }}
                    />
                }
            </TouchableOpacity>
        );
    }
}