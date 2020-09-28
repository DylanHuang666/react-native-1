'use strict';

import React, { PureComponent } from "react";
import { Image, Text, TouchableOpacity, View, Platform } from "react-native";
import { ESex_Type_MALE } from "../../../../hardcode/HGLobal";
import DesignConvert from "../../../../utils/DesignConvert";



export default class _PublicScreenMessageItem extends PureComponent {

    _onSender = () => {
        require('../../../../model/room/RoomUserClickModel').onClickUser(this.props.data.sender.userId, this.props.data.sender.nickName)
    }


    render() {

        // const data = {
        //     type: 1,    //MessageConstant.TEXT
        //     content,
        //     sender: {
        //         headUrl: Config.getHeadUrl(userInfo.userId, userInfo.logoTime, userInfo.thirdIconurl),
        //         charmLv: userInfo.charmLv,
        //         vipLv: userInfo.vipLv,
        //         sex: userInfo.sex,
        //         headFrameId: userInfo.headFrameId,
        //         contributeLv: userInfo.contributeLv,
        //         nickName: userInfo.nickName,
        //         userId: userInfo.userId,
        //         isNewUser: userInfo.isNew,

        //         hatId,
        //         guardianName,
        //         isGuardian,
        //         guardianLv,
        //     },
        // };

        const senderName = decodeURIComponent(this.props.data.sender.nickName);
        const contributeLv = this.props.data.sender.contributeLv;
        // const charmLv = this.props.data.sender.charmLv;
        const senderIsMale = this.props.data.sender.sex == ESex_Type_MALE;


        if (Platform.OS === 'android') {
            return (
                <View
                    style={{
                        marginTop: DesignConvert.getH(5),
                        marginBottom: DesignConvert.getH(5),
                        marginLeft: DesignConvert.getW(5),
                        width: DesignConvert.getW(260),
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                >

                    {/* <TouchableOpacity
                        onPress={this._onSender}
                    >
                        <Image
                            style={{
                                width: DesignConvert.getW(35),
                                height: DesignConvert.getH(35),
                                borderRadius: DesignConvert.getW(21),
                                marginTop: DesignConvert.getH(4),
                                marginBottom: DesignConvert.getH(4),
                            }}
                            source={{ uri: this.props.data.sender.headUrl }}
                        />
                    </TouchableOpacity> */}

                    {/* <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                source={require("../../../../hardcode/skin_imgs/main").mine_rich_lv(contributeLv)}
                                style={{
                                    width: DesignConvert.getW(28),
                                    height: DesignConvert.getH(14),
                                    marginEnd: DesignConvert.getW(5),
                                    resizeMode: 'contain',
                                }}
                            />

                            <Text
                                style={{
                                    color: senderIsMale ? '#A4AAFF' : '#FF8BC5',
                                    fontSize: DesignConvert.getF(12),
                                }}
                                onPress={this._onSender}
                            >{senderName}</Text>


                        </View> */}

                    <Text
                        style={{
                            color: 'white',
                            fontSize: DesignConvert.getF(12),
                            flexDirection: 'row',
                            backgroundColor: '#FFFFFF33',
                            borderRadius: DesignConvert.getW(5),
                            padding: DesignConvert.getW(8),
                        }}
                    >

                        <Image
                            source={require("../../../../hardcode/skin_imgs/main").mine_rich_lv(contributeLv)}
                            style={{
                                width: DesignConvert.getW(39),
                                height: DesignConvert.getH(15),
                                resizeMode: 'contain',
                            }}
                        />

                        <Text
                            style={{
                                color: senderIsMale ? '#EA85FF' : '#EA85FF',
                                fontSize: DesignConvert.getF(12),
                            }}
                            onPress={this._onSender}

                        >{` ${senderName}：`}</Text>


                        {this.props.data.content}</Text>

                </View>
            );

        }

        return (
            <View
                style={{
                    marginTop: DesignConvert.getH(5),
                    marginBottom: DesignConvert.getH(5),
                    marginLeft: DesignConvert.getW(5),
                    width: DesignConvert.getW(260),
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF33',
                    borderRadius: DesignConvert.getW(5),
                    padding: DesignConvert.getW(8),
                }}
            >

                {/* <TouchableOpacity
                    onPress={this._onSender}
                >
                    <Image
                        style={{
                            width: DesignConvert.getW(35),
                            height: DesignConvert.getH(35),
                            borderRadius: DesignConvert.getW(21),
                            marginTop: DesignConvert.getH(4),
                            marginBottom: DesignConvert.getH(4),
                        }}
                        source={{ uri: this.props.data.sender.headUrl }}
                    />
                </TouchableOpacity> */}

                {/* <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={require("../../../../hardcode/skin_imgs/main").mine_rich_lv(contributeLv)}
                            style={{
                                width: DesignConvert.getW(28),
                                height: DesignConvert.getH(14),
                                marginEnd: DesignConvert.getW(5),
                                resizeMode: 'contain',
                            }}
                        />

                        <Text
                            style={{
                                color: senderIsMale ? '#A4AAFF' : '#FF8BC5',
                                fontSize: DesignConvert.getF(12),
                            }}
                            onPress={this._onSender}
                        >{senderName}</Text>


                    </View> */}
                <Image
                    source={require("../../../../hardcode/skin_imgs/main").mine_rich_lv(contributeLv)}
                    style={{
                        width: DesignConvert.getW(39),
                        height: DesignConvert.getH(15),
                        resizeMode: 'contain',
                    }}
                />

                <Text
                    style={{
                        color: senderIsMale ? '#EA85FF' : '#EA85FF',
                        fontSize: DesignConvert.getF(12),
                    }}
                    onPress={this._onSender}

                >{` ${senderName}：`}</Text>

                <Text
                    style={{
                        color: 'white',
                        fontSize: DesignConvert.getF(12),
                        flexDirection: 'row',
                    }}
                >
                    {this.props.data.content}</Text>

            </View>
        );

    }
}
