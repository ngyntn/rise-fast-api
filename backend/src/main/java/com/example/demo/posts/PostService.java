package com.example.demo.posts;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    public List<PostEntity> getPosts() {

        // Check if exist in redis
        var isCached = redisTemplate.hasKey("posts");

        if (isCached) {
            System.out.println("Cache 'Posts' hit");
            return (List<PostEntity>) redisTemplate.opsForValue().get("posts");
        }

        var posts = postRepository.findAll();

        // Set cache
        redisTemplate.opsForValue().set("posts", posts);

        return posts;
    }


}
