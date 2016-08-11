package com.easemob.webim.service.pubsub;

/**
 * A processor interface for pubsub service
 * 
 * @author zhouhu
 * @date 2016/07/06
 */
public interface Processor {
    public void process(PubSubListener listener, String message);

    public void onSubscribe(PubSubListener listener);

    public void onUnsubscribe(PubSubListener listener);

    public void onException(PubSubListener listener);
}
