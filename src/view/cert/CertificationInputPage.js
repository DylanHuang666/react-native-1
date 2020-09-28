
/**
 * 实名认证页面
 */

'use strict';

import React, { PureComponent, Component } from "react";
import BaseView from "../base/BaseView";
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, Image, Text, TouchableOpacity, Modal, ImageBackground, TextInput } from "react-native";
import DesignConvert from "../../utils/DesignConvert";
import Config from '../../configs/Config';
import StringUtil from '../../utils/StringUtil';
import {SubmitButton} from '../anchorincome/VerifyPayPasswordView';
import { THEME_COLOR } from "../../styles";

export default class CertificationInputPage extends PureComponent {
    constructor(props) {
        super(props);

        this._realName = "";
        this._IDCard = "";

        this._submitEnable = false;
    }

    _checkSubmitEnable = () => {
        this._submitEnable = this._realName && this._IDCard && StringUtil.isIDCardNO(this._IDCard);
    }

    _onChangeRealName = (s) => {
        this._realName = s;
        this._checkSubmitEnable();
        this.forceUpdate();
    }

    _onChangeIDCard = (s) => {
        this._IDCard = s;
        this._checkSubmitEnable();
        this.forceUpdate();
    }

    _onSubmitPress = () => {
        this.props.getRealNameIDCard(this._realName, this._IDCard);
    }

    render() {
        return(
            <View
                style={[{
                    flex: 1,
                    alignItems: "center",
                    marginTop: DesignConvert.getH(20),
                }, this.props.style]}>
                
                <View
                    style={{
                        width: DesignConvert.getW(295),
                        height: DesignConvert.getH(48),
                        backgroundColor: "#F2F2F2",
                        borderRadius: DesignConvert.getW(24),
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: DesignConvert.getH(18),
                        paddingLeft: DesignConvert.getW(24),
                        paddingRight: DesignConvert.getW(24),
                    }}
                >

                    <TextInput
                        style={{
                            flex: 1,
                            color: "#1A1A1A",
                            fontSize: DesignConvert.getF(14),
                        }}
                        value={this._realName}
                        keyboardType="default"
                        underlineColorAndroid="transparent"
                        placeholder="请输入姓名"
                        placeholderTextColor="#CCCCCC"
                        returnKeyType='next'
                        onChangeText={this._onChangeRealName}
                        selectionColor={THEME_COLOR}
                    ></TextInput>

                </View>
                
                <View
                    style={{
                        width: DesignConvert.getW(295),
                        height: DesignConvert.getH(48),
                        backgroundColor: "#F2F2F2",
                        borderRadius: DesignConvert.getW(24),
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: DesignConvert.getH(18),
                        paddingLeft: DesignConvert.getW(24),
                        paddingRight: DesignConvert.getW(24),
                    }}
                >
                    <TextInput
                        style={{
                            flex: 1,
                            color: "#1A1A1A",
                            fontSize: DesignConvert.getF(14),
                        }}
                        value={this._IDCard}
                        keyboardType="default"
                        underlineColorAndroid="transparent"
                        placeholder="请输入身份证号"
                        placeholderTextColor="#CCCCCC"
                        returnKeyType="done"
                        onChangeText={this._onChangeIDCard}
                        selectionColor={THEME_COLOR}
                    ></TextInput>

                </View>
                
                <SubmitButton
                    width={DesignConvert.getW(295)}
                    enable={this._submitEnable}
                    btnText="人工审核"
                    onPress={this._onSubmitPress}></SubmitButton>
            </View>
        )
    }
}