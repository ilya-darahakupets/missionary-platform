package by.dorogokupets.missionary.service;

import by.dorogokupets.missionary.domain.dto.SupportDto;
import by.dorogokupets.missionary.domain.model.Image;
import by.dorogokupets.missionary.domain.model.Support;
import by.dorogokupets.missionary.exception.ServiceException;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface SupportService {
  Page<Support> findAll(int pageNo, int pageSize, String sortBy, String sortDirection);

  List<Support> findAllServices();

  Support findServiceById(Long itemId);

  @Transactional(rollbackFor = Exception.class)
  void save(SupportDto supportDto) throws ServiceException;
//
//  default Image convertToFileDB(MultipartFile file) throws ServiceException {
//    Image csFileDb = new Image();
//    csFileDb.setName(StringUtils.cleanPath(file.getOriginalFilename()));
//    csFileDb.setContentType(file.getContentType());
//    try {
//      csFileDb.setData(file.getBytes());
//    } catch (IOException e) {
//      throw new ServiceException(e);
//    }
//    csFileDb.setSize(file.getSize());
//    return csFileDb;
//  }
//
//  @Transactional(rollbackFor = Exception.class)
//  void update(SupportDto supportDto) throws ServiceException;
//
//  default void updateFileDB(Image image, MultipartFile fileToUpdate) throws ServiceException {
//    image.setSize(fileToUpdate.getSize());
//    image.setName(StringUtils.cleanPath(fileToUpdate.getOriginalFilename()));
//    image.setContentType(image.getContentType());
//    try {
//      image.setData(fileToUpdate.getBytes());
//    } catch (IOException e) {
//      throw new ServiceException(e);
//    }
//  }
}
