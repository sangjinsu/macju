package com.macju.auth.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RequestCode {

    private String code;
    private String state;
    private String error;
    private String error_description;

    @Builder
    public RequestCode(String code, String state, String error, String errorDescription) {
        this.code = code;
        this.state = state;
        this.error = error;
        this.error_description = errorDescription;
    }
}
