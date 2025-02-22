package by.dorogokupets.missionary.repository;


import by.dorogokupets.missionary.domain.model.Image;
import by.dorogokupets.missionary.domain.model.Support;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

  Image findBySupport(Support support);
}
