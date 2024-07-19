package pl.server.server.services;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.BillingAddress;
import pl.server.server.models.User;
import pl.server.server.repositories.BillingAddressRepository;
import pl.server.server.repositories.UserRepository;


@Service
public class BillingAddressService {

    @Autowired
    BillingAddressRepository billingAddressRepository;

    @Autowired
    UserRepository userRepository;

    public BillingAddress getBillingAddress(String userId){
        try {
            return billingAddressRepository.findByUserId(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        } catch (ResourceNotFoundException notFoundException) {
            throw notFoundException;
        }catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }

    public ResponseEntity<?> createBillingAddress(String userId, BillingAddress newBillingAddress) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));

            user.setBillingAddress(newBillingAddress);
            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (ResourceNotFoundException notFoundException) {
            throw notFoundException;
        }catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }

    public BillingAddress updateBillingAddress(String userId,BillingAddress newBillingAddress) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));

            if (!billingAddressRepository.existsById(user.getBillingAddress().getAddressId())) {
                throw new ResourceNotFoundException("user billing address does not exist");
            }

            BillingAddress addressToUpdate = user.getBillingAddress();
            BeanUtils.copyProperties(newBillingAddress,addressToUpdate,"addressId");
            billingAddressRepository.save(addressToUpdate);
            return addressToUpdate;
        } catch (ResourceNotFoundException notFoundException) {
            throw notFoundException;
        }catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }

    @Transactional
    public void deleteBillingAddress(String billingAddressId) {
        try {
            BillingAddress billingAddress = billingAddressRepository.findById(billingAddressId)
                    .orElseThrow(() -> new ResourceNotFoundException("Billing Address not found"));

            User user = billingAddress.getUser();
            if (user != null) {
                user.setBillingAddress(null);
                userRepository.save(user);
            }

            billingAddressRepository.delete(billingAddress);
        } catch (ResourceNotFoundException notFoundException) {
            throw notFoundException;
        }catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }
}
