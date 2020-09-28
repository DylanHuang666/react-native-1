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

class _Item extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{
                    width: DesignConvert.getW(325),
                    height: DesignConvert.getH(46),
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "whte",
                }}>
                <Text
                    style={{
                        color: "#1A1A1A",
                        fontSize: DesignConvert.getF(15),
                        ...this.props.textStyle
                    }}>{this.props.text}</Text>

                <View
                    style={{
                        width: DesignConvert.getW(325),
                        height: DesignConvert.getBorderWidth(1),
                        backgroundColor: "#F2F2F2",
                        position: "absolute",
                        bottom: 0,
                        ...this.props.line
                    }}></View>
            </TouchableOpacity>
        )
    }
}

export default class InfoDialog extends BaseView {
    constructor(props) {
        super(props);

    }

    _onBackPress = () => {
        this.popSelf();
    }

    _pullBlack = () => {
        this.props.params.pullBlackPress(!this.props.params.isPullBlack);
        this.popSelf();
    }

    _Report = () => {
        this.popSelf();
        this.props.params.reportPress();
    }

    _cancelAttiend = () => {
        this.props.params.cancelAttiend();
        this.popSelf();
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this._onBackPress}
                style={styles.bg}
            >
                <View
                    style={{
                        position: "absolute",
                        bottom: DesignConvert.getH(50),
                        flexDirection: "column",
                        alignItems: "center",
                    }}>

                    <View
                        style={{
                            width: DesignConvert.getW(325),
                            backgroundColor: "white",
                            borderRadius: DesignConvert.getW(10),
                            marginTop: DesignConvert.getH(20),
                        }}>

                        <View
                            style={{
                                display: !this.props.params.cancelAttiend ? "none" : "flex",
                            }}>
                            <_Item
                                text="取消关注"
                                onPress={this._cancelAttiend} />
                        </View>

                        <_Item
                            text="举报"
                            onPress={this._Report}
                            line={{
                                display: 'none'
                            }}
                        />

                        <_Item
                            text={this.props.params.isPullBlack ? "移出黑名单" : "拉黑"}
                            onPress={this._pullBlack}
                            line={{
                                display: 'none'
                            }}

                        />
                    </View>

                    <View
                        style={{
                            width: DesignConvert.getW(325),
                            height: DesignConvert.getH(46),
                            backgroundColor: "white",
                            borderRadius: DesignConvert.getW(10),
                            marginTop: DesignConvert.getH(20),
                        }}>
                        <_Item
                            text="取消"
                            line={{
                                display: 'none'
                            }}
                            textStyle={{
                                color: '#8A50FC'
                            }}
                            onPress={this._onBackPress} />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    bg: {
        width: DesignConvert.swidth,
        height: DesignConvert.sheight,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center",
    },
})