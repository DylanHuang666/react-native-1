'use strict';

import React, { PureComponent } from "react";
import { Image, TouchableOpacity } from "react-native";
import DesignConvert from "../../../utils/DesignConvert";
import { ic_close } from "../../../hardcode/skin_imgs/room";

export default class _RoomCloseItem extends PureComponent {

    render() {
        return (
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: DesignConvert.statusBarHeight + DesignConvert.getH(4),
                    right: 0,
                    width: DesignConvert.getW(52),
                    height: DesignConvert.getH(36),
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={this.props.onPress}
            >
                <Image
                    style={{
                        width: DesignConvert.getW(22),
                        height: DesignConvert.getH(22),
                    }}
                    source={ic_close()}
                />
            </TouchableOpacity>
        );
    }
}