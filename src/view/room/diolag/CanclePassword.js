import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import DesignConvert from "../../../utils/DesignConvert";
import BaseView from "../../base/BaseView";
import { diolag_lock } from "../../../hardcode/skin_imgs/room";
import { ERoomModify } from '../../../hardcode/ERoom';

export default class CanclePassword extends BaseView {
    constructor(props) {
        super(props)
    }

    _onCancelPress = () => {
        this.popSelf();
    }

    _onSurePress = () => {
        require('../../../model/room/RoomModel').default.modifyRoom(ERoomModify.UPDATE_PASSWORD_KEY, '')
            .then(data => {
                if (data) {
                    // console.log("房间解锁成功", data)
                    this.popSelf();
                }
            })
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, .6)"
                }}
            >
                <View
                    style={{
                        width: DesignConvert.getW(260),
                        height: DesignConvert.getH(170),
                        backgroundColor: "#FFFFFF",
                        borderRadius: DesignConvert.getW(7),
                        alignItems: "center",
                    }}
                >
                    <Image
                        style={{
                            marginTop: DesignConvert.getH(19),
                            width: DesignConvert.getW(22),
                            height: DesignConvert.getH(27),
                        }}
                        source={diolag_lock()}
                    />
                    <Text
                        style={{
                            marginTop: DesignConvert.getH(21),
                            marginBottom: DesignConvert.getH(25),
                            fontSize: DesignConvert.getF(16),
                            color: "#333333"
                        }}
                    >是否确定取消房间密码？</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            height: DesignConvert.getH(37)
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: DesignConvert.getW(103),
                                height: DesignConvert.getH(37),
                                marginRight: DesignConvert.getW(8),
                                borderRadius: DesignConvert.getW(19),
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#F5F5F5"
                            }}
                            onPress={this._onCancelPress}
                        >
                            <Text
                                style={{
                                    fontSize: DesignConvert.getF(14),
                                    color: "#1A1A1A"
                                }}
                            >取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: DesignConvert.getW(103),
                                height: DesignConvert.getH(37),
                                marginLeft: DesignConvert.getW(8),
                                borderRadius: DesignConvert.getW(19),
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#F63B6D"
                            }}
                            onPress={this._onSurePress}
                        >
                            <Text
                                style={{
                                    fontSize: DesignConvert.getF(14),
                                    color: "#FFFFFF"
                                }}
                            >确认</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}