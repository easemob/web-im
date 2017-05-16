[TOC]
#4 disconnect cases
##1.client logout
this is a user active behavior,should not NotifyError.

  
##2.client offline (client network is down)
Demo NotifyError:

`onError: WWEBIM_CONNCTION_SERVER_CLOSE_ERROR type=7`

<a> should reconnect</a>

##3.server send `<close>` (multi login)
* first, strophe.Websocket trigger ERROR event, Demo NotifyError: type=8, mark conflict=true at the same time. 
* then, strophe.Websocket trigger DISCONNECTED event, Demo do not NotifyError while conflict==true

`onError: WEBIM_CONNCTION_SERVER_ERROR type=8 `

##4.server send `<close>` (ping/pong timeout, server quit, server offline)
strophe.Websocket trigger DISCONNECTED, Demo NotifyError:

`onError: WEBIM_CONNCTION_DISCONNECTED type=16`
	
<a>should reconnect</a> 


#Note
---
1.if the rest server is offline, signin POST an ajax request to get token will fail. Demo NotifyError:

`onError:WEBIM_CONNCTION_OPEN_ERROR type=1`