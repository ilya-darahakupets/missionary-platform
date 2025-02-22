package by.dorogokupets.missionary.service.impl;


import by.dorogokupets.missionary.domain.model.CountrySupport;
import by.dorogokupets.missionary.repository.CountrySupportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CountrySupportServiceImpl implements CountrySupportService {
  private final CountrySupportRepository countrySupportRepository;


  @Autowired
  public CountrySupportServiceImpl(CountrySupportRepository countrySupportRepository) {
    this.countrySupportRepository = countrySupportRepository;
  }
  @Override
  public Optional<CountrySupport> findByCountryIdAndSupportId(Long countryId, Long supportId) {
    return countrySupportRepository.findCountrySupportByCountry_IdAndSupport_IdSupport(countryId,supportId);
  }


}
