package com.example.demo.products;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false, columnDefinition = "VARCHAR(36)")
    private UUID id;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(unique = true, nullable = false, length = 100)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String shortDescription;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal price;

    @Column(precision = 15, scale = 2)
    private BigDecimal originalPrice;

    @Column(nullable = false)
    private Integer stockQuantity = 0;

    @Column(nullable = false)
    private Boolean isActive = true;

    @Column(nullable = false)
    private Boolean isFeatured = false;

    @Column(length = 255)
    private String metaTitle;

    @Column(columnDefinition = "TEXT")
    private String metaDescription;

    @Column(length = 255)
    private String metaKeywords;

    // Product images
    @Column(length = 500)
    private String thumbnail;

    @Column(columnDefinition = "TEXT")
    private String galleryImages;

    // Category & Brand
    @Column(name = "category_id", length = 36)
    private String categoryId;

    @Column(name = "category_name", length = 100)
    private String categoryName;

    @Column(name = "brand_id", length = 36)
    private String brandId;

    @Column(name = "brand_name", length = 100)
    private String brandName;

    @Column(nullable = false, precision = 3, scale = 2)
    private BigDecimal averageRating;

    @Column(nullable = false)
    private Long reviewCount = 0L;

    @Column(nullable = false)
    private Long viewCount = 0L;

    @Column(nullable = false)
    private Long saleCount = 0L;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;


    @Override
    public String toString() {
        return "ProductEntity[" +
                "id=" + id +
                ']' + "\n";
    }
}
