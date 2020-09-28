/**
 * 用于预留状态栏高度的组件
 */

'use strict';

import React, { Component } from "react";
import { View } from "react-native";

export default class StatusBarView extends Component {

    render() {
        return (
            <View
                style={{
                    marginTop: require("../../utils/DesignConvert").default.statusBarHeight
                }}
            ></View>
        )
    }
}