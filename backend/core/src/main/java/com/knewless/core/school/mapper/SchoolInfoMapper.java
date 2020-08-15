package com.knewless.core.school.mapper;

import com.knewless.core.school.dto.SchoolBriefInfoDto;
import com.knewless.core.school.model.School;

import java.util.Optional;

public interface SchoolInfoMapper {

    static Optional<SchoolBriefInfoDto> from(School school, Integer membersCount) {
        if (school == null) {
            return Optional.empty();
        }
        final var schoolBriefInfoDto = new SchoolBriefInfoDto();
        schoolBriefInfoDto.setId(school.getId());
        schoolBriefInfoDto.setName(school.getName());
        schoolBriefInfoDto.setLogo(school.getLogo());
        schoolBriefInfoDto.setMembersCount(membersCount);
        return Optional.of(schoolBriefInfoDto);
    }

}
