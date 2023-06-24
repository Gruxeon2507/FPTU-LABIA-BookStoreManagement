package com.labia.bookstoremanagement.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

public class PageImpl<T> implements org.springframework.data.domain.Page<T> {

    private List<T> content;
    private int pageNumber;
    private int pageSize;
    private long totalElements;

    public PageImpl(List<T> content, Pageable pageable, long totalElements) {
        this.content = content;
        this.pageNumber = pageable.getPageNumber();
        this.pageSize = pageable.getPageSize();
        this.totalElements = totalElements;
    }

    @Override
    public int getTotalPages() {
        return (int) Math.ceil((double) totalElements / pageSize);
    }

    @Override
    public long getTotalElements() {
        return totalElements;
    }

    @Override
    public int getNumber() {
        return pageNumber;
    }

    @Override
    public int getSize() {
        return pageSize;
    }

    @Override
    public int getNumberOfElements() {
        return content.size();
    }

    @Override
    public List<T> getContent() {
        return new ArrayList<>(content);
    }

    @Override
    public boolean hasContent() {
        return !content.isEmpty();
    }

    @Override
    public boolean isFirst() {
        return pageNumber == 0;
    }

    @Override
    public boolean isLast() {
        return pageNumber == getTotalPages() - 1;
    }

    @Override
    public boolean hasNext() {
        return !isLast();
    }

    @Override
    public boolean hasPrevious() {
        return !isFirst();
    }

    @Override
    public org.springframework.data.domain.Pageable nextPageable() {
        return hasNext() ? org.springframework.data.domain.PageRequest.of(pageNumber + 1, pageSize) : null;
    }

    @Override
    public org.springframework.data.domain.Pageable previousPageable() {
        return hasPrevious() ? org.springframework.data.domain.PageRequest.of(pageNumber - 1, pageSize) : null;
    }

    @Override
    public Sort getSort() {
        return Sort.unsorted();
    }

    @Override
    public <U> org.springframework.data.domain.Page<U> map(Function<? super T, ? extends U> converter) {
        List<U> convertedContent = content.stream()
                .map(converter)
                .collect(Collectors.toList());
        return new PageImpl<>(convertedContent, org.springframework.data.domain.PageRequest.of(pageNumber, pageSize), totalElements);
    }

    @Override
    public Iterator<T> iterator() {
        return content.iterator();
    }
}