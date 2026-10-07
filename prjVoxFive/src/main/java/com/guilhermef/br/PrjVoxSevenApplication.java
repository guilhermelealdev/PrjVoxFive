package com.guilhermef.br;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class PrjVoxSevenApplication {

	public static void main(String[] args) {
		SpringApplication.run(PrjVoxSevenApplication.class, args);
	}

}