package by.dorogokupets.missionary.service.impl;

import by.dorogokupets.missionary.domain.model.CountrySupport;

import java.util.Optional;

public interface CountrySupportService {
  Optional<CountrySupport> findByCountryIdAndSupportId(Long countryId, Long supportId);
}
