
/**
 * 修改页面
 */

'use strict';

import React, { PureComponent, Component } from "react";
import BaseView from "../base/BaseView";
import BackTitleView from "../base/BackTitleView";
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, Image, Text, TouchableOpacity, Modal, ImageBackground, TextInput } from "react-native";
import DesignConvert from "../../utils/DesignConvert";
import Config from '../../configs/Config';
import DatePicker from 'react-native-date-picker';
import Picker from "react-native-wheel-picker";
import moment from "moment";

const [nickName, area, birthday, slogan] = [520, 555, 886, 777];
export { nickName, area, birthday, slogan };

const PickerItem = Picker.Item;
export default class UserInfoEditDetailView extends BaseView {
    constructor(props) {
        super(props);

        this._type = this.props.params.viewType;
        this._text = this.props.params.text;

        this._datePickerVisible = false;
        this._dateString = moment().format("YYYY-MM-DD");

        this._pickerVisible = false;
        this._list;
        this._provinceList = [];
        this._cityList = [];

        this._provinceIndex = 0;
        this._cityIndex = 0;

        if (this._type == area) {
            //读取地区数据
            require("../../model/user_info_edit/UserInfoEditModel").default.getAreaData()
                .then(data => {
                    this._list = data;
                    for (let i = 0; i < this._list.length; i++) {
                        this._provinceList[i] = this._list[i].name;
                    }
                    this._setCityList();
                })
        }

    }

    _onBackPress = () => {
        this.popSelf();
    }

    _title() {
        switch (this._type) {
            case nickName:
                return "昵称";
            case area:
                return "地区";
            case birthday:
                return "出生日期";
            case slogan:
                return "个性签名";
            default:
        }
        return "";
    }

    _setCityList = () => {
        this._cityIndex = 0;
        this._cityList = [];
        for (let i = 0; i < this._list[this._provinceIndex].cityList.length; i++) {
            this._cityList[i] = this._list[this._provinceIndex].cityList[i].name;
        }
        this.forceUpdate();
    }

    _onSavePress = () => {
        if (this._text.trim() == "" && this._type == nickName) {
            require("../base/ToastUtil").default.showCenter("昵称不能为空");
            return
        }
        switch (this._type) {
            case nickName:
                this.props.params.callBack(this._text);
                break;
            case area:
                this.props.params.callBack(this._text);
                break;
            case birthday:
                this.props.params.callBack(this._dateString);
                break;
            case slogan:
                this.props.params.callBack(this._text);
                break;
            default:
        }
        this.popSelf();
    }

    _onChangeText = (s) => {
        this._text = s;
        this.forceUpdate();
    }

    /**
     * 日期按钮记录按下那个
     */
    _onDatePress = () => {
        this._dateSelected = new Date();
        this._datePickerVisible = true;
        this.forceUpdate();
    }


    /**
     * datePicker的确定按钮
     */
    _onDateChangePress = () => {
        let date = this._dateSelected;

        let YY = date.getFullYear() + '-';
        let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        this._dateString = YY + MM + DD;

        let nowDate = new Date();
        let age = nowDate.getFullYear() - date.getFullYear();
        if (nowDate.getMonth() < date.getMonth()) {
            age--;
        } else if (nowDate.getMonth() == date.getMonth()) {
            if (nowDate.getDate() < date.getDate()) {
                age--;
            }
        }
        this._text = age + "";

        this._datePickerVisible = false;
        this.forceUpdate();
    }

    /**
     * datePicker滑动时暂存
     */
    _handleDateTimeChange = (date) => {
        // console.log(date);
        this._dateSelected = date;
    }


    /**
     * 地区选择器
     */
    _onAreaPress = () => {
        if (this._list.length == 0) {
            require("../base/ToastUtil").default.showCenter("地区数据加载中");
            return
        }
        this._pickerVisible = true;
        this.forceUpdate();
    }

    /**
     * Province滑动时暂存
     */
    _onProvincePickerSelect = (index) => {
        // console.log(index);
        this._provinceIndex = index;
        this._setCityList();
        this.forceUpdate()
    }

    /**
     * City滑动时暂存
     */
    _onCityPickerSelect = (index) => {
        // console.log(index);
        this._cityIndex = index;
    }

    _onAreaChangePress = () => {
        this._text = this._cityList[this._cityIndex];
        this._pickerVisible = false;
        this.forceUpdate();
    }

    _renderAreaPicker() {
        if (this._provinceList.length > 0) {
            return (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this._pickerVisible}
                    onRequestClose={() => {
                        this._pickerVisible = false;
                        this.forceUpdate();
                    }}>
                    <View
                        style={{
                            width: DesignConvert.swidth,
                            flex: 1,
                            backgroundColor: "rgba(0,0,0,0.5)",
                            justifyContent: "flex-end",
                            alignItems: "center",
                        }}>

                        <View
                            style={{
                                width: DesignConvert.swidth,
                                height: DesignConvert.getH(26),
                                backgroundColor: "white",
                                flexDirection: "row",
                                alignItems: "center",
                                paddingLeft: DesignConvert.getW(20),
                                paddingRight: DesignConvert.getW(20),
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    this._pickerVisible = false;
                                    this.forceUpdate();
                                }}>
                                <Text style={{
                                    color: "#FA495F",
                                    fontSize: DesignConvert.getF(16),
                                    fontWeight: "normal",
                                    alignSelf: "center",
                                }}>取消</Text>
                            </TouchableOpacity>

                            <View style={{ flex: 1 }}></View>

                            <TouchableOpacity
                                onPress={this._onAreaChangePress}>
                                <Text style={{
                                    color: "#FA495F",
                                    fontSize: DesignConvert.getF(16),
                                    fontWeight: "normal",
                                    alignSelf: "center",
                                }}>确定</Text>
                            </TouchableOpacity>

                        </View>

                        <View
                            style={{
                                width: DesignConvert.swidth,
                                height: DesignConvert.getH(200),
                                backgroundColor: "white",
                                flexDirection: "row",
                            }}
                        >
                            <Picker
                                style={{
                                    flex: 1,
                                    height: DesignConvert.getH(200),
                                    backgroundColor: "white"
                                }}
                                selectedValue={0}
                                itemStyle={{
                                    color: "black",
                                    fontSize: DesignConvert.getF(26),
                                }}
                                onValueChange={(index) => this._onProvincePickerSelect(index)}>
                                {this._provinceList.map((i, value) => (
                                    <PickerItem label={i} value={value} key={i} />
                                ))}
                            </Picker>

                            <Picker
                                style={{
                                    flex: 1,
                                    height: DesignConvert.getH(200),
                                    backgroundColor: "white"
                                }}
                                selectedValue={0}
                                itemStyle={{
                                    color: "black",
                                    fontSize: DesignConvert.getF(26),
                                }}
                                onValueChange={(index) => this._onCityPickerSelect(index)}>
                                {this._cityList.map((i, value) => (
                                    <PickerItem label={i} value={value} key={i} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                </Modal>
            )
        }
    }

    _renderContent() {
        if (this._type == nickName || this._type == slogan) {
            return (
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <TextInput
                        style={{
                            marginTop: DesignConvert.getW(20),
                            marginLeft: DesignConvert.getW(15),

                            width: DesignConvert.swidth,
                            height: DesignConvert.getH(this._type == slogan ? 120 : 50),

                            color: "#1A1A1A",
                            fontSize: DesignConvert.getF(15),
                            backgroundColor: "white",
                            textAlignVertical: 'top',
                        }}
                        multiline={this._type == slogan}
                        value={this._text}
                        keyboardType="default"
                        underlineColorAndroid="transparent"
                        placeholder={this._type == slogan ? "填写个性签名" : "支持表情、符号，12字符以内"}
                        placeholderTextColor="#CCCCCC"
                        returnKeyType="next"
                        onChangeText={this._onChangeText}
                        maxLength={this._type == slogan ? 40 : 12}
                    ></TextInput>

                    <Text
                        style={{
                            color: "#CCCCCC",
                            fontSize: DesignConvert.getF(13),
                            marginTop: DesignConvert.getW(10),
                            marginLeft: DesignConvert.getW(15),
                        }}
                    >{this._type == slogan ? `${this._text.length}/40` : "使用有趣的名字让别人都关注到你"}</Text>
                </View>
            )
        }

        if (this._type == birthday) {
            return (
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flex: 1,
                        }}
                        onPress={this._onDatePress}
                    >
                        <View
                            style={{
                                width: DesignConvert.swidth,
                                height: DesignConvert.getH(50),
                                marginTop: DesignConvert.getW(20),
                                paddingLeft: DesignConvert.getW(15),
                                paddingRight: DesignConvert.getW(15),
                                backgroundColor: "white",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    flex: 1,
                                    color: "#CCCCCC",
                                    fontSize: DesignConvert.getF(15),
                                }}
                            >年龄</Text>

                            <Text
                                style={{
                                    color: "#CCCCCC",
                                    fontSize: DesignConvert.getF(15),
                                }}
                            >{this._text}</Text>
                        </View>
                    </TouchableOpacity>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this._datePickerVisible}
                        onRequestClose={() => {
                            this._datePickerVisible = false;
                            this.forceUpdate();
                        }}>
                        <View
                            style={{
                                width: DesignConvert.swidth,
                                flex: 1,
                                backgroundColor: "rgba(0,0,0,0.5)",
                                justifyContent: "flex-end",
                                alignItems: "center",
                            }}>

                            <TouchableOpacity
                                onPress={() => {
                                    this._datePickerVisible = false;
                                    this.forceUpdate();
                                }}
                                style={{
                                    flex: 1,
                                    width: DesignConvert.swidth,
                                }}
                            />


                            <View
                                style={{
                                    width: DesignConvert.swidth,
                                    height: DesignConvert.getH(26),
                                    backgroundColor: "white",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    paddingLeft: DesignConvert.getW(20),
                                    paddingRight: DesignConvert.getW(20),
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                    }}
                                    onPress={() => {
                                        this._datePickerVisible = false;
                                        this.forceUpdate();
                                    }}>
                                    <Text style={{
                                        color: "#FA495F",
                                        fontSize: DesignConvert.getF(16),
                                        fontWeight: "normal",
                                    }}>取消</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        alignItems: 'flex-end',
                                    }}
                                    onPress={this._onDateChangePress}>
                                    <Text style={{
                                        color: "#FA495F",
                                        fontSize: DesignConvert.getF(16),
                                        fontWeight: "normal",
                                    }}>确定</Text>
                                </TouchableOpacity>

                            </View>

                            <DatePicker
                                mode="date"
                                date={new Date()}
                                maximumDate={new Date()}
                                onDateChange={this._handleDateTimeChange}
                                style={{
                                    width: DesignConvert.swidth,
                                    backgroundColor: "white",
                                }}
                            />
                        </View>
                    </Modal>
                </View>
            )
        }

        if (this._type == area) {
            return (
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flex: 1,
                        }}
                        onPress={this._onAreaPress}
                    >
                        <View
                            style={{
                                width: DesignConvert.swidth,
                                height: DesignConvert.getH(50),
                                marginTop: DesignConvert.getW(20),
                                paddingLeft: DesignConvert.getW(15),
                                paddingRight: DesignConvert.getW(15),
                                backgroundColor: "white",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    flex: 1,
                                    color: "#CCCCCC",
                                    fontSize: DesignConvert.getF(15),
                                }}
                            >地区</Text>

                            <Text
                                style={{
                                    color: "#CCCCCC",
                                    fontSize: DesignConvert.getF(15),
                                }}
                            >{this._text}</Text>
                        </View>
                    </TouchableOpacity>

                    {this._renderAreaPicker()}
                </View>
            )
        }

        return (
            <View></View>
        )
    }

    render() {

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                }}>

                <BackTitleView
                    titleText={this._title()}
                    onBack={this._onBackPress}
                    rightText="完成"
                    onRightPress={this._onSavePress} />

                {this._renderContent()}
            </View>
        )
    }

}