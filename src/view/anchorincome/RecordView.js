/**
 * 各种记录页   {流水记录，提现记录， 兑换记录， 直播间记录}
 * _viewType {flowRecord, withdrawRecord, exchangeRecord, liveFlowRecord}
 */

'use strict';

import React, { PureComponent } from 'react';
import BaseView from '../base/BaseView';
import LinearGradient from 'react-native-linear-gradient';
import BackTitleView from '../base/BackTitleView';
import { View, Text, TouchableOpacity, ActivityIndicator, Image, Modal, FlatList, SectionList } from 'react-native';
import DesignConvert from '../../utils/DesignConvert';
import { styles } from './ConvertView';
import DatePicker from 'react-native-date-picker';
import Picker from 'react-native-wheel-picker';
import Config from '../../configs/Config';
import moment from 'moment';
import { COIN_NAME } from '../../hardcode/HGLobal';
import { record_alipay, record_bank, record_wechat, record_cash, record_coin } from '../../hardcode/skin_imgs/record';
import StringUtil from '../../utils/StringUtil';
import RecordNormalItem from './record/RecordNormalItem';
import UserInfoCache from '../../cache/UserInfoCache';
import { THEME_COLOR } from '../../styles';

const [flowRecord, withdrawRecord, exchangeRecord, liveFlowRecord, giftGoldRecord, rechargeRecord, receivedGoldRecord] = [1, 2, 3, 4, 5, 6, 7];
export { flowRecord, withdrawRecord, exchangeRecord, liveFlowRecord, giftGoldRecord, rechargeRecord, receivedGoldRecord };
var PickerItem = Picker.Item;

/**
 * RecordView头部的时间选择Btn
 */
export class TimeChooseButton extends PureComponent {

    _onPress = () => {
        this.props.onPress && this.props.onPress();
    }

    render() {

        return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    height: DesignConvert.getH(44),
                    borderRadius: DesignConvert.getW(13),
                    justifyContent: "center",
                }}
                onPress={this._onPress}
            >

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>

                    <Text
                        style={{
                            color: "#B8B8B8",
                            fontSize: DesignConvert.getF(13),
                            fontWeight: "normal",
                            alignSelf: "center",
                            marginRight: DesignConvert.getW(5),
                        }}
                    >{this.props.btnText}</Text>

                    <Image
                        source={this.props.rightImg ? this.props.rightImg : require('../../hardcode/skin_imgs/record').record_date()}
                        style={{
                            width: DesignConvert.getW(18),
                            height: DesignConvert.getW(18),
                            display: !this.props.bHideArrowDown ? "flex" : "none",
                        }} />
                </View>


            </TouchableOpacity>
        );
    }
}

const [DATE_START, DATE_END] = ["DATE_START", "DATE_END"];
export default class RecordView extends BaseView {

    constructor(props) {
        super(props);

        this._startDate = '2020-04-01';
        this._endDate = moment().format(this._getDateFormat());

        this._datePickerType = DATE_START;

        this._liveNo = 'A' + UserInfoCache.userId;
        this._roomIdSelected = this._liveNo;
        this._roomIdsPickerVisible = false;
        this._payPassword = '';

        this._totalMoney = 0;
        this._row = 15;
        this._lastId = '';
        this._isLoading = false;
        this._isLoadmore = false;
        this._loadmoreEnable = false;

        this._isEmpty = true;
        //流水
        this._flowList = [];
        this._giftList = [];

        this._roomIdsList = [this._liveNo];

        //Timer
        this._refreshTimer;
        this._loadMoreTimer;
    }

    _onBackPress = () => {
        this.popSelf();
    };

    /**
     * 日期按钮记录按下那个
     */
    _onStartDateBtnPress = () => {
        this._datePickerType = DATE_START;
        require("../../router/level3_router").showDatePickerDialog(this._onDateChangePress, this._getDateFormat());
        this.forceUpdate();
    };

    _onEndDateBtnPress = () => {
        this._datePickerType = DATE_END;
        require("../../router/level3_router").showDatePickerDialog(this._onDateChangePress, this._getDateFormat());
        this.forceUpdate();
    };

    /**
     * 日期格式
     */
    _getDateFormat = () => {
        if (this.props.params.viewType == liveFlowRecord || this.props.params.viewType == giftGoldRecord) {
            return "YYYY-MM";
        } else {
            return "YYYY-MM-DD";
        }
    }

    /**
     * datePicker返回数据
     */
    _onDateChangePress = s => {
        // console.log("时间", s, this._datePickerType)
        if (this._datePickerType == DATE_START) {
            this._startDate = s;
        } else {
            this._endDate = s;
        }

        this.forceUpdate();
        this._onRefresh();
    };

    /**
     * Picker的确定按钮
     */
    _onRoomIDChangePress = (item) => {
        this._liveNo = item.text;
        // this._liveNo = this._roomIdSelected;

        // this._roomIdsPickerVisible = false;
        this.forceUpdate();
        this._onRefresh();
    };

    _onLiveNoBtnPress = () => {
        let items = [];
        this._roomIdsList.forEach(element => {
            items.push({ text: element, onPress: this._onRoomIDChangePress })
        });
        require("../../router/level4_router").showListDialog(items);
        // this._roomIdsPickerVisible = true;
        // this.forceUpdate();
    };

    _onRefresh = () => {
        this._isLoading = true;
        this.forceUpdate();

        this._lastId = '';
        this._initData();

        //取消刷新
        this._refreshTimer = setTimeout(() => {
            this._isLoading = false;
            this.forceUpdate();
        }, 5000);
    };


    _onLoadMore = () => {
        if (this._loadmoreEnable && !this._isLoadmore && !this._isLoading) {
            this._isLoadmore = true;
            this.forceUpdate();

            if (!this._loadmoreEnable) {
                //取消加载
                this._loadMoreTimer = setTimeout(() => {
                    this._isLoadmore = false;
                    this.forceUpdate();
                }, 2000);
            } else {
                this._initData();
            }
        }
    };

    /**
     * roomIdsPicker滑动时暂存
     */
    _onPickerSelect = (index) => {
        // console.log(index);
        this._roomIdSelected = this._roomIdsList[index];
    };

    /**
     * 加载时加载动画
     */
    _renderFooter() {
        if (!this._loadmoreEnable && this._isLoadmore) {
            return (
                <View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Text style={{
                        color: '#999999',
                        fontSize: 14,
                        marginTop: 5,
                        marginBottom: 5,
                    }}
                    >没有更多数据了</Text>
                </View>
            );
        } else if (this._loadmoreEnable && this._isLoadmore) {
            return (
                <View style={{
                    flexDirection: 'row',
                    height: DesignConvert.getH(24),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: DesignConvert.getH(10),
                }}>
                    <ActivityIndicator />
                    <Text>正在加载更多数据...</Text>
                </View>
            );
        } else {
            return (
                <View></View>
            );
        }
    }

    _initData() {
        if (this.props.params.viewType == flowRecord) {
            //流水记录

            require('../../model/anchorincome/RecordViewModel').default.getLiveRecvList(this._startDate, this._endDate, this._row, this._lastId)
                .then((data) => {
                    // console.log(data);

                    if (this._isLoadmore) {
                        this._flowList = this._flowList.concat(data);
                    } else {
                        // console.log(this._flowList);
                        this._flowList = data;
                    }

                    this._flowList.forEach(item => {
                        item.img = { uri: Config.getGiftUrl(item.giftId, item.giftLogoTime) };
                        item.rightText = '+' + StringUtil.formatMoney(Math.floor(item.recv) / 100) + '元';
                        item.rightTextStyle = { fontSize: DesignConvert.getF(16), fontWeight: "bold", };
                        item.leftText = decodeURI(item.sendUserBase.nickName);
                        item.time = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss');
                        //头像
                        item.imageUri = Config.getHeadUrl(item.sendUserBase.userId, item.sendUserBase.logoTime, item.sendUserBase.thirdIconurl);
                    });

                    this._isEmpty = this._isLoading && this._flowList.length == 0;

                    this._loadmoreEnable = data.length == this._row;
                    // console.log("_loadmoreEnable",this._loadmoreEnable);
                    this._lastId = this._loadmoreEnable ? this._flowList[this._flowList.length - 1].id : '';
                    // console.log("_lastId", this._lastId);
                    this._isLoading = false;
                    this._isLoadmore = false;
                    this.forceUpdate();
                });

        } else if (this.props.params.viewType == withdrawRecord) {
            //提现记录
            require('../../model/anchorincome/RecordViewModel').default.getLiveExpense(this._startDate, this._endDate)
                .then(data => {
                    this._totalMoney = Math.floor(data.data) / 100;
                    this.forceUpdate();
                });

            require('../../model/anchorincome/RecordViewModel').default.getLiveExpenseList(this._startDate, this._endDate, this._row, '')
                .then(data => {
                    if (this._isLoadmore) {
                        this._flowList = this._flowList.concat(data);
                    } else {
                        // console.log(this._flowList);
                        this._flowList = data;
                    }

                    this._flowList.forEach((item) => {
                        item.rightText = Math.floor(item.money) / 100 + '元';
                        item.rightTextStyle = { fontSize: DesignConvert.getF(16), fontWeight: "bold", };

                        item.timeStyle = item.status == 1 ? { color: '#3ED584', } : { color: '#FF6850', };
                        //判断状态类型
                        switch (item.status) {
                            case 1:
                                item.time = '已到账';
                                break;
                            case 2:
                                item.time = '请求失败';
                                break;
                            case 3:
                                item.time = '失败';
                                break;
                            case 4:
                            case 16:
                                item.time = '系统处理中';
                                break;
                            case 5:
                            case 6:
                            case 9:
                            case 11:
                                item.time = '审核中';
                                break;
                            case 7:
                                item.time = '已过期';
                                break;
                            case 8:
                            case 14:
                                item.time = '审核不通过';
                                break;
                            case 12:
                                item.time = '提现账号不存在';
                                break;
                            case 13:
                                item.time = '实名信息不一致';
                                break;
                            case 15:
                                item.time = '等待运营审核';
                                break;
                            case 17:
                                item.time = '系统处理失败，转账异常';
                                break;
                        }
                        //判断支付类型
                        // switch(item.payType) {
                        //     case 1:
                        //         item.leftText = "支付宝";
                        //         item.img = record_alipay();;
                        //         break;
                        //     case 4:
                        //         item.leftText = "微信";
                        //         item.img = record_wechat();
                        //         break;
                        //     case 11:
                        //         item.leftText = "银行卡";
                        //         item.img = record_bank();
                        //         break;
                        // }
                        item.content = '收益提现-银行卡';
                        // item.img = record_alipay();

                        item.leftText = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss');
                        item.leftTextStyle = { color: '#AEAEAE', };
                    });

                    this._isEmpty = this._isLoading && this._flowList.length == 0;
                    // console.log(this._isEmpty);

                    this._loadmoreEnable = data.length == this._row;
                    this._lastId = this._loadmoreEnable ? this._flowList[this._flowList.length - 1].id : '';
                    this._isLoading = false;
                    this._isLoadmore = false;
                    this.forceUpdate();
                });
        } else if (this.props.params.viewType == rechargeRecord) {
            //充值记录
            require('../../model/anchorincome/RecordViewModel').default.getRechargeData(this._startDate, this._endDate, this._row, '')
                .then(data => {
                    if (this._isLoadmore) {
                        this._flowList = this._flowList.concat(data);
                    } else {
                        this._totalMoney = 0;
                        this._flowList = data;
                    }
                    // console.log("充值记录", this._flowList);
                    this._flowList.forEach((item) => {
                        if (item.status == 1) {
                            this._totalMoney += Math.floor(item.money) / 100;
                        }

                        item.rightText = Math.floor(item.money) / 100 + '元';
                        item.rightTextStyle = { fontSize: DesignConvert.getF(16), fontWeight: "bold", };
                        //判断状态类型
                        item.content = item.state == 1 ? '充值成功' : '充值失败';
                        item.contentStyle = { color: item.state == 1 ? '#3ED584' : '#FF6850' };
                        item.leftImg = record_coin();
                        switch (item.payType) {
                            case -3:
                                item.leftText = '交易关闭';
                                break
                            case -2:
                                item.leftText = 'Apply沙盒';
                                break;
                            case -1:
                                item.leftText = '虚拟订单';
                                break;
                            case 1:
                            case 8:
                            case 9:
                                item.leftText = '支付宝支付';
                                break;
                            case 2:
                            case 7:
                            case 10:
                                item.leftText = '微信支付';
                                break;
                            case 3:
                                item.leftText = 'Apple';
                                break;
                            case 4:
                                item.leftText = '微信公众号';
                                break;
                            case 5:
                                item.leftText = '他人代充';
                                break;
                            case 6:
                                item.leftText = '阿里公众号';
                                break;
                            case 32:
                                item.leftText = `公会收益${COIN_NAME}回购`;
                                break;
                            case 33:
                                item.leftText = `红包收益${COIN_NAME}回购`;
                                break;
                            default:
                                item.leftText = '其他';
                        }
                        item.time = moment(item.logTime).format('YYYY-MM-DD HH:mm:ss');
                    });

                    this._isEmpty = this._isLoading && this._flowList.length == 0;
                    // console.log(this._isEmpty);

                    this._loadmoreEnable = data.length == this._row;
                    this._lastId = this._loadmoreEnable ? this._flowList[this._flowList.length - 1].id : '';
                    this._isLoading = false;
                    this._isLoadmore = false;
                    this.forceUpdate();
                });
        } else if (this.props.params.viewType == exchangeRecord) {
            //兑换记录
            require('../../model/anchorincome/RecordViewModel').default.getLiveExchangeList(this._startDate, this._endDate, this._row, '')
                .then(data => {
                    if (this._isLoadmore) {
                        this._flowList = this._flowList.concat(data);
                    } else {
                        this._totalMoney = 0;
                        this._flowList = data;
                    }
                    // console.log("兑换记录",this._flowList);
                    this._flowList.forEach((item) => {
                        this._totalMoney += item.goldShell;

                        //item.type == 1 ? '兑换成功' : "兑换失败";   { fontSize: DesignConvert.getF(16), color: item.type == 1 ? "#78EB7C" : "#FF3B30" };
                        item.content = item.goldShell;
                        item.contentStyle = { fontSize: DesignConvert.getF(16), color: "#212121", fontWeight: "bold", };
                        item.img = record_coin();

                        item.rightText = `-${StringUtil.formatMoney(Math.floor(item.money) / 100)}`;
                        item.rightTextStyle = { fontSize: DesignConvert.getF(13), fontWeight: "bold", };
                        item.leftText = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss');
                        item.leftTextStyle = { color: "#AEAEAE" };
                        item.time = item.type == 1 ? '兑换成功' : "兑换失败";
                        item.timeStyle = { color: item.type == 1 ? "#78EB7C" : "#FF3B30" };
                    });

                    this._isEmpty = this._isLoading && this._flowList.length == 0;
                    // console.log(this._isEmpty);

                    this._loadmoreEnable = data.length == this._row;
                    this._lastId = this._loadmoreEnable ? this._flowList[this._flowList.length - 1].id : '';
                    this._isLoading = false;
                    this._isLoadmore = false;
                    this.forceUpdate();
                });
        } else if (this.props.params.viewType == giftGoldRecord) {
            //转赠记录
            require('../../model/anchorincome/RecordViewModel').default.getSendGoldShellLog(this._endDate, this._lastId)
                .then(data => {
                    if (this._isLoadmore) {
                        this._flowList = this._flowList.concat(data);
                    } else {
                        this._totalMoney = 0;
                        this._flowList = data;
                    }
                    // console.log("转赠记录",this._flowList);
                    this._flowList.forEach((item) => {
                        this._totalMoney += item.goldShell;

                        item.time = item.statusMsg;
                        item.timeStyle = item.statusMsg.indexOf("成功") != -1 ? { color: '#71E664', } : { color: '#FF5353', }
                        item.rightText = item.goldShell;
                        item.rightTextStyle = { fontSize: DesignConvert.getF(16), fontWeight: "bold", };
                        item.content = '转赠ID:' + item.targetId;
                        item.rightImg = record_coin();
                        // console.log("转赠记录", moment(item.recordDate, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm:ss"));
                        item.leftText = moment(item.recordDate, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss');
                        item.leftTextStyle = { color: "#AEAEAE" };
                    });

                    this._isEmpty = this._isLoading && this._flowList.length == 0;
                    // console.log(this._isEmpty);

                    this._loadmoreEnable = data.length == 30;
                    this._lastId = this._loadmoreEnable ? this._flowList[this._flowList.length - 1].id : '';
                    this._isLoading = false;
                    this._isLoadmore = false;
                    this.forceUpdate();
                });
        } else {
            //直播间流水
            require('../../model/anchorincome/RecordViewModel').default.getMyLiveList()
                .then(data => {
                    this._roomIdsList = this._roomIdsList.concat(data);
                });

            require('../../model/anchorincome/RecordViewModel').default.getLiveEarningData(this._endDate, 1, this._liveNo, this._row, '')
                .then(data => {
                    if (data == undefined) {
                        return;
                    }

                    data.list.forEach((item) => {
                        item.content = "礼物收入";
                        item.contentStyle = { fontSize: DesignConvert.getF(13), color: "#212121", fontWeight: "bold", };
                        item.rightText = StringUtil.formatMoney(Math.floor(item.money) / 100) + '元';
                        item.rightTextStyle = { fontSize: DesignConvert.getF(16), fontWeight: "bold", };
                        item.leftText = item.recordDate;
                        item.leftTextStyle = { color: "#AEAEAE" };
                        item.time = '';
                    });

                    this._totalMoney = Math.floor(data.total) / 100;

                    if (this._isLoadmore) {
                        this._flowList = this._flowList.concat(data.list);
                    } else {
                        this._flowList = data.list;
                    }

                    this._isEmpty = this._isLoading && this._flowList.length == 0;
                    // console.log(this._isEmpty);

                    this._loadmoreEnable = data.list.length == this._row;
                    this._lastId = this._loadmoreEnable ? this._flowList[this._flowList.length - 1].id : '';
                    this._isLoading = false;
                    this._isLoadmore = false;
                    this.forceUpdate();
                });
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this._initData();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        clearTimeout(this._refreshTimer);
        clearTimeout(this._loadMoreTimer);
    }

    _title = () => {
        if (this.props.params.viewType == flowRecord) {
            return '礼物流水';
        } else if (this.props.params.viewType == withdrawRecord) {
            return '提现记录';
        } else if (this.props.params.viewType == exchangeRecord) {
            return '兑换记录';
        } else if (this.props.params.viewType == giftGoldRecord) {
            return '红包记录';
        } else if (this.props.params.viewType == rechargeRecord) {
            return '消费记录';
        } else {
            return '直播间流水';
        }
    };

    _topBar = () => {

        return (
            <View>
                <View
                    style={{
                        width: DesignConvert.getW(345),
                        height: DesignConvert.getH(44),
                        flexDirection: 'row',
                        backgroundColor: "white",
                        alignItems: "center",
                        borderRadius: DesignConvert.getW(12),
                        paddingHorizontal: DesignConvert.getW(15),
                        marginVertical: DesignConvert.getH(15),
                    }}>

                    <TimeChooseButton
                        onPress={this._onEndDateBtnPress}
                        btnText={this._endDate} />

                    {this.props.params.viewType == liveFlowRecord ? (

                        <TouchableOpacity
                            style={{
                                width: DesignConvert.getW(74),
                                height: DesignConvert.getH(24),
                                borderRadius: DesignConvert.getW(15),
                                backgroundColor: "#F8F5FF",
                                justifyContent: "center",
                                alignItems: "center",
                                marginLeft: DesignConvert.getW(10),
                            }}
                            onPress={this._onLiveNoBtnPress}>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: "center",
                                    alignItems: 'center',
                                }}>

                                <Text
                                    style={{
                                        color: THEME_COLOR,
                                        fontSize: DesignConvert.getF(12),
                                        fontWeight: "normal",
                                        alignSelf: "center",
                                        marginRight: DesignConvert.getW(5),
                                    }}
                                >{this._liveNo}</Text>

                                <Image
                                    source={require('../../hardcode/skin_imgs/common').inverted_triangle()}
                                    style={{
                                        width: DesignConvert.getW(6),
                                        height: DesignConvert.getW(6),
                                        tintColor: THEME_COLOR,
                                        display: !this.props.bHideArrowDown ? "flex" : "none",
                                    }} />
                            </View>

                        </TouchableOpacity>
                    ) : null}

                    {this.props.params.viewType == liveFlowRecord ? (
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                alignItems: "center",
                            }}>
                            <Text
                                style={{
                                    color: THEME_COLOR,
                                    fontSize: DesignConvert.getF(13),
                                    fontWeight: "normal",
                                    alignSelf: "center",
                                    marginLeft: DesignConvert.getW(40),
                                }}
                            >{`合计:￥${StringUtil.formatMoney(this._totalMoney)}`}</Text>
                        </View>
                    ) : null}

                    {/* <View
                        style={{
                            alignSelf: 'center',
                            width: DesignConvert.getW(1),
                            height: DesignConvert.getH(30),
                            backgroundColor: '#F1F1F1',
                        }}></View>

                    <TimeChooseButton
                        bHideArrowDown
                        title="合计"
                        btnText={StringUtil.formatMoney(this._totalMoney, 0) + COIN_NAME} /> */}
                </View>

                {/* <View style={styles.grayline} /> */}
            </View>
        );
    }




    _emptyPage() {
        return (
            <View
                style={{
                    flex: 1,
                    width: DesignConvert.swidth,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {/* <Image
                    source={require('../../hardcode/skin_imgs/anchorincome').default_record2()}
                    style={{
                        width: DesignConvert.getW(136),
                        height: DesignConvert.getH(90.5),
                        marginTop: DesignConvert.getH(120),
                    }}/> */}

                <Text style={{
                    marginTop: DesignConvert.getH(16.5),
                    color: '#797979',
                    fontSize: DesignConvert.getF(15),
                }}>暂无{this._title()}
                </Text>
            </View>
        );
    }

    _renderItem = ({ item }) => {
        return (
            <RecordNormalItem
                item={item} />
        )

    }


    render() {

        return (
            <View
                style={{
                    width: DesignConvert.swidth,
                    flex: 1,
                    backgroundColor: '#FCFCFC',
                }}>

                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#FCFCFC', '#FCFCFC']}
                    style={{
                        alignItems: "center",
                    }}>

                    {this.props.hideTitle ? null : (
                        <BackTitleView
                            titleText={this._title()}
                            onBack={this._onBackPress}
                            containerStyle={{
                                backgroundColor: "white",
                            }}
                        />
                    )}


                    {this._topBar()}
                </LinearGradient>

                {this.props.params.viewType == flowRecord ? (
                    <View
                        style={{
                            width: DesignConvert.swidth,
                            height: DesignConvert.getH(39),
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: DesignConvert.getW(36),
                            backgroundColor: "white",
                        }}
                    >
                        <Text
                            style={{
                                color: "#D2D2D2",
                                fontSize: DesignConvert.getF(11),
                                fontWeight: "normal",
                                alignSelf: "center",
                            }}>礼物明细</Text>

                        <View style={{ flex: 1 }}></View>

                        <Text
                            style={{
                                color: "#D2D2D2",
                                fontSize: DesignConvert.getF(11),
                                fontWeight: "normal",
                                alignSelf: "center",
                            }}>流水</Text>

                        <View
                            style={{
                                backgroundColor: "#F6F6F6",
                                width: DesignConvert.swidth,
                                height: DesignConvert.getH(1),
                                position: "absolute",
                                bottom: 0,
                            }}></View>
                    </View>
                ) : null}

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this._flowList}
                    renderItem={this._renderItem}
                    ListEmptyComponent={this._emptyPage()}
                    refreshing={this._isLoading}
                    onRefresh={this._onRefresh}

                    ListFooterComponent={this._renderFooter()}
                    onEndReached={this._onLoadMore}
                    onEndReachedThreshold={0.2}
                    style={{
                        backgroundColor: "white",
                    }}
                />

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this._roomIdsPickerVisible}
                    onRequestClose={() => {
                        this._roomIdsPickerVisible = false;
                        this.forceUpdate();
                    }}>
                    <View
                        style={{
                            width: DesignConvert.swidth,
                            flex: 1,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}>

                        <View
                            style={{
                                width: DesignConvert.swidth,
                                height: DesignConvert.getH(50),
                                backgroundColor: 'white',
                                borderTopLeftRadius: DesignConvert.getW(8),
                                borderTopRightRadius: DesignConvert.getW(8),
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingLeft: DesignConvert.getW(15),
                                paddingRight: DesignConvert.getW(15),
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    this._roomIdsPickerVisible = false;
                                    this.forceUpdate();
                                }}
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    paddingHorizontal: DesignConvert.getW(15),
                                }}>
                                <Text
                                    style={{
                                        color: '#B8B8B8',
                                        fontSize: DesignConvert.getF(16),
                                        fontWeight: 'normal',
                                    }}>取消</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={this._onRoomIDChangePress}
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "flex-end",
                                    paddingHorizontal: DesignConvert.getW(15),
                                }}>
                                <Text
                                    style={{
                                        color: THEME_COLOR,
                                        fontSize: DesignConvert.getF(16),
                                        fontWeight: 'normal',
                                    }}>确定</Text>
                            </TouchableOpacity>

                            <View
                                style={{
                                    backgroundColor: "#F1F1F1",
                                    width: DesignConvert.swidth,
                                    height: DesignConvert.getH(1),
                                    position: "absolute",
                                    bottom: 0,
                                }}></View>
                        </View>

                        <Picker
                            style={{
                                width: DesignConvert.swidth,
                                height: DesignConvert.getH(200),
                                backgroundColor: 'white',
                            }}
                            selectedValue={0}
                            itemStyle={{
                                color: 'black',
                                fontSize: DesignConvert.getF(26),
                            }}
                            onValueChange={(index) => this._onPickerSelect(index)}>
                            {this._roomIdsList.map((i, value) => (
                                <PickerItem label={i} value={value} key={i} />
                            ))}
                        </Picker>
                    </View>
                </Modal>
            </View>
        );
    }
}
