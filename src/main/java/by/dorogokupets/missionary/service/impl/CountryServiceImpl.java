package by.dorogokupets.missionary.service.impl;

import by.dorogokupets.missionary.domain.model.Country;
import by.dorogokupets.missionary.domain.model.Support;
import by.dorogokupets.missionary.repository.CountryRepository;
import by.dorogokupets.missionary.repository.SupportRepository;
import by.dorogokupets.missionary.service.CountryService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@org.springframework.stereotype.Service
public class CountryServiceImpl implements CountryService {
  private static Logger logger = LogManager.getLogger();

  private final CountryRepository countryRepository;

  private final SupportRepository supportRepository;

  @Autowired
  public CountryServiceImpl(CountryRepository countryRepository,
                            SupportRepository supportRepository) {
    this.countryRepository = countryRepository;
    this.supportRepository = supportRepository;
  }
  @Override
  public List<Country> getAllCountries() {
    return countryRepository.findAll();
  }
  @Override
  public List<Support> getSupportsByCountryId(Long countryId) {
    List<Support> supports = supportRepository.findByCountriesId(countryId);
    logger.info("Found {} supports for country with id: {}", supports.size(), countryId);
    return supports;
  }
  @Override
  public Country getCountryById(Long countryId) {
    return countryRepository.findById(countryId).orElse(null);
  }
  @Override
  public Support getSupportById(Long supportId) {
    return supportRepository.findById(supportId).orElse(null);
  }
}
