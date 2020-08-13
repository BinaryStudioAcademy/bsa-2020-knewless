package com.knewless.core.course.dto;

/**
 * This one is used at AddPathPage
 */
public interface CourseWithMinutesProjection {
	String getId();
	String getName();
	String getCategory();
	String getAuthor();
	long getTimeMinutes();
	String getLevel();
	String getImage();
}
