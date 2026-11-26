package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "productos")
@Data
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String aforo;
    private Double precio;
    private Double precioAnterior;

    @Column(columnDefinition = "TEXT")
    private String imagen;

    private Integer stock;
    private String categoria;
    private Boolean oferta;

    public Producto() {}

    public Producto(String titulo, String aforo, Double precio, Double precioAnterior, String imagen, Integer stock, String categoria, Boolean oferta) {
        this.titulo = titulo;
        this.aforo = aforo;
        this.precio = precio;
        this.precioAnterior = precioAnterior;
        this.imagen = imagen;
        this.stock = stock;
        this.categoria = categoria;
        this.oferta = oferta;
    }

}