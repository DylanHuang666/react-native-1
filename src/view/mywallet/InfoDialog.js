/**
 * InfoDialog
 */

'use strict';

import React, { PureComponent, Component } from "react";
import BaseView from "../base/BaseView";
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView, ImageBackground, FlatList } from "react-native";
import DesignConvert from "../../utils/DesignConvert";
import Config from '../../configs/Config';
import { THEME_COLOR } from "../../styles";

export default class InfoDialog extends BaseView {
    constructor(props) {
        super(props);

        if(!this.props.params.dialogContentText) {
            this._dialogContentText="暂不支持哦"
        }else{
            this._dialogContentText = this.props.params.dialogContentText;
        }
        
        if(!this.props.params.positiveText) {
            this._positiveText= "我知道了";
        }else{
            this._positiveText = this.props.params.positiveText;
        }
        
    }

    _onBackPress = () => {
        this.popSelf();
    }

    render() {
        return(
            <View
                style={{
                    width: DesignConvert.swidth,
                    height: DesignConvert.sheight,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        width: DesignConvert.swidth - DesignConvert.getW(120),
                        borderRadius: DesignConvert.getW(10),
                        backgroundColor: "white",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: DesignConvert.getW(22),
                    }}
                    >
                        <Text
                            style={{
                                color: "#000000",
                                fontSize: DesignConvert.getF(13),
                                marginTop: DesignConvert.getH(20),
                                marginBottom: DesignConvert.getH(20),
                                textAlign: "center",
                            }}
                        >{this._dialogContentText}</Text>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    width: DesignConvert.getW(170),
                                    height: DesignConvert.getW(40),
                                    backgroundColor: THEME_COLOR,
                                    borderRadius: DesignConvert.getW(20),
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    textAlignVertical: "center",
                                }}
                                onPress={this._onBackPress}>
                                
                                <Text
                                    style={{
                                        color: "white",
                                        fontSize: DesignConvert.getF(13),
                                        textAlign: "center",
                                    }}
                            >{this._positiveText}</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            </View>
        )
    }
}
