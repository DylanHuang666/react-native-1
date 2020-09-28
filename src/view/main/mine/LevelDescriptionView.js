/**
 * 我的 -> 等级
 */
'use strict';

import React, { PureComponent } from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground, FlatList, TextInput, ScrollView, ActivityIndicator, Slider } from 'react-native';
import { IndicatorViewPager, PagerDotIndicator, ViewPager } from 'rn-viewpager';
import LinearGradient from 'react-native-linear-gradient';
import DesignConvert from '../../../utils/DesignConvert';
import Config from '../../../configs/Config';
import StatusBarView from "../../base/StatusBarView";
import BaseView from '../../base/BaseView';
import { ic_back_black } from "../../../hardcode/skin_imgs/common";
import ToastUtil from "../../base/ToastUtil";
import BackTitleView from "../../base/BackTitleView";
import { rich_top_bg, charm_top_bg, level_middle_bg, level__bottom_rich_bg, level__bottom_char_bg, ic_rich_head, ic_label, bg_icon_rich, bg_icon_charm, bg_rich_des, bg_charm_des } from "../../../hardcode/skin_imgs/leveldescription";
import UserInfoCache from "../../../cache/UserInfoCache";
import { mine_rich_lv, mine_charm_lv } from "../../../hardcode/skin_imgs/main";
import { COIN_NAME } from "../../../hardcode/HGLobal";
import RoomInfoCache from "../../../cache/RoomInfoCache";

/**
 * 
 */
class IconItem extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style={{
                    width: DesignConvert.swidth,
                    height: DesignConvert.getH(44),
                    marginTop: DesignConvert.getH(20),
                    flexDirection: "row",
                    alignItems: "center",
                }}>

                {this.props.ImageUrl ? (
                    <Image
                        source={this.props.ImageUrl}
                        style={{
                            marginLeft: DesignConvert.getW(18),
                            width: DesignConvert.getW(44),
                            height: DesignConvert.getH(44),
                            marginRight: DesignConvert.getW(10),
                        }}></Image>
                ) : null}


                <View
                    style={{
                        flex: 1,
                    }}>
                    <Text
                        numberOfLines={1}
                        style={{
                            color: "#333333",
                            fontSize: DesignConvert.getF(16),
                            fontWeight: "bold",
                            flex: 1,
                        }}>{this.props.Title}</Text>

                    <Text
                        numberOfLines={1}
                        style={{
                            color: "#999999",
                            fontSize: DesignConvert.getF(14),
                            flex: 1,
                            marginTop: DesignConvert.getH(2),
                        }}>{this.props.Content}</Text>
                </View>

                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={["#EF46FF", "#C728F1"]}
                    style={{
                        width: DesignConvert.getW(51),
                        height: DesignConvert.getH(20),
                        borderRadius: DesignConvert.getW(10),
                        marginRight: DesignConvert.getW(18),
                        justifyContent: "center",
                        alignItems: "center",
                        display: !this.props.statusText ? "none" : "flex",
                    }}>
                    <Text
                        style={{
                            color: "white",
                            fontSize: DesignConvert.getF(10),
                        }}>{this.props.statusText}</Text>
                </LinearGradient>
            </View>
        )
    }
}

class UserItem extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._initData();
    }

    _initData = () => {
        require("../../../model/userinfo/UserInfoModel").default.getPersonPage(this.props.userId)
            .then(data => {
                if (!data) {
                    ToastUtil.showBottom("获取信息失败");
                }
                this._userInfo = data;
                this._faceUrl = Config.getHeadUrl(data.userId, data.logoTime, data.thirdIconurl);
                this.forceUpdate();
            });
    }

    render() {
        return (
            <View
                style={{
                    height: DesignConvert.getH(58),
                    alignItems: 'center',
                    position: 'absolute',
                    top: DesignConvert.getH(26),
                    left: 0,
                    right: 0,
                }}>

                <Image
                    source={{ uri: this._faceUrl }}
                    style={{
                        width: DesignConvert.getW(60),
                        height: DesignConvert.getH(60),
                        borderRadius: DesignConvert.getW(30),
                    }}></Image>

                <View
                    style={{
                        marginTop: DesignConvert.getH(7),
                    }}>
                    <Text
                        numberOfLines={1}
                        style={{
                            color: "rgba(29, 29, 29, 1)",
                            fontSize: DesignConvert.getF(15),
                            // width: DesignConvert.getW(180),

                        }}>{this._userInfo ? decodeURI(this._userInfo.nickName).length > 5 ? decodeURI(this._userInfo.nickName).slice(0, 5) + '...' : decodeURI(this._userInfo.nickName) : ""}</Text>

                    {/* 
                     */}
                </View>
            </View>
        )
    }

}

class LevelItem extends PureComponent {

    render() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    paddingHorizontal: DesignConvert.getW(42),
                    paddingVertical: DesignConvert.getH(12),
                }}>
                <Text
                    style={{
                        color: "#212121",
                        fontSize: DesignConvert.getF(12),
                    }}>{this.props.leftText}</Text>

                <View
                    style={{
                        flex: 1,
                    }}></View>

                <Image
                    source={this.props.rich ? mine_rich_lv(this.props.level) : mine_charm_lv(this.props.level)}
                    style={{
                        width: DesignConvert.getW(42),
                        height: DesignConvert.getH(17),
                        marginRight: DesignConvert.getW(5),
                    }}></Image>
            </View>
        )
    }
}


const [rich, charm] = [233, 666]
class MyLevelDescriptionPage extends PureComponent {
    constructor(props) {
        super(props);

        this._type = this.props.type;
        this._level = this.props.level;

        this._nextLevel = 2;
        this._exp = 200;
        this._maxExp = 400;

        this._isMax = false;
        // 用户的当前经验值
        this._nextExp = 20;
        this._curLevelExp = 0;

        //距离下一级的value
        this._marginValue = 0
    }

    componentDidMount() {
        this._initData();
    }

    _initData = async () => {
        let data = await require("../../../model/main/MinePageModel").default.getPersonPage()

        this._nickName = decodeURI(data.nickName);
        this._faceUrl = Config.getHeadUrl(data.userId, data.logoTime, data.thirdIconurl);

        let userLevel = await require("../../../model/mine/LevelDescriptionModel").default.getUserLevel();
        this._value = this._type == rich ? userLevel.contribute : userLevel.charm
        this._level = this._type == rich ? userLevel.contributeLv : userLevel.charmLv;

        if (this._type == rich) {
            require("../../../model/mine/LevelDescriptionModel").default.getRichLvData(this._level)
                .then(data => {
                    this._exp = userLevel.contribute - Number(data.curLevel.exp);
                    if (this._level >= 120) {
                        //最大等级
                        this._isMax = true;
                        this._level = 120;
                        this._nextLevel = 120;
                        this._marginValue = -1
                        // this._maxExp = Number(data.curLevel.exp);
                    } else {
                        this._maxExp = Number(data.nextLevel.exp) - Number(data.curLevel.exp);
                        // console.log(Number(data.nextLevel.exp), Number(data.curLevel.exp))
                        // console.log('等级之间的差值', this._maxExp)
                        this._nextLevel = Number(data.nextLevel.level);
                        this._nextExp = Number(data.nextLevel.exp);
                        this._marginValue = Number(data.nextLevel.exp) - Number(this._value)
                    }
                    this.forceUpdate();
                })
        } else {
            require("../../../model/mine/LevelDescriptionModel").default.getCharmLvData(this._level)
                .then(data => {
                    // console.log("getCharmLvData", data, this._level)

                    this._exp = userLevel.charm - Number(data.curLevel.exp);
                    this._curLevelExp = Number(data.curLevel.exp);
                    if (this._level >= 120) {
                        //最大等级
                        // console.log('getCharmLvData', this._nextLevel)
                        this._isMax = true;
                        this._level = 120;
                        this._nextLevel = 120;
                        this._marginValue = -1
                        // this._maxExp = this._exp;
                    } else {
                        this._maxExp = Number(data.nextLevel.exp) - Number(data.curLevel.exp);
                        this._nextLevel = Number(data.nextLevel.level);
                        this._nextExp = Number(data.nextLevel.exp);
                        this._marginValue = Number(data.nextLevel.exp) - Number(this._value)
                    }
                    this.forceUpdate();
                })
        }

        this.forceUpdate();
    }

    _renderLevelDesc = () => {
        const type = this._type === 233 ? '233' : '666'

        const juniorImg = require('../../../hardcode/skin_imgs/leveldescription').junior_bg(type)
        const intermediateImg = require('../../../hardcode/skin_imgs/leveldescription').intermediate_bg(this._type)
        const seniorImg = require('../../../hardcode/skin_imgs/leveldescription').senior_bg(this._type)
        const superImg = require('../../../hardcode/skin_imgs/leveldescription').super_bg(this._type)
        return (
            <View
                style={{
                    width: DesignConvert.swidth,
                    borderTopLeftRadius: DesignConvert.getW(10),
                    borderTopRightRadius: DesignConvert.getW(10),

                    marginTop: DesignConvert.getH(10),

                    backgroundColor: '#FFFFFF',

                    alignItems: 'center'
                }}
            >
                <Image
                    style={{
                        width: DesignConvert.getW(298),
                        height: DesignConvert.getH(592),
                        resizeMode: 'contain',
                        marginBottom: DesignConvert.getH(62.5) + DesignConvert.addIpxBottomHeight(),

                        marginTop: DesignConvert.getH(40)
                    }}
                    source={this._type == rich ? bg_rich_des() : bg_charm_des()}
                />
            </View>

        )
    }

    render() {
        const text = this._type === 233 ? '打赏' : '收到'
        // console.log('------------', require("../../../hardcode/skin_imgs/main").mine_charm_lv(this._level))
        const middleBg = this._type === 233 ? require('../../../hardcode/skin_imgs/leveldescription').rich_middle_bg() : require('../../../hardcode/skin_imgs/leveldescription').charm_middle_bg()
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                }}
                style={{
                    flex: 1,
                    width: DesignConvert.swidth,


                }}>
                {/* <View
                    style={{
                        width: DesignConvert.getW(90),
                        // height: DesignConvert.getH(90),
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <ImageBackground
                        source={this._type == rich ? require("../../../hardcode/skin_imgs/main").level_rich_bg() : require("../../../hardcode/skin_imgs/main").level_charm_bg()}
                        style={{
                            width: DesignConvert.getW(86),
                            height: DesignConvert.getH(86),
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Image
                            source={{ uri: this._faceUrl }}
                            style={{
                                width: DesignConvert.getW(75),
                                height: DesignConvert.getH(75),
                                borderRadius: DesignConvert.getW(38),
                            }}></Image>
                    </ImageBackground>

                    <Image
                        source={this._type == rich ? require("../../../hardcode/skin_imgs/main").mine_rich_lv(this._level) : require("../../../hardcode/skin_imgs/main").mine_charm_lv(this._level)}
                        style={{
                            width: DesignConvert.getW(40),
                            height: DesignConvert.getH(14),
                            marginTop: DesignConvert.getH(2),
                        }}></Image>
                </View> */}

                {/* <Text
                    style={{
                        color: "rgba(0, 0, 0, 0.5)",
                        marginTop: DesignConvert.getH(5),
                    }}>{this._nickName}</Text> */}


                <View
                    style={{
                        marginTop: DesignConvert.getH(20),
                        marginLeft: DesignConvert.getW(22),

                        // justifyContent: 'center'

                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>


                    <Image
                        source={{ uri: this._faceUrl }}
                        style={{
                            // position: 'absolute',
                            // top: DesignConvert.getH(21),

                            width: DesignConvert.getW(48),
                            height: DesignConvert.getH(48),
                            borderRadius: DesignConvert.getW(50),

                            borderWidth: DesignConvert.getW(1.5),
                            borderColor: '#FFFFFF',

                        }}></Image>
                    <Text
                        numberOfLines={1}
                        style={{
                            color: '#FFFFFF',
                            fontSize: DesignConvert.getF(14),

                            marginLeft: DesignConvert.getW(10),

                            maxWidth: DesignConvert.getW(81)
                        }}
                    >{this._nickName}</Text>
                    {/* <Image
                        style={{
                            position: 'absolute',
                            top: DesignConvert.getH(20),
                            width: DesignConvert.getW(126),
                            height: DesignConvert.getH(80),
                        }}
                        source={ic_rich_head()} /> */}
                    <Image
                        source={this._type == rich ? require("../../../hardcode/skin_imgs/main").mine_rich_lv(this._level) : require("../../../hardcode/skin_imgs/main").mine_charm_lv(this._level)}
                        style={{
                            width: DesignConvert.getW(38),
                            height: DesignConvert.getH(17),
                            resizeMode: 'contain',

                            marginLeft: DesignConvert.getW(5)
                        }} />
                </View>
                <View
                    style={{
                        marginTop: DesignConvert.getH(20),
                        marginLeft: DesignConvert.getW(22)
                    }}
                >

                    <View
                        style={{
                            width: DesignConvert.getW(180),
                            height: DesignConvert.getH(5),

                            backgroundColor: "rgba(255, 255, 255, 0.4)",

                            borderRadius: DesignConvert.getW(5),


                        }}>
                        <View
                            style={{
                                position: 'absolute',

                                // left: DesignConvert.getW(this._exp / this._maxExp * 150),
                                left: 0,

                                height: DesignConvert.getH(5),
                                width: DesignConvert.getW(5),
                                borderRadius: DesignConvert.getW(5),

                                backgroundColor: this._type == rich ? '#FFFFFF' : '#FFFFFF',
                                borderRadius: DesignConvert.getW(2),
                            }}></View>
                    </View>
                    <View
                        style={{
                            width: DesignConvert.getW(180),

                            flexDirection: 'row',
                            justifyContent: 'space-between',

                            marginTop: DesignConvert.getH(3)

                        }}>
                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontSize: DesignConvert.getF(11)
                            }}
                        >{this._level}</Text>
                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontSize: DesignConvert.getF(11)
                            }}
                        >{this._nextLevel}</Text>
                    </View>
                    <View
                        style={{
                            width: DesignConvert.getW(180),

                            flexDirection: 'row',
                            justifyContent: 'space-between',

                            marginTop: DesignConvert.getH(3)

                        }}>
                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontSize: DesignConvert.getF(11)
                            }}
                        >1{COIN_NAME}=1经验值</Text>
                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontSize: DesignConvert.getF(11)
                            }}
                        >({this._curLevelExp}/{this._nextExp})</Text>
                    </View>
                </View>










                {this._renderLevelDesc()}




                {/* <ImageBackground
                    source={level_bottom_bg()}
                    style={{
                        width: DesignConvert.getW(345),
                        height: DesignConvert.getH(273),
                        marginTop: DesignConvert.getH(20),
                        paddingHorizontal: DesignConvert.getW(10),
                        paddingVertical: DesignConvert.getH(10),
                        marginBottom: DesignConvert.getH(100),
                    }}>

                    <View
                        style={{
                            flexDirection: "row",
                            paddingHorizontal: DesignConvert.getW(42),
                            paddingVertical: DesignConvert.getH(12),
                        }}>
                        <Text
                            style={{
                                color: "#212121",
                                fontSize: DesignConvert.getF(12),
                            }}>{this._type == rich ? "富豪等级" : "魅力等级"}</Text>

                        <View
                            style={{
                                flex: 1,
                            }}></View>

                        <Text
                            style={{
                                color: "#212121",
                                fontSize: DesignConvert.getF(12),
                            }}>{"等级勋章"}</Text>
                    </View>

                    <View
                        style={{
                            width: DesignConvert.getW(325),
                            height: DesignConvert.getH(0.5),
                            backgroundColor: '#F1F1F1',
                        }}
                    />

                    <LevelItem
                        leftText={this._type == rich ? "1-20" : "1-15"}
                        level={1}
                        rich={this._type == rich ? true : false} />

                    <LevelItem
                        leftText={this._type == rich ? "21-40" : "16-30"}
                        level={this._type == rich ? 21 : 16}
                        rich={this._type == rich ? true : false} />

                    <LevelItem
                        leftText={this._type == rich ? "41-60" : "31-45"}
                        level={this._type == rich ? 41 : 31}
                        rich={this._type == rich ? true : false} />

                    <LevelItem
                        leftText={this._type == rich ? "61-80" : "46-60"}
                        level={this._type == rich ? 61 : 46}
                        rich={this._type == rich ? true : false} />

                    <LevelItem
                        leftText={this._type == rich ? "81-109" : "61-64"}
                        level={this._type == rich ? 81 : 61}
                        rich={this._type == rich ? true : false} />

                </ImageBackground> */}

                {/* <View
                    style={{
                        width: DesignConvert.swidth,
                        position: "absolute",
                        top: DesignConvert.getH(180),
                    }}>
                    <Text
                        style={{
                            color: "#333333",
                            fontSize: DesignConvert.getF(16),
                            fontWeight: "bold",
                            marginLeft: DesignConvert.getW(18),
                        }}>{this._type == rich ? "等级特权" : "如何升级"}</Text>

                    <IconItem
                        ImageUrl={this._type == rich ? require("../../../hardcode/skin_imgs/main").level_rich_level() : require("../../../hardcode/skin_imgs/main").level_charm_level()}
                        Title={"等级图标"}
                        Content={this._type == rich ? "佩戴专属身份勋章" : "每收到礼物，累计1点魅力值"}
                        statusText={this._type == rich ? "已开启" : ""} />

                    {this._type == rich ? (
                        <IconItem
                            ImageUrl={require("../../../hardcode/skin_imgs/main").level_rich_entry()}
                            Title="专属进场欢迎"
                            Content="独特进场彰显身份"
                            statusText="施工中" />
                    ) : null}
                </View> */}
            </ScrollView >
        )
    }
}

export default class LevelDescriptionView extends BaseView {
    constructor(props) {
        super(props);

        this._selectTab = this.props.params.selectedTab;
    }

    _onBackPress = () => {
        this.popSelf();
    }

    _onExplanationPress = () => {
        let tips = this._selectTab == 0 ? "三个字: 送送送" : "找人给自己刷刷刷";
        //"等级图标会展示在房间个人资料卡、个人详情页等地方。级别越高，等级图标越炫酷哦！"
        require("../../../router/level2_router").showInfoDialog(tips);
        // require("../../../router/level3_router").showLevelDescriptionDetailView(this._selectTab? 233 : 666);
    }

    _onPageChange = e => {
        this._selectTab = e.position;
        this.forceUpdate();
    }

    componentDidMount() {
        super.componentDidMount();
    }


    _renderTabLayout() {
        return (
            <View
                style={{
                    width: DesignConvert.swidth,
                    flexDirection: "row",
                    height: DesignConvert.getH(38),
                    justifyContent: 'center',
                }}
            >
                <TouchableOpacity
                    style={{
                        height: DesignConvert.getH(38),
                        width: DesignConvert.getW(104),
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    activeOpacity={0.9}
                    onPress={() => {
                        this._selectTab = 0;
                        this.forceUpdate();
                        this._viewPager.setPage(0);
                    }}
                >
                    <Text
                        style={{
                            color: this._selectTab == 0 ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
                            fontSize: this._selectTab == 0 ? DesignConvert.getF(17) : DesignConvert.getF(17),
                            fontWeight: "normal",
                            // marginLeft: DesignConvert.getW(76),
                        }}
                    >财富等级</Text>

                    {this._selectTab == 0 &&
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                width: DesignConvert.getW(8),
                                height: DesignConvert.getH(3),
                                backgroundColor: '#FFFFFF',
                                borderRadius: DesignConvert.getW(5)
                            }}
                        />
                    }
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        height: DesignConvert.getH(38),
                        width: DesignConvert.getW(104),
                        alignItems: 'center',
                        marginRight: DesignConvert.getW(10),
                    }}
                    activeOpacity={0.9}
                    onPress={() => {
                        this._selectTab = 1;
                        this.forceUpdate();
                        this._viewPager.setPage(1);
                    }}
                >
                    <Text
                        style={{
                            color: this._selectTab == 1 ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
                            fontSize: this._selectTab == 1 ? DesignConvert.getF(17) : DesignConvert.getF(17),
                            fontWeight: "normal",
                            // marginLeft: DesignConvert.getW(113),
                        }}
                    >魅力等级</Text>

                    {this._selectTab == 1 &&
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                width: DesignConvert.getW(8),
                                height: DesignConvert.getH(3),
                                backgroundColor: '#FFFFFF',
                                borderRadius: DesignConvert.getW(5)
                            }}
                        />
                    }
                </TouchableOpacity>


            </View>
        )
    }

    render() {
        const topImgBg = this._selectTab === 0 ? rich_top_bg() : charm_top_bg()
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    alignItems: 'center'
                }}>

                <Image
                    source={topImgBg}
                    style={{
                        width: DesignConvert.swidth,
                        height: DesignConvert.getH(260),
                        position: 'absolute'
                    }}
                />
                <StatusBarView />
                {this._renderTabLayout()}
                <TouchableOpacity
                    style={{
                        height: DesignConvert.getH(44),
                        top: DesignConvert.statusBarHeight,
                        position: 'absolute',
                        left: 0,
                        justifyContent: 'center',
                    }}
                    onPress={this.popSelf}
                >
                    <Image
                        style={{
                            width: DesignConvert.getW(20),
                            height: DesignConvert.getH(20),
                            marginLeft: DesignConvert.getW(15),

                            tintColor: '#FFFFFF'
                        }}
                        source={ic_back_black()}
                    />
                </TouchableOpacity>
                <ViewPager
                    initialPage={this._selectTab}
                    style={{
                        position: 'absolute',
                        top: DesignConvert.getH(44) + DesignConvert.getH(38) + DesignConvert.statusBarHeight,
                        bottom: 0,
                        width: DesignConvert.swidth,
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
                        <MyLevelDescriptionPage
                            type={rich} />
                    </View>

                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <MyLevelDescriptionPage
                            type={charm} />
                    </View>
                </ViewPager>
            </View>
        );
    }
}