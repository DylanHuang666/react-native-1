import React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import DesignConvert from "../../../utils/DesignConvert";
import BaseView from "../../base/BaseView";
import { ERoomModify } from '../../../hardcode/ERoom';
import { enterRoom } from "../../../model/room/RoomPublicScreenModel";
import RoomModel from "../../../model/room/RoomModel";
import Config from "../../../configs/Config";
import { THEME_COLOR } from "../../../styles";



export default class SetPassword extends BaseView {
    constructor(props) {
        super(props)

        this._type = this.props.params.type
        this._roomId = this.props.params.roomId

        this.state = {
            textInputData: [
                {
                    value: '',
                    autoFocus: true
                },
                {
                    value: ''
                },
                {
                    value: ''
                },
                {
                    value: ''
                }
            ]
        };
    }

    _onSurePress = () => {
        const isFininshed = this.state.textInputData.some(item => item.value == '')
        // const unFinished = this.state.textInputData.every(item => item.value == '')
        // // console.log(unFinished)
        // if (unFinished) {
        //     alert("已取消设置房间密码")
        //     this.popSelf()
        //     return
        // }
        if (isFininshed) return alert("请输入完整房间密码")
        let password = '';
        this.state.textInputData.forEach(item => {
            password += item.value
        })
        // console.log(password)

        if (this._type == 0) {
            //设置密码
            require('../../../model/room/RoomModel').default.modifyRoom(ERoomModify.UPDATE_PASSWORD_KEY, password)
                .then(data => {
                    if (data) {
                        this.popSelf();
                    }
                })
        } else {
            //输入进房密码
            this.popSelf()
            RoomModel.enterLiveRoom(this._roomId, password)
        }

    }

    _nextFocus = (text, index) => {
        if (this.state.textInputData[index].value !== '') {
            // console.log(98797)
        }
        const arr = this.state.textInputData;
        this.setState({
            textInputData: arr.map((item, i) => {
                if (i === index) return {
                    value: text
                }
                return item
            })
        }, () => {
            const index = this.state.textInputData.findIndex(item => item.value === '');
            if (index !== -1) {
                // console.log(6789)
                this.refs['inputRef' + index].focus();
            } else {
                // console.log(6789)
                this.refs['inputRef' + '3'].focus();
            }
        })
    }

    _backFocus = (event, index) => {
        // console.log("被恩下去了")
        // console.log(event.nativeEvent.key)
        // console.log(this.state.textInputData[index])

        if (this.state.textInputData[index].value === '' && index !== 0 && event.nativeEvent.key === "Backspace") {
            // console.log(12345)
            const t = index - 1
            // this.refs['inputRef' + index].blur()
            this.refs['inputRef' + t].focus()
        }
    }

    _onBack = () => {
        this.popSelf()
    }
    render() {
        const initInputData = this.state.textInputData

        return (
            <TouchableOpacity
                onPress={this._onBack}
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, .6)",
                    marginBottom: DesignConvert.getH(50)
                }}
            >
                <View
                    style={{
                        alignItems: "center",
                        width: DesignConvert.getW(315),
                        height: DesignConvert.getH(175),
                        borderRadius: DesignConvert.getW(10),
                        borderWidth: DesignConvert.getW(1.5),
                        borderColor: '#121212',
                        backgroundColor: "#FFFFFF"
                    }}
                >
                    <Text
                        style={{
                            marginTop: DesignConvert.getH(15),
                            marginBottom: DesignConvert.getH(30),
                            fontSize: DesignConvert.getF(14),
                            color: "#121212"
                        }}
                    >{this._type == 0 ? '房间上锁' : '请输入房间密码'}</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center"
                        }}
                    >
                        {initInputData.map((item, index) => {
                            if (index === 3) return (
                                <View
                                    style={{
                                        height: DesignConvert.getH(24),
                                        paddingLeft: DesignConvert.getW(13),
                                        paddingRight: DesignConvert.getW(13)
                                    }}
                                >
                                    <TextInput
                                        style={{
                                            paddingLeft: DesignConvert.getW(2),
                                            paddingRight: DesignConvert.getW(2),
                                            paddingTop: DesignConvert.getH(0),
                                            paddingBottom: DesignConvert.getH(9),
                                            height: DesignConvert.getH(34),
                                            borderBottomWidth: DesignConvert.getW(2),
                                            borderBottomColor: "#ECECEC",
                                            textAlign: "center",
                                            fontSize: DesignConvert.getF(24),
                                            color: "#333333"
                                        }}
                                        key={"inputRef" + index}
                                        ref={"inputRef" + index}
                                        maxLength={1}
                                        onKeyPress={(event) => this._backFocus(event, index)}
                                        keyboardType="numeric"
                                        {...item}
                                        onChangeText={(text) => this._nextFocus(text, index)}
                                        selectionColor={THEME_COLOR}
                                    ></TextInput>
                                </View>
                            )
                            return (
                                <View
                                    style={{
                                        height: DesignConvert.getH(24),
                                        paddingLeft: DesignConvert.getW(13),
                                        paddingRight: DesignConvert.getW(13),
                                        borderRightWidth: DesignConvert.getW(1),
                                        borderRightColor: "#F0F0F0"
                                    }}
                                >
                                    <TextInput
                                        style={{
                                            paddingLeft: DesignConvert.getW(2),
                                            paddingRight: DesignConvert.getW(2),
                                            paddingTop: DesignConvert.getH(0),
                                            paddingBottom: DesignConvert.getH(9),
                                            height: DesignConvert.getH(34),
                                            borderBottomWidth: DesignConvert.getW(2),
                                            borderBottomColor: "#ECECEC",
                                            textAlign: "center",
                                            fontSize: DesignConvert.getF(24),
                                            color: "#333333"
                                        }}
                                        key={"inputRef" + index}
                                        ref={"inputRef" + index}
                                        maxLength={1}
                                        keyboardType="numeric"
                                        {...item}
                                        onKeyPress={(event) => this._backFocus(event, index)}
                                        onChangeText={(text) => this._nextFocus(text, index)}
                                        selectionColor={THEME_COLOR}
                                    ></TextInput>
                                </View>
                            )
                        })}
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginTop: DesignConvert.getH(30),
                            marginBottom: DesignConvert.getH(15),
                        }}>
                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                width: DesignConvert.getW(80),
                                height: DesignConvert.getH(34),
                                backgroundColor: "#ECECEC",
                                borderRadius: DesignConvert.getW(25),
                                borderWidth: DesignConvert.getW(1.5),
                                borderColor: '#121212',
                            }}
                            onPress={this.popSelf}
                        >
                            <Text
                                style={{
                                    fontSize: DesignConvert.getF(14),
                                    color: "#121212"
                                }}
                            >取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                width: DesignConvert.getW(80),
                                height: DesignConvert.getH(34),
                                backgroundColor: '#8E7AFF',
                                borderRadius: DesignConvert.getW(25),
                                borderWidth: DesignConvert.getW(1.5),
                                borderColor: '#121212',
                                marginLeft:DesignConvert.getW(50),
                            }}
                            onPress={this._onSurePress}
                        >
                            <Text
                                style={{
                                    fontSize: DesignConvert.getF(14),
                                    color: "#FFFFFF"
                                }}
                            >确定</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}