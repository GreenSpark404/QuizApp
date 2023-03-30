package org.greenspark404.model;

public class OneWayTrigger {
    private boolean triggered = false;

    public void pull() {
        triggered = true;
    }

    public boolean get() {
        return triggered;
    }

}
