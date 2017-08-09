package com.demo.cucumber;

import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.stereotype.Component;

/**
 * Created by Administrator on 2017/8/9.
 */
@Component
public class healthcheck implements HealthIndicator {
    @Override
    public Health health() {

        return new Health.Builder().withDetail("usercount", 10) //自定义监控内容
                .withDetail("userstatus", "up").up().build();
    }

}
