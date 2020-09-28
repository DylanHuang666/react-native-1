/*
 * @Author: 
 * @Date: 2020-09-10 18:06:09
 * @LastEditors: your name
 * @LastEditTime: 2020-09-11 17:53:53
 * @Description: file content
 */

'use strict';

import React, { PureComponent } from "react";
import { Image, View, Text, TouchableOpacity, Clipboard } from "react-native";
import DesignConvert from "../../../utils/DesignConvert";
import HResultStatus from "../../../hardcode/HResultStatus";
import { icon_copy } from "../../../hardcode/skin_imgs/user_info";
import ToastUtil from "../../base/ToastUtil";

export default class _IDItem extends PureComponent {

    constructor(props) {
        super(props);

        this._cutenumber = null//靓号
        this._cuteIcon = null//靓号icon
        this._doGetData();
    }

    _onCopyPress = () => {
        Clipboard.setString(this._userId);
        ToastUtil.showCenter("复制成功");
    }

    _doGetData() {
        require('../../../model/userinfo/UserInfoModel').default.getGoodId(this.props.id)
            .then(data => {
                if (data) {
                    //设置靓号
                    this._cutenumber = data.cutenumber
                    this._cuteIcon = data.icon
                } else {
                    //没有靓号
                    this._cutenumber = null
                    this._cuteIcon = null
                }
                this.forceUpdate()
            })
        this.forceUpdate();
    }

    render() {
        return (
            <View
                style={{

                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >

                {this._cuteIcon &&
                    <Image
                        style={{
                            marginEnd: DesignConvert.getW(5),
                            width: DesignConvert.getW(16),
                            height: DesignConvert.getH(16),
                            resizeMode: 'contain',
                        }}
                        source={{ uri: this._cuteIcon }}
                    />
                }

                <Text
                    style={{
                        color: '#949494',
                        fontSize: DesignConvert.getF(11),
                    }}
                >ID:{this._cutenumber ? this._cutenumber : this.props.id}</Text>

                <TouchableOpacity
                    style={{
                        paddingLeft: DesignConvert.getW(3),
                    }}
                    onPress={this._onCopyPress}>
                    <Image
                        source={icon_copy()}
                        style={{
                            marginLeft: DesignConvert.getW(5),
                            width: DesignConvert.getW(12),
                            height: DesignConvert.getH(12),
                            resizeMode: 'contain',
                            tintColor: '#949494',
                        }} />
                    {/* <Text
                            style={{
                                color: 'rgba(255, 255, 255, 0.6)',
                                fontSize: DesignConvert.getF(11)
                            }}
                        >复制</Text> */}
                </TouchableOpacity>
            </View>
        );
    }
}