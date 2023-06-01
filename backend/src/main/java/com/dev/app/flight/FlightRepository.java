package com.dev.app.flight;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FlightRepository extends JpaRepository<Flight, Long> {
    
    public Iterable<Flight> findByAirline(String airline);

    Long countByDepartureTimeBetween(LocalDateTime start, LocalDateTime end);

    @Query("SELECT COALESCE(SUM(f.seatsAvailable), 0) FROM Flight f WHERE f.departureTime BETWEEN :startOfDay AND :endOfDay")
    int sumSeatsAvailableByDepartureTimeBetween(LocalDateTime startOfDay, LocalDateTime endOfDay);

    @Query("SELECT SUM(f.price * f.seatsAvailable) FROM Flight f WHERE f.departureTime BETWEEN :startOfDay AND :endOfDay")
    double sumPriceByDepartureTimeBetween(LocalDateTime startOfDay, LocalDateTime endOfDay);
}