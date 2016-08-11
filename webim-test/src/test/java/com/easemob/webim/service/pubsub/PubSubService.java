package com.easemob.webim.service.pubsub;

/**
 * publish/subscribe service
 * 
 * @author zhouhu <zhouhu@easemob.com>
 * @date 2016/07/06
 */
public interface PubSubService {
    public void publish(String channel, String message);

    public void subscribe(PubSubListener listener, String[] channels);

    public void unsubscribe(PubSubListener listener, String[] channels);
}
