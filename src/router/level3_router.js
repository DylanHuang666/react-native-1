/**
 * 3级的界面
 */
'use strict';

import { Navigation } from "react-native-navigation";
import { Platform } from "react-native";
import UserInfoCache from "../cache/UserInfoCache";
// EditSexDialog
const sm_screens = {};

/**
 * 提现
 */
export function showWithdrawView(accountMoney, maxCatchValue) {
    const screendId = 'WithdrawView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/anchorincome/WithdrawView").default);
    }

    require("./ScreensHelper").default.push(screendId, { accountMoney, maxCatchValue, }, true);
}

/**
 * 银行卡提现
 */
export function showWithdrawalFromBankView(accountMoney, minCatchValue, maxCatchValue) {
    const screendId = 'WithdrawalFromBankView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/anchorincome/WithdrawalFromBankView").default);
    }

    require("./ScreensHelper").default.push(screendId, { accountMoney, minCatchValue, maxCatchValue, }, true);
}

/**
 * 兑换金币
 */
export function showConVertView() {
    const screendId = 'ConVertView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/anchorincome/ConvertView").default);
    }

    require("./ScreensHelper").default.push(screendId, null, true);
}

/**
 * 验证支付密码
 */
export const showVerifyPayPasswordView = (rechargeId, exchargePrice, targetId) => {
    const screendId = 'VerifyPayPasswordView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/anchorincome/VerifyPayPasswordView").default);
    }

    require("./ScreensHelper").default.push(screendId, { rechargeId, exchargePrice, targetId }, true);
}

/**
 * 各种记录页   {流水记录，提现记录， 兑换记录， 直播间记录}
 * viewType {flowRecord, withdrawRecord, exchangeRecord, liveFlowRecord}
 */
export const showRecordView = (viewType) => {
    const screendId = 'RecordView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/anchorincome/RecordView").default);
    }

    require("./ScreensHelper").default.push(screendId, { viewType: viewType, }, true);
}

export const showRecordView_showOverlay = (viewType) => {
    const screendId = 'RecordView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/anchorincome/RecordView").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, { viewType: viewType, }, true);
}

export const showTabRecordView = (viewType) => {
    const screendId = 'TabRecordView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/anchorincome/TabRecordView").default);
    }

    require("./ScreensHelper").default.push(screendId, { viewType: viewType, }, true);
}



/**
 * 设置密码
 */
export const showUpdatePasswordView = (viewType) => {
    const screendId = 'UpdatePasswordView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/setting/UpdatePasswordView").default);
    }

    require("./ScreensHelper").default.push(screendId, { viewType, }, true);
}

/**
 * 绑定我的手机号
 */
export const showBindMyPhoneView = () => {
    const screendId = 'BindMyPhoneView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/setting/BindMyPhoneView").default);
    }

    require("./ScreensHelper").default.push(screendId, null, true);
}

/**
 * 绑定手机号
 */
export const showBindPhoneView = () => {
    const screendId = 'BindPhoneView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/setting/BindPhoneView").default);
    }

    require("./ScreensHelper").default.push(screendId, null, true);
}

/**
 * 更换手机号
 */
export const showAlreadyBindPhoneView = () => {
    const screendId = 'AlreadyBindPhoneView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/setting/AlreadyBindPhoneView").default);
    }

    require("./ScreensHelper").default.push(screendId, null, true);
}

/**
 * 关于我们
 */
export const showAboutUsView = () => {
    const screendId = 'AboutUsView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/setting/AboutUsView").default);
    }

    require("./ScreensHelper").default.push(screendId, null, true);
}

/**
 * 修改页面
 */
export const showUserInfoEditDetailView = (viewType, text = "", callBack = (text) => { }) => {
    const screendId = 'UserInfoEditDetailView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/user_info_edit/UserInfoEditDetailView").default);
    }

    require("./ScreensHelper").default.push(screendId, { viewType, text, callBack }, true);
}

/**
 * 修改生日
 */
export const showBirthdaySelect = (callBack) => {
    const screendId = 'BirthdaySelect';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/user_info_edit/BirthdaySelect").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, { callBack }, true);
}

/**
 * 音乐库
 */
export const showMusicLibraryView = () => {
    const screendId = 'MusicLibraryView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/musiclibrary/MusicLibraryView").default);
    }

    require("./ScreensHelper").default.push(screendId, null, true);
}

/**
 * 用户资料Dialog
 */
export const showInfoDialog = (pullBlackPress, reportPress, cancelAttiend, isPullBlack) => {
    const screendId = 'InfoDialog';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/userinfo/InfoDialog").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, { pullBlackPress, reportPress, cancelAttiend, isPullBlack, }, true);
}

/**
 * 举报Dialog
 * // 举报入口，1-个人主页，2-个人签名卡片，3-个人动态，4-聊天页面 5-群举报
 */
export const showReportDialog = (userId, entrance = 1) => {
    const screendId = 'ReportDialog';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/userinfo/ReportDialog").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, { userId, entrance, }, true);
}

/**
 * 会话设置
 */
export const showChatSettingView = (isGroup, userId) => {
    const screendId = 'ChatSettingView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/main/message/ChatSettingView").default);
    }

    require("./ScreensHelper").default.push(screendId, { userId, isGroup, }, true);
}

/**

 * 退出房间界面
 * @param {Function} fnCloseCallerView
 */
export const showExitRoomView = (fnCloseCallerView) => {
    const screendId = 'ExitRoomView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/room/ExitRoomView").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, { fnCloseCallerView }, true);
}

/**
 * 房间公告
 */
export const showRoomNoticeView = () => {
    const screendId = 'RoomNoticeView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/room/RoomNoticeView").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, null, true);
}

/**
 * 房间公告编辑
 */
export const showRoomEditNoticeView = () => {
    const screendId = 'RoomEditNoticeView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/room/RoomEditNoticeView").default);
    }

    require("./ScreensHelper").default.push(screendId, null, true);
}

/**
 * 房间麦位操作菜单
 * @param {MicInfo} micInfo 
 */
export const showSeatOpMenuView = (isMainMic, micInfo) => {
    const screendId = 'SeatOpMenuView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/room/SeatOpMenuView").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, { isMainMic, micInfo }, true);
}


/**
 * 房间麦下操作菜单
 * @param {MicInfo} micInfo 
 */
export const showUnderOpMenuView = (userId) => {
    const screendId = 'UnderOpMenuView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/room/UnderOpMenuView").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, { userId, }, true);
}


/**
 * 房间更多更面
 */
export const showRoomMoreView = (fnCloseCallerView) => {
    const screendId = 'RoomMoreView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/room/RoomMoreView").default);
    }
    require("./ScreensHelper").default.showOverlay(screendId, { fnCloseCallerView }, true, '#00000000');
}


/**
 * 用户资料卡片
 */
export const showUserCardView = (userId) => {

    const screendId = 'UserCardView'

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require('../view/room/UserCardView').default)
    }
    require('./ScreensHelper').default.showOverlay(screendId, { userId, }, true, '#00000000');
}

/**
 * 活动WebView界面
 */
export const openActivityWebView = (url) => {
    const screendId = 'ActivityWebView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require('../view/web/ActivityWebView').default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, { url, }, true, '#00000000');
}

/**
 * 房间设置
 */
export const oepnRoomSetView = () => {
    const screendId = 'RoomSetView'

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require('../view/room/RoomSetView').default)
    }

    require('./ScreensHelper').default.push(screendId, null, true)
}



/**
 * 房间管理员
 */
export const showRoomManagerView = (roomId) => {
    const screendId = 'RoomManagerView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/room/RoomManagerView").default);
    }

    require("./ScreensHelper").default.push(screendId, { roomId, }, true);
}

/**
 * 在线人员
 */
export const showOnlineMemberPage = (roomId) => {
    const screendId = 'OnlineMemberPage';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/room/OnlineMemberPage").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, { roomId, }, true);
}

/**
 * 房间排行榜
 */
export const showRoomRankPage = (roomId, toTop) => {
    const screendId = 'RoomRankPage';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/room/item/RoomRankPage").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, { roomId, toTop, }, true, '#00000000');
}

/**
 * 礼物面板
 */
export const showRoomGiftPanelView = (userId) => {
    const screendId = 'RoomGiftPanelView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/room/RoomGiftPanelView").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, { userId, }, true, '#00000000');
}

/**
 * 大表情弹窗
 */
export const showRoomBigFaceView = () => {
    const screendId = 'RoomBigFaceView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/room/RoomBigFaceView").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, null, true, '#00000000');
}
/**
 * 送礼物组选择界面
 */
export const showRoomGiftGroupChooseView = () => {
    const screendId = 'RoomGiftGroupChooseView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/room/RoomGiftGroupChooseView").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, null, true, '#00000000');
}


/**
 * 房间消息列表
 */
export const showRoomConversationView = () => {
    const screendId = 'RoomConversationView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/room/RoomConversationView").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, null, true, '#00000000');
}


/**
 * 房间会话
 */
export const showRoomChatView = (id, nickName, isGroup) => {
    const screendId = 'RoomChatView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/room/RoomChatView").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, { id, nickName, isGroup, }, true, '#00000000');
}
/*
 * 房间密码设置
 */
export const showSetPassword = (type, roomId) => {
    const screendId = 'SetPassword';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/room/diolag/SetPassword").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, { type, roomId, }, true);
}

/**
 * 房间密码是否取消
 */
export const showCanclePassword = () => {
    const screendId = 'CanclePassword';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/room/diolag/CanclePassword").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, null, true);
}


/**
 * 直播间转赠
 */
export const showSendGoldShellDialog = (userId, nickName, headUrl) => {
    const screendId = 'SendGoldShellDialog'

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require('../view/room/diolag/SendGoldShellDialog').default);
    }
    require('./ScreensHelper').default.showOverlay(screendId, { userId, nickName, headUrl, }, true, '#00000000');
}

/**
 * 等级说明
 */
export const showLevelDescriptionDetailView = (viewType = 233) => {
    const screendId = 'LevelDescriptionDetailView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/main/mine/LevelDescriptionDetailView").default);
    }

    require("./ScreensHelper").default.push(screendId, { viewType, }, true);
}
/**
 * 排麦面板
 */
export const showMicQueView = () => {
    const screendId = 'MicQueView'

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require('../view/room/MicQueView').default);
    }
    require('./ScreensHelper').default.showOverlay(screendId, null, true, '#00000000');
}

/**
 * 房间黑名单
 */
export const showRoomBlackListView = () => {
    const screendId = 'RoomBlackListView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/room/RoomBlackListView").default);
    }

    require("./ScreensHelper").default.push(screendId, null, true);
}

/**
 * 记录弹窗
 */
export const showRecordDialog = () => {
    const screendId = 'RecordDialog';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/anchorincome/record/RecordDialog").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, null, true, "tranparent");
}

/**
 * 支付弹窗
 */
export const showPaySelectedDialog = (payMoney = 1, selectedPayTypeCallBack) => {
    const screendId = 'PaySelectedDialog';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/mywallet/PaySelectedDialog").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, { payMoney, selectedPayTypeCallBack }, true, "tranparent");
}

/**
 * 时间选择器弹窗
 */
export const showDatePickerDialog = (dateSelectedCallback, dateFormatString = "YYYY-MM-DD", selectedTime = new Date()) => {
    const screendId = 'DatePickerDialog';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/user_info_edit/DatePickerDialog").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, { dateSelectedCallback, selectedTime, dateFormatString }, true, "tranparent");
}

/**
 * 转赠页面
 */
export const showDiamondGiftView = (userId = UserInfoCache.userId) => {
    const screendId = 'DiamondGiftView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/mywallet/DiamondGiftView").default);
    }

    require("./ScreensHelper").default.push(screendId, { userId }, true);
}

/**
 * 性别变化
 */
// export const showeEditSexDialog = () => {
//     const screendId = 'EditSexDialog';

//     if (!sm_screens[screendId]) {
//         sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/user_info_edit/EditSexDialog").default);
//     }

//     require("./ScreensHelper").default.showOverlay(screendId, null, true);
// }
export const showeEditSexDialog = (sex, change) => {
    const screendId = 'EditSexDialog';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/user_info_edit/EditSexDialog").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, { sex, change }, true);
}
// export const showCanclePassword = () => {
//     const screendId = 'CanclePassword';

//     if (!sm_screens[screendId]) {
//         sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/room/diolag/CanclePassword").default);
//     }

//     require("./ScreensHelper").default.showOverlay(screendId, null, true);
// }