package com.dev.app.catering_company;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/catering")
@CrossOrigin("*")
public class CateringCompanyController {
    @Autowired
    private CateringCompanyRepository cateringCompanyRepository;

    @GetMapping("/{id}")
    public ResponseEntity<CateringCompany> getCateringCompanyById(@PathVariable Long id) {
        Optional<CateringCompany> cateringCompany = cateringCompanyRepository.findById(id);
        if (cateringCompany.isPresent()) {
            return ResponseEntity.ok(cateringCompany.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<CateringCompany> createCateringCompany(@RequestBody CateringCompany cateringCompany) {
        CateringCompany createdCateringCompany = cateringCompanyRepository.save(cateringCompany);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCateringCompany);
    }
    @GetMapping("/all")
    public List<CateringCompany> getAllCateringCompanies() {
        return cateringCompanyRepository.findAll();
    }


    @PutMapping("/{id}")
    public ResponseEntity<CateringCompany> updateCateringCompany(@PathVariable Long id, @RequestBody CateringCompany cateringCompany) {
        Optional<CateringCompany> existingCateringCompany = cateringCompanyRepository.findById(id);
        if (existingCateringCompany.isPresent()) {
            CateringCompany updatedCateringCompany = cateringCompanyRepository.save(cateringCompany);
            return ResponseEntity.ok(updatedCateringCompany);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCateringCompany(@PathVariable Long id) {
        Optional<CateringCompany> cateringCompany = cateringCompanyRepository.findById(id);
        if (cateringCompany.isPresent()) {
            cateringCompanyRepository.delete(cateringCompany.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
