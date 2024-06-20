package pl.server.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.server.server.models.BillingAddress;

public interface BillingAddressRepository extends JpaRepository<BillingAddress,String> {
    BillingAddress findByUserId(String userId);
}
