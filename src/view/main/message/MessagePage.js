/**
 * 主界面 -> 消息
 */
'use strict';

import React, { PureComponent } from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, ScrollView, ActivityIndicator, Slider } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator, ViewPager } from 'rn-viewpager';
import LinearGradient from 'react-native-linear-gradient';
import DesignConvert from '../../../utils/DesignConvert';
import Config from '../../../configs/Config';
import BackTitleView from '../../base/BackTitleView';
import StatusBarView from "../../base/StatusBarView";
import BaseView from '../../base/BaseView';
import { ic_back_black } from "../../../hardcode/skin_imgs/common";
import ToastUtil from "../../base/ToastUtil";
import FriendsList from "./FriendsList";
import IMList from "./IMList";
import { Friend, Fans, Follow, FList } from "../mine/FollowAndFansView";
import { THEME_COLOR } from "../../../styles";

export default class MessagePage extends PureComponent {
    constructor(props) {
        super(props);

        this._selectTab = 0;
    }

    _onPageChange = e => {
        this._selectTab = e.position;
        this.forceUpdate();
    }

    _onMorePress = () => {
        require("../../../router/level2_router").showSearchView();
        // require("../../../router/level2_router").showFollowAndFansView(Friend);
    }

    _onFriendsPress = () => {
        require("../../../router/level2_router").showFollowAndFansView(Friend);
    }

    _onFansPress = () => {
        require("../../../router/level2_router").showFollowAndFansView(Fans);
    }

    _onMyLovesPress = () => {
        require("../../../router/level2_router").showFollowAndFansView(Follow);
    }


    _renderTabLayout() {
        return (
            <LinearGradient
                style={{
                    width: DesignConvert.getW(345),
                    height: DesignConvert.getH(75),
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    alignSelf: "center",
                    marginTop: DesignConvert.getH(15),
                }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#FFFFFF', '#FFFFFF']}
            >

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        this._selectTab = 0;
                        this.forceUpdate();
                        this._viewPager.setPage(0);
                    }}
                >
                    <ImageBackground
                        source={this._selectTab == 0 ? require("../../../hardcode/skin_imgs/message").message_sel() : require("../../../hardcode/skin_imgs/message").message_unsel()}
                        style={{
                            width: DesignConvert.getW(this._selectTab == 0 ? 117 : 66),
                            height: DesignConvert.getH(this._selectTab == 0 ? 67 : 59),
                        }}>

                        {this._selectTab == 0 ? (
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: DesignConvert.getF(20),
                                    position: "absolute",
                                    top: DesignConvert.getH(15),
                                    right: DesignConvert.getW(14)
                                }}
                            >消息</Text>
                        ) : null}

                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        this._selectTab = 1;
                        this.forceUpdate();
                        this._viewPager.setPage(1);
                    }}
                >
                    <ImageBackground
                        source={this._selectTab == 1 ? require("../../../hardcode/skin_imgs/message").friend_sel() : require("../../../hardcode/skin_imgs/message").friend_unsel()}
                        style={{
                            width: DesignConvert.getW(this._selectTab == 1 ? 117 : 66),
                            height: DesignConvert.getH(this._selectTab == 1 ? 67 : 59),
                        }}>

                        {this._selectTab == 1 ? (
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: DesignConvert.getF(20),
                                    position: "absolute",
                                    top: DesignConvert.getH(15),
                                    right: DesignConvert.getW(14)
                                }}
                            >好友</Text>
                        ) : null}

                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        this._selectTab = 2;
                        this.forceUpdate();
                        this._viewPager.setPage(2);
                    }}
                >
                    <ImageBackground
                        source={this._selectTab == 2 ? require("../../../hardcode/skin_imgs/message").fans_sel() : require("../../../hardcode/skin_imgs/message").fans_unsel()}
                        style={{
                            width: DesignConvert.getW(this._selectTab == 2 ? 117 : 66),
                            height: DesignConvert.getH(this._selectTab == 2 ? 67 : 59),
                        }}>

                        {this._selectTab == 2 ? (
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: DesignConvert.getF(20),
                                    position: "absolute",
                                    top: DesignConvert.getH(15),
                                    right: DesignConvert.getW(14)
                                }}
                            >粉丝</Text>
                        ) : null}

                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        this._selectTab = 3;
                        this.forceUpdate();
                        this._viewPager.setPage(3);
                    }}
                >
                    <ImageBackground
                        source={this._selectTab == 3 ? require("../../../hardcode/skin_imgs/message").follow_sel() : require("../../../hardcode/skin_imgs/message").follow_unsel()}
                        style={{
                            width: DesignConvert.getW(this._selectTab == 3 ? 117 : 66),
                            height: DesignConvert.getH(this._selectTab == 3 ? 67 : 59),
                        }}>

                        {this._selectTab == 3 ? (
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: DesignConvert.getF(20),
                                    position: "absolute",
                                    top: DesignConvert.getH(15),
                                    right: DesignConvert.getW(14)
                                }}
                            >关注</Text>
                        ) : null}

                    </ImageBackground>
                </TouchableOpacity>



                {/* <TouchableOpacity
                    onPress={this._onMorePress}
                    style={{
                        position: "absolute",
                        right: DesignConvert.getW(20),
                        bottom: DesignConvert.getH(12),
                    }}>
                    <Image
                        source={require("../../../hardcode/skin_imgs/main").ic_more()}
                        style={{
                            width: DesignConvert.getW(20),
                            height: DesignConvert.getH(20),
                        }}></Image>
                </TouchableOpacity> */}
            </LinearGradient>
        )
    }

    _renderTopItem() {

        return (
            <View
                style={{
                    flexDirection: 'row',
                    width: DesignConvert.getW(345),
                    height: DesignConvert.getH(67),
                    marginVertical: DesignConvert.getH(15),
                    alignSelf: "center",
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: "white",
                }}
            >

                <TouchableOpacity
                    style={{
                        flex: 1,
                        height: DesignConvert.getH(75),
                        marginHorizontal: DesignConvert.getW(7),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={this._onMyLovesPress}
                >

                    <Image
                        style={{
                            width: DesignConvert.getW(32),
                            height: DesignConvert.getH(32),
                        }}
                        source={{ uri: Config.getRNImageUrl('message/ic_attention_bg.png', 1) }}
                    />

                    <Text
                        style={{
                            color: "#585858",
                            fontSize: DesignConvert.getF(12),
                            marginTop: DesignConvert.getH(4),
                        }}>关注</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={{
                        flex: 1,
                        height: DesignConvert.getH(75),
                        marginHorizontal: DesignConvert.getW(7),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={this._onFansPress}
                >

                    <Image
                        style={{
                            width: DesignConvert.getW(32),
                            height: DesignConvert.getH(32),
                        }}
                        source={{ uri: Config.getRNImageUrl('message/ic_fans_bg.png', 1) }}
                    />

                    <Text
                        style={{
                            color: "#585858",
                            fontSize: DesignConvert.getF(12),
                            marginTop: DesignConvert.getH(4),
                        }}>粉丝</Text>
                </TouchableOpacity>


                {/* <TouchableOpacity
                    style={{
                        flex: 1,
                        height: DesignConvert.getH(75),
                        marginHorizontal: DesignConvert.getW(7),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={this._onFriendsPress}
                >

                    <Image
                        style={{
                            width: DesignConvert.getW(32),
                            height: DesignConvert.getH(32),
                        }}
                        source={{ uri: Config.getRNImageUrl('message/ic_friends_bg.png', 0) }}
                    />

                    <Text
                        style={{
                            color: "#585858",
                            fontSize: DesignConvert.getF(12),
                            marginTop: DesignConvert.getH(4),
                        }}>好友</Text>
                </TouchableOpacity> */}
            </View>
        )
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#FCFCFC",
            }}>


                <Text
                    style={{
                        marginTop: DesignConvert.statusBarHeight+DesignConvert.getH(10),
                        alignSelf: 'center',

                        color: '#121212',
                        fontSize: DesignConvert.getF(17)
                    }}
                >消息</Text>
                {/* <TouchableOpacity
                    onPress={this._onMorePress}
                    style={{
                        marginTop: DesignConvert.getH(5) + DesignConvert.statusBarHeight,
                        width: DesignConvert.getW(345),
                        height: DesignConvert.getH(34),
                        paddingLeft: DesignConvert.getW(15),
                        backgroundColor: "#F6F2FF",
                        borderRadius: DesignConvert.getW(10),
                        flexDirection: "row",
                        alignItems: "center",
                        alignSelf: "center",
                    }}>
                    <Image
                        source={require("../../../hardcode/skin_imgs/search").ic_search()}
                        style={{
                            width: DesignConvert.getW(16),
                            height: DesignConvert.getH(16),
                            marginRight: DesignConvert.getW(10),
                            tintColor: THEME_COLOR,
                        }}></Image>

                    <Text
                        style={{
                            color: THEME_COLOR,
                            fontSize: DesignConvert.getF(11),
                        }}>搜索房间、用户ID或者昵称</Text>

                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        start={{ x: 1, y: 0 }}
                        colors={["#8A50FC", "#F293FF"]}
                        style={{
                            width: DesignConvert.getW(50),
                            height: DesignConvert.getH(34),
                            borderTopRightRadius: DesignConvert.getW(10),
                            borderBottomRightRadius: DesignConvert.getW(10),
                            position: "absolute",
                            right: 0,
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Text
                            style={{
                                color: "white",
                                fontSize: DesignConvert.getF(11),
                            }}>搜索</Text>
                    </LinearGradient>
                </TouchableOpacity> */}

                {/* {this._renderTabLayout()} */}

                {/* {this._renderTopItem()} */}

                {/* <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: DesignConvert.getH(8),
                        marginBottom: DesignConvert.addIpxBottomHeight(),
                    }}
                >
                    <IMList />
                </View> */}

                <ViewPager
                    initialPage={this._selectTab}
                    style={{
                        flex: 1,
                        marginBottom: DesignConvert.getH(50),
                        marginTop: DesignConvert.getH(21),
                    }}
                    onPageSelected={this._onPageChange}
                    ref={(ref) => {
                        this._viewPager = ref;
                    }}
                >

                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <IMList />
                    </View>

                    {/* <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <FList
                            viewType={Friend} />
                    </View>

                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <FList
                            viewType={Fans} />
                    </View>

                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <FList
                            viewType={Follow} />
                    </View> */}
                </ViewPager>
            </View>
        );
    }
}