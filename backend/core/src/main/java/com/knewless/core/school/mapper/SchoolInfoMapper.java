package com.knewless.core.school.mapper;

import com.knewless.core.school.dto.SchoolBriefInfoDto;
import com.knewless.core.school.model.School;

public interface SchoolInfoMapper {

    static SchoolBriefInfoDto from(School school, Integer membersCount) {
        final var schoolBriefInfoDto = new SchoolBriefInfoDto();
        schoolBriefInfoDto.setId(school.getId());
        schoolBriefInfoDto.setName(school.getName());
        schoolBriefInfoDto.setLogo(school.getLogo());
        schoolBriefInfoDto.setMembersCount(membersCount);
        return schoolBriefInfoDto;
    }

}
