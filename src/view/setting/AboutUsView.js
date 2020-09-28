
/**
 * 关于我们
 */

'use strict';

import React, { PureComponent, Component } from "react";
import BaseView from "../base/BaseView";
import BackTitleView from "../base/BackTitleView";
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, Image, Text, TouchableOpacity, Modal, ImageBackground, NativeModules } from "react-native";
import DesignConvert from "../../utils/DesignConvert";
import Config from '../../configs/Config';
import { styles } from '../anchorincome/ConvertView';

export default class AboutUsView extends BaseView {
    constructor(props) {
        super(props);
    }

    _onBackPress = () => {
        this.popSelf();
    }

    _onCheckVersionPress = () => {
        require('../../model/update/UpdateModel').checkUpdate(true);
    }

    _onFeedback = () => {
        require('../../model/log/LogModel').upload();
    }

    _onUserTermsPress = () => {

    }

    _onPrivacyPolicyPress = () => {

    }

    render() {
        const version = `v${NativeModules.PackageInfo.versionName}.${NativeModules.PackageInfo.versionCode}`;

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                }}
            >

                <BackTitleView
                    titleText={"关于"}
                    onBack={this._onBackPress}
                />

                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                    }}
                >
                    <Image
                        source={require("../../hardcode/skin_imgs/common").ic_logo_circle()}
                        style={{
                            width: DesignConvert.getW(100),
                            height: DesignConvert.getH(100),
                            marginTop: DesignConvert.getH(30),
                        }}>
                    </Image>

                    <Text
                        style={{
                            fontSize: DesignConvert.getF(20),
                            marginTop: DesignConvert.getH(10),
                        }}
                    >恋恋星球</Text>

                    <Text
                        style={{
                            fontSize: DesignConvert.getF(12),
                            marginTop: DesignConvert.getH(10),
                            color: "#999999",
                        }}
                    >{version}</Text>

                    <TouchableOpacity
                        onPress={this._onCheckVersionPress}
                        style={{
                            width: DesignConvert.swidth,
                            height: DesignConvert.getH(50),
                            flexDirection: "row",
                            alignItems: "center",
                            paddingLeft: DesignConvert.getW(25),
                            paddingRight: DesignConvert.getW(25),
                            marginTop: DesignConvert.getH(30),
                        }}
                    >

                        <Text
                            style={{
                                fontSize: DesignConvert.getF(15),
                                color: "#333333",
                            }}
                        >检查更新</Text>

                        <Image
                            source={require("../../hardcode/skin_imgs/main").icon_next()}
                            style={{
                                width: DesignConvert.getW(5.7),
                                height: DesignConvert.getH(10),
                                position: "absolute",
                                right: DesignConvert.getW(25),
                            }}></Image>
                    </TouchableOpacity>
                    <View style={styles.grayline}></View>

                    <TouchableOpacity
                        onPress={this._onFeedback}
                        style={{
                            width: DesignConvert.swidth,
                            height: DesignConvert.getH(50),
                            flexDirection: "row",
                            alignItems: "center",
                            paddingLeft: DesignConvert.getW(25),
                            paddingRight: DesignConvert.getW(25),
                        }}
                    >

                        <Text
                            style={{
                                fontSize: DesignConvert.getF(15),
                                color: "#333333",
                            }}
                        >反馈问题</Text>

                        <Image
                            source={require("../../hardcode/skin_imgs/main").icon_next()}
                            style={{
                                width: DesignConvert.getW(5.7),
                                height: DesignConvert.getH(10),
                                position: "absolute",
                                right: DesignConvert.getW(25),
                            }}></Image>
                    </TouchableOpacity>
                    <View style={styles.grayline}></View>


                    <TouchableOpacity
                        onPress={this._onUserTermsPress}
                        style={{
                            display: 'none',
                            width: DesignConvert.swidth,
                            height: DesignConvert.getH(50),
                            flexDirection: "row",
                            alignItems: "center",
                            paddingLeft: DesignConvert.getW(25),
                            paddingRight: DesignConvert.getW(25),
                        }}
                    >

                        <Text
                            style={{
                                fontSize: DesignConvert.getF(15),
                                color: "#333333",
                            }}
                        >用户条款</Text>

                        <Image
                            source={require("../../hardcode/skin_imgs/main").icon_next()}
                            style={{
                                width: DesignConvert.getW(5.7),
                                height: DesignConvert.getH(10),
                                position: "absolute",
                                right: DesignConvert.getW(25),
                            }}></Image>
                    </TouchableOpacity>
                    <View style={styles.grayline}></View>

                    <TouchableOpacity
                        onPress={this._onPrivacyPolicyPress}
                        style={{
                            display: 'none',
                            width: DesignConvert.swidth,
                            height: DesignConvert.getH(50),
                            flexDirection: "row",
                            alignItems: "center",
                            paddingLeft: DesignConvert.getW(25),
                            paddingRight: DesignConvert.getW(25),
                        }}
                    >

                        <Text
                            style={{
                                fontSize: DesignConvert.getF(15),
                                color: "#333333",
                            }}
                        >隐私政策</Text>

                        <Image
                            source={require("../../hardcode/skin_imgs/main").icon_next()}
                            style={{
                                width: DesignConvert.getW(5.7),
                                height: DesignConvert.getH(10),
                                position: "absolute",
                                right: DesignConvert.getW(25),
                            }}></Image>
                    </TouchableOpacity>
                    <View style={styles.grayline}></View>

                </View>
            </View>
        )
    }
}