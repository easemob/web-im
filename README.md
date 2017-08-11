## 环信 WebIM sdk

测试环信WebIM请访问：https://webim.easemob.com

更多关于环信的开发文档请见：https://docs.easemob.com

## Install 安装
1. 在/demo下执行 `npm i`
2. 在/sdk下执行 `npm link`
3. 在根目录下执行 `npm link easemob-websdk`
4. 运行demo，在/demo下执行 `npm start`

## 项目组成
- create-react-app 初始工具包
- react-router 路由
- react-redux 数据流
- react-thunk 异步请求
- ant-design 组件库
- storybook 

## todo

1. /login?username=lwz2 当前页面刷新会无法登陆
2. multi login 互相踢的问题
3. fixed元素错位的问题
4. 如何做[code-splitting](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#code-splitting)

### redux state

```json
{
	// ------- 响应式断点 ---------
	//xs: "480px",
	//sm: "768px",
 	//md: "992px",
	//lg: "1200px",
	//xl: "1600px"
	breakpoint: {
		sm: true
	},
	// ------ ui 相关 ------------
	common: {
		fetching:false
	},
	login: {
		username: '',
		password: '',
		isSigned: false,
	},
	im: [],
	// ------ 数据实体 -------
	entities: {
		roster: {
			byName: {
				[name]: {
					jid, name, subscription, groups
				}
			},
			names: ['lwz2'...],
			// 好友列表在此，因为好友列表来源于roster，息息相关
			friends: [],
		},
		// 订阅通知
		subscribe: {
			byFrom: {}
		},
		room: {},
		group: {
			byId: {},
			names: []
		},
		members: {
			byName: [],
			byGroupId: []
		}
		blacklist: {},
		message: {
			byId: {}
			chat: {
				[chatId]: [messageId1, messageId2]
			},
			groupChat: {
				[chatId]: {}
			},
		}
	}
}
```



