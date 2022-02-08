package com.sib.macju.dto.log;

import lombok.Data;

import java.util.List;

@Data
public class RequestLogDto {
    private Long id;
    private List<String> tags;
}
