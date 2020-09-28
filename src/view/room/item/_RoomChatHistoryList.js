'use strict';

import React, { PureComponent } from "react";
import { FlatList } from "react-native";
import DesignConvert from "../../../utils/DesignConvert";
import _PublicScreenMessageLocalItem from "./chat/_PublicScreenMessageLocalItem";
import _PublicScreenMessageEnterRoomItem from "./chat/_PublicScreenMessageEnterRoomItem";
import _PublicScreenMessageGiftItem from "./chat/_PublicScreenMessageGiftItem";
import _PublicScreenMessageBingoItem from "./chat/_PublicScreenMessageBingoItem";
import _PublicScreenMessageTipsItem from "./chat/_PublicScreenMessageTipsItem";
import _PublicScreenFollowNotice from "./chat/_PublicScreenFollowNotice";
import _PublicScreenMessageActivityItem from "./chat/_PublicScreenMessageActivityItem";
import {
    getInfos,
    getUpdateTimes,
    TYPE_ENTER_ROOM,
    TYPE_SYSTEM_NOTICE,
    TYPE_SMASH_EGG,
    TYPE_GIFT,
    TYPE_TEXT,
    TYPE_IM_TEXT,
    TYPE_IM_PHOTO,
    TYPE_FOLLOW_NOTICE,
    TYPE_GIFT_ALL_MIC,
    TYPE_ACTIVITY_TEXT
} from "../../../cache/RoomPublicScreenCache";
import ModelEvent from "../../../utils/ModelEvent";
import { EVT_UPDATE_ROOM_PUBLIC_SCREEN } from "../../../hardcode/HGlobalEvent";
import _PublicScreenMessageItem from "./chat/_PublicScreenMessageItem";

export default class _RoomChatHistoryList extends PureComponent {

    constructor(props) {
        super(props);
        this._bBottom = true;
    }

    componentDidMount() {
        ModelEvent.addEvent(null, EVT_UPDATE_ROOM_PUBLIC_SCREEN, this._onUpdateEvent);
    }

    componentWillUnmount() {
        ModelEvent.removeEvent(null, EVT_UPDATE_ROOM_PUBLIC_SCREEN, this._onUpdateEvent);
    }

    _onUpdateEvent = () => {
        this.forceUpdate();
    }

    _onRenderItem = ({ item, index, separators }) => {
        switch (item.type) {
            case TYPE_ENTER_ROOM:
                return (
                    <_PublicScreenMessageEnterRoomItem
                        result={item.result}
                    />
                );

            case TYPE_SYSTEM_NOTICE:
                return (
                    <_PublicScreenMessageLocalItem
                        data={item.content}
                    />
                );

            case TYPE_SMASH_EGG:
                return (
                    <_PublicScreenMessageBingoItem
                        item={item}
                    />
                )

            case TYPE_GIFT:
                return (
                    <_PublicScreenMessageGiftItem
                        item={item.vo}
                        type={TYPE_GIFT}
                    />
                );
            case TYPE_GIFT_ALL_MIC:
                return (
                    <_PublicScreenMessageGiftItem
                        item={item.vo}
                        type={TYPE_GIFT_ALL_MIC}
                    />
                );

            case TYPE_TEXT:
                return (
                    <_PublicScreenMessageTipsItem
                        data={item.content}
                    />
                );

            case TYPE_IM_TEXT:
                return (
                    <_PublicScreenMessageItem
                        data={item.data}
                        type={TYPE_IM_TEXT}
                    />
                )

            case TYPE_IM_PHOTO:
                return (
                    <_PublicScreenMessageItem
                        data={item.data}
                        type={TYPE_IM_PHOTO}
                    />
                )

            case TYPE_FOLLOW_NOTICE:
                return (
                    <_PublicScreenFollowNotice
                        data={item.data}
                        type={TYPE_FOLLOW_NOTICE}
                    />
                )
            case TYPE_ACTIVITY_TEXT:
                return (
                    <_PublicScreenMessageActivityItem
                        item={item}
                    />
                )
            default:
                return null;
        }

        // if (item == 1) {
        //     return (
        //         <_PublicScreenMessageLocalItem
        //             data={'官方公告：欢迎来到甜心语音，甜心语音官方倡导绿色语音直播，对直播内容24小时巡查。任何传播违法、违规、低俗、暴力等不良信息将会封停账号。'}
        //         />
        //     )
        // } else if (item == 2) {
        //     return (
        //         <_PublicScreenMessageGiftItem
        //         />
        //     )
        // } else if (item == 3) {
        //     return (
        //         <_PublicScreenMessageBingoItem />
        //     );
        // } else if (item == 4) {
        //     return (
        //         <_PublicScreenMessageTipsItem
        //             data={'asdfhsafjsf'}
        //         />
        //     )
        // }
        // return (
        //     <_PublicScreenMessageEnterRoomItem
        //         name={'宾治'}
        //     />
        // );
    }

    _onDelayScollEnd = () => {
        this._refList && this._refList.scrollToEnd({ animated: false });
    }

    render() {
        const bottom = DesignConvert.getH(10 + 5) + DesignConvert.getH(42) + DesignConvert.addIpxBottomHeight();
        const top = DesignConvert.getH(350) + DesignConvert.statusBarHeight


        const data = getInfos();
        const extraData = getUpdateTimes();

        if (this._bBottom && data && data.length > 0) {
            setTimeout(this._onDelayScollEnd, 1);
        }

        return (

            <FlatList

                ref={ref => this._refList = ref}
                style={{
                    position: 'absolute',
                    left: DesignConvert.getW(12),
                    top: top,
                    bottom: bottom,

                    // width: DesignConvert.getW(260),
                    // height: DesignConvert.sheight - bottom - top,
                }}
                contentContainerStyle={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                }}
                data={data}
                renderItem={this._onRenderItem}
                showsVerticalScrollIndicator={false}
                extraData={extraData}
            />

            // <View
            //     style={{
            //         position: 'absolute',
            //         left: DesignConvert.getW(15),
            //         top: top,
            //         // bottom: bottom,

            //         width: DesignConvert.getW(260),
            //         height: DesignConvert.sheight - bottom - top,

            //         flexDirection: 'column',
            //         justifyContent: 'flex-start',
            //         alignItems: 'flex-start',
            //     }}
            // >
            //     <_PublicScreenMessageLocalItem
            //         data={'官方公告：欢迎来到甜心语音，甜心语音官方倡导绿色语音直播，对直播内容24小时巡查。任何传播违法、违规、低俗、暴力等不良信息将会封停账号。'}
            //     />

            //     <_PublicScreenMessageEnterRoomItem
            //         name={'宾治'}
            //     />

            // </View>
        )
    }

};