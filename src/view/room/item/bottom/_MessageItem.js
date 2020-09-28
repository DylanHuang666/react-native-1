'use strict';

import React, { PureComponent } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import DesignConvert from "../../../../utils/DesignConvert";
import { ic_message } from "../../../../hardcode/skin_imgs/room";
import { TX_IM_NEW_MSG, } from '../../../../hardcode/HNativeEvent';
import { EVT_LOGIC_SET_CHAT_MESSAGE_UNREAD, } from '../../../../hardcode/HLogicEvent';
import ModelEvent from '../../../../utils/ModelEvent';
import LinearGradient from 'react-native-linear-gradient';

export default class _MessageItem extends PureComponent {
    constructor(props) {
        super(props);
        this._unReadNum = 0;
    }

    componentDidMount() {
        ModelEvent.addEvent(null, EVT_LOGIC_SET_CHAT_MESSAGE_UNREAD, this._getUnReadNum);//刷新已读
        ModelEvent.addEvent(null, TX_IM_NEW_MSG, this._getUnReadNum);//新消息
    }

    componentWillUnmount() {
        ModelEvent.removeEvent(null, EVT_LOGIC_SET_CHAT_MESSAGE_UNREAD, this._getUnReadNum);//刷新已读
        ModelEvent.removeEvent(null, TX_IM_NEW_MSG, this._getUnReadNum);//新消息
    }

    _getUnReadNum = () => {
        require("../../../../model/chat/ChatModel").getUnReadNum()
            .then(data => {
                this._unReadNum = data;
                // console.log("MainView", "未读数", this._unReadNum)
                this.forceUpdate();
            });
    }

    _onPress = () => {
        require('../../../../router/level3_router').showRoomConversationView()
    }

    _renderNew() {

        if (!this._unReadNum) {
            return null;
        }

        return (
            <LinearGradient
                start={{ x: 0, y: 1}}
                end={{ x: 0, y: 0}}
                colors={['#FF5D5D', '#FF5D5D']}
                style={{
                    position: 'absolute',
                    right: DesignConvert.getW(-2),
                    paddingHorizontal: DesignConvert.getW(3),
                    height: DesignConvert.getH(13),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: DesignConvert.getW(5),
                }}
            >
                <Text
                    style={{
                        fontSize: DesignConvert.getF(9),
                        color: '#FFFFFF',
                    }}
                >
                    {this._unReadNum > 99 ? '99+' : this._unReadNum}
                </Text>
            </LinearGradient>
        );
    }

    render() {

        return (
            <View
                style={{
                    width: DesignConvert.getW(34),
                    height: DesignConvert.getH(34),
                    marginRight: DesignConvert.getW(7),
                }}
            >

                <TouchableOpacity
                    style={{
                        width: DesignConvert.getW(34),
                        height: DesignConvert.getH(34),
                    }}
                    onPress={this._onPress}
                >
                    <Image
                        style={{
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            width: DesignConvert.getW(34),
                            height: DesignConvert.getH(34),
                        }}
                        source={ic_message()}
                    />

                </TouchableOpacity>

                {this._renderNew()}

            </View>
        )
    }
}