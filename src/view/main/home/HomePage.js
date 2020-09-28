/**
 * 主界面 -> 首页
 */
'use strict';

import React, { PureComponent, Component } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, FlatList, ScrollView, RefreshControl, StatusBar } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator, ViewPager } from 'rn-viewpager';
import LinearGradient from 'react-native-linear-gradient';
import RoomTabs from './RoomTabs';
import BannerSwiper from './BannerSwiper';
import RoomCardView from './RoomCardView';
import HorseLamp from './HorseLamp';
import DesignConvert from '../../../utils/DesignConvert';
import Config from '../../../configs/Config';
import HomePageModel from '../../../model/main/HomePageModel';
import ModelEvent from "../../../utils/ModelEvent";
import { EVT_LOGIC_ROOM_REFRESH_ROOM, EVT_LOGIC_VOICE_FRIEND_BANNER, } from "../../../hardcode/HLogicEvent";
import SexAgeWidget from '../../userinfo/SexAgeWidget';
import _PublicScreenMessageBingoItem from '../../room/item/chat/_PublicScreenMessageBingoItem';
import { THEME_COLORS } from '../../../styles';
import { ic_headlines, ic_rank } from '../../../hardcode/skin_imgs/main';
import UserInfoCache from '../../../cache/UserInfoCache';
import ScrollTextView from '../../base/ScrollTextView';
import { TouchImg } from './HomePageItem';

class _renderRankItem extends PureComponent {

    constructor(props) {
        super(props)

        this._firstCharmName = ''


    }

    componentDidMount() {
        ModelEvent.addEvent(null, EVT_LOGIC_ROOM_REFRESH_ROOM, this._initData);
        this._initData();
    }

    componentWillUnmount() {
        ModelEvent.removeEvent(null, EVT_LOGIC_ROOM_REFRESH_ROOM, this._initData);
    }

    _initData = () => {
        require('../../../model/main/RankPageModel').default.getRankList(UserInfoCache.userId, 3, 0, 1)
            .then(data => {
                if (data) {
                    this._firstCharmName = decodeURIComponent(data[0].nickName)
                    this.forceUpdate()
                }
            })
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onRankPress}>
                <Image
                    source={ic_rank()}
                    style={{
                        width: DesignConvert.getW(71.5),
                        height: DesignConvert.getH(81.5),
                    }} />
                {/* 
                <ScrollTextView
                    txt={this._firstCharmName}
                    containStyle={{
                        width: DesignConvert.getW(80),
                        position: 'absolute',
                        left: DesignConvert.getW(15),
                        bottom: DesignConvert.getH(18),
                    }}
                    textStyle={{
                        color: '#FFFFFFB3',
                        fontSize: DesignConvert.getF(10),
                    }}

                /> */}
                {/* <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={{
                        position: 'absolute',
                        left: DesignConvert.getW(15),
                        bottom: DesignConvert.getH(18),
                        color: '#FFFFFFB3',
                        fontSize: DesignConvert.getF(10),
                        maxWidth: DesignConvert.getW(80),
                    }}
                >{this._firstCharmName}</Text> */}
            </TouchableOpacity>
        )
    }
}



export default class HomePage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            defaultSelected: 0,
            bannerList: [],
            roomTypeList: [],
            horseLamp: []
        };
        this._isRefreshing = false;
        this._refreshEnable = true

        this._selectTab = 0;
    }

    async componentDidMount() {
        ModelEvent.addEvent(null, EVT_LOGIC_VOICE_FRIEND_BANNER, this._onRefresh);
        await this._onRefresh();
    }

    componentWillUnmount() {
        ModelEvent.removeEvent(null, EVT_LOGIC_VOICE_FRIEND_BANNER, this._onRefresh);
    }

    _itemClick = (s, i) => {
        this.setState({ defaultSelected: i })
        this.viewPager.setPage(i);
    }

    _getViewPager = (ref) => {
        this.viewPager = ref;
    }

    _onPagerSelected = (e) => {
        this.setState({ defaultSelected: e.position })
        // console.log(this.state.defaultSelected);
    }

    _onRefresh = async () => {

        const bannerList = await HomePageModel.getBannerList();

        const horseLamp = await HomePageModel.getHorseLamp();

        const roomTypeList = await HomePageModel.getRoomTypeList();

        this.giftList = await HomePageModel.getGiftListTableData();

        this.setState({
            bannerList,
            horseLamp,
            roomTypeList,
        })
        this._isRefreshing = false;
        this.forceUpdate();
        ModelEvent.dispatchEntity(null, EVT_LOGIC_ROOM_REFRESH_ROOM, null);
    }

    _getRefreshEnable = (y) => {
        let bool = y == 0;
        // console.log("_getRefreshEnable", bool)
        if (this._refreshEnable != bool) {
            this._refreshEnable = bool;
            this.forceUpdate();
        }
    }

    _onSearch = () => {
        require("../../../router/level2_router").showSearchView();
    }

    _onRankPress = () => {
        require("../../../router/level2_router").showRankPageView();
    }

    _onHeadLinePress = () => {
        require("../../../router/level2_router").showHeadlinesView();
    }

    _onBeforeOpenLivePress = () => {
        require("../../../model/room/RoomModel").beforeOpenLive();
    }

    _getHeightCallBack = (height, index, key) => {
        // console.log('=======2', '_getHeightCallBack2', key)
        let roomTypeList1 = this.state.roomTypeList;

        roomTypeList1[index].height = height;

        this.setState(
            {
                roomTypeList: roomTypeList1,
            }
        )
        this.forceUpdate();
    }

    _renderHeaderBar = () => {
        return (
            <View
                style={{
                    width: DesignConvert.swidth,
                    height: DesignConvert.getH(44),
                    marginTop: DesignConvert.statusBarHeight,
                    flexDirection: "row",
                    alignItems: "center",

                    // backgroundColor: 'red',

                    paddingLeft: DesignConvert.getW(15)
                }}>
                <HorseLamp
                    horseLampList={this.state.horseLamp}
                />

                <TouchImg
                    onPress={this._onBeforeOpenLivePress}
                    imgStyle={{
                        width: DesignConvert.getW(24),
                        height: DesignConvert.getH(24)
                    }}
                    source={require('../../../hardcode/skin_imgs/main').ic_open()}
                    onPress={this._onBeforeOpenLivePress}
                    containerStyle={{
                        marginLeft: DesignConvert.getW(10)
                    }}
                />
                <TouchableOpacity
                    onPress={this._onSearch}
                    style={{
                        position: 'absolute',
                        right: 0
                    }}
                >

                    {/* <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={THEME_COLORS}
                        style={{
                            width: DesignConvert.getW(75),
                            height: DesignConvert.getH(28),
                            borderRadius: DesignConvert.getW(6),
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                        }}> */}






                    <Image
                        style={{
                            width: DesignConvert.getW(62.5),
                            height: DesignConvert.getH(24),
                        }}
                        source={require('../../../hardcode/skin_imgs/main').ic_search()}
                    />

                    {/* <Text
                            style={{
                                color: "white",
                                fontSize: DesignConvert.getF(12),
                            }}>搜索</Text> */}
                    {/* </LinearGradient> */}

                </TouchableOpacity>

            </View>
        )

        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['white', 'white']}
                style={{
                    width: DesignConvert.swidth,
                    height: DesignConvert.getH(88),
                    position: 'relative',
                    flexDirection: "row",
                    alignItems: "center",
                }}>


                <Text
                    style={{
                        color: "#1D1D1D",
                        fontSize: DesignConvert.getF(16),
                        fontWeight: "bold",
                        position: "absolute",
                        bottom: DesignConvert.getH(11),
                        left: DesignConvert.getW(15),
                    }}>首页</Text>


                <TouchableOpacity
                    onPress={this._onSearch}
                    style={{
                        width: DesignConvert.getW(256),
                        height: DesignConvert.getH(27),
                        backgroundColor: "#F1F1F1",
                        borderRadius: DesignConvert.getW(15),
                        flexDirection: "row",
                        alignItems: "center",
                        position: "absolute",
                        bottom: DesignConvert.getH(9),
                        left: DesignConvert.getW(62),
                    }}>

                    <Image
                        style={{
                            width: DesignConvert.getW(18),
                            height: DesignConvert.getH(18),
                            marginRight: DesignConvert.getW(8),
                            marginLeft: DesignConvert.getW(5),
                            tintColor: "#B3B3B3",
                        }}
                        source={require('../../../hardcode/skin_imgs/main.js').ic_search()}
                    />

                    <Text
                        style={{
                            color: "#D2D2D2",
                            fontSize: DesignConvert.getF(12),
                        }}>搜用户 搜房间</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this._onBeforeOpenLivePress}
                    style={{
                        height: DesignConvert.getH(44),
                        justifyContent: "center",
                        alignItems: "center",
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                    }}>
                    <Image
                        style={{
                            width: DesignConvert.getW(21),
                            height: DesignConvert.getH(21),
                            marginRight: DesignConvert.getW(15),
                        }}
                        source={require('../../../hardcode/skin_imgs/main.js').play()}
                    />
                </TouchableOpacity>
            </LinearGradient>
        );
    };

    render() {
        let viewPagerHeight = - this.state.bannerList.length == 0 ? DesignConvert.sheight - DesignConvert.getH(88) : DesignConvert.sheight - DesignConvert.getH(88) - DesignConvert.getH(91);
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "#F6F6F6",
                }}>

                <Image
                    source={require('../../../hardcode/skin_imgs/main').home_bg_top()}
                    style={{
                        position: 'absolute',

                        width: DesignConvert.getW(375),
                        height: DesignConvert.getH(190)
                    }}
                />
                {this._renderHeaderBar()}

                <View
                    style={{
                        marginTop: DesignConvert.getH(79),

                        flexDirection: 'row',
                        alignItems: 'flex-end',

                        paddingHorizontal: DesignConvert.getW(15),
                        justifyContent: 'space-between',

                    }}
                >
                    <BannerSwiper bannerList={this.state.bannerList} />
                    <_renderRankItem
                        onRankPress={this._onRankPress}
                    />

                </View>

                <RoomTabs
                    defaultSelected={this.state.defaultSelected}
                    items={this.state.roomTypeList}
                    itemClick={this._itemClick}
                    style={{
                    }} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this._isRefreshing}
                            onRefresh={this._onRefresh}
                            enabled={this._refreshEnable}
                        />
                    }
                    contentContainerStyle={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                    scrollEnabled
                    style={{
                        flex: 1,
                        // marginLeft: DesignConvert.g
                    }}>

                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={["#F6F6F6", "#F6F6F6"]}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            width: DesignConvert.swidth,
                            borderTopLeftRadius: DesignConvert.getW(10),
                            borderTopRightRadius: DesignConvert.getW(10),
                            position: 'relative',
                        }}>


                        {/* <View
                            style={{
                                width: DesignConvert.getW(345),
                                height: DesignConvert.getW(120),
                                alignSelf: "center",
                                marginTop: DesignConvert.getH(12),
                                flexDirection: "row",
                                alignItems: "center",
                            }}>

                            <TouchableOpacity
                                onPress={this._onHeadLinePress}>
                                <Image
                                    source={ic_headlines()}
                                    style={{
                                        width: DesignConvert.getW(173),
                                        height: DesignConvert.getW(120),
                                    }}></Image>
                            </TouchableOpacity>

                            <View
                                style={{
                                    flex: 1,
                                }}></View>

                            <View>



                                <TouchableOpacity
                                    onPress={this._onBeforeOpenLivePress}>
                                    <Image
                                        source={require('../../../hardcode/skin_imgs/main.js').play()}
                                        style={{
                                            width: DesignConvert.getW(160),
                                            height: DesignConvert.getH(54),
                                        }}></Image>

                                    <Text
                                        style={{
                                            position: 'absolute',
                                            left: DesignConvert.getW(15),
                                            bottom: DesignConvert.getH(10),
                                            color: '#FFFFFFB3',
                                            fontSize: DesignConvert.getF(10),
                                        }}
                                    >{`缘分从此刻开始`}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View
                            style={{
                                width: DesignConvert.getW(335),
                                height: DesignConvert.getH(21),
                                marginTop: DesignConvert.getH(15),
                                // borderStyle: 'solid',
                                // borderColor: '#F2F2F2',
                                // borderWidth: DesignConvert.getW(1),
                                // borderRadius: DesignConvert.getW(5),
                            }}>
                            <HorseLamp
                                horseLampList={this.state.horseLamp}
                                giftList={this.giftList} />
                        </View>

                        {console.log("计算高度", viewPagerHeight)} */}
                        <ViewPager
                            ref={this._getViewPager}
                            onPageSelected={this._onPagerSelected}
                            style={{
                                minHeight: (this.state.roomTypeList.length > this.state.defaultSelected &&
                                    this.state.roomTypeList[this.state.defaultSelected] &&
                                    this.state.roomTypeList[this.state.defaultSelected].height > viewPagerHeight) ?

                                    this.state.roomTypeList[this.state.defaultSelected].height :
                                    viewPagerHeight,

                                width: DesignConvert.swidth,
                                marginTop: DesignConvert.getH(5),
                                marginBottom: DesignConvert.addIpxBottomHeight(),
                            }}>
                            {this.state.roomTypeList.map((item, i) => (
                                <View
                                    key={i}>
                                    <RoomCardView
                                        index={i}
                                        onScroll={this._getRefreshEnable}
                                        roomType={item.id}
                                        roomTypeList={this.state.roomTypeList}
                                        onRefreshData={this._onRefresh}
                                        getHeightCallBack={this._getHeightCallBack}
                                    />
                                </View>
                            ))}
                        </ViewPager>
                    </LinearGradient>
                </ScrollView>

            </View>
        );
    }
}

class OnlineListWidget extends PureComponent {

    constructor(props) {
        super(props);

        this._onlineList = [{ userId: '1' }, { userId: '2' }, { userId: '3' }, { userId: '4' }, { userId: '5' }];
    }

    _toFocus = (userId) => {

    }

    renderFocusBtn = (userId, isFocus) => {
        if (isFocus) {
            return (
                <View
                    style={{
                        position: 'absolute',
                        right: 0,
                    }}
                >
                    <Text
                        style={{
                            fontSize: DesignConvert.getF(12),
                            color: '#C4C4C4',
                        }}
                    >
                        {'已关注'}
                    </Text>
                </View>
            )
        } else {
            return (
                <TouchableOpacity
                    onPress={this._toFocus.bind(this, userId)}
                    style={{
                        position: 'absolute',
                        right: 0,
                        flexDirection: 'row',
                    }}
                >

                    <Image
                        source={require('../../../hardcode/skin_imgs/xsj').xsj_mine_fans_add()}
                        style={{
                            width: DesignConvert.getW(12),
                            height: DesignConvert.getH(12),
                            marginRight: DesignConvert.getW(10),
                            tintColor: '#FF5353',
                        }}
                    />

                    <Text
                        style={{
                            fontSize: DesignConvert.getF(12),
                            color: '#FF5353',
                        }}
                    >
                        {'加关注'}
                    </Text>
                </TouchableOpacity>
            )
        }
    }

    _renderOnlineItem = ({ item }) => {
        // 用户id
        const userId = '10086';
        // 用户头像
        const userLogo = require('../../../hardcode/skin_imgs/xsj').xsj_idcard_back();
        // 用户名称
        const userName = '我房间发啊是艾芙洛艾芙洛';
        // 用户年龄
        const userAge = 18;
        // 用户性别
        const userSex = 1;
        // 用户口号
        const userSlogn = '我如果爱你，绝不像攀援的凌霄花， 借你的高枝炫耀自己。';
        // 房间名称
        const roomName = '我啊发搞好'
        // 是否关注过
        const isFocus = false;

        return (
            <ImageBackground
                style={{
                    width: DesignConvert.getW(356),
                    height: DesignConvert.getH(160),
                    marginBottom: DesignConvert.getH(5),
                    alignItems: 'center',
                }}
                source={require('../../../hardcode/skin_imgs/xsj').xsj_online_item_bg()}
            >

                <View
                    style={{
                        width: DesignConvert.getW(312),
                        height: DesignConvert.getH(90),
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: DesignConvert.getH(18),
                    }}
                >

                    <Image
                        source={require('../../../hardcode/skin_imgs/xsj').xsj_online_name_bg()}
                        style={{
                            width: DesignConvert.getW(267),
                            height: DesignConvert.getH(85),
                            position: 'absolute',
                            right: 0,
                            top: DesignConvert.getH(2.5),
                        }}
                    />

                    <Image
                        source={userLogo}
                        style={{
                            width: DesignConvert.getW(90),
                            height: DesignConvert.getH(90),
                            borderRadius: DesignConvert.getW(45),
                        }}
                    />

                    <View
                        style={{
                            marginLeft: DesignConvert.getW(18),
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <Text
                                numberOfLines={1}
                                style={{
                                    maxWidth: DesignConvert.getW(140),
                                    color: "#212121",
                                    fontSize: DesignConvert.getF(15),
                                    marginRight: DesignConvert.getW(5),
                                }}
                            >{userName}</Text>

                            <SexAgeWidget
                                sex={userSex}
                                age={userAge}
                            />
                        </View>

                        <Text
                            numberOfLines={2}
                            style={{
                                width: DesignConvert.getW(176),
                                color: "#969696",
                                fontSize: DesignConvert.getF(11),
                                marginTop: DesignConvert.getH(2),
                                lineHeight: DesignConvert.getH(15),
                            }}
                        >{userSlogn}</Text>
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: DesignConvert.getH(14),
                        width: DesignConvert.getW(312),
                    }}
                >
                    <Image
                        source={require('../../../hardcode/skin_imgs/xsj').xsj_main_rooming()}
                        style={{
                            width: DesignConvert.getW(13),
                            height: DesignConvert.getH(13),
                        }}
                    />

                    <Text
                        style={{
                            fontSize: DesignConvert.getF(12),
                            color: '#505050',
                            marginLeft: DesignConvert.getW(10),
                        }}
                    >
                        {'正在'}
                        <Text
                            style={{
                                color: '#893FF9',
                            }}
                        >
                            {roomName}
                        </Text>
                    </Text>

                    {this.renderFocusBtn(userId, isFocus)}

                </View>

            </ImageBackground>
        )
    }

    _keyExtractor = (item, index) => item.userId;

    render() {
        return (
            <FlatList
                style={{
                    flex: 1,
                    marginBottom: DesignConvert.getH(50),
                }}
                data={this._onlineList}
                keyExtractor={this._keyExtractor}
                showsVerticalScrollIndicator={false}
                renderItem={this._renderOnlineItem}
                initialNumToRender={6}
            // refreshing={this._isLoading}
            // onRefresh={this._onRefresh}
            // onEndReached={this._onLoadMore}
            // onEndReachedThreshold={0.2}
            />
        )
    }
}
