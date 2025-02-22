package by.dorogokupets.missionary.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "countries")
public class Country {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_country", nullable = false, unique = true)
  private Long id;

  @Column(name = "name", nullable = false, unique = true)
  private String name;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(
          name = "country_supports",
          joinColumns = @JoinColumn(name = "country_id"),
          inverseJoinColumns = @JoinColumn(name = "service_id")
  )
  private List<Support> supports = new ArrayList<>();
}