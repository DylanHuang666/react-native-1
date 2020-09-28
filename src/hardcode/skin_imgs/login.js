/*
 * @Author: 
 * @Date: 2020-09-09 10:49:12
 * @LastEditors: your name
 * @LastEditTime: 2020-09-09 11:19:52
 * @Description: file content
 */

'use strict'

import Config from "../../configs/Config";

export const question = () => ({ uri: Config.getRNImageUrl('question.png', 0) });

export const wx = () => ({ uri: Config.getRNImageUrl('tencent/wx.png', 3) });

export const icon_qq = () => ({ uri: Config.getRNImageUrl('icon_qq.png', 0) });

export const user = () => ({ uri: Config.getRNImageUrl('login/user.png', 0) });

export const login_icon = () => ({ uri: Config.getRNImageUrl('login/ic_login_logo.png', 0) });

export const zuanzuan_logo = () => ({ uri: Config.getRNImageUrl('login/zuanzuan_logo.png', 0) });

export const open_eye = () => ({ uri: Config.getRNImageUrl('login/open_eye.png', 3) });

export const close_eye = () => ({ uri: Config.getRNImageUrl('login/close_eye.png', 3) });

export const account_del = () => ({ uri: Config.getRNImageUrl('login/account_del.png', 0) });

export const l_uncheck = () => ({ uri: Config.getRNImageUrl('login/l_uncheck.png', 0) });

export const l_check = () => ({ uri: Config.getRNImageUrl('login/l_check.png', 0) });

export const bg = () => ({ uri: Config.getRNImageUrl('login/bg.png', 3) });

export const logo = () => ({ uri: Config.getRNImageUrl('login/logo.png', 1) });

export const icon_letter = () => ({ uri: Config.getRNImageUrl('login/letter.png', 1) });

export const ic_account_code = () => ({ uri: Config.getRNImageUrl('login/ic_account_code.png', 1) });

export const ic_password_code = () => ({ uri: Config.getRNImageUrl('login/ic_password_code.png', 1) });

export const ic_account_psw = () => ({ uri: Config.getRNImageUrl('login/ic_account_psw.png', 1) });

export const ic_password_psw = () => ({ uri: Config.getRNImageUrl('login/ic_password_psw.png', 1) });

export const bg_login = () => require('../../../images/login/bg.png')

export const icon_login = () => require('../../../images/login/icon_login.png')

export const icon_phone = () => require('../../../images/login/icon_phone.png')

export const icon_lock = () => require('../../../images/login/icon_lock.png')

export const icon_hide_psw = ()=>require('../../../images/login/icon_hide_psw.png');
export const icon_show_psw = ()=>require('../../../images/login/icon_show_psw.png');