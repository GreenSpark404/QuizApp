package org.greenspark404.model.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class PlayerDTO {
    @NotEmpty
    private String name;
}
