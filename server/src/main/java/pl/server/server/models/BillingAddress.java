package pl.server.server.models;
import org.hibernate.annotations.UuidGenerator;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "billingAddress")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class BillingAddress {
    @Id
    @UuidGenerator
    private String addressId;
    private String fullName;
    private String streetName;
    private int houseNumber;
    private String zipCode;
    private String city;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public BillingAddress(String fullName, String streetName, int houseNumber, String zipCode, String city) {
        this.fullName = fullName;
        this.streetName = streetName;
        this.houseNumber = houseNumber;
        this.zipCode = zipCode;
        this.city = city;
    }

    @Override
    public String toString() {
        return "BillingAddress{" +
                "addressId='" + addressId + '\'' +
                ", fullName='" + fullName + '\'' +
                ", streetName='" + streetName + '\'' +
                ", houseNumber=" + houseNumber +
                ", zipCode='" + zipCode + '\'' +
                ", city='" + city + '\'' +
                '}';
    }
}
