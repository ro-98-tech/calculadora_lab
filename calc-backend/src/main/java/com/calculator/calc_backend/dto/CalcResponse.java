package com.calculator.calc_backend.dto;

public record CalcResponse(
        String expression, // "9.0 + 3.0 = 12.0"
        Double result, // 12.0
        String error // si algo salió mal: "Division by zero"
) {}
