package com.knewless.core.history;

import com.knewless.core.history.dto.HistoryDto;
import com.knewless.core.history.model.History;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface HistoryMapper {
    HistoryMapper MAPPER = Mappers.getMapper(HistoryMapper.class);

    @Mapping(target = "tags", ignore = true)
    HistoryDto historyToHistory(History history);
}
