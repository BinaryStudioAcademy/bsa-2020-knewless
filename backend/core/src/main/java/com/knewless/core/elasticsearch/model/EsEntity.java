package com.knewless.core.elasticsearch.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setting(settingPath = "elasticsearch/es-config.json")
@Document(indexName = "knewless")
public class EsEntity {
	
	@Id
	private String id;
	
	@Field(type = FieldType.Text)
	private String updatedAt;
	
	
	@MultiField(mainField = @Field(type = FieldType.Text, analyzer = "autocomplete_index", searchAnalyzer = "autocomplete_search"),
			otherFields = {@InnerField(suffix = "keyword", type = FieldType.Keyword)})
	private String name;
	
	@Enumerated(EnumType.STRING)
	private EsDataType type;
	
	@Field(type = FieldType.Auto)
	private List<String> tags;
	
	@Field(type = FieldType.Auto)
	private UUID sourceId;
	
	@Field(type = FieldType.Object)
	private Object metadata;
}
