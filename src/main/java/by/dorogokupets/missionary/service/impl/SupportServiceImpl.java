package by.dorogokupets.missionary.service.impl;


import by.dorogokupets.missionary.domain.dto.SupportDto;
import by.dorogokupets.missionary.domain.model.Image;
import by.dorogokupets.missionary.exception.ServiceException;
import by.dorogokupets.missionary.mapper.SupportMapper;
import by.dorogokupets.missionary.repository.ImageRepository;
import by.dorogokupets.missionary.repository.SupportRepository;
import by.dorogokupets.missionary.domain.model.Support;
import by.dorogokupets.missionary.service.SupportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@org.springframework.stereotype.Service
public class SupportServiceImpl implements SupportService {
  private final SupportRepository supportRepository;
  private final ImageRepository imageRepository;
  private final SupportMapper supportMapper;

  @Autowired
  public SupportServiceImpl(SupportRepository supportRepository, ImageRepository imageRepository, SupportMapper supportMapper) {
    this.supportRepository = supportRepository;
    this.imageRepository = imageRepository;
    this.supportMapper = supportMapper;
  }

  @Override
  public Page<Support> findAll(int pageNo, int pageSize, String sortBy, String sortDirection) {
    Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
    Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
    return supportRepository.findAll(pageable);
  }

  @Override
  public List<Support> findAllServices() {
    return supportRepository.findAll();
  }

  @Override
  public Support findServiceById(Long itemId) {
    return supportRepository.findById(itemId).orElse(null);
  }

  @Transactional(rollbackFor = Exception.class)
  @Override
  public void save(SupportDto supportDto) throws ServiceException {
    Support support = supportMapper.mapToService(supportDto);
//    Image imageFileDb = convertToFileDB(supportDto.getPhoto());
    Support savedSupport = supportRepository.save(support);
//    imageFileDb.setSupport(savedSupport);
//
//    imageRepository.save(imageFileDb);
  }
//
//
//  @Transactional(rollbackFor = Exception.class)
//  @Override
//  public void update(SupportDto supportDto) throws ServiceException {
//    Support currentSupport = supportRepository.getReferenceById(supportDto.getIdSupport());
//    currentSupport.setName(supportDto.getName());
//    currentSupport.setDescription(supportDto.getDescription());
//    Image image = imageRepository.findBySupportAndContentType(currentSupport, MediaType.IMAGE_PNG_VALUE);
//
//    MultipartFile imageFileToUpdate = supportDto.getPhoto();
//    if (imageFileToUpdate != null) {
//      if (image == null) {
//        image = convertToFileDB(imageFileToUpdate);
//        image.setSupport(currentSupport);
//      } else {
//        updateFileDB(image, imageFileToUpdate);
//      }
//      imageRepository.save(image);
//    }
//    supportRepository.save(currentSupport);
//  }

}
