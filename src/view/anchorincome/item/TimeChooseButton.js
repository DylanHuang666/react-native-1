/**
 * 时间选择按钮
 */

'use strict';

import React, { PureComponent } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { THEME_COLOR } from '../../../styles';
import DesignConvert from '../../../utils/DesignConvert';


export default class TimeChooseButton extends PureComponent {

    _onPress = () => {
        this.props.onPress && this.props.onPress();
    }

    render() {
        if (this.props.bLongStyle) {
            return (
                <View
                    style={{
                        flex: 1,
                        height: DesignConvert.getH(38),

                        flexDirection: "row",
                        alignItems: "center",

                        paddingLeft: DesignConvert.getW(15)
                    }}>

                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            alignItems: "center",

                            paddingHorizontal: DesignConvert.getW(10),
                            height: DesignConvert.getH(25),

                            backgroundColor: "white",
                            borderRadius: DesignConvert.getW(13)
                        }}
                        onPress={this._onPress}
                    >
                        <View
                            style={{
                                marginRight: DesignConvert.getW(5),
                            }}>
                            <Text
                                style={{
                                    color: "#949494",
                                    fontSize: DesignConvert.getF(12),
                                    fontWeight: "normal",
                                }}
                            >{this.props.btnText}</Text>
                        </View>

                        <Image
                            source={require('../../../hardcode/skin_imgs/record').ic_arrowdown()}
                            style={{
                                width: DesignConvert.getW(18),
                                height: DesignConvert.getW(18),
                                display: "flex",
                            }} />
                    </TouchableOpacity>



                    {this.props.isShowTotal && <Text
                        style={{
                            position: 'absolute',
                            right: DesignConvert.getW(15),

                            color: "#949494",
                            fontSize: DesignConvert.getF(12),
                            fontWeight: "normal",
                        }}
                    >合计：{this.props.totalText}</Text>}
                </View >
            );
        }


        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: DesignConvert.getH(56),
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onPress={this._onPress}
            >
                <View
                    style={{
                        marginRight: DesignConvert.getW(3),
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>

                        <Text
                            style={{
                                color: "#333333",
                                fontSize: DesignConvert.getF(10),
                                fontWeight: "normal",
                                alignSelf: "center",
                            }}
                        >{!this.props.title ? "开始时间" : this.props.title}</Text>


                    </View>

                    <Text
                        style={{
                            color: "#333333",
                            fontSize: DesignConvert.getF(13),
                            fontWeight: "normal",
                            alignSelf: "center",
                            marginTop: DesignConvert.getW(3),
                        }}
                    >{this.props.btnText}</Text>
                </View>

                <Image
                    source={require('../../../hardcode/skin_imgs/record').ic_arrowdown()}
                    style={{
                        width: DesignConvert.getW(7),
                        height: DesignConvert.getW(6),
                        display: !this.props.bHideArrowDown ? "flex" : "none",
                    }} />
            </TouchableOpacity >
        );
    }
}