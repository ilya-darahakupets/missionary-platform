package by.dorogokupets.missionary.mapper;


import by.dorogokupets.missionary.domain.dto.UserDto;
import by.dorogokupets.missionary.domain.model.User;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper
@Component
public interface UserMapper {

  User mapToUser(UserDto userDto);

  UserDto mapToUserDto(User user);
}
