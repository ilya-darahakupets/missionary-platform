package by.dorogokupets.missionary.mapper;


import by.dorogokupets.missionary.domain.dto.SupportDto;
import by.dorogokupets.missionary.domain.model.Support;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper
@Component
public interface SupportMapper {

  Support mapToService(SupportDto supportDto);

  SupportDto mapToServiceDto(Support support);
}
