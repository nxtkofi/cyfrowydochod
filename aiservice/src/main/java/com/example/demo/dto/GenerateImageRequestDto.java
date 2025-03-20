package com.example.demo.dto;

import java.util.ArrayList;
import java.util.List;

import com.example.demo.models.Color;

import lombok.Data;

@Data
public class GenerateImageRequestDto {

	public String title;
	public String description;
	public List<String> styles = new ArrayList<>();
	public Color color;

}
