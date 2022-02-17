package com.macju.gateway.config;

import lombok.Data;

@Data
public class Config {
    private String baseMessage;
    private boolean preLogger;
    private boolean postLogger;
}
