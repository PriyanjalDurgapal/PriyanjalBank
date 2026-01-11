package com.bankingsystem.backend.Customer.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.bankingsystem.backend.Customer.dto.CustomerLoginRequest;
import com.bankingsystem.backend.Customer.dto.CustomerLoginResponse;
import com.bankingsystem.backend.Customer.entity.Customer;
import com.bankingsystem.backend.Customer.repository.CustomerRepository;
import com.bankingsystem.backend.auth.JwtUtil;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class CustomerApiServices {

    private final CustomerRepository customerRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public CustomerLoginResponse login(CustomerLoginRequest request){
        Customer customer=customerRepository.findByCustomerId(request.getCustomerId())
            .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND,"Customer id not found"));

            if(customer.getStatus()!="ACTIVE"){
                throw new ResponseStatusException(HttpStatus.FORBIDDEN,"Customer is inactive plaese contact bank");
            }
            
            if(!passwordEncoder.matches(request.getPassword(), customer.getPassword())){
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"invalid email or password");

            }
            try{
                String token=jwtUtil.generateToken(customer.getEmail(),customer.getRole());
                return new CustomerLoginResponse(token, customer.getRole());
            }catch(Exception e){
                e.printStackTrace();
                throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Token genration failed"
                    );
            }
        
    }
    
}
