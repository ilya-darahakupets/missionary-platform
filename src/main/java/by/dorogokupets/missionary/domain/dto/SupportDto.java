package by.dorogokupets.missionary.domain.dto;

import by.dorogokupets.missionary.domain.model.Country;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SupportDto {

  private Long idSupport;

  private String name;

  private String description;

  private Set<Country> countries = new HashSet<>();

  private MultipartFile photo;
}
