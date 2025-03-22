package com.example.demo.models;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class ImageProps {

	public String title;
	public String description;
	public List<String> styles = new ArrayList<>();
	public Color color;

}
