# doctor_app

麦迪森在线医疗APP致力于打造一款医生线上问诊及学习交流的平台，通过接诊患者让医生赚取一定的服务费用，同时可以创建或加入专家团队提高医生的工作效率。此外，医生可以通过直播方式分享成功的医学经验，方便其他医生学习讨论。

App Write In React-Native

**Support: Android 4.1 (API 16)+   IOS(8.0+)**

## Prerequisites

* Make sure you have Node 7.6+ ([Ignite V2](https://github.com/infinitered/ignite) Project Required)

## Development Workflow

### Step One

```
# 安装项目依赖
npm install
```
### Step Two

```
react-native start
```

### 使用[reactotron](https://github.com/infinitered/reactotron)调试项目

A desktop app for inspecting your React JS and React Native projects.

### 使用Storybook构建页面UI

**1: [安装storybook](https://github.com/storybooks/react-native-storybook)**

**2: 进入storybook目录**

`cd storybook/stories`

**3: 使用[ignite generator](http://git.mdslife.com/chen.yang/ignite-ir-boilerplate-2016)在storybook中构建页面UI**

```
$ ignite generate

✨ Type ignite generate ________ to run one of these generators:

 component   Generates a component, styles, and an optional test.     
 container   Generates a redux smart component.                       
 listview    Generates a screen with a ListView + walkthrough.        
 redux       Generates a action/creator/reducer set for Redux.        
 saga        Generates a saga with an optional test.                  
 screen      Generates an opinionated container.                      

 --------------------------------------------------------------------------
 Check out https://github.com/infinitered/ignite for instructions on how to
 install some or how to build some for yourself.
```

**4: commit，并提交 merge request**

### Run typechecker

```
npm run flow
```

### Run Test

```
npm test
```

## Git flow
[link](http://git.scnc-sh.com/chen.yang/rndoctor/wikis/git-flow)

## Known Issue
[link](http://git.scnc-sh.com/chen.yang/rndoctor/issues)

## OnLine Accident
暂无

## License
暂无
