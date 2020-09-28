
import React, { PureComponent, Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, Modal, ImageBackground, TextInput } from "react-native";
import BaseView from "../base/BaseView";
import DesignConvert from "../../utils/DesignConvert";

export default class EditSexDialog extends BaseView {
    constructor(props) {
        super(props);
        // this._sex = props.params.sex
    }
    _changeToMale = () => {
        this.props.params.change(1)
        this.popSelf()

    }
    _changeToFemale = () => {
        this.props.params.change(2)
        this.popSelf()
    }
    render() {
        return (

            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}
            >
                <TouchableOpacity
                    onPress={this.popSelf}
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',

                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}

                >
                    <View
                        style={{
                            width: DesignConvert.getW(359),
                            height: DesignConvert.getH(45),
                            borderTopLeftRadius: DesignConvert.getW(7),
                            borderTopRightRadius: DesignConvert.getW(7),
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: DesignConvert.getF(13),
                                color: 'rgba(143, 143, 143, 1)'
                            }}
                        >请选择性别</Text>
                    </View>
                    <TouchableOpacity
                        onPress={this._changeToMale}
                        style={{
                            width: DesignConvert.getW(359),
                            height: DesignConvert.getH(45),
                            // borderRadius: DesignConvert.getW(7),
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderTopWidth: DesignConvert.getW(1),
                            borderTopColor: 'black'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: DesignConvert.getF(20),
                                color: 'rgba(0, 122, 255, 1)'
                            }}
                        >男</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this._changeToFemale}

                        style={{
                            width: DesignConvert.getW(359),
                            height: DesignConvert.getH(45),
                            borderBottomLeftRadius: DesignConvert.getW(7),
                            borderBottomRightRadius: DesignConvert.getW(7),
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderTopWidth: DesignConvert.getW(1),
                            borderTopColor: 'black'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: DesignConvert.getF(20),
                                color: 'rgba(0, 122, 255, 1)'
                            }}
                        >女</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.popSelf}
                        style={{
                            width: DesignConvert.getW(359),
                            height: DesignConvert.getH(45),
                            borderRadius: DesignConvert.getW(7),
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: DesignConvert.getH(48),
                            marginTop: DesignConvert.getH(8)
                        }}
                    >
                        <Text
                            style={{
                                fontSize: DesignConvert.getF(20),
                                color: 'rgba(0, 122, 255, 1)'
                            }}
                        >取消</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        )
    }
}