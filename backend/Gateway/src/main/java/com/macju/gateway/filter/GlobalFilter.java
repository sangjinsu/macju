package com.macju.gateway.filter;

import com.macju.gateway.config.Config;
import lombok.Data;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
public class GlobalFilter extends AbstractGatewayFilterFactory<Config> {
    private static final Logger logger = LogManager.getLogger(GlobalFilter.class);
    public GlobalFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            logger.info("GlobalFilter baseMessage>>>>>>" + config.getBaseMessage());
            if (config.isPreLogger()) {
                logger.info("GlobalFilter Start>>>>>>" + exchange.getRequest());
            }
            return chain.filter(exchange).then(Mono.fromRunnable(()->{
                if (config.isPostLogger()) {
                    logger.info("GlobalFilter End>>>>>>" + exchange.getResponse());
                }
            }));
        });
    }

}