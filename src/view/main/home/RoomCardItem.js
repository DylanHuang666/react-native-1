
/**
 * 主界面 -> 首页 -> RoomCardView
 */
'use strict';

import React, { PureComponent, Component } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, FlatList, } from 'react-native';
import DesignConvert from '../../../utils/DesignConvert';
import RoomInfoCache from '../../../cache/RoomInfoCache';
import Config from '../../../configs/Config';

export default class RoomCardItem extends Component {
    constructor(props) {
        super(props);
        this._item = this.props.data;
    }

    _enterLiveRoom = (item) => {

        //在房间
        if (RoomInfoCache.isInRoom && item.roomId == RoomInfoCache.roomId) {
            require('../../../model/room/RoomModel').getRoomDataAndShowView(RoomInfoCache.roomId);
            return;
        }

        require('../../../model/room/RoomModel').default.enterLiveRoom(item.roomId, '')
    }

    shouldComponentUpdate(nextProps, nextState) {
        this._item = nextProps.data;
        // console.log("房间", this._item, decodeURI(this._item.roomName), this._item.onlineNum)
        this.forceUpdate();
        return true;
    }

    _getRoomType = (roomType) => {
        // console.log("房间专态", this.props.getRoomType, roomType, this.props.getRoomType(roomType))
        if (this.props.getRoomType) {
            return this.props.getRoomType(roomType);
        }
        return "其它";
    }

    render() {
        const avatar = { uri: require("../../../configs/Config").default.getHeadUrl(this._item.base.userId, this._item.base.logoTime, this._item.base.thirdIconurl) };

        return (
            <TouchableOpacity
                onPress={() => {
                    this._enterLiveRoom(this._item)
                }}
                activeOpacity={0.8}
                style={{
                    width: DesignConvert.getW(162),
                    height: DesignConvert.getH(212),

                    marginBottom: DesignConvert.getW(15),
                    borderRadius: DesignConvert.getW(10),

                    borderWidth: DesignConvert.getW(1.5),
                    borderColor: '#5F1271',

                    backgroundColor: "#EBE1FF",
                    overflow: 'hidden'
                }}>

                <View
                    style={{
                        width: DesignConvert.getW(162),
                        height: DesignConvert.getH(206),
                        backgroundColor: "#FFFFFF",


                    }}>

                    <Image
                        source={{ uri: Config.getRoomCreateLogoUrl(this._item.logoTime, this._item.roomId, this._item.base.userId, this._item.base.logoTime, this._item.base.thirdIconurl) }}
                        style={{
                            width: DesignConvert.getW(162),
                            height: DesignConvert.getH(150),

                            // borderTopLeftRadius: DesignConvert.getW(11),
                            // borderTopRightRadius: DesignConvert.getW(11)
                        }}>
                    </Image>

                    {/* 蒙层 */}
                    {/* <Image
                        source={require("../../../hardcode/skin_imgs/main").card_bottom_bg()}
                        style={{
                            width: DesignConvert.getW(166),
                            height: DesignConvert.getH(34),
                            position: "absolute",
                            bottom: 0,
                        }}>
                    </Image> */}

                    {/* 房间类型 */}
                    <ImageBackground
                        source={this._item.base.sex == 1 ? require("../../../hardcode/skin_imgs/main").room_type_bg() : require("../../../hardcode/skin_imgs/main").room_type_bg1()}
                        style={{
                            position: "absolute",
                            left: DesignConvert.getW(3),
                            top: DesignConvert.getH(3),

                            width: DesignConvert.getW(38),
                            height: DesignConvert.getH(16),

                            alignItems: "center",
                            justifyContent: "center",


                            // backgroundColor: this._item.base.sex == 1 ? "#FE54F3" : "#FE54F3",
                            // borderRadius: DesignConvert.getW(5),
                        }}>
                        <Text
                            style={{
                                color: "#FFFFFF",
                                fontSize: DesignConvert.getF(10),
                            }}>{this._getRoomType(this._item.roomType)}</Text>
                    </ImageBackground>

                    {/* 在线人数 */}
                    <View
                        style={{


                            position: "absolute",
                            left: DesignConvert.getW(8),
                            top: DesignConvert.getH(125),

                            minWidth: DesignConvert.getW(41),
                            height: DesignConvert.getH(16),
                            borderRadius: DesignConvert.getW(20),

                            backgroundColor: "rgba(0, 0, 0, 0.3)",

                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        {/* <Image
                            source={require("../../../hardcode/skin_imgs/main").live_status_white()}
                            style={{
                                width: DesignConvert.getW(11),
                                height: DesignConvert.getH(12),
                            }}></Image> */}
                        <Image
                            source={require("../../../hardcode/skin_imgs/main").room_hot()}
                            style={{
                                width: DesignConvert.getW(9),
                                height: DesignConvert.getH(9),
                            }}></Image>

                        <Text
                            style={{
                                color: "white",
                                fontSize: DesignConvert.getF(10),
                                marginLeft: DesignConvert.getW(2),
                            }}>{`${this._item.onlineNum}`}</Text>
                    </View>

                    {/* 房间锁 */}
                    <View
                        style={{
                            position: "absolute",
                            right: DesignConvert.getH(5),
                            top: DesignConvert.getW(5),
                        }}>
                        <Image
                            source={require('../../../hardcode/skin_imgs/main').lock()}
                            style={{
                                width: DesignConvert.getW(26),
                                height: DesignConvert.getH(26),
                                display: this._item.password ? "flex" : "none",
                            }}></Image>
                    </View>
                </View>

                <View
                    style={{
                        position: "absolute",
                        bottom: DesignConvert.getH(34),
                        left: DesignConvert.getW(8),
                    }}>

                    <Text
                        numberOfLines={1}
                        style={{
                            width: DesignConvert.getW(140),
                            color: "#121212",
                            fontSize: DesignConvert.getF(14),
                        }}>{decodeURI(this._item.roomName)}</Text>

                    {/* <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: DesignConvert.getH(5),
                        }}>

                      
                    </View> */}
                </View>
                <View
                    style={{
                        position: 'absolute',
                        left: DesignConvert.getW(8),
                        bottom: DesignConvert.getH(13),

                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Image
                        source={avatar}
                        style={{
                            width: DesignConvert.getW(18),
                            height: DesignConvert.getH(18),
                            borderRadius: DesignConvert.getW(10),

                            borderWidth: DesignConvert.getW(1),
                            borderColor: '#5F1271',
                            marginRight: DesignConvert.getW(5),
                        }}></Image>

                    <Text
                        numberOfLines={1}
                        style={{
                            width: DesignConvert.getW(100),
                            color: "#949494",
                            fontSize: DesignConvert.getF(12),
                        }}>{decodeURI(this._item.base.nickName)}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}