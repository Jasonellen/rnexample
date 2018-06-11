/**
 * Created by DB on 2016/10/21.
 */
//https://ipconnectmail.com/index.php    http://ipconnect.sidlu.com/index.php
// export const SERVER = 'https://ipconnectmail.com/index.php';
export const SERVER = 'http://ipconnect.sidlu.com/index.php';

// -----------------------------------------     ** 注册/登录 **    -----------------------------------------------------

export const login = `${SERVER}/index/user/login`;   //登录接口

export const register = `${SERVER}/index/user/register`;   //注册

export const checkMail = `${SERVER}/index/user/checkMail`;   //检查邮箱是否可以注册接口

export const retrievePassword = `${SERVER}/index/user/retrievePassword`;   //找回密码接口

export const sendCode = `${SERVER}/index/user/sendCode`;   //发送验证码接口

export const uploadWithCrop = `${SERVER}/index/upload/uploadWithCrop?filename=file`;   //上传图片接口


// -----------------------------------------     ** 通讯录 **    -----------------------------------------------------

export const getFriends = `${SERVER}/index/user/getFriends`;   //获取好友列表接口

export const requireSubscribeUser = `${SERVER}/index/user/requireSubscribeUser`;   //请求添加好友接口

export const getRequireSubscribedUsers = `${SERVER}/index/user/getRequireSubscribedUsers`;   //获取用户待处理好友申请列表接口

export const dealSubscribeRecord = `${SERVER}/index/user/dealSubscribeRecord`;   //处理好友请求接口

export const createGroup = `${SERVER}/index/user/createGroup`;   //创建群组接口

export const updateGroup = `${SERVER}/index/user/updateGroup`;   //群主变更群组成员接口

export const changeGroupUsers = `${SERVER}/index/user/changeGroupUsers`;   //群主变更群组成员接口

export const deleteGroup = `${SERVER}/index/user/deleteGroup`;   //群主删除群组接口

export const exitGroup = `${SERVER}/index/user/exitGroup`;   //群成员退出接口

export const getUserGroups = `${SERVER}/index/user/getUserGroups`;   //获取用户所在的全部群组接口

export const searchOtherUsers = `${SERVER}/index/user/searchOtherUsers`;   //搜索非好友的其他用户列表接口

export const getRandomMusic = `${SERVER}/index/user/getRandomMusic`;   //获取随机音乐文件接口

export const getGroupInfor = `${SERVER}/index/user/getGroupInfor`;   //获取群组的详细信息

export const deleteFriend = `${SERVER}/index/user/deleteFriend`;   //删除好友

export const pushMessage = `${SERVER}/index/user/pushMessage`;   //推送消息


// -----------------------------------------     ** 活动 **    -----------------------------------------------------

export const getActivities = `${SERVER}/index/activity/getActivities`;   //获取活动列表接口

export const searchActivities = `${SERVER}/index/activity/searchActivities`;   //搜索活动列表接口

export const getActivityDetail = `${SERVER}/index/activity/getActivityDetail`;   //获取活动详情接口

export const likeActivity = `${SERVER}/index/activity/likeActivity`;   //收藏活动接口

export const attendActivity = `${SERVER}/index/activity/attendActivity`;   //预约报名活动接口

export const publishActivity = `${SERVER}/index/activity/publishActivity`;   //发布活动接口

export const recordAdvViewLog = `${SERVER}/index/activity/recordAdvViewLog`;   //记录广告浏览接口


// -----------------------------------------     ** 朋友圈 **    -----------------------------------------------------

export const publishCircle = `${SERVER}/index/circle/publishCircle`;   //发布朋友圈接口

export const getCircles = `${SERVER}/index/circle/getCircles`;   //获取朋友圈接口

export const interactCircle = `${SERVER}/index/circle/interactCircle`;   //朋友圈互动接口

export const commentCircle = `${SERVER}/index/circle/commentCircle`;   //评论朋友圈接口

export const deleteCircleComment = `${SERVER}/index/circle/deleteCircleComment`;   //删除朋友圈评论接口


// -----------------------------------------     ** 赞助商 **    -----------------------------------------------------

export const getSponsors = `${SERVER}/index/sponsor/getSponsors`;   //获取sponsor列表接口

export const getSponsorDetail = `${SERVER}/index/sponsor/getSponsorDetail`;   //获取sponsor详情接口


// -----------------------------------------     ** 我的 **    -----------------------------------------------------

export const getOtherUserInfor = `${SERVER}/index/user/getOtherUserInfor`;   //查看他人主页信息接口

export const loadOtherUserCircles = `${SERVER}/index/user/loadOtherUserCircles`;   //查看他人朋友圈列表接口

export const loadMyCircles = `${SERVER}/index/mine/loadMyCircles`;   //获取我的朋友圈接口

export const myPublishedActivities = `${SERVER}/index/mine/myPublishedActivities`;   //我发布的活动列表接口

export const myCollectedActivities = `${SERVER}/index/mine/myCollectedActivities`;   //我收藏的活动列表接口

export const modifyMyInfor = `${SERVER}/index/mine/modifyMyInfor`;   //修改个人信息接口

export const updateMyPrivacyStatus = `${SERVER}/index/mine/updateMyPrivacyStatus`;   //修改个人隐私设置接口

export const updateMyActivity = `${SERVER}/index/mine/updateMyActivity`;   //修改自己发布的活动接口（__5-8-1我的活动列表，__5-8-2我的活动内页）

export const getAbout = `${SERVER}/index/mine/getAbout`;   //获取Ipconnect关于介绍接口
