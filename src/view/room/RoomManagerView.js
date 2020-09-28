
/**
 *  房间 -> 管理员
 */
'use strict';

import React, { PureComponent } from "react";
import { View, FlatList, Text, Image, TouchableOpacity, Modal, } from "react-native";
import DesignConvert from "../../utils/DesignConvert";
import BaseView from "../base/BaseView";
import BackTitleView from "../base/BackTitleView";
import SexAgeWidget from '../userinfo/SexAgeWidget';
import LinearGradient from 'react-native-linear-gradient';
import RoomInfoCache from '../../cache/RoomInfoCache';


class DialogView extends PureComponent {
    constructor(props) {
        super(props);

        this._visible = false;
    }

    showDia = () => {
        this._visible = true;
        this.forceUpdate();
    }

    dissmissDia = () => {
        this._visible = false;
        this.forceUpdate();
    }

    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this._visible}
                onRequestClose={this.dissmissDia}
            >

                <View
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.sheight,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <View
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
                        >{this.props.dialogContent}</Text>

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
                                onPress={this.dissmissDia}>

                                <Text
                                    style={{
                                        color: "#1A1A1A",
                                        fontSize: DesignConvert.getF(13),
                                        textAlign: "center",
                                    }}
                                >取消</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    width: DesignConvert.getW(103),
                                    height: DesignConvert.getW(40),
                                    backgroundColor: "#FA495F",
                                    borderRadius: DesignConvert.getW(20),
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    textAlignVertical: "center",
                                }}
                                onPress={this.props.positiveClick}>

                                <Text
                                    style={{
                                        color: "white",
                                        fontSize: DesignConvert.getF(13),
                                        textAlign: "center",
                                    }}
                                >确定</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

export default class RoomManagerView extends BaseView {

    constructor(props) {
        super(props);

        this._roomId = !this.props.params.roomId ? "A7529881" : this.props.params.roomId;
        this._list = [];

        this._isLoading = false;
        this._targetId = "";

    }

    _onBackPress = () => {
        this.popSelf();
    }

    _onRefresh = () => {
        this._isLoading = true;
        this.forceUpdate();
        this._initData();
    }

    _getDialog = ref => {
        this._dialog = ref;
    }

    _removeRoomManager = () => {
        this._dialog.dissmissDia();
        this.forceUpdate();
        require("../../model/room/RoomManagerModel").default.removeRoomManager(this._roomId, this._targetId)
            .then(data => {
                this._initData();
                this.forceUpdate();
            });
    }

    _initData() {
        require("../../model/room/RoomManagerModel").default.getRoomManagerList(this._roomId)
            .then(data => {
                this._list = data;
                // console.log("房管", this._list)
                this._isLoading = false;
                this.forceUpdate();
            });
    }

    componentDidMount() {
        super.componentDidMount();
        this._initData();
    }

    _renderItem = ({ item }) => {
        return (
            <View
                style={{
                    width: DesignConvert.swidth,
                    height: DesignConvert.getH(50),
                    alignItems: "center",
                    flexDirection: "row",
                    marginBottom: DesignConvert.getH(25),
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        require("../../router/level2_router").showUserInfoView(item.base.userId);
                    }}>

                    <Image
                        source={{ uri: require("../../configs/Config").default.getHeadUrl(item.base.userId, item.base.logoTime, item.base.thirdIconurl) }}
                        style={{
                            width: DesignConvert.getW(50),
                            height: DesignConvert.getH(50),
                            marginLeft: DesignConvert.getW(23),
                            borderRadius: DesignConvert.getW(25),
                        }}></Image>
                </TouchableOpacity>

                <View
                    style={{
                        marginLeft: DesignConvert.getW(14),
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                color: "#212121",
                                fontSize: DesignConvert.getF(14),
                                marginRight: DesignConvert.getW(2),
                            }}
                        >{decodeURI(item.base.nickName)}</Text>

                        <SexAgeWidget
                            sex={item.base.sex}
                            age={item.base.age}
                        />
                    </View>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#FF7600', '#FFB300']}

                        style={{
                            width: DesignConvert.getW(30),
                            height: DesignConvert.getH(16),
                            borderRadius: DesignConvert.getW(5),

                            marginTop: DesignConvert.getH(7.5),
                            justifyContent: 'center',
                            alignItems: 'center',

                            borderColor: '#000000',
                            borderWidth: DesignConvert.getW(1.5),
                        }}
                    >
                        <Text
                            style={{
                                color: "#FFFFFF",
                                fontSize: DesignConvert.getF(10),
                            }}
                        >{'管理'}</Text>
                    </LinearGradient>
                    {/* <Text
                        style={{
                            color: "#969696",
                            fontSize: DesignConvert.getF(11),
                            marginTop: DesignConvert.getH(3.5),
                            lineHeight: DesignConvert.getH(15),
                        }}
                    >{`ID: ${item.base.userId}`}</Text> */}
                </View>

                {RoomInfoCache.createUserInfo && RoomInfoCache.createUserInfo.userId === item.base.userId ? null :
                    <TouchableOpacity
                        onPress={() => {
                            this._targetId = item.base.userId;
                            this._dialog.showDia();
                            this.forceUpdate();
                        }}
                        style={{
                            position: 'absolute',
                            right: DesignConvert.getW(23),
                            top: DesignConvert.getH(7.5),
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#CCCCCC', '#CCCCCC']}

                            style={{
                                width: DesignConvert.getW(53),
                                height: DesignConvert.getH(29),
                                borderRadius: DesignConvert.getW(17),
                                justifyContent: 'center',
                                alignItems: 'center',

                                borderColor: '#000000',
                                borderWidth: DesignConvert.getW(1),
                            }}
                        >
                            <Text
                                style={{
                                    color: "#FFFFFF",
                                    fontSize: DesignConvert.getF(12),
                                }}
                            >{'移除'}</Text>
                        </LinearGradient>

                    </TouchableOpacity>
                }

            </View>
        )
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,

                    backgroundColor: '#FFFFFF'
                }}>

                <BackTitleView
                    titleText={"管理员"}
                    onBack={this._onBackPress}
                />

                <View
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(0.5),
                        backgroundColor: '#F1F1F1',
                        marginBottom: DesignConvert.getH(23.5),
                    }}
                />

                {/* <View
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(20),
                        backgroundColor: "#E4E3E7",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    <Text
                        style={{
                            fontSize: DesignConvert.getF(10),
                            color: "#999999",
                        }}
                    >tip:管理员不得超过10人</Text>
                </View> */}

                <FlatList
                    style={{
                        flex: 1,
                    }}
                    data={this._list}
                    renderItem={this._renderItem}
                    refreshing={this._isLoading}
                    onRefresh={this._onRefresh}
                />

                <DialogView
                    ref={this._getDialog}
                    dialogContent="您要撤销该管理员吗？"
                    positiveClick={this._removeRoomManager}></DialogView>
            </View>
        );
    }
}
