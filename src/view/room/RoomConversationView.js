
/**
 *  房间 -> 消息列表
 */
'use strict';

import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DesignConvert from "../../utils/DesignConvert";
import BaseView from "../base/BaseView";
import IMList from "../main/message/IMList";
import { TouchImg } from "./OnlineMemberPage";

export default class RoomConversationView extends BaseView {

    //给会话Item的回调方法
    _onItemPress = (id, nickName, isGroup) => {
        require('../../router/level3_router').showRoomChatView(id, nickName, isGroup, this.isOverlayView());
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                }}>

                <TouchableOpacity
                    onPress={this.popSelf}
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.sheight,
                    }} />

                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(405) + DesignConvert.addIpxBottomHeight(34),
                        backgroundColor: "#FFFFFF",
                        borderTopLeftRadius: DesignConvert.getW(15),
                        borderTopRightRadius: DesignConvert.getW(15),
                        justifyContent: "center",
                        alignItems: "center",
                    }}>

                    <Text
                        style={{
                            width: DesignConvert.swidth,
                            marginTop: DesignConvert.getH(12),
                            color: "#212121",
                            fontSize: DesignConvert.getF(17),
                            fontWeight: 'bold',
                            textAlign: 'center',
                            lineHeight: DesignConvert.getH(24),
                            marginTop: DesignConvert.getH(15),
                            marginBottom: DesignConvert.getH(4.5),
                        }}>消息</Text>
                    <TouchImg
                        source={require('../../hardcode/skin_imgs/main').page_close_ic()}
                        onPress={this.popSelf}
                        imgStyle={{
                            width: DesignConvert.getW(12),
                            height: DesignConvert.getH(12)
                        }}
                        containerSty={{
                            position: 'absolute',
                            right: DesignConvert.getW(15),
                            top: DesignConvert.getH(19)
                        }}
                    />
                    <IMList
                        onCloseSelf={this.popSelf}
                        onItemPress={this._onItemPress} />
                </View>
            </View>
        )
    }
}