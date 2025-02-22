package by.dorogokupets.missionary.repository;

import by.dorogokupets.missionary.domain.model.CountrySupport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface CountrySupportRepository extends JpaRepository<CountrySupport, Long> {
  Optional<CountrySupport> findCountrySupportByCountry_IdAndSupport_IdSupport(Long countryId, Long supportId);

}