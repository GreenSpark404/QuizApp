package org.greenspark404.mapper;

import java.util.List;

public interface EntityMapper<D, E> {

    E toEntity(D dto);

    D toDto(E entity);

    List<E> toEntity(Iterable<D> dtoList);

    List<D> toDto(Iterable<E> entityList);
}
