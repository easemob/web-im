package com.easemob.webim.service.pubsub;

public abstract class BasicProcessor implements Processor {
    @Override
    public void process(PubSubListener listener, String message) {
        // TODO Auto-generated method stub

    }

    @Override
    public void onSubscribe(PubSubListener listener) {
        // TODO Auto-generated method stub

    }

    @Override
    public void onUnsubscribe(PubSubListener listener) {
        // TODO Auto-generated method stub

    }

    @Override
    public void onException(PubSubListener listener) {
        // TODO Auto-generated method stub

    }
}
