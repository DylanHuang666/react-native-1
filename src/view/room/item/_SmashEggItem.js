'use strict';

import React, { PureComponent } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import DesignConvert from "../../../utils/DesignConvert";

export default class _SmashEggItem extends PureComponent {

    constructor(props) {
        super(props);
        // this._data;
    }

    componentDidMount() {
        require("../../../model/room/RoomModel").default.getEggGameSwitch(this.props.roomId, this.props.type)
            .then(data => {
                if (!data) return;

                this._data = data;
                this.forceUpdate();
            });
    }

    _onPress = () => {

        require("../../../router/level3_router").openActivityWebView(this._data.landh5url);

    }

    render() {
        if (!this._data) {
            return null;
        }

        return (
            <TouchableOpacity
                onPress={this._onPress}
            >
                <Image
                    style={{
                        width: DesignConvert.getW(60),
                        height: DesignConvert.getH(60),
                    }}
                    source={{ uri: this._data.gameIcon }}
                />
            </TouchableOpacity>

        );
    }
}