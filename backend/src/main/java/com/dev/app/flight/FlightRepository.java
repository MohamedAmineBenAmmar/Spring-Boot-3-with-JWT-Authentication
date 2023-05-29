package com.dev.app.flight;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<Flight, Long> {
    
    public Iterable<Flight> findByAirline(String airline);
}