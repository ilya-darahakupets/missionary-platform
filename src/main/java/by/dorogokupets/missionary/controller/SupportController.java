package by.dorogokupets.missionary.controller;

import by.dorogokupets.missionary.domain.model.Country;
import by.dorogokupets.missionary.domain.model.CountrySupport;
import by.dorogokupets.missionary.domain.model.Support;
import by.dorogokupets.missionary.service.CountryService;
import by.dorogokupets.missionary.service.impl.CountrySupportService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;


@Controller
public class SupportController {

  private static Logger logger = LogManager.getLogger();
  private final CountrySupportService countrySupportService;

  @Autowired
  public SupportController(CountrySupportService countrySupportService) {
    this.countrySupportService = countrySupportService;
  }
  @GetMapping("/missionary/supports/{countryId}/{supportId}")
  public String showSupportDetails(@PathVariable Long countryId, @PathVariable Long supportId, Model model) {
    Optional<CountrySupport> countrySupport = countrySupportService.findByCountryIdAndSupportId(countryId, supportId);

    if (countrySupport.isPresent()) {
      model.addAttribute("countrySupport", countrySupport.get());
      return "support-info";
    } else {
      return "redirect:/missionary/supports";
    }
  }
  
}
