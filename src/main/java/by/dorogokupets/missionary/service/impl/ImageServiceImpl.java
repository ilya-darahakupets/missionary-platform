package by.dorogokupets.missionary.service.impl;


import by.dorogokupets.missionary.domain.model.Image;
import by.dorogokupets.missionary.domain.model.Support;
import by.dorogokupets.missionary.repository.ImageRepository;
import by.dorogokupets.missionary.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageServiceImpl implements ImageService {


  private final ImageRepository imageRepository;
  @Autowired
  public ImageServiceImpl(ImageRepository imageRepository) {
    this.imageRepository = imageRepository;
  }

  @Override
  public Image getFile(Long imageId) {
    return imageRepository.getReferenceById(imageId);
  }


}
