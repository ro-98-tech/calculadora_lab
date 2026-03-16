package com.calculator.calc_backend.service;

import org.springframework.stereotype.Service;

@Service
public class CalcService {
    
public double operate(String op, double a, double b) {
        // Elegimos qué operación según el símbolo
        return switch (op) {
            case "+" -> a + b;        // suma
            case "-" -> a - b;        // resta
            case "*" -> a * b;        // multiplicación
            case "/" -> {
                if (b == 0.0) throw new ArithmeticException("Division by zero"); // protegemos división entre 0
                yield a / b;          // división
            }
            default -> throw new IllegalArgumentException("Invalid operation"); // si mandan algo raro
        };
    }

}
