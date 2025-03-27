package com.example.demo.service;

import com.example.demo.models.ImageProps;

import org.springframework.ai.image.ImageModel;
import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageGenerationService {
	@Autowired
	ImageModel imageModel;

	public String generateImage(ImageProps request) {
		String basePrompt = String.format(
				"Na podstawie poniższych danych:\n"
						+
						"- Tytuł: %s\n" +
						"- Opis: %s\n" +
						"- Preferowany styl okładki: %s",
				request.getTitle(),
				request.getDescription(),
				request.getStyles() != null ? request.getStyles() : "brak");
		StringBuilder optionalPrompt = new StringBuilder();
		if (request.getColor() != null) {
			optionalPrompt.append(String.format(
					"\n- Preferowany motyw kolorystyczny: %s",
					request.getColor().getMain()));
			if (request.getColor().getSecondary() != null) {
				optionalPrompt.append(String.format(
						", z kolorem drugorzędnym: %s\n",
						request.getColor().getSecondary()));
			}
		}
		String finalPrompt = "\n wygeneruj profesjonalną grafikę. Grafika NIE MOŻE BYĆ KSIĄŻKĄ";

		String prompt = basePrompt + optionalPrompt + finalPrompt;
		System.out.println(prompt);
		ImagePrompt imagePrompt = new ImagePrompt(prompt);
		ImageResponse imageResponse = imageModel.call(imagePrompt);
		return imageResponse.getResult().getOutput().getUrl();
	}
}
