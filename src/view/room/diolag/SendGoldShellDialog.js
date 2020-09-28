
/**
 * 直播间转赠
 */

'use strict';


import React, { PureComponent, Component } from "react";
import BaseView from "../../base/BaseView";
import KeyboardAvoidingViewExt from "../../base/KeyboardAvoidingViewExt";
import DesignConvert from "../../../utils/DesignConvert";
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, ImageBackground } from "react-native";
import { COIN_NAME } from "../../../hardcode/HGLobal";
import LinearGradient from "react-native-linear-gradient";
import ToastUtil from "../../base/ToastUtil";
import { ic_close_usercard, ic_close_send, bg_redpackage } from "../../../hardcode/skin_imgs/room";
import { THEME_COLOR } from "../../../styles";

export default class SendGoldShellDialog extends BaseView {

    constructor(props) {
        super(props)

        this._userId = this.props.params.userId
        this._nickName = this.props.params.nickName
        this._headUrl = this.props.params.headUrl

        this._amount = ''
        this._payPassword = ''
        this._maxAmount = 0;


        require("../../../model/BagModel").default.getWallet()
            .then(data => {
                this._maxAmount = data.goldShell;
                this.forceUpdate();
            })
    }

    _submit = () => {
        if (!this._amount) {
            ToastUtil.showCenter('请输入转赠数量')
            return
        }

        if (!this._payPassword) {
            ToastUtil.showCenter('请输入支付密码')
            return
        }

        require('../../../model/mine/MyWalletModel').default.sendGoldShell(this._userId, this._amount, this._payPassword, this._nickName)
            .then(data => {
                this.popSelf()
                if (data) {
                    ToastUtil.showCenter('转赠成功')
                }
            })
    }

    _onChangeAmount = (s) => {
        // console.log("验证数字", parseInt(s));
        if (!parseInt(s)) {
            // console.log("true", this._amount);
            this._amount = '';
        } else {
            this._amount = parseInt(s) + '';
        }
        this._amount = this._amount > this._maxAmount ? this._maxAmount + "" : this._amount;
        this.forceUpdate();
    }

    _onChangePayPassword = (s) => {
        this._payPassword = s
    }

    _onHistory = () => {
        require("../../../router/level3_router").showRecordView_showOverlay(require("../../anchorincome/RecordView").giftGoldRecord);
    }

    _selectedItem = (item) => {
        this._onChangeAmount(item)
    }

    render() {

        return (
            <View>

                <KeyboardAvoidingViewExt
                    behavior="height"
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.sheight,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{ position: 'absolute', flex: 1, width: DesignConvert.swidth, height: DesignConvert.sheight, }} />

                    <ImageBackground
                        style={{
                            width: DesignConvert.getW(282),
                            height: DesignConvert.getH(363),
                            alignItems: 'center',
                        }}
                        source={bg_redpackage()}
                    >
                        <Text
                            style={{
                                color: "#FFFFFF",
                                fontSize: DesignConvert.getF(17),
                                marginTop: DesignConvert.getH(27),

                                fontWeight: 'bold'

                            }}>转增</Text>

                        <TouchableOpacity
                            style={{
                                position: "absolute",
                                right: 0,
                                top: DesignConvert.getH(31),
                                right: DesignConvert.getW(15),
                            }}
                            onPress={this._onHistory}
                        >
                            <Text
                                style={{
                                    color: "#5F1271",
                                    fontSize: DesignConvert.getF(12),

                                    fontWeight: 'bold'

                                }}>转赠记录</Text>
                        </TouchableOpacity>

                        <Image
                            style={{
                                width: DesignConvert.getW(74),
                                height: DesignConvert.getH(74),
                                borderRadius: DesignConvert.getW(40),
                                marginTop: DesignConvert.getH(15),
                            }}
                            source={{ uri: this._headUrl }}
                        />

                        <Text
                            style={{
                                marginTop: DesignConvert.getH(10),
                                fontSize: DesignConvert.getF(14),
                                color: '#FFFFFF',
                                fontWeight: 'bold',
                            }}
                        >
                            {this._nickName}
                        </Text>

                        <Text
                            style={{
                                marginTop: DesignConvert.getH(5),
                                fontSize: DesignConvert.getF(12),
                                color: '#FFFFFF'
                            }}
                        >ID:{this._userId}
                        </Text>



                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',

                                width: DesignConvert.getW(210),
                                height: DesignConvert.getH(34),
                                borderRadius: DesignConvert.getW(20),

                                backgroundColor: '#FFFFFF',
                                marginTop: DesignConvert.getH(15),
                            }}
                        >
                            <Text
                                style={{
                                    color: '#949494',
                                    marginStart: DesignConvert.getW(10),
                                    fontSize: DesignConvert.getF(12),
                                }}
                            >转增金币:</Text>
                            <TextInput
                                style={{
                                    flex: 1,
                                    height: DesignConvert.getH(39),
                                    fontSize: DesignConvert.getF(11),
                                }}
                                value={this._amount}
                                keyboardType='numeric'
                                underlineColorAndroid="transparent"
                                // placeholder={`剩余` + this._maxAmount}
                                placeholderTextColor='#D2D2D2'
                                returnKeyType='next'
                                onChangeText={this._onChangeAmount}
                            />

                            <Text
                                style={{
                                    fontSize: DesignConvert.getF(12),
                                    color: '#585858',
                                    marginEnd: DesignConvert.getW(10),
                                }}
                            >
                                {COIN_NAME}
                            </Text>

                        </View>
                        {/* <Text
                            style={{
                                fontSize: DesignConvert.getF(11),
                                color: 'black',
                                position: 'absolute',
                                top: DesignConvert.getH(189),
                                left: DesignConvert.getW(18)
                            }}
                        >可选转赠数量</Text>

                        <DataList
                            selectedItem={this._selectedItem}
                        /> */}




                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',

                                width: DesignConvert.getW(210),
                                height: DesignConvert.getH(34),
                                borderRadius: DesignConvert.getW(20),

                                backgroundColor: '#FFFFFF',
                                marginTop: DesignConvert.getH(15),
                            }}
                        >
                            <Text
                                style={{
                                    color: '#949494',
                                    marginStart: DesignConvert.getW(10),
                                    fontSize: DesignConvert.getF(12),
                                }}
                            >支付密码:</Text>
                            <TextInput
                                style={{
                                    flex: 1,
                                    height: DesignConvert.getH(39),
                                    fontSize: DesignConvert.getF(11),
                                }}
                                keyboardType='default'
                                underlineColorAndroid="transparent"
                                // placeholder='请输入支付密码'
                                placeholderTextColor='#D2D2D2'
                                returnKeyType='next'
                                secureTextEntry={true}
                                onChangeText={this._onChangePayPassword}
                            />

                        </View>


                        <TouchableOpacity
                            style={{
                                width: DesignConvert.getW(98),
                                height: DesignConvert.getH(32),
                                borderRadius: DesignConvert.getW(20),

                                borderWidth: DesignConvert.getW(1.5),
                                borderColor: '#5F1271',

                                justifyContent: 'center',
                                alignItems: 'center',

                                marginTop: DesignConvert.getH(20),

                                backgroundColor: '#FF64EA',
                            }}
                            onPress={this._submit}
                        >
                            <Text
                                style={{
                                    color: '#FFFFFF',
                                    fontSize: DesignConvert.getF(12)
                                }}
                            >确认转赠</Text>

                        </TouchableOpacity>

                    </ImageBackground>

                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            bottom: DesignConvert.getH(105),

                            width: DesignConvert.getW(34),
                            height: DesignConvert.getH(34),

                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={this.popSelf}
                    >
                        <Image
                            style={{
                                width: DesignConvert.getW(34),
                                height: DesignConvert.getH(34),
                            }}
                            source={ic_close_send()}
                        />
                    </TouchableOpacity>

                </KeyboardAvoidingViewExt >

            </View >
        )
    }

}


class DataList extends PureComponent {

    constructor(props) {
        super(props)

        this._dataList = ['1000', '2000', '5000', '10000']
        this._selected = this._dataList[0]

    }

    _selectedItem = (item) => {
        this._selected = item

        this.props.selectedItem(item)

        this.forceUpdate()
    }



    render() {
        return (
            <FlatList
                data={this._dataList}
                renderItem={this._renderItem}
                numColumns={4}
                style={{
                    marginTop: DesignConvert.getH(210)
                }}
            />
        )
    }

    _renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    this._selectedItem(item)
                }}
                style={{
                    marginStart: DesignConvert.getW(6),
                    marginEnd: DesignConvert.getW(6),
                    width: DesignConvert.getW(42),
                    height: DesignConvert.getH(20),
                    borderColor: this._selected == item ? '#A055FF' : '#999999',
                    borderWidth: DesignConvert.getW(1),
                    borderRadius: DesignConvert.getW(18),
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        fontSize: DesignConvert.getF(10),
                        color: this._selected == item ? '#A055FF' : '#999999',
                    }}
                >{item}</Text>

            </TouchableOpacity>
        )
    }
}