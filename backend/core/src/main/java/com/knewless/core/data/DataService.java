package com.knewless.core.data;

import com.knewless.core.data.dto.DataDto;
import org.springframework.stereotype.Service;

@Service
public class DataService {
//    @Autowired
//    DataRepository dataRepository;

    public DataDto getData() {
        return new DataDto("Hello world!");
    }
}
