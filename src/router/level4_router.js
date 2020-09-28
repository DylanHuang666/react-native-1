/**
 * 4级的界面
 */
'use strict';

import { Navigation } from "react-native-navigation";

const sm_screens = {};

/**
 * 错误界面
 */
export function showErrorView(message, stack) {
    const screendId = 'ErrorView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/error/ErrorView").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, { message, stack, }, true);
}

/**
 * 权限不可用的提示界面
 */
export const showUnavailablePermissionView = (permission) => {

    const screendId = 'UnavailablePermissionView';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/permission/UnavailablePermissionView").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, { permission }, true);
}

/**
 * ListDialog
 */
export const showListDialog = (items) => {
    const screendId = 'ListDialog';

    if (!sm_screens[screendId]) {
        sm_screens[screendId] = Navigation.registerComponent(screendId, () => require("../view/mywallet/ListDialog").default);
    }

    require("./ScreensHelper").default.showOverlay(screendId, { items }, true);
}