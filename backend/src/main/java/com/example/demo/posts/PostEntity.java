package com.example.demo.posts;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "posts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false, columnDefinition = "VARCHAR(36)")
    private UUID id;

    @Column(nullable = false, length = 255)
    private String title;

    @Lob
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(name = "author_id", nullable = false, length = 36)
    private String authorId;

    @Column(name = "author_name", nullable = false, length = 100)
    private String authorName;

    @Column(name = "author_thumbnail")
    private String authorThumbnail; // URL to author's avatar

    @Column(name = "like_count", nullable = false)
    private Long likeCount = 0L;

    @Column(name = "comment_count", nullable = false)
    private Long commentCount = 0L;

    @Column(name = "view_count", nullable = false)
    private Long viewCount = 0L;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "visibility_Mode")
    private String visibilityMode;
}