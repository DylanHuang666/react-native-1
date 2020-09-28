'use strict';

import React, { PureComponent } from "react";
import { Text, TouchableOpacity } from "react-native";
import DesignConvert from "../../../../../utils/DesignConvert";
import LinearGradient from "react-native-linear-gradient";
import { isNewItemReaded, getUnreadNum } from "../../../../../cache/RoomPublicScreenCache";
import ModelEvent from "../../../../../utils/ModelEvent";
import { EVT_UPDATE_ROOM_PUBLIC_SCREEN } from "../../../../../hardcode/HGlobalEvent";


export default class _ChatNewMsgTips extends PureComponent {

    componentDidMount() {
        ModelEvent.addEvent(null, EVT_UPDATE_ROOM_PUBLIC_SCREEN, this._onUpdateNew);
    }

    componentWillUnmount() {
        ModelEvent.removeEvent(null, EVT_UPDATE_ROOM_PUBLIC_SCREEN, this._onUpdateNew);
    }

    _onUpdateNew = () => {
        this.forceUpdate();
    }

    _onPress = () => {
        this.props.onPress();
    }

    render() {
        if (isNewItemReaded()) {
            return null;
        }

        const count = getUnreadNum();
        if (count < 1) return null;

        return (
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    left: DesignConvert.getW(66),
                    bottom: 0,
                }}
                onPress={this._onPress}
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#F244FF', '#4756FD']}
                    style={{
                        width: DesignConvert.getW(130),
                        height: DesignConvert.getH(25),

                        borderTopLeftRadius: DesignConvert.getW(12),
                        borderBottomLeftRadius: DesignConvert.getW(12),

                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontSize: DesignConvert.getF(12),
                        }}
                    >有{count}条新消息</Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}