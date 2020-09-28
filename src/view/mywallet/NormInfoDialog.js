/**
 * 普通dialog
 */

'use strict';

import React, { PureComponent, Component } from "react";
import BaseView from "../base/BaseView";
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView, ImageBackground, FlatList } from "react-native";
import DesignConvert from "../../utils/DesignConvert";
import Config from '../../configs/Config';
import { THEME_COLOR } from "../../styles";

export default class NormInfoDialog extends BaseView {
    constructor(props) {
        super(props);

        if(!this.props.params.dialogContentText) {
            this._dialogContentText="暂不支持哦"
        }else{
            this._dialogContentText = this.props.params.dialogContentText;
        }
        
        if(!this.props.params.negativePress) {
            this._negativePress= this._onBackPress;
        }else{
            this._negativePress = () => {
                this._onBackPress();
                this.props.params.negativePress();
            };
        }
        
        if(!this.props.params.negativeText) {
            this._negativeText= "取消";
        }else{
            this._negativeText = this.props.params.negativeText;
        }
        
        if(!this.props.params.positivePress) {
            this._positivePress= this._onBackPress;
        }else{
            this._positivePress = () => {
                this._onBackPress();
                this.props.params.positivePress();
            };
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
            <TouchableOpacity
                onPress={this.popSelf}
                style={{
                    width: DesignConvert.swidth,
                    height: DesignConvert.sheight,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <TouchableOpacity
                    activeOpacity={1}
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
                                    width: DesignConvert.getW(103),
                                    height: DesignConvert.getW(40),
                                    backgroundColor: "#F5F5F5",
                                    borderRadius: DesignConvert.getW(20),
                                    marginRight: DesignConvert.getW(24),
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    textAlignVertical: "center",
                                }}
                                onPress={this._negativePress}>
                                
                                <Text
                                    style={{
                                        color: THEME_COLOR,
                                        fontSize: DesignConvert.getF(13),
                                        textAlign: "center",
                                    }}
                            >{this._negativeText}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    width: DesignConvert.getW(103),
                                    height: DesignConvert.getW(40),
                                    backgroundColor: THEME_COLOR,
                                    borderRadius: DesignConvert.getW(20),
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    textAlignVertical: "center",
                                }}
                                onPress={this._positivePress}>
                                
                                <Text
                                    style={{
                                        color: "white",
                                        fontSize: DesignConvert.getF(13),
                                        textAlign: "center",
                                    }}
                            >{this._positiveText}</Text>
                            </TouchableOpacity>
                        </View>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    bg: {
        width: DesignConvert.swidth,
        height: DesignConvert.sheight,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    
    dialogTitleText: {
        color: "#000000",
        fontSize: DesignConvert.getF(15),
        marginTop: DesignConvert.getH(10),
        marginBottom: DesignConvert.getH(10),
    },

    dialogContentText: {
        color: "#000000",
        fontSize: DesignConvert.getF(13),
        marginTop: DesignConvert.getH(20),
        marginBottom: DesignConvert.getH(20),
    },

    dialogBtnText: {
        color: "white",
        fontSize: DesignConvert.getF(13),
        textAlign: "center",
    },

    dialogBtnBg: {
        width: DesignConvert.getW(170),
        height: DesignConvert.getW(40),
        backgroundColor: "#7479FF",
        borderRadius: DesignConvert.getW(20),
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        textAlignVertical: "center",
    },
})