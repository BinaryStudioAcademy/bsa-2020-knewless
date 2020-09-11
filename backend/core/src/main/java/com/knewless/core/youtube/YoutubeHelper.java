package com.knewless.core.youtube;

public class YoutubeHelper {
	public static boolean isYoutubeLink(String url) {
		// todo handle youtu.be
		return url.contains("youtube.com");
	}
	
	public static String extractYoutubePreview(String url) {
		return "https://img.youtube.com/vi/" + extractVideoId(url) + "/default.jpg";
	}
	
	private static String extractVideoId(String url) {
		int indexOfVKey = url.indexOf("v=");
		String substringWithKey = url.substring(indexOfVKey + 2);
		int indexOfAndSymbol = substringWithKey.indexOf("&");
		if (indexOfAndSymbol != -1) substringWithKey = substringWithKey.substring(0, indexOfAndSymbol);
		return substringWithKey;
	}
}
