package com.calculator.calc_backend.dto;

import jakarta.validation.constraints.NotNull;

public record CalcRequest(
        @NotNull String op, // operación: "+", "-", "*", "/"
        @NotNull Double a, // primer número
        @NotNull Double b
) {}
