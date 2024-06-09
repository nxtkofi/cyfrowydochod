package pl.server.server.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "billingAddress")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class BillingAddress {
    @Id
    @UuidGenerator
    private String AddressId;
    private String FullName;
    private String StreetName;
    private int HouseNumber;
    private String ZipCode;
    private String City;

    public BillingAddress(String fullName, String streetName, int houseNumber, String zipCode, String city) {
        FullName = fullName;
        StreetName = streetName;
        HouseNumber = houseNumber;
        ZipCode = zipCode;
        City = city;
    }
}
