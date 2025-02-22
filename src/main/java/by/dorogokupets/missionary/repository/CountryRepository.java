package by.dorogokupets.missionary.repository;

import by.dorogokupets.missionary.domain.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
  List<Country> findAll();
}