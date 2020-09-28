'use strict';

import React, { PureComponent } from "react";
import { Text, TouchableOpacity } from "react-native";
import DesignConvert from "../../../../../utils/DesignConvert";
import LinearGradient from "react-native-linear-gradient";


export default class _ChatClassicTypeItem extends PureComponent {

    _onPress = () => {
        this.props.onPress(this.props.classicType);
    }

    render() {
        const classicType = this.props.classicType;
        const selected = this.props.selected;
        const classicName = this.props.classicName;
        const bottom = this.props.bottom;

        if (selected == classicType) {
            return (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#DABCFF', '#AD86FE']}
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: bottom,

                        width: DesignConvert.getW(55),
                        height: DesignConvert.getH(24),

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
                    >{classicName}</Text>
                </LinearGradient>
            )
        }

        return (
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: 0,
                    bottom: bottom,
                }}
                onPress={this._onPress}
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#DABCFF4C', '#AD86FE4C']}
                    style={{
                        width: DesignConvert.getW(55),
                        height: DesignConvert.getH(24),

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
                    >{classicName}</Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}
