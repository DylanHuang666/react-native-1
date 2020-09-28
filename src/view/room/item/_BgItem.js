'use strict';

import React, { PureComponent } from "react";
import { Image } from "react-native";
import DesignConvert from "../../../utils/DesignConvert";

export default class _BgItem extends PureComponent {

    render() {
        if (!this.props.bg) {
            return null;
        }

        const voiceRoomBackgroundUrl = require("../../../configs/ImageUrl").voiceRoomBackgroundUrl;

        return (

            <Image
                style={{
                    flex: 1,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    // right:0,
                    // bottom:0,
                    width: DesignConvert.swidth,
                    height: DesignConvert.sheight,
                }}
                resizeMode='cover'
                source={voiceRoomBackgroundUrl(this.props.bg)}
                defaultSource={require("../../../hardcode/skin_imgs/room").bg_def()}
            />
        );
    }
}