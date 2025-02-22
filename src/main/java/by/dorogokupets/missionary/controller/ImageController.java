package by.dorogokupets.missionary.controller;

import by.dorogokupets.missionary.domain.model.Image;
import by.dorogokupets.missionary.domain.model.Support;
import by.dorogokupets.missionary.service.ImageService;
import by.dorogokupets.missionary.service.SupportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/kid-shop")
public class ImageController {

  private final ImageService imageService;
  private final SupportService supportService;

  @Autowired
  public ImageController(ImageService imageService,  SupportService supportService) {
    this.imageService = imageService;
    this.supportService = supportService;
  }
//
//  @GetMapping(path = "/images/{id}")
//  public ResponseEntity downloadImage(@PathVariable("id") Long imageId) {
//    Support support = supportService.findServiceById(imageId);
//    Image image = imageService.findByItemAndContentType(support, MediaType.IMAGE_PNG_VALUE);
//
//    return ResponseEntity.ok()
//            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + image.getName() + "\"")
//            .contentType(MediaType.IMAGE_PNG)
//            .body(image.getData());
//  }
}
