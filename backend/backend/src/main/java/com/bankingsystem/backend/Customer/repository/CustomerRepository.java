package com.bankingsystem.backend.Customer.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bankingsystem.backend.Customer.dto.CustomerSuggestionResponse;
import com.bankingsystem.backend.Customer.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    boolean existsByMobile(String mobile);
    boolean existsByEmail(String email);
    Optional<Customer> findByIdAndDeletedFalse(Long id);
    Optional<Customer> findByCustomerId(String customerId);
    Optional<Customer> findByEmail(String email);

    // Search customers with optional filters
    @Query("""
        SELECT c FROM Customer c
        WHERE c.deleted = false
          AND (
                :search IS NULL OR :search = '' OR
                c.fullName LIKE CONCAT('%', :search, '%') OR
                c.mobile LIKE CONCAT('%', :search, '%')
              )
          AND (:status IS NULL OR :status = '' OR c.status = :status)
        ORDER BY c.createdAt DESC
    """)
    Page<Customer> searchCustomers(
            @Param("search") String search,
            @Param("status") String status,
            Pageable pageable
    );

    // Suggest customers for autocomplete
    @Query("""
        SELECT new com.bankingsystem.backend.Customer.dto.CustomerSuggestionResponse(
            c.id, c.fullName
        )
        FROM Customer c
        WHERE c.deleted = false
          AND (
              c.fullName ILIKE %:query%
              OR c.mobile ILIKE %:query%
          )
        ORDER BY c.createdAt DESC
    """)
    List<CustomerSuggestionResponse> suggestCustomers(
            @Param("query") String query,
            Pageable pageable
    );

    // Count methods
    Long countByDeletedFalse();
    Long countByStatusAndDeletedFalse(String status);

    // Count new customers per month
    @Query("""
        SELECT EXTRACT(MONTH FROM c.createdAt), COUNT(c)
        FROM Customer c
        WHERE c.deleted = false
        GROUP BY EXTRACT(MONTH FROM c.createdAt)
        ORDER BY EXTRACT(MONTH FROM c.createdAt)
    """)
    List<Object[]> countNewCustomersPerMonth();
}