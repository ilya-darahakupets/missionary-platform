package by.dorogokupets.missionary.repository;

import by.dorogokupets.missionary.domain.model.Support;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface SupportRepository extends JpaRepository<Support, Long> {
  List<Support> findByCountriesId(Long countryId);
}
