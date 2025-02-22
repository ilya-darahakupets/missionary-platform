package by.dorogokupets.missionary.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "supports")
public class Support {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_support", nullable = false, unique = true)
  private Long idSupport;

  @Column(name = "name", nullable = false, unique = true)
  private String name;

  @Column(name = "description", nullable = false, unique = true)
  private String description;

  @ManyToMany(mappedBy = "supports", fetch = FetchType.LAZY)
  private Set<Country> countries = new HashSet<>();

  @OneToMany(mappedBy = "support", cascade = CascadeType.REMOVE)
  private List<Image> imagesDb;

  @OneToMany(mappedBy = "support", cascade = CascadeType.REMOVE)
  private List<CountrySupport> countrySupports;

  public String getFirstImageUrl() {
    if (imagesDb != null && !imagesDb.isEmpty()) {
      return imagesDb.get(0).getUrl();
    }
    return "/static/images/support-page/legal_assistance.png";
  }
}