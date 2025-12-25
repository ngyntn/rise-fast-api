package com.example.demo.products;


import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    public List<ProductEntity> getProducts() {

        // Check if exist in redis
        var isCached = redisTemplate.hasKey("products");

        if (isCached) {
            System.out.println("Cache 'Posts' hit");
            return (List<ProductEntity>) redisTemplate.opsForValue().get("products");
        }


        var products = productRepository.findAll();

        // Set cache
        redisTemplate.opsForValue().set("products", products);

        return products;
    }
}
