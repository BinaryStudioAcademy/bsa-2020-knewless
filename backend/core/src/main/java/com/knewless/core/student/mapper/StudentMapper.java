package com.knewless.core.student.mapper;

import com.knewless.core.author.dto.AuthorSettingsDto;
import com.knewless.core.author.model.Author;
import com.knewless.core.student.dto.StudentMainInfoDto;
import com.knewless.core.student.dto.StudentSettingsDto;
import com.knewless.core.student.model.Student;
import com.knewless.core.user.model.User;

import java.util.Optional;

public class StudentMapper {
    public static StudentSettingsDto fromEntity(Student student) {
        if (student == null)
            return null;
        var result = new StudentSettingsDto();
        result.setId(student.getId());
        result.setUserId(student.getUser().getId());
        result.setAvatar(student.getAvatar());
        result.setFirstName(student.getFirstName());
        result.setLastName(student.getLastName());
        result.setJob(student.getJob());
        result.setLocation(student.getLocation());
        result.setCompany(student.getCompany());
        result.setWebsite(student.getWebsite());
        result.setBiography(student.getBiography());
        result.setDirection(student.getDirection());
        result.setExperience(student.getExperience());
        result.setLevel(student.getLevel());
        result.setIndustry(student.getIndustry());
        result.setRole(student.getRole());
        result.setEmployment(student.getEmployment());
        result.setEducation(student.getEducation());
        result.setYear(student.getYear());
        return result;
    }

    public static Student fromDto(StudentSettingsDto student, User user) {
        if (student == null)
            return null;
        var result = new Student();
        result.setId(student.getId());
        result.setUser(user);
        result.setAvatar(student.getAvatar());
        result.setFirstName(student.getFirstName());
        result.setLastName(student.getLastName());
        result.setJob(student.getJob());
        result.setLocation(student.getLocation());
        result.setCompany(student.getCompany());
        result.setWebsite(student.getWebsite());
        result.setBiography(student.getBiography());
        result.setDirection(student.getDirection());
        result.setExperience(student.getExperience());
        result.setLevel(student.getLevel());
        result.setIndustry(student.getIndustry());
        result.setRole(student.getRole());
        result.setEmployment(student.getEmployment());
        result.setEducation(student.getEducation());
        result.setYear(student.getYear());
        return result;
    }

    public static Optional<StudentMainInfoDto> studentToStudentMainInfoDto(Student student) {
        if (student == null)
            return Optional.empty();
        var result = new StudentMainInfoDto();
        result.setId(student.getId());
        result.setFirstName(student.getFirstName());
        result.setLastName(student.getLastName());
        result.setAvatar(student.getAvatar());
        result.setJob(student.getJob());
        return Optional.of(result);
    }
}
