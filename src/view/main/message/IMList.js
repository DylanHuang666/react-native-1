/**
 * 主界面 -> 消息 ->消息List
 */
'use strict';

import React, { PureComponent } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import UserInfoCache from "../../../cache/UserInfoCache";
import Config from "../../../configs/Config";
import { EVT_LOGIC_SET_CHAT_MESSAGE_UNREAD } from "../../../hardcode/HLogicEvent";
import { TX_IM_NEW_MSG } from "../../../hardcode/HNativeEvent";
import DesignConvert from "../../../utils/DesignConvert";
import ModelEvent from "../../../utils/ModelEvent";
import { Follow, Friend } from "../mine/FollowAndFansView";

export class _MessageRedDot extends PureComponent {

    render() {
        if (this.props.num < 1) {
            return (
                <View></View>
            )
        } else if (this.props.num < 10) {
            return (
                <View
                    style={[{
                        width: DesignConvert.getW(15),
                        height: DesignConvert.getH(15),
                        backgroundColor: "#FF5D5D",
                        borderRadius: DesignConvert.getW(8),
                        justifyContent: "center",
                        alignItems: "center",
                    }, this.props.style]}>
                    <Text
                        style={{
                            color: "white",
                            textAlign: "center",
                            fontSize: DesignConvert.getF(10),
                        }}>{this.props.num}</Text>
                </View>
            )
        } else if (this.props.num <= 99) {
            return (
                <View
                    style={[{
                        // width: DesignConvert.getW(21),
                        paddingHorizontal: DesignConvert.getW(4),
                        height: DesignConvert.getH(15),
                        backgroundColor: "#FF5D5D",
                        borderRadius: DesignConvert.getW(15),
                        justifyContent: "center",
                        alignItems: "center",
                    }, this.props.style]}>
                    <Text
                        style={{
                            color: "white",
                            textAlign: "center",
                            fontSize: DesignConvert.getF(10),
                        }}>{this.props.num}</Text>
                </View>
            )
        } else {
            return (
                <View
                    style={[{
                        paddingHorizontal: DesignConvert.getW(4),
                        height: DesignConvert.getH(15),
                        backgroundColor: "#FF5D5D",
                        borderRadius: DesignConvert.getW(15),
                        justifyContent: "center",
                        alignItems: "center",
                    }, this.props.style]}>
                    <Text
                        style={{
                            color: "white",
                            textAlign: "center",
                            fontSize: DesignConvert.getF(10),
                        }}>99+</Text>
                </View>
            )
        }
    }
}

class _MessageItem extends PureComponent {

    _onItemPress = () => {

        const headUrl = Config.getHeadUrl(this.props.message.id, this.props.message.userInfo.logoTime, this.props.message.userInfo.thirdIconurl)

        if (this.props.onItemPress) {
            this.props.onItemPress(this.props.message.id, this.props.message.userInfo.nickName, this.props.message.isGroup);
        } else {
            require("../../../router/level2_router").showChatView(this.props.message.id, this.props.message.userInfo.nickName, this.props.message.isGroup, headUrl);
        }
    }

    _getAvatorUrl = () => {


        if (this.props.message.id == UserInfoCache.officialGroupId) {
            return require("../../../hardcode/skin_imgs/ccc").ttq_guanfang();
        }
        if (this.props.message.id == "10003" && !this.props.isSelf) {
            return require("../../../hardcode/skin_imgs/ccc").ttq_xiaozhuli();
        }
        return { uri: Config.getHeadUrl(this.props.message.id, this.props.message.userInfo.logoTime, this.props.message.userInfo.thirdIconurl) };
    }

    _isTop = () => {
        if (this.props.message.id == UserInfoCache.officialGroupId || this.props.message.id == "10003") {
            return true;
        }
        return false;
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this._onItemPress}
                style={{
                    width: DesignConvert.getW(345),
                    height: DesignConvert.getH(65),
                    backgroundColor: "white",
                    flexDirection: "row",
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: "space-between",
                    // borderBottomColor: '#F6F6F6',
                    // borderBottomWidth: DesignConvert.getH(1),
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                    }}>

                    <Image
                        source={this._getAvatorUrl()}
                        style={{

                            borderWidth: DesignConvert.getW(2),
                            borderColor: '#5F1271',

                            width: DesignConvert.getW(46),
                            height: DesignConvert.getH(46),
                            borderRadius: DesignConvert.getW(30),
                        }}
                    />

                    <View
                        style={{
                            marginLeft: DesignConvert.getW(12),
                            height: DesignConvert.getH(50),
                            justifyContent: "center",
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                            <Text
                                style={{
                                    color: "#121212",
                                    fontSize: DesignConvert.getF(14),
                                    lineHeight: DesignConvert.getH(18.5),
                                    fontWeight: 'bold'
                                }}>{this.props.message.userInfo.nickName}</Text>

                            {/* {this._isTop() ? null :
                                <Image
                                    source={this.props.message.userInfo.sex == 2 ? require('../../../hardcode/skin_imgs/ccc').ttq_nv()
                                        : require('../../../hardcode/skin_imgs/ccc').ttq_nan()}
                                    style={{
                                        width: DesignConvert.getW(16),
                                        height: DesignConvert.getH(16),
                                        marginLeft: DesignConvert.getW(5),
                                    }}
                                />
                            } */}

                            {/* {标识} */}
                            {/* {this.props.message.id == UserInfoCache.officialGroupId ? (
                                <Image
                                    source={ic_offical_sign()}
                                    style={{
                                        width: DesignConvert.getW(30),
                                        height: DesignConvert.getH(17),
                                        marginLeft: DesignConvert.getW(4),
                                    }}
                                />
                            ) : null} */}
                        </View>

                        {this._isTop() ? null : (
                            <Text
                                numberOfLines={1}
                                style={{
                                    bottom: 0,
                                    width: DesignConvert.getW(220),
                                    color: "#949494",
                                    fontSize: DesignConvert.getF(12),
                                    marginTop: DesignConvert.getH(8),
                                }}>{this.props.message.desc}</Text>
                        )}

                    </View>
                </View>

                <View
                    style={{
                        height: DesignConvert.getH(50),
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                    }}
                >
                    <Text
                        style={{
                            marginTop: DesignConvert.getH(5),
                            color: "#949494",
                            fontSize: DesignConvert.getF(12),
                            marginRight: DesignConvert.getH(5),
                            marginBottom: DesignConvert.getH(10),
                        }}>
                        {this.props.message.time}
                    </Text>

                    <_MessageRedDot
                        num={this.props.message.unRead} />
                </View>

            </TouchableOpacity>

        )
    }
}
export default class IMList extends PureComponent {
    constructor(props) {
        super(props);

        this._messageList = [];

        this._isrRefreshing = false;
    }

    componentDidMount() {
        this._initData();
        require("../../../model/chat/ChatModel").addEventListener(TX_IM_NEW_MSG, this._updateConversation);
        ModelEvent.addEvent(null, EVT_LOGIC_SET_CHAT_MESSAGE_UNREAD, this._initData);
    }

    _updateConversation = msgs => {
        // console.log('----------IM-------------','IMList', '有新消息')
        this._initData();
    }

    componentWillUnmount() {
        require("../../../model/chat/ChatModel").removeEventListener(TX_IM_NEW_MSG, this._updateConversation);
        ModelEvent.removeEvent(null, EVT_LOGIC_SET_CHAT_MESSAGE_UNREAD, this._initData)
    }

    _initData = () => {
        require("../../../model/chat/ChatModel").getConversationList()
            .then(data => {
                // console.log('会话', data)
                this._messageList = data
                this._isrRefreshing = false;
                this.forceUpdate();
            })
    }

    _onRefresh = () => {
        this._isrRefreshing = true;
        this.forceUpdate();
        this._initData();
    }

    _renderEmptyView = () => {
        return (
            <View
                style={{
                    width: DesignConvert.swidth,
                    height: DesignConvert.getH(520),
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Image
                    source={require("../../../hardcode/skin_imgs/main").no_message()}
                    style={{
                        width: DesignConvert.getW(130),
                        height: DesignConvert.getH(96),
                    }}></Image>
            </View>
        )
    }


    _onFriendsPress = () => {
        this.props.onCloseSelf && this.props.onCloseSelf();
        require("../../../router/level2_router").showFollowAndFansView(Friend);
    }

    _onFansPress = () => {
        this.props.onCloseSelf && this.props.onCloseSelf();
        require("../../../router/level2_router").showFollowAndFansViewPagerView(Friend);
        // require("../../../router/level2_router").showFollowAndFansView(Fans);
    }

    _onMyLovesPress = () => {
        this.props.onCloseSelf && this.props.onCloseSelf();
        require("../../../router/level2_router").showFollowAndFansViewPagerView(Follow);
        // require("../../../router/level2_router").showFollowAndFansView(Follow);
    }

    // _renderHeaderView = () => {
    //     return (
    //         <View
    //             style={{
    //                 flexDirection: 'row',
    //                 width: DesignConvert.getW(345),
    //                 height: DesignConvert.getH(75),
    //                 marginVertical: DesignConvert.getH(15),
    //                 alignSelf: "center",
    //                 alignItems: 'center',
    //                 justifyContent: 'center',
    //                 backgroundColor: "white",
    //                 borderRadius: DesignConvert.getW(10),
    //             }}
    //         >

    //             <TouchableOpacity
    //                 style={{
    //                     flex: 1,
    //                     height: DesignConvert.getH(75),
    //                     marginHorizontal: DesignConvert.getW(7),
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                 }}
    //                 onPress={this._onMyLovesPress}
    //             >

    //                 <Image
    //                     style={{
    //                         width: DesignConvert.getW(32),
    //                         height: DesignConvert.getH(32),
    //                     }}
    //                     source={{ uri: Config.getRNImageUrl('message/ic_attention_bg.png', 1) }}
    //                 />

    //                 <Text
    //                     style={{
    //                         color: "#585858",
    //                         fontSize: DesignConvert.getF(12),
    //                         marginTop: DesignConvert.getH(4),
    //                     }}>关注</Text>
    //             </TouchableOpacity>


    //             <TouchableOpacity
    //                 style={{
    //                     flex: 1,
    //                     height: DesignConvert.getH(75),
    //                     marginHorizontal: DesignConvert.getW(7),
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                 }}
    //                 onPress={this._onFansPress}
    //             >

    //                 <Image
    //                     style={{
    //                         width: DesignConvert.getW(32),
    //                         height: DesignConvert.getH(32),
    //                     }}
    //                     source={{ uri: Config.getRNImageUrl('message/ic_fans_bg.png', 1) }}
    //                 />

    //                 <Text
    //                     style={{
    //                         color: "#585858",
    //                         fontSize: DesignConvert.getF(12),
    //                         marginTop: DesignConvert.getH(4),
    //                     }}>粉丝</Text>
    //             </TouchableOpacity>


    //             {/* <TouchableOpacity
    //                 style={{
    //                     flex: 1,
    //                     height: DesignConvert.getH(75),
    //                     marginHorizontal: DesignConvert.getW(7),
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                 }}
    //                 onPress={this._onFriendsPress}
    //             >

    //                 <Image
    //                     style={{
    //                         width: DesignConvert.getW(32),
    //                         height: DesignConvert.getH(32),
    //                     }}
    //                     source={{ uri: Config.getRNImageUrl('message/ic_friends_bg.png', 0) }}
    //                 />

    //                 <Text
    //                     style={{
    //                         color: "#585858",
    //                         fontSize: DesignConvert.getF(12),
    //                         marginTop: DesignConvert.getH(4),
    //                     }}>好友</Text>
    //             </TouchableOpacity> */}
    //         </View>
    //     )
    // }

    _renderFooterView = () => {
        return (
            <View
                style={{
                    width: DesignConvert.swidth,
                    height: DesignConvert.getH(100),
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <Text
                    style={{
                        color: "#808080",
                        fontSize: DesignConvert.getF(12),
                    }}></Text>
            </View>
        )
    }

    _onHeaderPress = (item) => {
        require("../../../router/level2_router").showUserInfoView((item.userId));
    }

    _renderItem = ({ item }) => {
        return (
            <_MessageItem
                message={item}
                onItemPress={this.props.onItemPress} />
        )
    }

    render() {
        return (
            <FlatList
                style={{
                    flex: 1,
                    backgroundColor: "#FFFFFF",
                }}
                showsVerticalScrollIndicator={false}
                data={this._messageList}
                refreshing={this._isrRefreshing}
                onRefresh={this._onRefresh}
                renderItem={this._renderItem}
                // ListHeaderComponent={this._renderHeaderView}
                ListFooterComponent={this._renderFooterView}
                ListEmptyComponent={this._renderEmptyView}
            />
        )
    }
}
