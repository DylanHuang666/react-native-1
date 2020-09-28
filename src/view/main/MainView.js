/**
 * 主界面
 */
'use strict';

import * as React from 'react';
import { TouchableOpacity, Text, Image, View, ImageBackground, Animated, Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DesignConvert from '../../utils/DesignConvert';
import BaseView from '../base/BaseView';
import { _MessageRedDot } from '../main/message/IMList';
import RoomInfoCache from '../../cache/RoomInfoCache';
import ModelEvent from '../../utils/ModelEvent';
import { EVT_UPDATE_ROOM_MAIN_MIC, } from '../../hardcode/HGlobalEvent';
import { TX_IM_NEW_MSG, } from '../../hardcode/HNativeEvent';
import {
    EVT_LOGIC_LEAVE_ROOM,
    EVT_LOGIC_ROOM_REFRESH_ROOM,
    EVT_LOGIC_UPDATE_USER_INFO,
    EVT_LOGIC_SELF_BY_KICK,
    EVT_LOGIC_SET_CHAT_MESSAGE_UNREAD,
    EVT_LOGIC_ENTER_ROOM,
} from '../../hardcode/HLogicEvent';
import ToastUtil from '../base/ToastUtil';
import _PublicScreenMessageLocalItem from '../room/item/chat/_PublicScreenMessageLocalItem';
import Config from '../../configs/Config';
import { THEME_COLOR, THEME_COLORS } from '../../styles';
const Tab = createBottomTabNavigator();


class TabItem extends React.PureComponent {
    constructor(props) {
        super(props);

        this._unReadNum = 0;
        //立马刷不行，开个延时
        this._timer = null;
    }

    componentDidMount() {
        if (this.props.showUnReadNum) {
            ModelEvent.addEvent(null, EVT_LOGIC_SET_CHAT_MESSAGE_UNREAD, this._getUnReadNum);//刷新已读
            ModelEvent.addEvent(null, TX_IM_NEW_MSG, this._getUnReadNum);//新消息
            this._timer = setTimeout(this._getUnReadNum, 1000);
        }
    }

    componentWillUnmount() {
        if (this.props.showUnReadNum) {
            ModelEvent.removeEvent(null, EVT_LOGIC_SET_CHAT_MESSAGE_UNREAD, this._getUnReadNum);//刷新已读
            ModelEvent.removeEvent(null, TX_IM_NEW_MSG, this._getUnReadNum);//新消息
            this._timer && clearTimeout(this._timer);
        }

    }

    _getUnReadNum = () => {
        require("../../model/chat/ChatModel").getUnReadNum()
            .then(data => {
                this._unReadNum = data;
                // console.log("MainView", "未读数", this._unReadNum)
                this.forceUpdate();
            });
    }

    _onPress = () => {
        require('../../model/main/MainViewModel').doNavigationTo(this.props.bar_index);
    }
    _onLongPress = () => {
        require('../../model/main/MainViewModel').doLongPress(this.props.bar_index);
    }

    render() {
        const route = this.props.bar_state.routes[this.props.bar_index];
        const options = this.props.bar_descriptors[route.key];
        const isFocused = this.props.bar_state.index === this.props.bar_index;
        const label = this.props.tabBarLabel;
        const img = isFocused ? this.props.imageSel_url : this.props.image_url;

        return (
            <TouchableOpacity
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={this._onPress}
                onLongPress={this._onLongPress}
                style={[
                    this.props.pos_style,
                    {
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }
                ]}
            >
                <Image
                    source={img}
                    style={{
                        width: DesignConvert.getW(22),
                        height: DesignConvert.getH(22),
                        resizeMode: 'contain'
                    }}
                />
                <Text
                    style={{
                        marginTop: DesignConvert.getH(5),
                        color: isFocused ? '#000000' : '#949494',
                        fontSize: DesignConvert.getF(9),
                    }}
                >{label}</Text>

                {this.props.showUnReadNum ? (
                    <_MessageRedDot
                        num={this._unReadNum}
                        style={{
                            position: "absolute",
                            left: DesignConvert.getW(45),
                            top: DesignConvert.getH(1),
                        }} />
                ) : null}

            </TouchableOpacity>
        );

    }
}

class PlayItem extends React.PureComponent {

    _onPress = () => {
        require('../../model/room/RoomModel').beforeOpenLive();
        // require('../../router/level3_router').showSetPassword();
    }

    componentDidMount() {
        ModelEvent.addEvent(null, EVT_LOGIC_ENTER_ROOM, this._onRefresh)
        ModelEvent.addEvent(null, EVT_LOGIC_LEAVE_ROOM, this._onRefresh)
    }

    componentWillUnmount() {
        ModelEvent.removeEvent(null, EVT_LOGIC_ENTER_ROOM, this._onRefresh)
        ModelEvent.removeEvent(null, EVT_LOGIC_LEAVE_ROOM, this._onRefresh)
    }

    _onRefresh = () => {
        this.forceUpdate()
    }

    _onKick = () => {
        require('../../model/room/RoomModel').default.leave();
    }

    render() {
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: DesignConvert.getH(106) + DesignConvert.addIpxBottomHeight(),
                    right: DesignConvert.getW(0),
                }}>
                <TouchableOpacity
                    style={{
                        display: RoomInfoCache.isInRoom ? "flex" : "none",
                    }}
                    onPress={this._onPress}
                >

                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={THEME_COLORS}
                        // source={require('../../hardcode/skin_imgs/main').float_btn_bg()}
                        style={{
                            width: DesignConvert.getW(125),
                            height: DesignConvert.getH(44),
                            borderRadius: DesignConvert.getW(29),
                            borderWidth: DesignConvert.getW(1),
                            paddingLeft: DesignConvert.getW(4),
                            paddingRight: DesignConvert.getW(9),
                            flexDirection: "row",
                            borderColor: "white",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>

                        <_playRoomImage />

                        {/* <Image
                            style={{
                                width: DesignConvert.getW(13),
                                height: DesignConvert.getH(16),
                                marginLeft: DesignConvert.getW(8),
                            }}
                            source={require('../../hardcode/skin_imgs/main').live_status_white()}
                        /> */}

                        <Text
                            numberOfLines={1}
                            style={{
                                color: "white",
                                fontSize: DesignConvert.getF(10),
                                flex: 1,
                                marginLeft: DesignConvert.getW(2),
                            }}>{RoomInfoCache.roomData ? decodeURI(RoomInfoCache.roomData.roomName) : ""}</Text>

                        <TouchableOpacity
                            onPress={this._onKick}>
                            <Image
                                style={{
                                    width: DesignConvert.getW(18),
                                    height: DesignConvert.getH(19),
                                }}
                                source={require('../../hardcode/skin_imgs/main').room_closed()}
                            />
                        </TouchableOpacity>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }
}

export class _playRoomImage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0)
    }

    componentDidMount() {
        ModelEvent.addEvent(null, EVT_UPDATE_ROOM_MAIN_MIC, this._onRefresh)
        ModelEvent.addEvent(null, EVT_LOGIC_LEAVE_ROOM, this._onRefresh)
        ModelEvent.addEvent(null, EVT_LOGIC_SELF_BY_KICK, this._onKick)
        this._spin()
    }

    componentWillUnmount() {
        ModelEvent.removeEvent(null, EVT_UPDATE_ROOM_MAIN_MIC, this._onRefresh)
        ModelEvent.removeEvent(null, EVT_LOGIC_LEAVE_ROOM, this._onRefresh)
        ModelEvent.removeEvent(null, EVT_LOGIC_SELF_BY_KICK, this._onKick)
    }

    _onKick = () => {
        //弹出弹框提示用户被踢出房间
        ToastUtil.showCenter('抱歉，您已被踢出房间')
        require('../../model/room/RoomModel').default.leave();
    }

    _onRefresh = () => {
        this.forceUpdate()
    }

    _spin = () => {
        this.spinValue.setValue(0)
        Animated.timing(this.spinValue, {
            toValue: 1, // 最终值 为1，这里表示最大旋转 360度
            duration: 4000,
            easing: Easing.linear,
            isInteraction: false,
            useNativeDriver: true
        }).start(() => this._spin())
    }

    render() {
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],//输入值
            outputRange: ['0deg', '360deg'] //输出值
        });

        if (!RoomInfoCache.roomData) {
            return null
        }
        return (
            <Animated.Image

                style={{
                    borderRadius: DesignConvert.getW(37),
                    width: this.props.width ? this.props.width : DesignConvert.getW(37),
                    height: this.props.height ? this.props.height : DesignConvert.getH(37),
                    transform: [{ rotate: spin }]
                }}
                source={{ uri: RoomInfoCache.roomLogoUrl }}
            />
        )
    }
}



function MyTabBar({ state, descriptors, navigation }) {
    return (
        <View
            style={{
                position: 'absolute',
                bottom: 0,
                width: DesignConvert.swidth,
                height: DesignConvert.getH(65) + DesignConvert.addIpxBottomHeight(),
                paddingBottom: DesignConvert.addIpxBottomHeight(),
                backgroundColor: "white",
                flexDirection: "row",
                alignItems: "center",
            }}
        // source={require('../../hardcode/skin_imgs/main').bg()}
        >
            <TabItem
                bar_index={require('../../model/main/MainViewModel').INDEX_HOME}
                bar_state={state}
                bar_descriptors={descriptors}
                bar_navigation={navigation}
                tabBarLabel='聊天室'
                image_url={require('../../hardcode/skin_imgs/main').home()}
                imageSel_url={require('../../hardcode/skin_imgs/main').home_sel()}
                pos_style={{
                    // position: 'absolute',
                    // left: DesignConvert.getW(9),
                    // bottom: DesignConvert.getH(12),
                    // width: DesignConvert.getW(87),
                    flex: 1,
                    height: DesignConvert.getH(42),
                }}
            />
            {/* <TabItem
                bar_index={require('../../model/main/MainViewModel').INDEX_RANK}
                bar_state={state}
                bar_descriptors={descriptors}
                bar_navigation={navigation}
                image_url={require('../../hardcode/skin_imgs/main').rank()}
                imageSel_url={require('../../hardcode/skin_imgs/main').rank_sel()}
                tabBarLabel='排行榜'
                pos_style={{
                    position: 'absolute',
                    left: DesignConvert.getW(95),
                    bottom: DesignConvert.getH(12),
                    width: DesignConvert.getW(87),
                    height: DesignConvert.getH(42),
                }}
            /> */}
            <TabItem
                bar_index={require('../../model/main/MainViewModel').INDEX_MESSAGE}
                bar_state={state}
                bar_descriptors={descriptors}
                bar_navigation={navigation}
                image_url={require('../../hardcode/skin_imgs/main').message()}
                imageSel_url={require('../../hardcode/skin_imgs/main').message_sel()}
                tabBarLabel='消息'
                pos_style={{
                    // position: 'absolute',
                    // right: DesignConvert.getW(95),
                    // bottom: DesignConvert.getH(12),
                    // width: DesignConvert.getW(87),
                    flex: 1,
                    height: DesignConvert.getH(42),
                }}
                showUnReadNum
            />
            <TabItem
                bar_index={require('../../model/main/MainViewModel').INDEX_MINE}
                bar_state={state}
                bar_descriptors={descriptors}
                bar_navigation={navigation}
                image_url={require('../../hardcode/skin_imgs/main').mine()}
                imageSel_url={require('../../hardcode/skin_imgs/main').mine_sel()}
                tabBarLabel='我的'
                pos_style={{
                    // position: 'absolute',
                    // right: DesignConvert.getW(9),
                    // bottom: DesignConvert.getH(12),
                    // width: DesignConvert.getW(87),
                    flex: 1,
                    height: DesignConvert.getH(42),
                }}
            />

        </View>

    );
}

function _homePage() {
    const HomePage = require('./home/HomePage').default;
    return (
        <HomePage />
    )
}

function _rankPage() {
    const RankPage = require('./rank/RankPage').default;
    return (
        <RankPage />
    )
}

function _messagePage() {
    const MessagePage = require('./message/MessagePage').default;
    return (
        <MessagePage />
    )
}

function _minePage() {
    const MinePage = require('./mine/MinePage').default;
    return (
        <MinePage />
    )
}

function _tabBar(props) {
    require('../../model/main/MainViewModel').setTabBarData(props.navigation, props.state);
    return (
        <MyTabBar {...props} />
    )
}


export default class MainView extends BaseView {
    constructor(props) {
        super(props);

        this._unReadNum = 0;
    }

    componentDidMount() {
        super.componentDidMount();

        require('../../model/PermissionModel').checkAppBasePermission();
    }

    onResume() {
        ModelEvent.dispatchEntity(null, EVT_LOGIC_ROOM_REFRESH_ROOM, null);//刷新首页房间
        ModelEvent.dispatchEntity(null, EVT_LOGIC_UPDATE_USER_INFO, null);//刷新用户信息
        ModelEvent.dispatchEntity(null, EVT_LOGIC_SET_CHAT_MESSAGE_UNREAD, null);//刷新会话列表
    }

    // onPause() {
    //     console.log("主页面暂停")
    // }

    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName="Home"
                    backBehavior='none'
                    tabBar={_tabBar}
                    pages_styles={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.sheight,
                    }}
                >
                    <Tab.Screen
                        name="Home"
                        component={_homePage}
                    />
                    <Tab.Screen
                        name="Rank"
                        component={_rankPage}
                    />
                    <Tab.Screen
                        name="Message"
                        component={_messagePage}
                    />
                    <Tab.Screen
                        name="Mine"
                        component={_minePage}
                    />
                </Tab.Navigator>

                <PlayItem />
                {/* <_PublicScreenMessageLocalItem/> */}
            </NavigationContainer>
        )
    }

}