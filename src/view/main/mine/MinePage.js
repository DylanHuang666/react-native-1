/**
 * 主界面 -> 我的
 */
'use strict';

import React, { PureComponent } from "react";
import { View, Image, ScrollView, Animated, Text, TouchableOpacity, Clipboard, ImageBackground } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import DesignConvert from "../../../utils/DesignConvert";
import Config from "../../../configs/Config";
import ToastUtil from "../../base/ToastUtil";
import ModelEvent from "../../../utils/ModelEvent";
import { EVT_LOGIC_UPDATE_USER_INFO, EVT_LOGIC_UPDATE_GOLDBELL_INFO, EVT_UPDATE_WALLET, } from "../../../hardcode/HLogicEvent";
import RoomInfoCache from "../../../cache/RoomInfoCache";
import UserInfoCache from "../../../cache/UserInfoCache";
import { COIN_NAME, } from '../../../hardcode/HGLobal';
import { Fans, Follow } from "./FollowAndFansView";
import BackTitleView from "../../base/BackTitleView";
import { icon_edit } from "../../../hardcode/skin_imgs/user_info";
import { mine_arrow_right, mine_icon_wallet, mine_icon_setting } from "../../../hardcode/skin_imgs/main";
import { mine_level } from "../../../hardcode/skin_imgs/mine";
import MedalWidget from "../../userinfo/MedalWidget";


class ImgTouch extends PureComponent {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}

        style={{
          alignItems: 'center',
        }}
      >
        <Image
          source={this.props.source}
          style={{
            width: DesignConvert.getW(36),
            height: DesignConvert.getH(36),
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{
            marginTop: DesignConvert.getH(7),
            color: '#212121',
            fontSize: DesignConvert.getF(11)
          }}
        >{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

// getIncomeData
export default class MinePage extends PureComponent {

  constructor(props) {
    super(props);

    this._userId = UserInfoCache.userId;
    this._cutenumber = null//靓号
    this._cuteIcon = null//靓号icon
    this._avatar = null;
    this._nickName = "暂无昵称";
    this._richLv = 1;
    this._charmLv = 1;
    this._myLoves = 0;
    this._fans = 0;
    this._sex = 1;
    this._age = 22;

    this._accountMoney = 0;
    this._totalMoney;

    this._hasNotRead = false;


    this._alpha = 0;
    this._isTop = true;
  }

  _onAvatarPress = () => {
    require("../../../router/level2_router").showUserInfoView(this._userId);
  }

  _onEditPress = () => {
    require("../../../router/level2_router").showUserInfoEditView();
  }

  _onCopyPress = () => {
    Clipboard.setString(this._userId);
    ToastUtil.showCenter("复制成功");
  }

  _onExit = () => {
    require('../../../model/LoginModel').default.logout();
  }

  _onRichPress = () => {
    require("../../../router/level2_router").showLevelDescriptionView(0);
  }

  _onCharmPress = () => {
    require("../../../router/level2_router").showLevelDescriptionView(1);
  }

  _onFansPress = () => {
    // require("../../../router/level2_router").showFollowAndFansViewPagerView(Fans);
    require("../../../router/level2_router").showFollowAndFansView(Fans);
  }

  _onMyLovesPress = () => {
    // require("../../../router/level2_router").showFollowAndFansViewPagerView(Follow);
    require("../../../router/level2_router").showFollowAndFansView(Follow);
  }

  _onTopUpPress = () => {
    require("../../../router/level2_router").showMyWalletView();
  }

  _onMyLvPress = () => {
    require("../../../router/level2_router").showLevelDescriptionView(0);
  }

  _onHelpPress = () => {
    //TODO:帮助与反馈

  }

  showAboutUs = () => {
    require('../../../router/level3_router').showAboutUsView()
  }

  _onCheckVersionPress = () => {
    require("../../base/ToastUtil").default.showCenter("当前已是最新版本");
  }

  _onSettingPress = () => {
    require("../../../router/level2_router").showSettingView();

  }

  showCertPage = () => {
    require('../../../router/level2_router').showCertificationPage()
  }

  showBindPhone = () => {
    require('../../../router/level3_router').showBindPhoneView()
  }

  _onSetPayPsw = () => {
    if (!UserInfoCache.phoneNumber) {
      ToastUtil.showCenter("请先绑定手机")
      return
    }
    require("../../../router/level3_router").showUpdatePasswordView(require("../../setting/UpdatePasswordView").updatePayPassword);
  }

  _onSetPsw = () => {
    if (!UserInfoCache.phoneNumber) {
      ToastUtil.showCenter("请先绑定手机")
      return
    }
    require('../../../router/level3_router').showUpdatePasswordView(require("../../setting/UpdatePasswordView").updatePassword)
  }

  _onShowMyBenefit = () => {
    require("../../../router/level2_router").showAnchorIncomeView()
  }

  _onMyWallet = () => {
    // require("../../../router/level2_router").showMyWalletView();
    require("../../../router/level2_router").showMyWalletAndBenefitView();
  }

  _onBeforeOpenLivePress = () => {
    require("../../../model/room/RoomModel").beforeOpenLive();
  }

  _renderMySex = () => {
    return (
      <View
        style={{
          width: DesignConvert.getW(16),
          height: DesignConvert.getH(16),
          marginLeft: DesignConvert.getW(5),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: this._sex === 2 ? '#FF65B2' : '#3BACFF'
        }}
      >
        <Image
          source={this._sex === 2 ? require("../../../hardcode/skin_imgs/mine").mine_female() : require("../../../hardcode/skin_imgs/mine").mine_male()}
          style={{
            width: DesignConvert.getW(16),
            height: DesignConvert.getHeight(16),
            resizeMode: 'contain'
          }}
        />
      </View>
    )
  }

  _renderMyId = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // width: DesignConvert.swidth,
          // justifyContent: 'flex-end',
          // paddingRight: DesignConvert.getW(15),
          marginTop: DesignConvert.getH(6),
        }}
      >
        <View
          style={{
            width: DesignConvert.getW(21),
            height: DesignConvert.getH(21),
            // borderRadius: DesignConvert.getF(6),
            // backgroundColor: 'rgba(255, 255, 255, 0.8)',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: DesignConvert.getW(5),
            display: this._cuteIcon ? 'flex' : 'none',
          }}
        >
          <Image
            style={{
              // marginEnd: DesignConvert.getW(2),
              width: DesignConvert.getW(21),
              height: DesignConvert.getH(21),
              resizeMode: 'contain',
            }}
            source={{ uri: this._cuteIcon }}
          />
        </View>
        {/* <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#8A50FC', '#DD56FF']}
          style={{
            flexDirection: 'row',
            width: DesignConvert.getW(105),
            height: DesignConvert.getH(21),
            borderRadius: DesignConvert.getW(5),
            alignItems: 'center',
          }}
        > */}
        <Text
          style={{
            fontSize: DesignConvert.getF(11),
            fontWeight: "normal",
            color: '#949494',
            marginHorizontal: DesignConvert.getW(3),
          }}>ID: {this._cutenumber ? this._cutenumber : this._userId}</Text>
        {/* <View
            style={{
              width: DesignConvert.getW(1),
              height: DesignConvert.getH(12),
              backgroundColor: 'rgba(255, 255, 255, 0.6)'
            }}
          />
          <TouchableOpacity
            style={{
              paddingLeft: DesignConvert.getW(3),
            }}
            onPress={this._onCopyPress}>
            <Text
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: DesignConvert.getF(11)
              }}
            >复制</Text>
          </TouchableOpacity>
        </LinearGradient> */}
      </View>
    )
  }

  _remderMyIcon = () => {
    return (
      <View
        style={{
          marginTop: DesignConvert.getH(7),
          flexDirection: 'row'
        }}
      >
        <View
          style={{
            width: DesignConvert.getW(31),
            height: DesignConvert.getH(14),
            borderRadius: DesignConvert.getW(7),
            marginRight: DesignConvert.getW(5),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: this._sex === 2 ? '#FF65B2' : '#3BACFF'
          }}
        >
          <Image
            source={this._sex === 2 ? require("../../../hardcode/skin_imgs/mine").mine_female() : require("../../../hardcode/skin_imgs/mine").mine_male()}
            style={{
              width: DesignConvert.getW(7),
              height: DesignConvert.getHeight(11),
              resizeMode: 'contain'
            }}
          />
          <Text
            style={{
              marginLeft: DesignConvert.getW(4),
              color: '#FFFFFF',
              fontSize: DesignConvert.getF(11)
            }}
          >{this._age}</Text>
        </View>
        <TouchableOpacity
          style={{
            marginRight: DesignConvert.getW(5),

          }}
          onPress={this._onRichPress}>
          <Image
            source={require("../../../hardcode/skin_imgs/main").mine_rich_lv(this._richLv)}
            style={{
              width: DesignConvert.getW(31),
              height: DesignConvert.getH(14),
              resizeMode: 'contain'
            }}></Image>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this._onCharmPress}>
          <Image
            source={require("../../../hardcode/skin_imgs/main").mine_charm_lv(this._charmLv)}
            style={{
              width: DesignConvert.getW(31),
              height: DesignConvert.getH(14),
              resizeMode: 'contain'
            }}></Image>
        </TouchableOpacity>
      </View>
    )
  }
  _renderMyInfo = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          // width: DesignConvert.swidth,
          // height: DesignConvert.getH(125),
          // borderRadius: DesignConvert.getW(10),
          // backgroundColor: '#F9F9F9',
          // paddingLeft: DesignConvert.getW(30),
          marginTop: DesignConvert.getH(90),
        }}
      >
        <TouchableOpacity
          style={{
            // position: 'absolute',
            // top: DesignConvert.getHeight(-40),
            // marginHorizontal: DesignConvert.getW(147.5),
            // borderRadius: DesignConvert.getW(10),
          }}
          onPress={this._onAvatarPress}
        >
          <Image
            source={this._avatar}
            style={{
              // resizeMode: 'stretch',
              width: DesignConvert.getW(80),
              height: DesignConvert.getH(80),
              borderRadius: DesignConvert.getW(40),
              // borderWidth: DesignConvert.getW(6),
              borderColor: '#FFFFFF'
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            marginTop: DesignConvert.getH(10),
            alignItems: 'center',
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              maxWidth: DesignConvert.getW(200),
              fontSize: DesignConvert.getF(17),
              fontWeight: 'bold',
              color: '#121212',
            }}>{this._nickName}</Text>
          <TouchableOpacity
            onPress={this._onEditPress}
            style={{
              marginLeft: DesignConvert.getW(8),
            }}>
            <Image
              source={icon_edit()}
              style={{
                width: DesignConvert.getW(18),
                height: DesignConvert.getH(18),
                resizeMode: 'contain',
              }} />
          </TouchableOpacity>
          {/* {this._renderMySex()} */}
        </View>
        {/* <Text
          numberOfLines={2}
          style={{
            maxWidth: DesignConvert.getW(309.5),
            marginTop: DesignConvert.getH(10),
            color: '#212121',
            fontSize: DesignConvert.getF(13),
            lineHeight: DesignConvert.getH(18.5),
          }}
        >签名：{this._slogan ? this._slogan : '这个人还什么都没有留下~'}</Text>
        {this._renderFansAndFouc()} */}
      </View>
    )
  }
  _renderFansAndFouc = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: DesignConvert.getH(30),
          // position: 'absolute',
          // top: DesignConvert.getH(15),
          // right: DesignConvert.getW(25)
        }}
      >


        <TouchableOpacity
          onPress={this._onMyLovesPress}
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text
            style={{
              marginBottom: DesignConvert.getH(2),
              color: "#121212",
              fontSize: DesignConvert.getF(17),
              fontWeight: "bold",
            }}>{this._myLoves}</Text>

          <Text
            style={{
              color: "#949494",
              fontSize: DesignConvert.getF(12),
            }}>关注</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this._onFansPress}
          style={{
            marginLeft: DesignConvert.getW(120),
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text
            style={{
              marginBottom: DesignConvert.getH(2),
              color: "121212",
              fontSize: DesignConvert.getF(17),
              fontWeight: "bold",
            }}>{this._fans}</Text>

          <Text
            style={{
              color: "#949494",
              fontSize: DesignConvert.getF(12),
            }}>粉丝</Text>
        </TouchableOpacity>
      </View>
    )
  }
  _renderItem = (icon, title, callBack, isShowBorder = false) => {
    return (
      <TouchableOpacity
        onPress={callBack}
        style={{
          width: DesignConvert.swidth,
          paddingHorizontal: DesignConvert.getW(15),
          // backgroundColor: '#FFFFFF',
          // height: DesignConvert.getH(53),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: DesignConvert.getH(15),
            marginBottom: DesignConvert.getH(15),
          }}
        >
          {/* <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['white', 'white']}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: DesignConvert.getW(23),
              height: DesignConvert.getH(23),
              borderRadius: DesignConvert.getW(10),
              marginRight: DesignConvert.getW(19),
            }}
          > */}
          <Image
            source={icon}
            style={{
              width: DesignConvert.getW(23),
              height: DesignConvert.getH(23),
              resizeMode: 'contain'
            }}></Image>
          {/* </LinearGradient> */}


          <Text
            style={{
              flex: 1,
              marginLeft: DesignConvert.getW(10),
              fontSize: DesignConvert.getF(14),
              color: "#121212",
            }}
          >{title}</Text>

          {title == '我的等级' &&
            <MedalWidget
              richLv={this._richLv}
              charmLv={this._charmLv}
              width={DesignConvert.getW(37)}
              height={DesignConvert.getH(15)} />}

          <Image
            source={mine_arrow_right()}
            style={{
              width: DesignConvert.getW(8),
              height: DesignConvert.getH(14),
              resizeMode: 'contain',
              marginLeft: DesignConvert.getW(10),
              // position: "absolute",
              // right: DesignConvert.getW(15),
            }}></Image>
        </View>
        {/* <View
          style={{
            width: DesignConvert.getW(315),
            height: DesignConvert.getH(1),
            backgroundColor: '#F8F8F8',
            display: isShowBorder ? 'none' : 'flex'
          }}
        /> */}
      </TouchableOpacity >
    )
  }
  componentDidMount() {
    //注册事件
    ModelEvent.addEvent(null, EVT_LOGIC_UPDATE_USER_INFO, this._initData);
    ModelEvent.addEvent(null, EVT_LOGIC_UPDATE_GOLDBELL_INFO, this._initData);
    ModelEvent.addEvent(null, EVT_UPDATE_WALLET, this._initData);
    this._initData();

  }

  componentWillUnmount() {
    //解绑事件
    ModelEvent.removeEvent(null, EVT_LOGIC_UPDATE_USER_INFO, this._initData);
    ModelEvent.removeEvent(null, EVT_LOGIC_UPDATE_GOLDBELL_INFO, this._initData);
    ModelEvent.removeEvent(null, EVT_UPDATE_WALLET, this._initData);
  }

  _initData = () => {
    if (!UserInfoCache.userInfo) {
      return
    }
    require('../../../model/userinfo/UserInfoModel').default.getGoodId(UserInfoCache.userId)
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
    require("../../../model/main/MinePageModel").default.getPersonPage()
      .then(data => {
        this._userId = data.userId;
        this._nickName = decodeURI(data.nickName);
        this._avatar = { uri: require("../../../configs/Config").default.getHeadUrl(data.userId, data.logoTime, data.thirdIconurl) };
        this._richLv = data.contributeLv;
        this._charmLv = data.charmLv;
        this._myLoves = data.myLoves;
        this._fans = data.friends;
        this._sex = data.sex;
        this._age = data.age;
        this._slogan = data.slogan
        this.forceUpdate();
      });

    require("../../../model/BagModel").default.getWallet()
      .then(data => {
        this._accountMoney = data.goldShell;
        this.forceUpdate();
      });

    require("../../../model/main/MinePageModel").default.getAdviseList()
      .then(data => {
        this._hasNotRead = data;
        this.forceUpdate();
      });
    require('../../../model/anchorincome/AnchorIncomeModel').default.getIncomeData()
      .then(data => {
        // this._weekEarning = Math.floor(data.weekLiveEarn) / 100;
        this._totalMoney = Math.floor(data.balance) / 100;
        this.forceUpdate();
      });
  }


  _onScroll = ({
    nativeEvent: {
      contentInset: { bottom, left, right, top },
      contentOffset: { x, y },
      zoomScale
    }
  }) => {
    // console.log("_onScroll", y);
    if (y <= 70) {
      this._alpha = y / 70;
      // console.log("this._alpha", this._alpha);
      this._isTop = y <= 0;
      this.forceUpdate();
    } else {
      this._alpha = 1;
      this.forceUpdate();
    }
  }


  render() {
    return (
      <View style={{ flex: 1, }}>
        <ScrollView
          style={{
            // width: DesignConvert.swidth,
            // height: DesignConvert.sheight - DesignConvert.getH(500),
            // marginTop: -DesignConvert.statusBarHeight,
          }}
          onScroll={this._onScroll}
          scrollEnabled
        // showsVerticalScrollIndicator={false}
        >
          <View style={{ alignItems: 'center' }}>
            <Image
              style={{
                position: 'absolute',
                width: DesignConvert.swidth,
                height: DesignConvert.getH(180),
              }}
              source={require('../../../hardcode/skin_imgs/main').mine_top_bg()}
            />

            {/* <View
              style={{
                width: DesignConvert.swidth,
                height: DesignConvert.getH(86)+DesignConvert.statusBarHeight,
              }}
            /> */}

            <Image
              source={require('../../../hardcode/skin_imgs/main').mine_bottom_bg()}
              style={{
                position: 'absolute',
                // top:DesignConvert.getH(180),
                top: DesignConvert.getH(130),
                width: DesignConvert.swidth,
                height: DesignConvert.getH(682),
              }} />

            {this._renderMyInfo()}

            {this._renderMyId()}

            {this._renderFansAndFouc()}
            {/* <View
              style={{
                flex: 1,
                marginLeft: DesignConvert.getW(15),
                alignItems: 'center',
                width: DesignConvert.getW(345),
                height: DesignConvert.getH(172),
                borderRadius: DesignConvert.getW(10),
                backgroundColor: '#FFFFFF',
                marginTop: DesignConvert.getHeight(5),
                padding: DesignConvert.getW(25),
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  // justifyContent: 'center',
                  width: DesignConvert.getW(300),
                  flex: 1,
                  flexDirection: 'row',
                  backgroundColor: '#FFFFFF',
                  justifyContent: 'space-between',
                }}
              >
                <ImgTouch
                  source={require('../../../hardcode/skin_imgs/main').mine_icon_wallet()}
                  onPress={this._onMyWallet}
                  title="钱包"
                />
                <ImgTouch
                  source={require('../../../hardcode/skin_imgs/main').mine_icon_benefit()}
                  onPress={this._onShowMyBenefit}
                  title="收益"
                />
                <ImgTouch
                  source={require('../../../hardcode/skin_imgs/main').mine_room()}
                  onPress={this._onBeforeOpenLivePress}
                  title="房间"
                />
                <ImgTouch
                  source={require('../../../hardcode/skin_imgs/main').mine_home()}
                  onPress={this._onAvatarPress}
                  title="主页"
                />
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  width: DesignConvert.getW(300),
                  // justifyContent: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#FFFFFF',
                  justifyContent: 'space-between',
                  paddingRight: DesignConvert.getW(89),
                  paddingTop: DesignConvert.getH(15)
                }}
              >
                <ImgTouch
                  source={require('../../../hardcode/skin_imgs/main').mine_icon_rank()}
                  onPress={this._onMyLvPress}
                  title="等级"
                />
                <ImgTouch
                  source={require('../../../hardcode/skin_imgs/main').mine_about()}
                  onPress={this.showAboutUs}
                  title="关于"
                />
                <ImgTouch
                  source={require('../../../hardcode/skin_imgs/main').mine_reload()}
                  onPress={this._onCheckVersionPress}
                  title="更新"
                />
              </View>
            </View> */}
            {/* <View
                        style={{
                            position: "absolute",
                            left: DesignConvert.getW(122),
                            top: DesignConvert.getH(86),
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >

                        <TouchableOpacity
                            onPress={this._onEditPress}
                        >
                            <Image
                                source={
                                    require("../../../hardcode/skin_imgs/main").user_info_edit()
                                }
                                style={{
                                    width: DesignConvert.getW(16),
                                    height: DesignConvert.getH(16),
                                    marginLeft: DesignConvert.getW(15)
                                }}
                            />
                        </TouchableOpacity>
                    </View> */}

            <View
              style={{
                // width: DesignConvert.getW(345),
                // marginLeft: DesignConvert.getW(15),
                alignItems: 'center',
                justifyContent: 'center',
                // borderRadius: DesignConvert.getW(10),
                // backgroundColor: '#FFFFFF',
                marginTop: DesignConvert.getHeight(20),
              }}
            >
              {/* {this._renderItem(require("../../../hardcode/skin_imgs/main").mine_cert_name(), '实名认证', this.showCertPage)}
              {this._renderItem(require("../../../hardcode/skin_imgs/main").mine_bindphone(), '绑定手机号', this.showBindPhone)}
              {this._renderItem(require("../../../hardcode/skin_imgs/main").mine_setpsw(), '设置登陆密码', this._onSetPsw)}
              {this._renderItem(require("../../../hardcode/skin_imgs/main").mine_pay_psw(), '设置支付密码', this._onSetPayPsw)} */}
              {/* {this._renderItem(require("../../../hardcode/skin_imgs/main").mine_icon_setting(), '黑名单管理', this._onSettingPress,)} */}
              {this._renderItem(mine_icon_wallet(), '我的钱包', this._onMyWallet)}
              {this._renderItem(mine_level(), '我的等级', this._onMyLvPress)}
              <View
                style={{
                  marginVertical: DesignConvert.getH(15),
                  width: DesignConvert.getW(315),
                  height: DesignConvert.getH(1),
                  backgroundColor: "#F9F9F9",
                }} />
              {this._renderItem(mine_icon_setting(), '设置', this._onSettingPress)}
            </View>
            {/* <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#8A50FC', '#F293FF']}
              style={{
                marginTop: DesignConvert.getH(40),
                borderRadius: DesignConvert.getW(30),
                width: DesignConvert.getW(240),
                height: DesignConvert.getH(50),
                borderRadius: DesignConvert.getW(30),
                // marginLeft: DesignConvert.getW(67.5)
              }}
            >
              <TouchableOpacity
                onPress={this._onExit}
                style={{
                  width: DesignConvert.getW(240),
                  height: DesignConvert.getH(50),
                  borderRadius: DesignConvert.getW(30),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >

                <Text
                  style={{
                    fontSize: DesignConvert.getF(13),
                    color: '#FFFFFF'
                  }}
                >退出登陆</Text>
              </TouchableOpacity>
            </LinearGradient> */}

            <View
              style={{
                height: DesignConvert.getH(100)
              }}
            />

          </View>
        </ScrollView>

        <Animated.View
          style={{
            width: DesignConvert.swidth,
            height: DesignConvert.getH(44) + DesignConvert.statusBarHeight,
            backgroundColor: this._isTop ? "rgba(255, 255, 255, 0)" : "white",
            // backgroundColor: "red",
            position: 'absolute',
            top: Platform.OS === 'ios' ? DesignConvert.statusBarHeight : 0,
            opacity: this._isTop ? 1 : this._alpha,
          }}>

          {/* <View
            style={{
              position: 'absolute',
              width: DesignConvert.swidth,
              height: DesignConvert.getH(44) + DesignConvert.statusBarHeight,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Text
              style={{
                color: this._isTop ? "rgba(0, 0, 0, 0)" : "black",
                marginBottom: DesignConvert.getH(9),
                fontSize: DesignConvert.getF(18)
              }}
            >{this._nickName}</Text>
          </View> */}
        </Animated.View>

      </View>
    );
  }
}