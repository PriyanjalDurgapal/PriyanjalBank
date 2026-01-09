package com.bankingsystem.backend.Customer.dto;

import java.util.List;

import com.bankingsystem.backend.Customer.entity.Customer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomerPageResponse {

    private List<Customer> content;

    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
}
