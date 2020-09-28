
/**
 *  房间 -> 消息列表 -> 聊天页
 */
'use strict';

import React, { PureComponent } from "react";
import { View, FlatList, Text, Image, TouchableOpacity, Modal, KeyboardAvoidingView, } from "react-native";
import DesignConvert from "../../utils/DesignConvert";
import StatusBarView from "../base/StatusBarView";
import BaseView from "../base/BaseView";
import IMList from "../main/message/IMList";
import { BaseChatView } from "../chat/ChatVIew";
import KeyboardAvoidingViewExt from "../base/KeyboardAvoidingViewExt";
import { ic_back_black } from "../../hardcode/skin_imgs/common";
import ToastUtil from "../base/ToastUtil";

export default class RoomChatView extends BaseView {

    render() {
        return (
            <View
                style={{
                    width: DesignConvert.swidth,
                    height: DesignConvert.sheight,
                }}>

                <TouchableOpacity
                    onPress={() => {
                        this.popSelf()
                    }}
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                        width: DesignConvert.swidth,
                        height: DesignConvert.sheight - DesignConvert.getH(568),
                    }}></TouchableOpacity>


                <KeyboardAvoidingViewExt
                    behavior="height"
                    style={{
                        width: DesignConvert.swidth,
                        flex: 1,
                        backgroundColor: "white",
                        borderRadius: DesignConvert.getW(10),
                    }}>


                    <Text
                        style={{
                            width: DesignConvert.swidth,
                            height: DesignConvert.getH(60),
                            color: "#333333",
                            fontSize: DesignConvert.getF(18),
                            paddingTop: DesignConvert.getW(20),
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                        }}>{this.props.params.nickName}</Text>


                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            height: DesignConvert.getH(60),
                            width: DesignConvert.getW(40),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={this.popSelf}
                    >
                        <Image
                            style={{
                                width: DesignConvert.getW(22),
                                height: DesignConvert.getH(21),
                            }}
                            source={ic_back_black()}
                        />
                    </TouchableOpacity>

                    <BaseChatView
                        id={this.props.params.id}
                        isGroup={this.props.params.isGroup}
                        isShowOverlay />
                </KeyboardAvoidingViewExt>

            </View>
        )
    }
}