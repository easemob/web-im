#4 disconnect cases
##1.client logout
this is a user active behavior,should not NotifyError.

  
##2.client offline (network down, etc.)
Demo NotifyError:

`onError: WWEBIM_CONNCTION_SERVER_CLOSE_ERROR type=7`

<a> should reconnect</a>

##3.server send *<close>* because of multi login
* first, strophe.Websocket trigger ERROR event, Demo NotifyError: type=8, mark conflict=true at the same time. 
* then, strophe.Websocket trigger DISCONNECTED event, Demo do not NotifyError while conflict==true

`onError: WEBIM_CONNCTION_SERVER_ERROR type=8 `

##4.server send *<close>* because of ping/pong timeout
strophe.Websocket trigger DISCONNECTED, Demo NotifyError:

`onError: WEBIM_CONNCTION_DISCONNECTED type=16`
	
<a>should reconnect</a> 


#Note
---
1.if the rest server is offline, signin POST an ajax request to get token will fail. Demo NotifyError:

`onError:WEBIM_CONNCTION_OPEN_ERROR type=1`
