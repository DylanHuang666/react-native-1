/**
 * 主界面 -> 榜单
 */
'use strict';

import React, { PureComponent, Component } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView, RefreshControl, ImageBackground, StatusBar } from "react-native";
import { ViewPager, PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';
import LinearGradient from 'react-native-linear-gradient';
import DesignConvert from "../../../utils/DesignConvert";
import Config from "../../../configs/Config";
import ToastUtil from "../../base/ToastUtil";
import StatusBarView from "../../base/StatusBarView";
import HeadlinesPage from "./HeadlinesPage";
import RankCache, { getChangeRankPangeIndex } from "../../../cache/RankCache";
import ModelEvent from "../../../utils/ModelEvent";
import { EVT_LOGIC_UPDATE_RANK_PAGE_INDEX } from "../../../hardcode/HLogicEvent";
import { THEME_COLOR } from "../../../styles";
import BaseView from "../../base/BaseView";
import { ic_back_black } from "../../../hardcode/skin_imgs/common";

function formatLargeNumber(number, fixNum = 1) {
    return number
    // const _s = 'k';
    // return number > 999 ? (number / 1000).toFixed(fixNum) + `${_s}` : number;
}


class TouchSelectTab extends PureComponent {
    render() {

        const fontSelectColor = this.props.type === 0 ? '#121212' : '#121212'

        return (
            <TouchableOpacity
                style={{
                    width: DesignConvert.getW(106),
                    height: DesignConvert.getH(34),
                    alignItems: 'center',
                }}
                // activeOpacity={0.9}
                onPress={this.props.onPress}
            >
                <Text
                    style={{
                        color: this.props.selectTab == this.props.type ? fontSelectColor : "rgba(18, 18, 18, 0.4)",
                        fontSize: this.props.selectTab == this.props.type ? DesignConvert.getF(17) : DesignConvert.getF(17),
                        fontWeight: this.props.selectTab == this.props.type ? "bold" : "bold",
                    }}
                >{this.props.title}</Text>

                {this.props.selectTab == this.props.type ?
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={[THEME_COLOR, THEME_COLOR]}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            width: DesignConvert.getW(17),
                            height: DesignConvert.getH(4),
                            borderRadius: DesignConvert.getW(3),
                        }}
                    />
                    : null
                }
            </TouchableOpacity>
        )
    }
}

class _TabItem extends PureComponent {
    onPress = () => {
        this.props.onPress && this.props.onPress(this.props.index);
    }

    render() {
        let typeColor = this.props.type == rich ? "#FFD721" : "#F295FE";

        return (
            <TouchableOpacity
                onPress={this.onPress}>
                <View
                    style={{
                        width: DesignConvert.getW(55),
                        height: DesignConvert.getH(21),
                        // borderRadius: DesignConvert.getW(30),
                        // backgroundColor: this.props.currentSelectTab == this.props.index ? typeColor : "white",
                        justifyContent: "center",
                        alignItems: "center",
                        ...this.props.style
                    }}>
                    <Text
                        style={{
                            color: this.props.currentSelectTab == this.props.index ? "#5F1271" : "rgba(95, 18, 113, 0.4)",
                            fontSize: DesignConvert.getF(12),
                            fontWeight: 'bold'
                        }}
                    >{this.props.text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

class TouchaTopRankPreson extends PureComponent {

    _renderMyRank = () => {
        const rankScoreColor = this.props.type === rich ? '#121212' : '#121212';
        const txt = this.props.type === rich ? '财富值' : '魅力值';
        const rankScoreIcon = this.props.type === rich ? require("../../../hardcode/skin_imgs/ccc").c_rich_score_icon() : require("../../../hardcode/skin_imgs/ccc").c_charm_score_icon()
        // const rankScoreIcon = this.props.type === rich ? require("../../../hardcode/skin_imgs/ccc").c_rich_score_icon() : require("../../../hardcode/skin_imgs/ccc").c_rich_score_icon()
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: DesignConvert.getH(8)
                }}
            >
                <Image
                    source={rankScoreIcon}
                    style={{
                        width: DesignConvert.getW(13),
                        height: DesignConvert.getH(13),
                        marginRight: DesignConvert.getW(5),
                    }}
                />
                <Text
                    style={{
                        color: rankScoreColor,
                        fontSize: DesignConvert.getF(12),
                    }}
                >{!this.props.rank ? "0" : this.props.rank.rankScore}{txt}</Text>
            </View>
        )
    }

    _renderMyIcon = () => {
        const isRich = this.props.type === rich
        const charmOrRich = isRich ? require("../../../hardcode/skin_imgs/main").mine_rich_lv(this.props.rank.contributeLv) : require("../../../hardcode/skin_imgs/main").mine_rich_lv(this.props.rank.charmLv)
        return (
            <View
                style={{
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: DesignConvert.getH(25),
                }}
            >
                {/* <SexAgeWidget
                    sex={this.props.rank.sex}
                /> */}
                <Text
                    numberOfLines={1}
                    style={{
                        maxWidth: DesignConvert.getW(62),
                        color: "#121212",
                        fontSize: DesignConvert.getF(12),
                        // marginRight: DesignConvert.getW(2),
                    }}
                >{!this.props.rank ? "虚位以待" : decodeURI(this.props.rank.nickName)}</Text>
                <Image
                    source={charmOrRich}
                    style={{
                        marginLeft: DesignConvert.getW(5),
                        width: DesignConvert.getW(29.7),
                        height: DesignConvert.getH(13),
                        resizeMode: 'contain',
                    }}></Image>
            </View >
        )
    }

    render() {

        let rannkImg
        let numImg
        switch (this.props.rank.rank) {
            case 1:
                rannkImg = require('../../../hardcode/skin_imgs/ccc').c_rank_1()
                numImg = require('../../../hardcode/skin_imgs/ccc').c_num_1()
                break;
            case 2:
                rannkImg = require('../../../hardcode/skin_imgs/ccc').c_rank_2()
                numImg = require('../../../hardcode/skin_imgs/ccc').c_num_2()

                break;
            default:
                rannkImg = require('../../../hardcode/skin_imgs/ccc').c_rank_3()
                numImg = require('../../../hardcode/skin_imgs/ccc').c_num_3()

                break;
        }

        const frameWidth = this.props.rank.rank == 1 ? DesignConvert.getW(72) : DesignConvert.getW(69)
        const frameHeight = this.props.rank.rank == 1 ? DesignConvert.getW(83) : DesignConvert.getW(79)

        const isNumOne = this.props.rank.rank == 1
        const rankScoreColor = this.props.type === rich ? '#976400' : '#CA40FF';

        return (
            <TouchableOpacity
                onPress={() => {
                    if (this.props.rank && this.props.onPress) {
                        this.props.onPress(this.props.rank.userId)
                    }
                }}
                style={{
                    alignItems: "center",
                    ...this.props.containerStyle,

                    width: DesignConvert.getW(111),


                }}
            >
                {/* {this.props.isLive ?
                    <Image
                        source={require("../../../hardcode/skin_imgs/ccc").c_is_top_living()}
                        style={{
                            width: DesignConvert.getW(20),
                            height: DesignConvert.getH(20),
                            // borderRadius: DesignConvert.getW(14),
                            // marginRight: DesignConvert.getW(15),
                            position: 'absolute',
                            top: this.props.rank.rank === 1 ? DesignConvert.getH(-13) : DesignConvert.getH(-7),
                            right: this.props.rank.rank === 1 ? 0 : DesignConvert.getW(2),
                        }}
                    />
                    :
                    null
                } */}
                <View
                    style={{

                        alignItems: 'center',
                    }}
                >
                    <Image
                        style={{
                            width: frameWidth,
                            height: frameHeight,
                            resizeMode: 'contain',
                        }}
                        source={rannkImg}
                    />
                    <Image
                        source={{
                            uri: this.props.rank ?
                                require("../../../configs/Config").default.getHeadUrl(this.props.rank.userId, this.props.rank.logoTime, this.props.rank.thirdIconurl)
                                : require("../../../hardcode/skin_imgs/registered").ic_default_header()
                        }}
                        style={{

                            position: 'absolute',
                            top: isNumOne ? DesignConvert.getH(22) : DesignConvert.getH(18),
                            left: DesignConvert.getW(2.5),

                            width: this.props.rank.rank == 1 ? DesignConvert.getW(58.5) : DesignConvert.getW(58.5),
                            height: this.props.rank.rank == 1 ? DesignConvert.getH(58.5) : DesignConvert.getW(58.5),
                            borderRadius: DesignConvert.getW(60),
                            // borderColor: '#F9C85D',
                            // borderWidth: DesignConvert.getW(2),
                        }} />
                    <Image
                        style={{
                            width: DesignConvert.getW(50),
                            height: DesignConvert.getH(17),
                            resizeMode: 'contain',

                            position: 'absolute',
                            bottom: 0,
                            left: DesignConvert.getW(4.5)
                        }}
                        source={numImg}
                    />
                </View>
                {/* 
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: DesignConvert.getH(10),
                    }}>
                    

                    <SexAgeWidget
                        sex={this.props.rank.sex}
                    />
                </View> */}
                {this._renderMyIcon()}

                {this._renderMyRank()}
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0)"]}
                    style={{
                        marginTop: DesignConvert.getH(11),

                        width: DesignConvert.getW(110),
                        height: DesignConvert.getH(27),

                        alignItems: 'center',
                        justifyContent: 'center',

                    }}
                >
                    <Text
                        style={{
                            color: rankScoreColor,
                            fontSize: DesignConvert.getF(14),

                        }}
                    >ID:{this.props.rank.userId}</Text>
                </LinearGradient>
            </TouchableOpacity >
        )
    }
}



const [charm, rich] = [1, 4];
export class RankItemPage extends PureComponent {

    constructor(prop) {
        super(prop);

        this._selectTab = 0;

        this._data = [];
        this._rank = [];

        //    * 魅力榜  日榜：1 周榜：2 月榜：3
        //    * 土豪榜  日榜：4 周榜：5 月榜：6
        //    * 人气榜  日榜：11 周榜：12 月榜：13
        // console.log("榜单", this.props.type);
        // this._userId = "1001071";
        this._userId = this.props.roomId ? this.props.roomId : require("../../../cache/UserInfoCache").default.userId;

        this._start = 1;
        this._end = 30;
        this._isRefreshing = false;
    }

    _onRefresh = () => {
        this._initData();
    }

    _initData() {
        if (this.props.roomId) {
            this._getRoomRankData()
        } else {
            this._getRankData()
        }
    }


    _getRankData() {
        require("../../../model/main/RankPageModel").default.getRankList(this._userId, this.props.type + this._selectTab, this._start, this._end)
            .then(data => {
                this._rank = data;
                if (this._rank.length > 3) {
                    this._data = this._rank.slice(3);
                } else {
                    this._data = [];
                }
                this._isRefreshing = false;
                this.forceUpdate();
            })
            .catch(e => {
                this._rank = [];
                this._data = [];
                this.forceUpdate();
                throw (e);
            });
    }

    _getRoomRankData() {
        require("../../../model/room/RoomManagerModel").default.getRoomRankList(this._userId, this.props.type + this._selectTab + 20, this._start, this._end)
            .then(data => {
                this._rank = data.list;
                if (this._rank.length > 3) {
                    this._data = this._rank.slice(3);
                } else {
                    this._data = [];
                }
                this._isRefreshing = false;
                this.forceUpdate();
            })
            .catch(e => {
                this._rank = [];
                this._data = [];
                this.forceUpdate();
                throw (e);
            });
    }

    componentDidMount() {
        this._initData();
    }

    _onItemPress = (userId) => {
        this.props.popSelf && this.props.popSelf()
        require("../../../router/level2_router").showUserInfoView(userId);
    }

    //点击Tab
    _onTabPress = i => {
        this._selectTab = i;
        this._initData();
        this.forceUpdate();
    }

    _renderRoomTabLayout = () => {
        return (
            <View
                style={{
                    width: DesignConvert.getW(144),
                    height: DesignConvert.getH(24),
                    borderRadius: DesignConvert.getW(30),

                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    borderColor: '#5F1271',
                    borderWidth: DesignConvert.getW(1),


                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",

                    marginTop: DesignConvert.getH(10),
                    paddingHorizontal: DesignConvert.getW(5),
                    alignSelf: 'flex-end',
                    marginRight: DesignConvert.getW(15)
                }}
            >
                <_TabItem
                    style={{
                        width: DesignConvert.getW(46)
                    }}
                    index={0}
                    onPress={this._onTabPress}
                    text={"日榜"}
                    currentSelectTab={this._selectTab}
                    type={this.props.type}
                />
                <View
                    style={{
                        width: DesignConvert.getW(1),
                        height: DesignConvert.getH(10),

                        backgroundColor: 'rgba(142, 122, 255, 0.2)'
                    }}
                />
                <_TabItem
                    style={{
                        width: DesignConvert.getW(46)
                    }}
                    index={1}
                    onPress={this._onTabPress}
                    text={"周榜"}
                    currentSelectTab={this._selectTab}
                    type={this.props.type}
                />
                <View
                    style={{
                        width: DesignConvert.getW(1),
                        height: DesignConvert.getH(10),

                        backgroundColor: 'rgba(142, 122, 255, 0.2)'
                    }}
                />
                <_TabItem
                    style={{
                        width: DesignConvert.getW(46)
                    }}
                    index={2}
                    onPress={this._onTabPress}
                    text={"月榜"}
                    currentSelectTab={this._selectTab}
                    type={this.props.type}
                />

            </View >
        )
    }

    _renderTabLayout() {

        if (this.props.roomId) return this._renderRoomTabLayout()

        return (
            <View
                style={{
                    width: DesignConvert.getW(208),
                    height: DesignConvert.getH(32),
                    borderRadius: DesignConvert.getW(30),

                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    borderColor: '#5F1271',
                    borderWidth: DesignConvert.getW(1),


                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",

                    marginTop: DesignConvert.getH(20),
                    paddingHorizontal: DesignConvert.getW(5),
                }}
            >
                <_TabItem
                    index={0}
                    onPress={this._onTabPress}
                    text={"日榜"}
                    currentSelectTab={this._selectTab}
                    type={this.props.type}
                />
                <View
                    style={{
                        width: DesignConvert.getW(1),
                        height: DesignConvert.getH(10),

                        backgroundColor: 'rgba(142, 122, 255, 0.2)'
                    }}
                />
                <_TabItem
                    index={1}
                    onPress={this._onTabPress}
                    text={"周榜"}
                    currentSelectTab={this._selectTab}
                    type={this.props.type}
                />
                <View
                    style={{
                        width: DesignConvert.getW(1),
                        height: DesignConvert.getH(10),

                        backgroundColor: 'rgba(142, 122, 255, 0.2)'
                    }}
                />
                <_TabItem
                    index={2}
                    onPress={this._onTabPress}
                    text={"月榜"}
                    currentSelectTab={this._selectTab}
                    type={this.props.type}
                />

            </View >
        )
    }

    _renderItem = ({ item, index }) => {
        const img = this.props.type === rich ? require("../../../hardcode/skin_imgs/ccc").c_rich_score_icon() : require("../../../hardcode/skin_imgs/ccc").c_charm_score_icon()

        return (
            <TouchableOpacity
                onPress={() => {
                    this._onItemPress(item.userId);
                }}
                style={{
                    width: DesignConvert.getW(345),
                    height: DesignConvert.getH(64),
                    borderRadius: DesignConvert.getW(10),


                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: DesignConvert.getW(24),

                    marginTop: index == 0 ? DesignConvert.getH(5) : 0,
                    marginBottom: (index == this._data.length - 1) ? DesignConvert.getH(100) : DesignConvert.getH(10),
                }}
            >
                <Text
                    style={{
                        fontSize: DesignConvert.getF(14),
                        color: '#000000',

                        marginRight: DesignConvert.getW(14),
                    }}>{item.rank}</Text>

                <TouchableOpacity
                    onPress={() => {
                        this._onItemPress(item.userId)
                    }}
                >
                    <Image
                        source={{ uri: require("../../../configs/Config").default.getHeadUrl(item.userId, item.logoTime, item.thirdIconurl) }}
                        style={{
                            width: DesignConvert.getW(44),
                            height: DesignConvert.getH(44),
                            borderRadius: DesignConvert.getW(22),

                            borderWidth: DesignConvert.getW(1),
                            borderColor: '#5F1271'
                        }}></Image>
                    {item.isLive ?
                        <View
                            style={{
                                width: DesignConvert.getW(36),
                                height: DesignConvert.getH(15),
                                borderRadius: DesignConvert.getW(2),
                                backgroundColor: '#7A61FF',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'absolute',
                                bottom: 0,
                                left: DesignConvert.getW(4),
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: DesignConvert.getF(9),
                                    color: '#FFFFFF',
                                }}
                            >
                                {'在房间'}
                            </Text>
                        </View>
                        : null
                    }
                </TouchableOpacity>

                <View
                    style={{
                        marginLeft: DesignConvert.getW(10),
                    }}
                >
                    {/* {this.renderSex(item.sex)} */}


                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            numberOfLines={1}
                            style={{
                                maxWidth: DesignConvert.getW(90),
                                fontSize: DesignConvert.getF(14),
                                color: '#121212',
                            }}>{decodeURI(item.nickName)}</Text>
                        <Image
                            style={{
                                marginLeft: DesignConvert.getW(5),
                                width: DesignConvert.getW(34),
                                height: DesignConvert.getH(14),
                                resizeMode: 'contain',
                            }}
                            source={require('../../../hardcode/skin_imgs/main').mine_rich_lv(item.contributeLv)}
                        />
                    </View>


                    <Text
                        numberOfLines={1}
                        style={{
                            maxWidth: DesignConvert.getW(180),
                            fontSize: DesignConvert.getF(12),
                            marginTop: DesignConvert.getH(5),
                            color: '#949494',
                            // fontWeight: "bold",
                        }}>{`ID:${item.userId}`}</Text>
                </View>

                {true ? (
                    <View
                        style={{
                            position: "absolute",
                            right: DesignConvert.getW(15),
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                        <Image
                            source={img}
                            style={{
                                width: DesignConvert.getW(13),
                                height: DesignConvert.getH(13),
                            }}></Image>

                        <Text
                            style={{
                                color: '#121212',
                                fontSize: DesignConvert.getF(12),
                                marginLeft: DesignConvert.getH(5),
                            }}>{item.rankScore}</Text>
                    </View>
                ) : (
                        <View
                            style={{
                                position: "absolute",
                                right: DesignConvert.getW(43),
                                height: DesignConvert.getH(64),
                                width: DesignConvert.getW(59),
                                justifyContent: 'center',
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: this.props.fontcolor,
                                    fontSize: DesignConvert.getF(11),
                                    lineHeight: DesignConvert.getH(15),
                                }}>{this.props.rankName}</Text>

                            <Text
                                style={{
                                    color: this.props.fontcolor,
                                    fontSize: DesignConvert.getF(11),
                                    lineHeight: DesignConvert.getH(15),
                                    marginTop: DesignConvert.getH(2),
                                }}>{item.rankScore}</Text>
                        </View>
                    )}
            </TouchableOpacity>
        )
    }

    renderSex = (sex) => {
        return (
            <View
                style={{
                    width: DesignConvert.getW(13),
                    height: DesignConvert.getH(13),
                    borderRadius: DesignConvert.getW(7),
                    backgroundColor: sex == 2 ? '#FF3EB0' : '#68C3FF',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Image
                    source={sex == 2 ? require('../../../hardcode/skin_imgs/ccc').ttq_nv()
                        : require('../../../hardcode/skin_imgs/ccc').ttq_nan()}
                    style={{
                        width: DesignConvert.getW(16),
                        height: DesignConvert.getH(16),
                        marginLeft: DesignConvert.getW(5),
                    }}
                />
                {/* <Image
                    source={sex == 2 ? require('../../../hardcode/skin_imgs/mine').icon_woman() : require('../../../hardcode/skin_imgs/mine').icon_man()}
                    style={{
                        width: DesignConvert.getW(8),
                        height: DesignConvert.getH(8),
                    }}
                /> */}
            </View>
        )
    }



    render() {
        return (
            <ScrollView
                style={{

                }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={this._isRefreshing}
                        onRefresh={this._onRefresh} />
                }>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                    }}
                >
                    {this._renderTabLayout()}

                    {this._rank.length > 0 ?
                        <View
                            style={{
                                width: DesignConvert.getW(363),
                                height: DesignConvert.getH(213),


                                marginTop: DesignConvert.getH(10),
                                flexDirection: 'row',
                                justifyContent: 'center',


                                // paddingRight: this._rank.length === 2 ? DesignConvert.getW(108) : 0
                                // alignItems: 'center'
                            }}
                        >

                            <Image
                                source={this.props.type === rich ? require('../../../hardcode/skin_imgs/ccc').c_rank_cf_bg() : require('../../../hardcode/skin_imgs/ccc').c_rank_ml_bg()}
                                style={{
                                    width: DesignConvert.getW(345),
                                    height: DesignConvert.getH(123),


                                    position: 'absolute',
                                    bottom: 0,
                                }}
                            />

                            {this._rank[1] && <TouchaTopRankPreson
                                type={this.props.type}
                                rank={this._rank[1]}
                                onPress={this._onItemPress}
                                containerStyle={{
                                    // marginTop: DesignConvert.getH(85)
                                    position: 'absolute',
                                    top: DesignConvert.getH(20),
                                    left: DesignConvert.getW(12)
                                }}
                            />}


                            {this._rank[0] && <TouchaTopRankPreson
                                type={this.props.type}
                                rank={this._rank[0]}
                                onPress={this._onItemPress}
                                containerStyle={{
                                    // marginTop: DesignConvert.getH(45)
                                    top: DesignConvert.getH(5),

                                    position: 'absolute',
                                    // left: DesignConvert.getW(30)

                                }}
                            />
                            }

                            {this._rank[2] && <TouchaTopRankPreson
                                type={this.props.type}
                                rank={this._rank[2]}
                                onPress={this._onItemPress}
                                containerStyle={{
                                    // marginTop: DesignConvert.getH(105)
                                    position: 'absolute',
                                    top: DesignConvert.getH(30),
                                    right: DesignConvert.getW(12)
                                }}
                            />
                            }
                        </View>
                        : null
                    }


                    {this._data.length > 0 ?
                        <View
                            style={{
                                width: DesignConvert.getW(345),

                                borderTopLeftRadius: DesignConvert.getW(10),
                                borderTopRightRadius: DesignConvert.getW(10),

                                borderWidth: DesignConvert.getW(1.5),
                                borderColor: '#5F1271',

                                overflow: 'hidden',
                                backgroundColor: "white",
                            }}
                        >
                            <FlatList
                                scrollEnabled={false}
                                data={this._data}
                                renderItem={this._renderItem}
                            // ListFooterComponent={() => {
                            //     return (
                            //         <View style={{
                            //             height: DesignConvert.getH(45),
                            //             alignItems: 'center',
                            //             justifyContent: 'flex-start',
                            //         }}>

                            //         </View>
                            //     )
                            // }}
                            // ListEmptyComponent={() => {
                            //     return (
                            //         <View></View>
                            //     )
                            // }}
                            />
                        </View>
                        : null
                    }
                </View>
            </ScrollView>
        )
    }
}

export default class RankPage extends BaseView {

    constructor(props) {
        super(props);

        this._tabLayoutOffset = 0;
        this._selectTab = getChangeRankPangeIndex();
    }

    componentDidMount() {
        super.componentDidMount();
        ModelEvent.addEvent(null, EVT_LOGIC_UPDATE_RANK_PAGE_INDEX, this._onUpdateRankPageIndex);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        ModelEvent.removeEvent(null, EVT_LOGIC_UPDATE_RANK_PAGE_INDEX, this._onUpdateRankPageIndex);
    }

    _onUpdateRankPageIndex = i => {
        if (i == this._selectTab) return;

        this._viewPager && this._viewPager.setPage(i);
        this._selectTab = i;
        this.forceUpdate();
    }

    _renderTabLayout() {
        return (
            <View
                style={{
                    width: DesignConvert.swidth,
                    height: DesignConvert.getH(44),

                    marginTop: DesignConvert.statusBarHeight,

                    paddingTop: DesignConvert.getH(10),

                    flexDirection: "row",
                    justifyContent: "center",

                }}
            >

                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: DesignConvert.getH(12),

                        justifyContent: 'center',
                    }}
                    onPress={this.popSelf}
                >
                    <Image
                        style={{
                            width: DesignConvert.getW(20),
                            height: DesignConvert.getH(20),
                            marginLeft: DesignConvert.getW(15),
                        }}
                        source={ic_back_black()}
                    />
                </TouchableOpacity>

                <TouchSelectTab
                    onPress={() => {
                        this._selectTab = 0;
                        this.forceUpdate();
                        this._viewPager.setPage(0);
                    }}
                    type={0}
                    title="贡献榜"
                    selectTab={this._selectTab}
                />

                <TouchSelectTab
                    onPress={() => {
                        this._selectTab = 1;
                        this.forceUpdate();
                        this._viewPager.setPage(1);
                    }}
                    type={1}
                    title="魅力榜"
                    selectTab={this._selectTab}
                />
            </View>
        )
    }

    // _fuhaoLinearGradientColor = ['#6A79FF', '#31CAFF']

    // _meiliLinearGradientColor = ['#B848F8', '#DC81F8']


    render() {
        let fontColor
        switch (this._selectTab) {
            case 0:
                fontColor = '#5B5B5B';
                break;
            default:
                fontColor = '#5B5B5B';
                break;
        }
        let topImgBg
        switch (this._selectTab) {
            case 2:
                topImgBg = require('../../../hardcode/skin_imgs/ccc').c_rank_sq_bg();
                break;
            case 1:
                topImgBg = require('../../../hardcode/skin_imgs/ccc').c_rank_ml_bg();
                break;
            default:
                topImgBg = require('../../../hardcode/skin_imgs/ccc').c_rank_cf_bg();
                break;
        }

        const linear = this._selectTab === 0 ? ["#FFC746", "#EEAA3C"] : ["#F58DFF", "#CF61F7"]
        return (
            <View
                style={{
                    flex: 1,
                }}
            >

                {/* <Image
                    source={topImgBg}
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(331),
                        position: "absolute",
                        top: 0,
                    }}
                /> */}
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={linear}
                    style={{
                        position: 'absolute',
                        width: DesignConvert.swidth,
                        height: DesignConvert.sheight,
                    }}
                />
                {this._renderTabLayout()}

                <ViewPager
                    initialPage={this._selectTab}
                    style={{
                        flex: 1,
                        width: DesignConvert.swidth,
                    }}
                    // onPageScroll={e => {
                    //     this._selectTab = e.position;
                    //     this._tabLayoutOffset = e.offset;
                    //     this.forceUpdate();
                    // }}
                    onPageSelected={e => {
                        this._selectTab = e.position;
                        this.forceUpdate();
                    }}
                    ref={(ref) => {
                        this._viewPager = ref;
                    }}
                >

                    <View
                        style={{
                            flex: 1,
                            // paddingBottom: DesignConvert.getH(56),
                        }}
                    >
                        <RankItemPage
                            type={rich}
                            rankName='财富值'
                            fontcolor={fontColor}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            // paddingBottom: DesignConvert.getH(56),
                        }}
                    >
                        <RankItemPage
                            type={charm}
                            rankName='魅力值'
                            fontcolor={fontColor}
                        />
                    </View>
                    {/* <View style={{
                        width: DesignConvert.getW(345)
                    }}>
                        <HeadlinesPage />
                    </View> */}

                </ViewPager>
            </View>
        );
    }

}