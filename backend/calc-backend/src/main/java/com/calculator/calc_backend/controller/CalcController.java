package com.calculator.calc_backend.controller;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.calculator.calc_backend.dto.CalcRequest;
import com.calculator.calc_backend.dto.CalcResponse;
import com.calculator.calc_backend.service.CalcService;


@RestController
@RequestMapping("/api/calc")

public class CalcController {
    
// Usamos el motor de cálculos
    private final CalcService calcService;

    // Historial en memoria (se borra si apagas la app)
    private final List<String> history = new CopyOnWriteArrayList<>();

    // Spring nos entrega el servicio automáticamente
    public CalcController(CalcService calcService) {
        this.calcService = calcService;
    }

    // Cuando te hagan POST a /api/calc
    @PostMapping
    public ResponseEntity<CalcResponse> calculate(@RequestBody CalcRequest req) {
        try {
            double result = calcService.operate(req.op(), req.a(), req.b());
            String expr = "%s %s %s = %s".formatted(req.a(), req.op(), req.b(), result);

            history.add(expr); // guardamos el texto en el historial

            // devolvemos 200 OK con la respuesta buena
            return ResponseEntity.ok(new CalcResponse(expr, result, null));
        } catch (Exception ex) {
            // devolvemos 400 Bad Request con el error
            return ResponseEntity.badRequest().body(new CalcResponse(null, null, ex.getMessage()));
        }
    }

    // Cuando te hagan GET a /api/calc/history
    @GetMapping("/history")
    public List<String> history() {
        return history;
    }

    // Cuando te hagan DELETE a /api/calc/history
    @DeleteMapping("/history")
    public void clearHistory() {
        history.clear();
    }

}
