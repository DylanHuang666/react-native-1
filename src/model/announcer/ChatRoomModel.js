/**
 * 陪聊聊天室
 */

'use strict';

import RoomInfoCache from "../../cache/RoomInfoCache";
import UserInfoCache from "../../cache/UserInfoCache";



/**
 * 获得对方的MicInfo
 * @returns {MicInfo}
 */
export const getPeerMicInfo = () => {
    const roomData = RoomInfoCache.roomData;
    if (!roomData) return null;

    if (!roomData.infos) return null;

    for (const micInfo of roomData.infos) {
        if (!micInfo) continue;

        if (!micInfo.base) continue;

        if (micInfo.base.userId == UserInfoCache.userId) continue;

        return micInfo;
    }

    return null;
}