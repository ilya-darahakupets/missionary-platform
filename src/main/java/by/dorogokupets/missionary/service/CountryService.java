package by.dorogokupets.missionary.service;

import by.dorogokupets.missionary.domain.model.Country;
import by.dorogokupets.missionary.domain.model.Support;

import java.util.List;

public interface CountryService {

  List<Country> getAllCountries();
  List<Support> getSupportsByCountryId(Long countryId);

  Country getCountryById(Long countryId);

  Support getSupportById(Long supportId);
}


