import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { WebApiClient } from '../infrastructure/communication';
import { UserMapper } from '../infrastructure/mapping';
import { Collection, Pagination, Post, User, CreatePostModel } from '../common/models';

@Injectable()
export class PostService {
    constructor(
        private webApiClient: WebApiClient,
        private userMapper: UserMapper) { }

    createPost(post: CreatePostModel) {
        return this.webApiClient.post<Post>('posts', post);
    }

    getPosts(pagination: Pagination): Observable<Collection<Post>> {
        let requestUri = 'posts';

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.webApiClient.get<Collection<Post>>(requestUri);
    }

    getUserPosts(username: string, pagination: Pagination): Observable<Collection<Post>> {
        let requestUri = 'posts/' + username;

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.webApiClient.get<Collection<Post>>(requestUri);
    }

    getPostsByTag(tag: string, pagination: Pagination) {
        let requestUri = `posts/tags/${tag}`;

        if (pagination != null && pagination.next != null) {
            requestUri = requestUri + '?next=' + pagination.next;
        }

        return this.webApiClient.get<Collection<Post>>(requestUri);
    }

    getPostById(postId: number): Observable<Post> {
        return this.webApiClient.get<Post>(`posts/${postId}`);
    }

    update(post: Post): Observable<Post> {
        return this.webApiClient.patch(`posts/${post.id}`, post);
    }

    removePost(postId: number) {
        return this.webApiClient.delete(`posts/${postId}`);
    }

    public getLikes(postId: number): Observable<User[]> {
        return this.webApiClient.get<User[]>(`posts/${postId}/likes`)
            .map(response => response.map(e => this.userMapper.mapResponseToUser(e)));
    }

    likePost(postId: number) {
        return this.webApiClient.post(`posts/${postId}/likes`, null);
    }

    removePostLike(postId: number) {
        return this.webApiClient.delete(`posts/${postId}/likes`);
    }
}