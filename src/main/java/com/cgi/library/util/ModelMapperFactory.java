package com.cgi.library.util;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ModelMapperFactory {

    public static ModelMapper getMapper() {
        return new ModelMapper();
    }
}
