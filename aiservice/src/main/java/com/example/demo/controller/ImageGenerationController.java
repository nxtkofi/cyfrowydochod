package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/image")
public class ImageGenerationController {

	@RequestMapping("/generate")
	public String generateImage() {
		return "Image generated";
	}
}
