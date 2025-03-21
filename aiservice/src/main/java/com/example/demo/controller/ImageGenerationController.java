package com.example.demo.controller;

import com.example.demo.dto.GenerateImageRequestDto;
import com.example.demo.service.ImageGenerationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/image")
public class ImageGenerationController {

	@Autowired
	ImageGenerationService imageGenerationService;

	@PostMapping("/generate")
	public String generateImage(@RequestBody GenerateImageRequestDto request) {
		return imageGenerationService.generateImage(request);
	}
}
