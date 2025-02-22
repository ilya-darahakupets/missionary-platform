package by.dorogokupets.missionary.controller;

import by.dorogokupets.missionary.domain.model.Country;
import by.dorogokupets.missionary.domain.model.Support;
import by.dorogokupets.missionary.service.CountryService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;


@Controller
public class CountryController {
  private static Logger logger = LogManager.getLogger();
  private final CountryService countryService;

  @Autowired
  public CountryController(CountryService countryService) {
    this.countryService = countryService;
  }

  @GetMapping("/missionary/supports")
  public String showCountries(@RequestParam(required = false) Long countryId, Model model) {
    List<Country> countries = countryService.getAllCountries();
    model.addAttribute("countries", countries);

    if (countryId != null) {
      List<Support> supports = countryService.getSupportsByCountryId(countryId);
      model.addAttribute("supports", supports);
      model.addAttribute("countryId", countryId); // Передаем countryId в шаблон
    }

    return "country-supports";
  }
  
}
