'use strict';

import React, { PureComponent } from "react";
import { Text, View, Image, TouchableOpacity, ImageBackground } from "react-native";
import DesignConvert from "../../../../utils/DesignConvert";
import Config from "../../../../configs/Config";
import LinearGradient from "react-native-linear-gradient";
import MedalWidget from "../../../userinfo/MedalWidget";
import { bg_enter_room } from "../../../../hardcode/skin_imgs/room";

export default class _PublicScreenMessageEnterRoomItem extends PureComponent {

    _onSender = () => {
        require('../../../../model/room/RoomUserClickModel').onClickUser(this.props.result.base.userId, this.props.result.base.nickName)
    }

    render() {
        //用户进入房间通知
        // message EnterRoomBroadcast {
        // 	required string roomId = 1;//房间ID
        // 	required int32 mainType = 2;//房间类型
        // 	required UserResult.UserBase base = 3;//用户基本信息
        // 	optional int32 onlineNum = 4;//在线成员数	
        // 	required int32 index = 5;//位置
        // 	optional string carId = 6;//坐驾ID
        // 	optional int32 charmLv = 7;//魅力等级
        // 	optional int32 contributeLv = 8;// 财富等级	
        // 	optional bool openMirror = 9;//是否开启镜像
        // 	optional int32 identity = 10;// 1-普通用户，2-vip，3-富豪
        // 	optional int32 source = 11;//来源 1：寻友 
        // 	optional int64 loginTime = 12;//登陆房间时间
        // 	optional bool showCar = 13;// 是否播放座驾动画
        // 	optional int32 jobId = 14;//职位
        // 	optional bool isGuardian = 15;// 是否是守护团成员，true是，false不是
        // 	optional int32 guardianLv = 17;// 用户在守护团的等级
        // 	optional int32 cardType = 18;//用户贵宾卡类型	
        // }

        //获取玩家基本信息
        // message UserBase {
        // 	required string userId = 1;//用户ID
        // 	optional string nickName = 2;//用户昵称
        // 	optional int32 logoTime = 3;//修改logo的时间 0为没修改过
        // 	optional string thirdIconurl = 4;//第三方头像
        // 	optional string headFrameId = 5;// 头像框
        // 	optional int32 sex = 6; // 姓别 0 未知 1:男 2:女
        //     optional int32 age = 7; //年龄
        //     optional int32 vipLv = 8; //VIP等级
        // 	optional string slogan = 9;//
        // 	optional int32 contributeLv = 10;// 土豪等级
        // 	optional string position = 11;//地标
        // 	optional string channelId = 12;//用户渠道id
        // 	optional int32 friendStatus = 13;// 好友状态
        // }
        const contributeLv = this.props.result.base.contributeLv;
        const charmLv = this.props.result.charmLv;

        let name = decodeURIComponent(this.props.result.base.nickName);
        if(name.length>5) name= name.slice(0,5)+'...';

        return (

            // <LinearGradient
            //     start={{ x: 0, y: 0 }}
            //     end={{ x: 1, y: 0 }}
            //     colors={['#00000033', '#00000033']}
            //     style={{
            //         marginTop: DesignConvert.getH(5),
            //         marginBottom: DesignConvert.getH(5),
            //         height: DesignConvert.getH(32),
            //         borderRadius: DesignConvert.getW(10),
            //         justifyContent: 'center',
            //         flexDirection: 'row',
            //         alignItems: 'center',
            //         paddingStart: DesignConvert.getW(11),
            //     }}
            // >
            <ImageBackground
                source={require('../../../../hardcode/skin_imgs/room_more').ic_bg_in_room()}
                style={{
                    marginTop:DesignConvert.getH(10),
                    width: DesignConvert.getW(194),
                    height: DesignConvert.getH(29.5),
                    // paddingTop: DesignConvert.getH(5),
                    flexDirection:'row',
                    paddingLeft: DesignConvert.getW(8),
                    alignItems: 'center',
                }}>

                {/* 
                <TouchableOpacity
                    style={{
                        marginTop: DesignConvert.getH(4),
                    }}
                    onPress={this._onSender}
                >
                    <Image
                        style={{
                            width: DesignConvert.getW(35),
                            height: DesignConvert.getH(35),
                            borderRadius: DesignConvert.getW(20),
                        }}
                        source={{ uri: Config.getHeadUrl(this.props.result.base.userId, this.props.result.base.logoTime, this.props.result.base.thirdIconurl) }}
                    />
                </TouchableOpacity> */}

                <Text
                    style={{
                        color: '#EA85FF',
                        fontSize: DesignConvert.getF(12),
                    }}
                    onPress={this._onSender}

                >{name}</Text>
                <MedalWidget
                    richLv={contributeLv}
                    charmLv={-1}
                    width={DesignConvert.getW(38)}
                    height={DesignConvert.getH(17)}
                />
                <Text
                    style={{
                        fontSize: DesignConvert.getF(12),
                        color: '#FFFFFF',
                        marginEnd: DesignConvert.getW(15)
                    }}
                >{` 进入了房间`}</Text>
              </ImageBackground>

            // </LinearGradient>
        )
    }
}
