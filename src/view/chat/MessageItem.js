/**
 *各种消息
 */
'use strict';

import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import DesignConvert from "../../utils/DesignConvert";
import Config from "../../configs/Config";
import ToastUtil from "../base/ToastUtil";
import StatusBarView from "../base/StatusBarView";
import BaseView from "../base/BaseView";
import { ic_default_header } from "../../hardcode/skin_imgs/registered";
import UserInfoCache from "../../cache/UserInfoCache";
import RoomInfoCache from "../../cache/RoomInfoCache";
import { icon_next, ic_offical_message } from "../../hardcode/skin_imgs/main";
import { THEME_COLOR } from "../../styles";

class _StatusMessage extends PureComponent {

    render() {
        return (
            <View
                style={[{
                    width: DesignConvert.swidth,
                    alignItems: "center",
                    padding: DesignConvert.getW(7),
                }, this.props.style]}>
                <Text
                    style={{
                        color: "#CCCCCC",
                        fontSize: DesignConvert.getF(14),

                    }}>{this.props.statusText}</Text>
            </View>
        )
    }
}

export class OfficialMessageItem extends PureComponent {

    _enterLiveRoom = () => {
        let roomId = this.props.message.data.ext.actionParam;
        //在房间
        if (RoomInfoCache.isInRoom && roomId == RoomInfoCache.roomId) {
            require('../../model/room/RoomModel').getRoomDataAndShowView(RoomInfoCache.roomId);

            return;
        }

        // if (RoomInfoCache.isInRoom && roomId != RoomInfoCache.roomId) {
        //     require("../../router/level2_router").showNormTitleInfoDialog("是否离开房间，并跳转到该房间", "确认", this._enterLiveRoomInRoom, "提示");
        //     return;
        // }

        require('../../model/room/RoomModel').default.enterLiveRoom(roomId, '')
    }

    // _enterLiveRoomInRoom = () => {
    //     require('../../model/room/RoomModel').getRoomDataAndShowView(RoomInfoCache.roomId);
    // }

    render() {
        if (!this.props.isContent) {
            return (
                <View
                    style={{
                    }}
                >
                    <_StatusMessage
                        statusText={this.props.message.showTime}
                        style={{
                            display: !this.props.message.showTime ? "none" : "flex",
                        }} />

                    <View
                        style={{
                            width: DesignConvert.getW(345),
                            backgroundColor: "white",
                            borderRadius: DesignConvert.getW(5),
                            alignSelf: "center",
                            paddingHorizontal: DesignConvert.getW(17),
                            paddingVertical: DesignConvert.getH(17),
                            marginVertical: DesignConvert.getH(10),
                        }}>

                        <Text
                            style={{
                                color: "#212121",
                                fontSize: DesignConvert.getF(14),
                                // letterSpacing: DesignConvert.getH(5),
                                marginBottom: DesignConvert.getH(10),
                                lineHeight: DesignConvert.getH(25),
                            }}>{this.props.message.data.data}</Text>


                        <View
                            style={{
                                width: DesignConvert.getW(307),
                                height: DesignConvert.getH(0.5),
                                backgroundColor: "#FFFFFF",
                            }}></View>

                        <TouchableOpacity
                            onPress={this._enterLiveRoom}
                            style={{
                                width: DesignConvert.getW(307),
                                height: DesignConvert.getH(34),
                                marginTop: DesignConvert.getH(10),
                                alignItems: "center",
                                flexDirection: "row",
                            }}>
                            <Text
                                style={{
                                    color: THEME_COLOR,
                                    fontSize: DesignConvert.getF(14),

                                }}>{this.props.message.data.ext.typeParam}</Text>

                            <View
                                style={{
                                    flex: 1,
                                }}></View>

                            <Image
                                style={{
                                    width: DesignConvert.getW(9),
                                    height: DesignConvert.getH(13),
                                }}
                                source={icon_next()}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return (
                <TouchableOpacity
                    style={{
                        alignSelf: 'center',

                        width: DesignConvert.getW(345),
                        height: DesignConvert.getH(104),
                        paddingHorizontal: DesignConvert.getW(12),

                        paddingTop: DesignConvert.getH(12)
                    }}>
                    <Image
                        source={require('../../hardcode/skin_imgs/chat').official_item_bg()}
                        style={{
                            width: DesignConvert.getW(345),
                            height: DesignConvert.getH(103),
                            resizeMode: 'contain',
                            position: 'absolute',
                        }}
                    />
                    <Text
                        style={{
                            color: "#585858",
                            fontSize: DesignConvert.getF(14),
                            // letterSpacing: DesignConvert.getH(5),
                            // lineHeight: DesignConvert.getH(25),
                        }}>

                        {this.props.message.data.data}

                        {/* <Text
                            onPress={this._enterLiveRoom}
                            style={{
                                color: THEME_COLOR,
                                fontSize: DesignConvert.getF(11),

                            }}>{this.props.message.data.ext.typeParam}</Text> */}

                    </Text>

                    {/* <Image
                        source={{ uri: Config.getGiftUrl(111) }}
                        style={{
                            width: DesignConvert.getW(38),
                            height: DesignConvert.getH(38),
                            marginLeft: DesignConvert.getW(5),
                        }}></Image> */}
                </TouchableOpacity>
            )
        }

    }
}

export default class BaseMessageItem extends PureComponent {
    constructor(props) {
        super(props);

    }

    _onAvatarPress = () => {
        try {
            // console.log("官方ID", "officialGroupId", UserInfoCache.officialGroupId)
            if (this.props.message.id != UserInfoCache.officialGroupId && !this.props.isShowOverlay) {
                require("../../router/level2_router").showUserInfoView(this.props.message.userInfo.userId);
            }
        } catch (err) {

        }
    }

    //override
    renderContent = () => {
        // console.log("renderContent", this.props.message);
        // console.log("官方id", UserInfoCache.officialGroupId);
        if (!this.props.renderContent) {
            return (
                <Text
                    style={{
                        color: this.props.isSelf ? "#FFFFFF" : "#000000",
                        fontSize: DesignConvert.getF(14),
                        margin: DesignConvert.getW(10),
                    }}>{this.props.message.data + ""}</Text>
            )
        } else {
            return (
                this.props.renderContent(this.props.message)
            )
        }
    }

    _getAvatorUrl = () => {
        try {
            // console.log("官方ID", this.props.message, UserInfoCache.officialGroupId)
            if (this.props.message.id == UserInfoCache.officialGroupId) {
                return ic_offical_message();
            }
            if (this.props.message.sender == "10003" && !this.props.isSelf) {
                return require("../../hardcode/skin_imgs/main").ic_customer_service();
            }
            return { uri: Config.getHeadUrl(this.props.message.userInfo.userId, this.props.message.userInfo.logoTime, this.props.message.userInfo.thirdIconurl) };
        } catch (err) {
            return ic_default_header();
        }
    }

    _renderSysItem = () => {
        return (
            <SysMessageItem
                message={this.props.message}
            />

        )
    }

    render() {
        if (this.props.message.id === '10003') return this._renderSysItem()
        return (
            <View
                style={{
                }}
            >
                <_StatusMessage
                    statusText={this.props.message.showTime}
                    style={{
                        display: !this.props.message.showTime ? "none" : "flex",
                    }} />

                <View
                    style={{
                        width: DesignConvert.swidth,
                        flexDirection: this.props.isSelf ? "row-reverse" : "row",

                        paddingHorizontal: DesignConvert.getW(15),

                        paddingTop: DesignConvert.getH(7),
                        paddingBottom: DesignConvert.getH(7),
                    }}>

                    <TouchableOpacity
                        onPress={this._onAvatarPress}>
                        <Image
                            source={this._getAvatorUrl()}
                            style={{
                                width: DesignConvert.getW(40),
                                height: DesignConvert.getH(40),
                                borderRadius: DesignConvert.getW(40),
                            }}></Image>
                    </TouchableOpacity>



                    {/* {!this.props.isSelf ? (
                        <Text
                            style={{
                                color: "#212121",
                                fontSize: DesignConvert.getW(11),
                                position: "absolute",
                                left: DesignConvert.getW(67),
                                top: DesignConvert.getW(20),
                                fontWeight: "bold",
                            }}>
                            {decodeURI(this.props.message.userInfo.nickName)}
                        </Text>
                    ) : null} */}

                    <View
                        style={{
                            maxWidth: DesignConvert.getW(213),
                            backgroundColor: this.props.bHideBackground ? "#FFFFFF00" : this.props.isSelf ? THEME_COLOR : "#FFFFFF",

                            borderTopLeftRadius: this.props.isSelf ? DesignConvert.getW(10) : DesignConvert.getW(0),
                            borderTopRightRadius: this.props.isSelf ? DesignConvert.getW(0) : DesignConvert.getW(10),
                            borderBottomLeftRadius: DesignConvert.getW(10),
                            borderBottomRightRadius: DesignConvert.getW(10),


                            marginLeft: DesignConvert.getW(8),
                            marginRight: DesignConvert.getW(12),
                        }}>
                        {this.renderContent()}
                    </View>
                </View>
            </View>
        )
    }
}


export class BaseMessageOfficialItem extends PureComponent {
    constructor(props) {
        super(props);

    }

    _onAvatarPress = () => {
        try {
            // console.log("官方ID", "officialGroupId", UserInfoCache.officialGroupId)
            if (this.props.message.id != UserInfoCache.officialGroupId && !this.props.isShowOverlay) {
                require("../../router/level2_router").showUserInfoView(this.props.message.userInfo.userId);
            }
        } catch (err) {

        }
    }

    //override
    renderContent = () => {
        // console.log("renderContent", this.props.message);
        // console.log("官方id", UserInfoCache.officialGroupId);
        if (!this.props.renderContent) {
            return (
                <Text
                    style={{
                        color: this.props.isSelf ? "#FFFFFF" : "#000000",
                        fontSize: DesignConvert.getF(14),
                        margin: DesignConvert.getW(10),
                    }}>{this.props.message.data + ""}</Text>
            )
        } else {
            return (
                this.props.renderContent(this.props.message)
            )
        }
    }

    _getAvatorUrl = () => {
        try {
            // console.log("官方ID", this.props.message, UserInfoCache.officialGroupId)
            if (this.props.message.id == UserInfoCache.officialGroupId) {
                return ic_offical_message();
            }
            if (this.props.message.sender == "10003" && !this.props.isSelf) {
                return require("../../hardcode/skin_imgs/main").ic_customer_service();
            }
            return { uri: Config.getHeadUrl(this.props.message.userInfo.userId, this.props.message.userInfo.logoTime, this.props.message.userInfo.thirdIconurl) };
        } catch (err) {
            return ic_default_header();
        }
    }

    render() {
        return (
            <View
                style={{
                    alignSelf: 'center',
                    marginTop: DesignConvert.getH(20),
                }}
            >
                <_StatusMessage
                    statusText={this.props.message.showTime}
                    style={{
                        display: !this.props.message.showTime ? "none" : "flex",
                    }} />

                <View
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(105),
                    }}>



                    <OfficialMessageItem
                        isContent
                        message={this.props.message} />


                </View>
            </View>
        )
    }
}


function SysMessageItem(props) {

    const { message } = props

    return (
        <View
            style={{
            }}
        >
            <_StatusMessage
                statusText={message.showTime}
                style={{
                    display: message.showTime ? "none" : "flex",
                }} />

            <View
                style={{
                    width: DesignConvert.getW(345),

                    borderRadius: DesignConvert.getW(10),
                    borderWidth: DesignConvert.getW(2),
                    borderColor: '#5F1271',

                    alignSelf: 'center',

                    marginBottom: DesignConvert.getH(20),
                    marginTop: DesignConvert.getH(10),

                    padding: DesignConvert.getW(12)
                }}
            >
                <Text
                    style={{
                        color: "#585858",
                        fontSize: DesignConvert.getF(14),
                    }}>{message.data + ""}</Text>
            </View>
        </View>
    )


}